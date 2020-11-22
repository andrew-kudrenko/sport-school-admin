import React from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { useAuth } from '../../hooks/auth.hooks'
import { useTheme } from '../../hooks/theme.hook'
import { AdminRoutes } from '../../routes/AdminRoutes'
import { AuthRoutes } from '../../routes/AuthRoutes'
import { SuperAdminRoutes } from '../../routes/SuperAdminRoutes'
import { useRole } from '../../hooks/role.hook'

export const App: React.FC = () => {
  const { theme } = useTheme()
  
  const { authorized } = useAuth()
  const { isSuperAdmin } = useRole()

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
    </MuiPickersUtilsProvider>
  )
}
