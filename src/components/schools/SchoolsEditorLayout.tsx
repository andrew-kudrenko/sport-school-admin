import { Grid, TextField, Select, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EditorFormLayout } from '../../components/layouts/EditorFormLayout'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IDType } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { addSchool, modifySchool, removeSchool } from '../../redux/actions/schools.actions'

export const SchoolsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
    const { id } = useParams<{ id?: IDType }>()
    const { onChange, onSelect } = useFormHandlers()

    const [name, setName] = useState('')
    const [city, setCity] = useState<IDType | null>(null)
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const { list: cities } = useSelector((state: IState) => state.cities)
    const { loading } = useSelector((state: IState) => state.schools)

    const isValid: boolean = !!name && !!address && !!description && !!city

    const onClearAll = () => {
        setName('')
        setCity(null)
        setAddress('')
        setDescription('')
    }

    const onAdd = dispatch.bind(null, addSchool({ name, city_id: city as string, address, description }))

    const onModify = dispatch.bind(null, modifySchool({ name, city_id: city as string, address, description }))

    let onRemove = () => {}

    if (mode === 'edit' && !!id?.toString()) {
        onRemove = dispatch.bind(null, removeSchool(id))
    }

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