import React, { useEffect, useState } from 'react'
import { Grid, TextField, Select, MenuItem } from '@material-ui/core'
import { EditorFormLayout } from '../layouts/EditorFormLayout'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IDType, IUser } from '../../interfaces/entities.interfaces'
import { useFoundCities, useFoundSchools, useFoundUsers } from '../../hooks/found-by-city.hook'
import { splitDate } from '../../helpers/date-splitter.helper'
import { collectCRUDLoading } from '../../helpers/crud-loading.helper'
import { useIDParam } from '../../hooks/id-param.hook'
import { useGetQuery, usePostQuery, usePutQuery, useDeleteQuery } from '../../hooks/query.hook'
import { Nullable } from '../../types/common.types'
import { validate } from '../../helpers/truthy-validator.helper'

export const UsersEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
    const editing = mode === 'edit'

    const id = useIDParam()
    const { onChange, onSelect } = useFormHandlers()

    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    
    const [isTrainer, setIsTrainer] = useState(false)
    const [isChild, setIsChild] = useState(false)
    const [isVerify, setIsVerify] = useState(false)
    const [isWasActivate, setWasActivate] = useState(false)

    const [city, setCity] = useState<Nullable<IDType>>(null)
    const [school, setSchool] = useState<Nullable<IDType>>(null)
    const [children, setChildren] = useState<Array<IDType>>([])

    const [address, setAddress] = useState('')
    const [tel, setTel] = useState('')
    const [date, setDate] = useState<Nullable<Date>>(null)

    const { cities } = useFoundCities()
    const { schools } = useFoundSchools()
    const { users } = useFoundUsers()

    const { value: user, loading: fetching } = useGetQuery<IUser>(`tg/users/${id}`)

    const onClearAll = () => {
        setLogin('')
        setName('')
        
        setIsTrainer(false)
        setIsChild(false)
        setIsVerify(false)
        setWasActivate(false)

        setCity(null)
        setSchool(null)
        
        setAddress('')
        setTel('')

        setDate(null)
    }

    const forSending = { 
        name, 
        city_id: city, 
        address,
        date_joined: splitDate(date || new Date()),
        is_child: isChild,
        is_trainer: isTrainer,
        is_verify: isVerify,
        login,
        school_id: school,
        tel,
        was_activate: isWasActivate,
        child_id: children
    }
    console.log(forSending)

    const { execute: onAdd, loading: adding } = usePostQuery('persons/trainer', forSending)
    const { execute: onModify, loading: modifying } = usePutQuery(`persons/trainer/${id}`, forSending)
    const { execute: onRemove, loading: removing } = useDeleteQuery(`persons/trainer/${id}`)
  
    const isValid = validate([login, name, city, school, address, tel, date])
    const loading = collectCRUDLoading([adding, fetching, modifying, removing])  

    useEffect(() => {
        if (editing && user) {
            setLogin(user.login)
            setName(user.name)
            
            setIsTrainer(user.is_trainer)
            setIsChild(user.is_child)
            setIsVerify(user.is_verify)
            setWasActivate(user.was_activate)
    
            setCity(cities.find(c => c.id === user.city_id)?.id || null)
            setSchool(schools.find(s => s.id === user.id)?.id || null)
            
            setAddress(user.address)
            setTel(user.tel)
            
            setDate(new Date(user.date_joined))
        }
    }, [user])

    return (
        <EditorFormLayout
            mode={mode}
            onAdd={onAdd}
            onModify={onModify}
            onRemove={onRemove}
            onClearAll={onClearAll}
            isValid={isValid}
            redirectTo="/users/"
            title={title}
            loading={loading}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Логин"
                        autoFocus
                        value={login}
                        onChange={onChange(setLogin)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Название"
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
                    <Select
                        variant="outlined"
                        fullWidth
                        value={children}
                        onChange={onSelect(setChildren)}
                        displayEmpty
                    >
                        <MenuItem value='' disabled>{'Дети'}</MenuItem>
                        {
                            users
                            .filter(u => u.is_child)
                            .map(c =>
                                <MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>
                            )
                        }
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select
                        variant="outlined"
                        fullWidth
                        value={school || ''}
                        onChange={onSelect(setSchool)}
                        displayEmpty
                    >
                        <MenuItem value='' disabled>{'Школа'}</MenuItem>
                        {
                            schools.map(s =>
                                <MenuItem value={s.id} key={s.id}>{s.name}</MenuItem>
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
                        label="Номер телефона"
                        multiline
                        rows={7}
                        value={tel}
                        onChange={onChange(setTel)}
                    />
                </Grid>
            </Grid>
        </EditorFormLayout>
    )
}