import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ILoginCredentials } from '../interfaces/entities.interfaces'
import { IState } from '../interfaces/redux.interfaces'
import { createLoginAction, createLogoutAction } from '../redux/actions/auth.actions'

const collectionName: string = 'user-data'

export function useAuth() {
  const dispatch = useDispatch()
  const { authorized, token } = useSelector((state: IState) => state.auth)

  const login = useCallback((credentials: ILoginCredentials) => {
    dispatch(createLoginAction(credentials))
    localStorage.setItem(collectionName, JSON.stringify({ login: credentials.login, token }))
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(collectionName)
    dispatch(createLogoutAction())
  }, [])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(collectionName) || 'null')

    if (userData?.token) {
      login(userData)
    }
  }, [login])

  return { authorized, token, login, logout }
}