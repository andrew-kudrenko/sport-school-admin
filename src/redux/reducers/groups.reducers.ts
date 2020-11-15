import { IGroup } from "../../interfaces/entities.interfaces"
import { ReducerType, IStatePartial, defaultCRUDErrorState, defaultCRUDLoadingState } from "../../interfaces/redux.interfaces"
import { ADD_GROUP, FETCH_GROUPS, MODIFY_GROUP, REMOVE_GROUP, SET_GROUPS_FETCHING, SET_GROUPS_FETCHING_ERROR, SET_GROUP_ADDING, SET_GROUP_ADDING_ERROR, SET_GROUP_MODIFYING, SET_GROUP_MODIFYING_ERROR, SET_GROUP_REMOVING, SET_GROUP_REMOVING_ERROR } from "../types/groups.types"

const initialState: IStatePartial<IGroup> = { list: [], loading: defaultCRUDLoadingState, error: defaultCRUDErrorState }

export const groupsReducer: ReducerType<IStatePartial<IGroup>> = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_GROUPS: return { ...state, list: payload }
        case SET_GROUPS_FETCHING: return { ...state, loading: { ...state.loading, read: payload } }
        case SET_GROUPS_FETCHING_ERROR: return { ...state, error: { ...state.error, read: payload } }

        case ADD_GROUP: return { ...state, list: state.list.concat(payload) }
        case SET_GROUP_ADDING: return { ...state, loading: { ...state.loading, create: payload } }
        case SET_GROUP_ADDING_ERROR: return { ...state, error: { ...state.error, create: payload } }

        case REMOVE_GROUP: return { ...state, list: state.list.filter(c => c.id !== payload) }
        case SET_GROUP_REMOVING: return { ...state, loading: { ...state.loading, delete: payload } }
        case SET_GROUP_REMOVING_ERROR: return { ...state, error: { ...state.error, delete: payload } }

        case MODIFY_GROUP: return { ...state, list: state.list.map(c => c.id !== payload.id ? c : { ...c, ...payload }) }
        case SET_GROUP_MODIFYING: return { ...state, loading: { ...state.loading, update: payload } }
        case SET_GROUP_MODIFYING_ERROR: return { ...state, error: { ...state.error, update: payload } }

        default: return state
    }
}