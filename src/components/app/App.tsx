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

export const App: React.FC = () => {
  const dispatch = useDispatch()
  const { theme } = useTheme()

  const { authorized } = useAuth()
  const isSuperAdmin = true

  useEffect(() => {
    if (authorized) {
      dispatch(fetchCities())
      dispatch(fetchSchools())
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
