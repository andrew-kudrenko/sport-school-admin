import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ICachedUserData, ILoginCredentials } from '../interfaces/entities.interfaces'
import { IState } from '../interfaces/redux.interfaces'
import { createLoginAction, createLogoutAction } from '../redux/actions/auth.actions'
import { useLocalStorage } from './local-storage.hook'


export function useAuth() {
  const dispatch = useDispatch()
  const { authorized, token, error } = useSelector((state: IState) => state.auth)
  const [credentials, setCredentials, removeCredentials] = useLocalStorage<ICachedUserData | null>('credentials', null)

  const login = useCallback((credentials: ILoginCredentials) => {
    dispatch(createLoginAction(credentials))

    const updatedData: ICachedUserData = { login: credentials.login }
    setCredentials(updatedData)
  }, [])

  const logout = useCallback(() => {
    removeCredentials()
    dispatch(createLogoutAction())
  }, [])

  useEffect(() => {
    const cachedData: ICachedUserData | null = credentials

    if (!authorized) {
      if (cachedData?.token) {
        dispatch(createLoginAction(cachedData.token))
      }
    }
    
    if (!error.login && authorized) {
      setCredentials(cachedData)
    }

    if (token && cachedData?.token) {
      cachedData.token = token
      setCredentials(cachedData)
    }
  }, [authorized, dispatch, token, credentials, error.login, setCredentials])

  return { authorized, token, login, logout }
}