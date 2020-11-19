import React, { useEffect, useState } from 'react'
import { Grid, TextField, Select, MenuItem } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EditorFormLayout } from '../layouts/EditorFormLayout'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IDType, INonIDUser } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { addUser, modifyUser, removeUser } from '../../redux/actions/users.actions'

export const UsersEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
    const editing = mode === 'edit'

    const { id } = useParams<{ id?: IDType }>()
    const { onChange, onSelect } = useFormHandlers()

    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    
    const [isTrainer, setIsTrainer] = useState(false)
    const [isChild, setIsChild] = useState(false)
    const [isVerify, setIsVerify] = useState(false)
    const [isWasActivate, setWasActivate] = useState(false)

    const [city, setCity] = useState<IDType | null>(null)
    const [school, setSchool] = useState<IDType | null>(null)

    const [address, setAddress] = useState('')
    const [tel, setTel] = useState('')
    const [date, setDate] = useState<Date | null>(null)

    const dispatch = useDispatch()

    const { list: cities } = useSelector(({ cities }: IState) => cities)
    const { list: schools } = useSelector(({ schools }: IState) => schools)
    const { loading, list: users } = useSelector(({ users }: IState) => users)

    const isValid: boolean = [login, name, city, school, address, tel, date].reduce((acc: boolean, item) => Boolean(acc) && Boolean(item), true)

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

    const userState: INonIDUser = { 
        name, 
        city_id: city as string || '', 
        address,
        date_joined: date?.toString() || '',
        is_child: isChild,
        is_trainer: isTrainer,
        is_verify: isVerify,
        login,
        school_id: school as string || '',
        tel,
        was_activate: isWasActivate  ,
        childs_id: []
    }

    const onAdd = dispatch.bind(null, addUser(userState))

    let onModify = () => {}

    if (editing && id) {
        onModify = dispatch.bind(null, modifyUser(id, userState))
    }

    let onRemove = () => {}

    if (editing && !!id?.toString()) {
        onRemove = dispatch.bind(null, removeUser(id))
    }

    useEffect(() => {
        const user = users.find(u => u.id.toString() === id)

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
    }, [])

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