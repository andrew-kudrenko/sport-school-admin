import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { CreatingLayout } from '../../components/layouts/creating-layout/CreatingLayout'
import { useDispatch } from 'react-redux'
import { addCity } from '../../redux/actions/cities.actions'

export const EditCityForm: React.FC = () => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const { onChange } = useFormHandlers()

    const onSave = dispatch.bind(null, addCity({ name }))
    const onSaveAndResume = () => {}

    return (
        <CreatingLayout onSave={onSave} onSaveAndResume={onSaveAndResume}>
            <TextField value={name} onChange={onChange(setName)} />
        </CreatingLayout>
    )
}