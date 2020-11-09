import { ErrorType } from "../../interfaces/entities.interfaces"
import { IAuthState, ReducerType, IAuthActions } from "../../interfaces/redux.interfaces"
import { LOGIN, LOGOUT, REGISTER, SET_LOGIN_ERROR, SET_LOGIN_LOADING, SET_LOGOUT_ERROR, SET_LOGOUT_LOADING, SET_REGISTER_ERROR, SET_REGISTER_LOADING,  } from "../types/auth.types"

const defaultErrorState: IAuthActions<ErrorType> = { register: null, login: null, logout: null }

const defaultLoadingState: IAuthActions<boolean> = { register: false, login: false, logout: false }

const initialState: IAuthState = { 
    authorized: false, 
    token: null, 
    loading: defaultLoadingState, 
    error: defaultErrorState
}

export const authReducer: ReducerType<IAuthState> = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN: return { ...state, authorized: true, token: payload, error: defaultErrorState }
    case REGISTER:
    case LOGOUT: return { ...state, authorized: false, token: null, error: defaultErrorState }
    case SET_LOGIN_LOADING: return { ...state, loading: { ...state.loading, login: payload } }
    case SET_LOGOUT_LOADING: return { ...state, loading: { ...state.loading, logout: payload } }
    case SET_REGISTER_LOADING: return { ...state, loading: { ...state.loading, register: payload } }
    case SET_LOGIN_ERROR: return { ...state, error: { ...state.error, login: payload } }
    case SET_LOGOUT_ERROR: return { ...state, error: { ...state.error, logout: payload } }
    case SET_REGISTER_ERROR: return { ...state, error: { ...state.error, register: payload } }
    default: return state
  }
}