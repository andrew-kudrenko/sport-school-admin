import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Avatar, Typography, Grid, TextField, Button, Select, MenuItem } from '@material-ui/core'
import { AddOutlined } from '@material-ui/icons'
import { IState } from '../../interfaces/redux.interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { IDType } from '../../interfaces/entities.interfaces'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { addSchool } from '../../redux/actions/schools.actions'
import { NavLink } from 'react-router-dom'
import { InteractiveButton } from '../../components/buttons/InteractiveButton'

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 1),
    },
}))

export const AddSchoolView: React.FC = () => {
    const classes = useStyles()
    const { onChange, onSelect } = useFormHandlers()

    const [name, setName] = useState('')    
    const [city, setCity] = useState<IDType | null>(null)
    const [address, setAddress] = useState('')    
    const [description, setDescription] = useState('')   

    const dispatch = useDispatch()
    const { list: cities } = useSelector((state: IState) => state.cities)
    const { loading, error } = useSelector((state: IState) => state.schools)

    const isValid: boolean = !!name && !!address && !!description && !!city

    const clearAll = () => {
        setName('')
        setCity(null)
        setAddress('')
        setDescription('')
    }

    const onAdd = dispatch.bind(null, addSchool({ name, city_id: city as string, address, description }))

    const onAddAndResume = () => {
        onAdd()
        clearAll()
    }

    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AddOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {'Добавить школу'}
                </Typography>
                <form className={classes.form} noValidate>
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
                    <Grid container xs={12} spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InteractiveButton
                                loading={loading.create}
                                success={!error.create && !loading.create}
                                onClick={() => {}}
                            >
                                {'Save and resume'}
                            </InteractiveButton>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={onAdd}
                                disabled={!isValid}
                                component={NavLink}
                                to="/schools/"
                            >
                                {'Сохранить'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
