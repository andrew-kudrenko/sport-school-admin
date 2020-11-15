import { Grid, TextField, Select, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditorFormLayout } from '../../components/layouts/EditorFormLayout'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IDType } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { addSchool } from '../../redux/actions/schools.actions'

export const AddSchoolView: React.FC = () => {
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

    return (
        <EditorFormLayout
            mode="add"
            onAdd={onAdd}
            onClearAll={onClearAll}
            isValid={isValid}
            redirectTo="/schools/"
            title="Добавить школу"
            pending={loading.create}
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