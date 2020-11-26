import React, { useEffect, useState } from 'react'
import { Grid, TextField, Select, MenuItem } from '@material-ui/core'
import { EditorFormLayout } from '../../components/layouts/EditorFormLayout'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IDType, ISchool } from '../../interfaces/entities.interfaces'
import { useFoundCities } from '../../hooks/found-by-city.hook'
import { useIDParam } from '../../hooks/id-param.hook'
import { validate } from '../../helpers/truthy-validator.helper'
import { useDeleteQuery, useGetQuery, usePostQuery, usePutQuery } from '../../hooks/query.hook'
import { Nullable } from '../../types/common.types'
import { collectCRUDLoading } from '../../helpers/crud-loading.helper'

export const SchoolsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
    const editing = mode === 'edit'
    const id = useIDParam()

    const { onChange, onSelect } = useFormHandlers()

    const [name, setName] = useState('')
    const [city, setCity] = useState<Nullable<IDType>>(null)
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')

    const [forSending, setForSending] = useState({ name, city_id: city, address, description })

    const { cities, loading: fetching } = useFoundCities()
    const { value: school } = useGetQuery<ISchool & { city: { id: IDType, name: string } }>(`structures/schools/${id}`)

    const isValid = validate([name, city, address, description])

    const onClearAll = () => {
        setName('')
        setCity(null)
        setAddress('')
        setDescription('')
    }

    const { execute: onAdd, loading: adding } = usePostQuery('structures/schools', forSending)
    const { execute: onModify, loading: modifying } = usePutQuery(`structures/schools/${id}`, forSending)
    const { execute: onRemove, loading: removing } = useDeleteQuery(`structures/schools/${id}`)

    const loading = collectCRUDLoading([adding, fetching, modifying, removing])

    useEffect(() => {
        if (editing && school) {
            setName(school.name)
            setCity(school.city.id)
            setDescription(school.description)
            setAddress(school.address)
        }
    }, [school])

    useEffect(() => {
        setForSending({ name, city_id: city, address, description })
    }, [name, address, city, description])

    return (
        <EditorFormLayout
            mode={mode}
            onAdd={onAdd}
            onModify={onModify}
            onRemove={onRemove}
            onClearAll={onClearAll}
            isValid={isValid}
            redirectTo="/schools/"
            title={title}
            loading={loading}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Название"
                        autoFocus
                        value={name}
                        onChange={onChange(setName)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select
                        variant="outlined"
                        fullWidth
                        value={city || ''}
                        onChange={onSelect(setCity)}
                        displayEmpty
                    >
                        <MenuItem value='' disabled>{'Город'}</MenuItem>
                        {
                            cities.map(c =>
                                <MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>
                            )
                        }
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Адрес"
                        value={address}
                        onChange={onChange(setAddress)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Описание"
                        multiline
                        rows={7}
                        value={description}
                        onChange={onChange(setDescription)}
                    />
                </Grid>
            </Grid>
        </EditorFormLayout>
    )
}