import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Avatar, Typography, Grid, Button } from '@material-ui/core'
import { AddOutlined, EditOutlined } from '@material-ui/icons'
import { NavLink } from 'react-router-dom'
import { IEditorFormProps } from '../../interfaces/components.interfaces'

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

export const EditorFormLayout: React.FC<IEditorFormProps> = ({
    isValid, title, redirectTo, children, onAdd, onRemove, onModify, onClearAll, loading, mode = 'edit'
}) => {
    const classes = useStyles()

    const editing = mode === 'edit'

    const onSave = editing ? onModify : onAdd

    const onSaveAndResume = () => {
        onSave()

        if (!editing) {
            onClearAll()
        }
    }

    const saveLoading = loading[editing ? 'update' : 'create']

    const buttonSize = !editing ? 6 : 4

    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    {
                        !editing
                            ? <AddOutlined />
                            : <EditOutlined />
                    }
                </Avatar>
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
                <form className={classes.form} noValidate>
                    {children}
                    <Grid container xs={12} spacing={2}>
                        {
                            editing &&
                            <Grid item xs={12} sm={buttonSize}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={onRemove}
                                    disabled={loading.delete}
                                    component={NavLink}
                                    to={redirectTo}
                                >
                                    {'Удалить'}
                                </Button>
                            </Grid>
                        }
                        <Grid item xs={12} sm={buttonSize}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={onSaveAndResume}
                                disabled={!isValid || saveLoading}
                            >
                                {'Сохранить и продолжить'}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={buttonSize}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                                onClick={onSave}
                                disabled={!isValid || saveLoading}
                                component={NavLink}
                                to={redirectTo}
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
