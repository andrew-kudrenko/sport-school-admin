import React, { useEffect } from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../hooks/auth.hooks'
import { useTheme } from '../../hooks/theme.hook'
import { fetchCities } from '../../redux/actions/cities.actions'
import { fetchSchools } from '../../redux/actions/schools.actions'
import { AdminRoutes } from '../../routes/AdminRoutes'
import { AuthRoutes } from '../../routes/AuthRoutes'
import { SuperAdminRoutes } from '../../routes/SuperAdminRoutes'
import { fetchUsers } from '../../redux/actions/users.actions'
import { fetchNews } from '../../redux/actions/news.actions'
import { setUser } from '../../redux/actions/auth.actions'
import { fetchTournaments } from '../../redux/actions/tournaments.actions'

export const App: React.FC = () => {
  const dispatch = useDispatch()
  const { theme } = useTheme()

  const { authorized } = useAuth()
  const isSuperAdmin = true

  useEffect(() => {
    if (authorized) {
      dispatch(setUser())
      dispatch(fetchCities())
      dispatch(fetchSchools())
      dispatch(fetchUsers())
      dispatch(fetchNews())
      dispatch(fetchTournaments())
    }
  }, [authorized, dispatch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {
        !authorized
          ? <AuthRoutes />
          : isSuperAdmin
            ? <SuperAdminRoutes />
            : <AdminRoutes />
      }
    </ThemeProvider>
  )
}
