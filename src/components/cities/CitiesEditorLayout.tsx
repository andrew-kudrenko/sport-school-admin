import React, { useEffect, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { addCity, modifyCity, removeCity } from '../../redux/actions/cities.actions'
import { EditorFormLayout } from '../layouts/EditorFormLayout'
import { useParams } from 'react-router-dom'
import { IDType } from '../../interfaces/entities.interfaces'
import { useRole } from '../../hooks/role.hook'

export const CitiesEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
    const editing = mode === 'edit'

    const { id } = useParams<{ id?: IDType }>()
    let { list: cities } = useSelector((state: IState) => state.cities)

    let { city_id, isSuperAdmin } = useRole()

    if (!isSuperAdmin) {
        cities = cities.filter(s => s.id === city_id)
    }

    const [name, setName] = useState('')

    const dispatch = useDispatch()
    const { loading } = useSelector((state: IState) => state.cities)
    const { onChange } = useFormHandlers()

    const onClearAll = setName.bind(null, '')

    const onAdd = dispatch.bind(null, addCity({ name }))

    let onModify = () => {}
    if (!!id?.toString()) {
        onModify = dispatch.bind(null, modifyCity(id, { name }))
    }
    
    let onRemove = () => {}

    if (editing && !!id?.toString()) {
        onRemove = dispatch.bind(null, removeCity(id))
    }

    useEffect(() => {
        const city = cities.find(c => c.id.toString() === id)

        if (editing && city) {
            setName(city.name)    
        }
    }, [])

    return (
        <EditorFormLayout
            mode={mode}
            isValid={!!name}
            redirectTo="/cities/"
            title={title}
            loading={loading}
            onAdd={onAdd}
            onClearAll={onClearAll}
            onRemove={onRemove}
            onModify={onModify}
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