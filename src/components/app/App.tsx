import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../hooks/auth.hooks'
import { fetchCities } from '../../redux/actions/cities.actions'
import { fetchSchools } from '../../redux/actions/schools.actions'
import { AdminRoutes } from '../../routes/AdminRoutes'
import { AuthRoutes } from '../../routes/AuthRoutes'
import { SuperAdminRoutes } from '../../routes/SuperAdminRoutes'

export const App: React.FC = () => {
  const dispatch = useDispatch()
  
  const { authorized } = useAuth() 
  const isSuperAdmin = true

  useEffect(() => {
    if (authorized) {
      dispatch(fetchCities())
      dispatch(fetchSchools())      
    }
  }, [authorized, dispatch])

  return (
    !authorized
      ? <AuthRoutes /> 
      : isSuperAdmin
        ? <SuperAdminRoutes />
        : <AdminRoutes />
  )
}
