import React from 'react'
import { AdminRoutes } from '../../routes/AdminRoutes'
import { AuthRoutes } from '../../routes/AuthRoutes'
import { SuperAdminRoutes } from '../../routes/SuperAdminRoutes'

export const App: React.FC = () => {
  const authenticated = true
  const isSuperAdmin = true

  return (
    !authenticated
      ? <AuthRoutes /> 
      : isSuperAdmin
        ? <SuperAdminRoutes />
        : <AdminRoutes />
  )
}
