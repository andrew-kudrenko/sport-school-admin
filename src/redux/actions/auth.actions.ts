import { Dispatch } from "redux"
import { requestFormData, requestJSONAuth } from "../../helpers/request.hepler"
import { ErrorType, ICachedUserData, ILoginCredentials } from "../../interfaces/entities.interfaces"
import { IAction } from "../../interfaces/redux.interfaces"
import { SET_LOGIN_LOADING, SET_REGISTER_LOADING, SET_REGISTER_ERROR, SET_LOGIN_ERROR, LOGIN, LOGOUT, SET_LOGOUT_ERROR, SET_LOGOUT_LOADING, REGISTER, SET_USER, SET_TOKEN } from "../types/auth.types"

export const setLogoutLoading = (payload: boolean): IAction<boolean> => ({ type: SET_LOGOUT_LOADING, payload })
export const setLogoutError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_LOGOUT_ERROR, payload })
export const createLogoutAction = (): IAction => ({ type: LOGOUT })

export const setRegisterLoading = (payload: boolean): IAction<boolean> => ({ type: SET_REGISTER_LOADING, payload })
export const setRegisterError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_REGISTER_ERROR, payload })
export const createRegisterAction = (): IAction => ({ type: REGISTER })

export const setLoginLoading = (payload: boolean): IAction<boolean> => ({ type: SET_LOGIN_LOADING, payload })
export const setLoginError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_LOGIN_ERROR, payload })
export const createLoginAction = (data: ILoginCredentials) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setLoginLoading(true))
            const { login, password } = data
            const response = await requestFormData('/auth/jwt/login', 'POST', `username=${login}&password=${password}`)

            if (response.detail) {
                throw new Error('Ошибка при входе в систему')
            }

            const token: string = response['access_token']

            dispatch({ type: LOGIN, payload: { login: data.login, token } })
        } catch (e) {
            dispatch(setLoginError(e instanceof Error ? e.message : String(e)))
        } finally {
            dispatch(setLoginLoading(false))
        }
    }

export const autoLogin = () => (dispatch: Dispatch) => {
    const credentials: ICachedUserData = JSON.parse(localStorage.getItem('credentials') || 'null')
    const expires = JSON.parse(localStorage.getItem('expires') || 'null')

    if (credentials && expires) {
        if (new Date().getMilliseconds() > new Date(expires).getMilliseconds() * 60e3) {
           dispatch(createLogoutAction()) 
        } else {
            dispatch({ type: LOGIN, payload: { login: credentials.login, token: credentials.token } })
        }
    }
}

export const setUser = () => async (dispatch: Dispatch) => {
    try {
        const me = await requestJSONAuth('/users/me')

        if (me.detail) {
            throw new Error('Ошибка при определении пользователя')
        }

        dispatch({ type: SET_USER, payload: me })
    } catch (e) {
        dispatch(setLoginError(e instanceof Error ? e.message : String(e)))
    }
}

export const setToken = (payload: string | null) => ({ type: SET_TOKEN, payload })