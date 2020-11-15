import React, { useEffect, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useFormHandlers } from '../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../interfaces/components.interfaces'
import { IState } from '../interfaces/redux.interfaces'
import { addCity, removeCity } from '../redux/actions/cities.actions'
import { EditorFormLayout } from './layouts/EditorFormLayout'
import { useParams } from 'react-router-dom'
import { IDType } from '../interfaces/entities.interfaces'

export const CitiesEditorLayout: React.FC<IEntityEditorProps> = ({ mode }) => {
    const { id } = useParams<{ id?: IDType }>()
    const { list: cities } = useSelector((state: IState) => state.cities)
    console.log(id)
    const [name, setName] = useState('')

    const dispatch = useDispatch()
    const { loading } = useSelector((state: IState) => state.cities)
    const { onChange } = useFormHandlers()

    const onClearAll = setName.bind(null, '')

    const onAdd = dispatch.bind(null, addCity({ name }))

    let onRemove

    if (mode === 'edit' && !!id?.toString()) {
        onRemove = dispatch.bind(null, removeCity(id))
    }

    useEffect(() => {
        const city = cities.find(c => c.id === id)

        if (city) {
            setName(city.name)    
        }
    }, [cities])

    return (
        <EditorFormLayout
            mode={mode}
            isValid={!!name}
            redirectTo="/cities/"
            title="Добавить населенный пункт"
            pending={loading.create}
            onAdd={onAdd}
            onClearAll={onClearAll}
            onRemove={onRemove}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Название"
                        autoFocus
                        value={name}
                        onChange={onChange(setName)}
                    />
                </Grid>
            </Grid>
        </EditorFormLayout>
    )
}