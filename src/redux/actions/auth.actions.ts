import { Dispatch } from "redux"
import { useRequest } from "../../hooks/request.hooks"
import { ErrorType, ILoginCredentials } from "../../interfaces/entities.interfaces"
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
export const createLoginAction = ({ login, password }: ILoginCredentials) => async (dispatch: Dispatch<IAction>) => {
    const { requestJSON } = useRequest()

    try {
        dispatch(setRegisterLoading(true))
        const user = await requestJSON('/auth/register', 'POST', { email: login, password })
        console.log(user)
        dispatch({ type: LOGIN, payload: user })
    } catch (e) {
        dispatch(setRegisterError(e instanceof Error ? e.message : String(e)))
    } finally {
        dispatch(setRegisterLoading(false))
    }
}