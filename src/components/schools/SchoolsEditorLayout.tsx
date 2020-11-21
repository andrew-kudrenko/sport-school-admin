import React, { useEffect, useState } from 'react'
import { Grid, TextField, Select, MenuItem } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EditorFormLayout } from '../../components/layouts/EditorFormLayout'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IDType } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { addSchool, modifySchool, removeSchool } from '../../redux/actions/schools.actions'
import { useFoundCities, useFoundSchools } from '../../hooks/found-by-city.hook'

export const SchoolsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
    const editing = mode === 'edit'

    const { id } = useParams<{ id?: IDType }>()
    const { onChange, onSelect } = useFormHandlers()

    const [name, setName] = useState('')
    const [city, setCity] = useState<IDType | null>(null)
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const schools = useFoundSchools()
    const cities = useFoundCities()

    const { loading } = useSelector((state: IState) => state.schools)

    const isValid: boolean = !!name && !!address && !!description && !!city

    const onClearAll = () => {
        setName('')
        setCity(null)
        setAddress('')
        setDescription('')
    }

    const onAdd = dispatch.bind(null, addSchool({ name, city_id: city as string, address, description }))

    let onModify = () => {}

    if (editing && id) {
        onModify = dispatch.bind(null, modifySchool(id, { name, city_id: city as string, address, description }))
    }

    let onRemove = () => {}

    if (editing && !!id?.toString()) {
        onRemove = dispatch.bind(null, removeSchool(id))
    }

    useEffect(() => {
        const school = schools.find(c => c.id.toString() === id)

        if (editing && school) {
            setName(school.name)    
            setCity(school.city_id)    
            setDescription(school.description)    
            setAddress(school.address)    
        }
    }, [])

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