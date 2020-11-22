import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ICachedUserData, ILoginCredentials } from '../interfaces/entities.interfaces'
import { IState } from '../interfaces/redux.interfaces'
import { createLoginAction, createLogoutAction, setUser } from '../redux/actions/auth.actions'
import { useLocalStorage } from './local-storage.hook'


export function useAuth() {
  const dispatch = useDispatch()

  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false)

  const [credentials, setCredentials, removeCredentials] = useLocalStorage<ICachedUserData | null>('credentials', null)

  const { authorized, token, login: email, user } = useSelector((state: IState) => state.auth)

  const login = useCallback((credentials: ILoginCredentials) => {
    dispatch(createLoginAction(credentials))    
  }, [])

  const logout = useCallback(() => {
    dispatch(createLogoutAction())
    removeCredentials()
    setLoggedOut(true)
    setLoggedIn(false)
  }, [])

  useEffect(() => {
    if (!loggedIn) {
      if (token && email) {
        setCredentials({ login: email, token })
        setLoggedIn(true)
        setLoggedOut(false)
      }    
    }
  }, [loggedIn])

  useEffect(() => {
    if (!loggedOut) {
      if (!authorized && credentials?.login && credentials?.token) {
        dispatch(createLoginAction(credentials))
      }
    }
  }, [loggedOut])


  useEffect(() => {
    if (!user && loggedIn) {
      dispatch(setUser())
    }
  }, [user, loggedIn])

  return { authorized, token, login, logout }
}