import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ICachedUserData, ILoginCredentials } from '../interfaces/entities.interfaces'
import { IState } from '../interfaces/redux.interfaces'
import { createLoginAction, createLogoutAction } from '../redux/actions/auth.actions'

const collectionName: string = 'user-data'

export function useAuth() {
  const dispatch = useDispatch()
  const { authorized, token, user } = useSelector((state: IState) => state.auth)

  const login = useCallback((credentials: ILoginCredentials) => {
    dispatch(createLoginAction(credentials))

    const updatedData: ICachedUserData = { login: credentials.login }
    localStorage.setItem(collectionName, JSON.stringify(updatedData))

    localStorage.setItem('me', JSON.stringify(user))
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(collectionName)
    dispatch(createLogoutAction())
  }, [])

  useEffect(() => {
    const cachedData: ICachedUserData = JSON.parse(localStorage.getItem(collectionName) || '{}')

    if (!authorized) {
      if (cachedData.token) {
        dispatch(createLoginAction(cachedData.token))
        localStorage.setItem(collectionName, JSON.stringify(cachedData))
      }
    }

    if (token) {
      cachedData.token = token
      localStorage.setItem(collectionName, JSON.stringify(cachedData))
    }
  }, [authorized, dispatch, token])

  return { authorized, token, login, logout }
}