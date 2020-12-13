import React, { useEffect, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { EditorFormLayout } from '../layouts/EditorFormLayout'
import { useIDParam } from '../../hooks/id-param.hook'
import { useDeleteQuery, useGetQuery, usePostQuery, usePutQuery } from '../../hooks/query.hook'
import { validate } from '../../helpers/truthy-validator.helper'
import { ITransaction } from '../../interfaces/entities.interfaces'

export const TransactionsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
    const editing = mode === 'edit'
    
    const id = useIDParam()
    let { value: types, loading, execute: fetchTypes } = useGetQuery<Array<ITransaction>>('transactions/types')
    
    const [type, setType] = useState('')
    
    const { onChange } = useFormHandlers()
    const onClearAll = setType.bind(null, '')

    const { execute: onAdd, loading: adding } = usePostQuery('transactions/types', { title: type })
    const { execute: onModify, loading: modifying } = usePutQuery(`transactions/types/${id}`, { title: type })
    const { execute: onRemove, loading: removing } = useDeleteQuery(`transactions/types/${id}`)

    const isValid = validate([type])

    useEffect(() => {
        const current = types?.find((t: any) => String(t.id) === id)

        if (editing && current) {
            setType(current.title)    
        }
    }, [types])

    return (
        <EditorFormLayout
            mode={mode}
            isValid={isValid}
            redirectTo="/types/"
            title={title}
            loading={{ read: loading, create: adding, update: modifying, delete: removing}}
            onAdd={onAdd}
            onClearAll={onClearAll}
            onRemove={async () => {
                await onRemove()
                await fetchTypes()
            }}
            onModify={onModify}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Тип"
                        autoFocus
                        value={type}
                        onChange={onChange(setType)}
                    />
                </Grid>
            </Grid>
        </EditorFormLayout>
    )
}