import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Copyright } from '../../components/auth/Copyright'
import { useAuth } from '../../hooks/auth.hooks'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IState } from '../../interfaces/redux.interfaces'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.bsilifestyle.com/wp-content/uploads/2016/05/3_uefa_large.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const LoginView: React.FC = () => {
  const { error, loading } = useSelector((state: IState) => state.auth)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [alert, setAlert] = useState(null)

  const { login } = useAuth()
  const { onChange } = useFormHandlers()

  const classes = useStyles()
  const disabled = !login || !password

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {'Войдите'}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={username}
              onChange={onChange(setUsername)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Логин"
              autoFocus
            />
            <TextField
              value={password}
              onChange={onChange(setPassword)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Пароль"
              type="password"
            />
            <Button
              disabled={disabled || loading.login}
              onClick={login.bind(null, { login: username, password })}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {'Войти'}
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}