import { IUser } from "../../interfaces/entities.interfaces"
import { ReducerType, IStatePartial, defaultCRUDErrorState, defaultCRUDLoadingState } from "../../interfaces/redux.interfaces"
import { ADD_USER, FETCH_USERS, MODIFY_USER, REMOVE_USER, SET_USERS_FETCHING, SET_USERS_FETCHING_ERROR, SET_USER_ADDING, SET_USER_ADDING_ERROR, SET_USER_MODIFYING, SET_USER_MODIFYING_ERROR, SET_USER_REMOVING, SET_USER_REMOVING_ERROR } from "../types/users.types"

const initialState: IStatePartial<IUser> = { list: [], loading: defaultCRUDLoadingState, error: defaultCRUDErrorState }

export const usersReducer: ReducerType<IStatePartial<IUser>> = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_USERS: return { ...state, list: payload }
        case SET_USERS_FETCHING: return { ...state, loading: { ...state.loading, read: payload } }
        case SET_USERS_FETCHING_ERROR: return { ...state, error: { ...state.error, read: payload } }

        case ADD_USER: return { ...state, list: state.list.concat(payload) }
        case SET_USER_ADDING: return { ...state, loading: { ...state.loading, create: payload } }
        case SET_USER_ADDING_ERROR: return { ...state, error: { ...state.error, create: payload } }

        case REMOVE_USER: return { ...state, list: state.list.filter(c => c.id.toString() !== payload) }
        case SET_USER_REMOVING: return { ...state, loading: { ...state.loading, delete: payload } }
        case SET_USER_REMOVING_ERROR: return { ...state, error: { ...state.error, delete: payload } }

        case MODIFY_USER: return { ...state, list: state.list.map(c => c.id !== payload.id ? c : { ...c, ...payload }) }
        case SET_USER_MODIFYING: return { ...state, loading: { ...state.loading, update: payload } }
        case SET_USER_MODIFYING_ERROR: return { ...state, error: { ...state.error, update: payload } }

        default: return state
    }
}