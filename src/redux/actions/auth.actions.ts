import { Dispatch } from "redux"
import { requestFormDataAuth } from "../../helpers/request.hepler"
import { ErrorType, ILoginCredentials, TokenType } from "../../interfaces/entities.interfaces"
import { IAction } from "../../interfaces/redux.interfaces"
import { SET_LOGIN_LOADING, SET_REGISTER_LOADING, SET_REGISTER_ERROR, SET_LOGIN_ERROR, LOGIN, LOGOUT, SET_LOGOUT_ERROR, SET_LOGOUT_LOADING, REGISTER } from "../types/auth.types"

export const setLogoutLoading = (payload: boolean): IAction<boolean> => ({ type: SET_LOGOUT_LOADING, payload })
export const setLogoutError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_LOGOUT_ERROR, payload })
export const createLogoutAction = (): IAction => ({ type: LOGOUT })

export const setRegisterLoading = (payload: boolean): IAction<boolean> => ({ type: SET_REGISTER_LOADING, payload })
export const setRegisterError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_REGISTER_ERROR, payload })
export const createRegisterAction = (): IAction => ({ type: REGISTER })

export const setLoginLoading = (payload: boolean): IAction<boolean> => ({ type: SET_LOGIN_LOADING, payload })
export const setLoginError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_LOGIN_ERROR, payload })
export const createLoginAction = (data: ILoginCredentials | TokenType, remember: boolean = true) => async (dispatch: Dispatch<IAction>) => {
    
    try {
        dispatch(setLoginLoading(true))

        if (typeof data === 'string') {
            dispatch({ type: LOGIN, payload: data })
        } else if (data?.login && data?.password) {
            const { login, password } = data
            const response = await requestFormDataAuth('/auth/jwt/login', 'POST', `username=${login}&password=${password}`)

            if (response.detail) {
                throw new Error('Ошибка при входе в систему')
            }

            const token: string = response['access_token']

            dispatch({ type: LOGIN, payload: token })
        }
    } catch (e) {
        dispatch(setLoginError(e instanceof Error ? e.message : String(e)))
    } finally {
        dispatch(setLoginLoading(false))
    }
}