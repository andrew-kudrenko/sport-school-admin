import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestJSONAuth } from '../helpers/request.hepler'
import { ICachedUserData, ILoginCredentials } from '../interfaces/entities.interfaces'
import { IState } from '../interfaces/redux.interfaces'
import { autoLogin, createLoginAction, createLogoutAction, setToken, setUser } from '../redux/actions/auth.actions'
import { Nullable } from '../types/common.types'
import { useLocalStorage } from './local-storage.hook'

export function useAuth() {
  const dispatch = useDispatch()

  const [credentials, setCredentials, removeCredentials] = useLocalStorage<Nullable<ICachedUserData>>('credentials', null)
  const [given, setGiven, removeGiven] = useLocalStorage<Nullable<number>>('expires', null)

  const { authorized, token, login: email, user, error, loading } = useSelector((state: IState) => state.auth)

  const expires = 30

  const login = useCallback((credentials: ILoginCredentials) => {
    dispatch(createLoginAction(credentials))
    setGiven(Date.now())
  }, [])

  const logout = () => {
    dispatch(createLogoutAction())
    removeCredentials()
    removeGiven()
  }

  useEffect(() => {
    if (!authorized && credentials) {
      if (token && given) {
        if (Date.now() > given + expires * 60e3 * .75) {
          return logout()
        }
      }

      dispatch(autoLogin())
    }
  }, [])

  useEffect(() => {
    if (authorized && token && credentials && !user) {
      const givenTimeout = window.setTimeout(() => {
        dispatch(setUser())
        window.clearTimeout(givenTimeout)
      }, 500)

      if (given) {
        const timeout = window.setInterval(async () => {
          dispatch(setToken((await requestJSONAuth('/auth/jwt/refresh', 'POST'))['access_token']))
          setGiven(Date.now())
        }, expires * .75 * 60e3)

        return () => {
          window.clearInterval(timeout)
        }
      }
    }
  }, [authorized, credentials])

  useEffect(() => {
    if (authorized && email && token) {
      setCredentials({ login: email, token })
    }
  }, [authorized, email, token])

  useEffect(() => {
    if (!token && authorized) {
      logout()
    }
  }, [token, authorized])

  useEffect(() => {
    if (authorized && user && !credentials) {
      logout()
    }
  }, [authorized, credentials])

  return { token, authorized, login, user, error, logout, loading }
}