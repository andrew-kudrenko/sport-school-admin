import { ISchool } from "../../interfaces/entities.interfaces"
import { ReducerType, IStatePartial, defaultCRUDErrorState, defaultCRUDLoadingState } from "../../interfaces/redux.interfaces"
import { ADD_SCHOOL, FETCH_SCHOOLS, MODIFY_SCHOOL, REMOVE_SCHOOL, SET_SCHOOLS_FETCHING, SET_SCHOOLS_FETCHING_ERROR, SET_SCHOOL_ADDING, SET_SCHOOL_ADDING_ERROR, SET_SCHOOL_MODIFYING, SET_SCHOOL_MODIFYING_ERROR, SET_SCHOOL_REMOVING, SET_SCHOOL_REMOVING_ERROR } from "../types/schools.types"

const initialState: IStatePartial<ISchool> = { list: [], loading: defaultCRUDLoadingState, error: defaultCRUDErrorState }

export const schoolsReducer: ReducerType<IStatePartial<ISchool>> = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_SCHOOLS: return { ...state, list: payload }
        case SET_SCHOOLS_FETCHING: return { ...state, loading: { ...state.loading, read: payload } }
        case SET_SCHOOLS_FETCHING_ERROR: return { ...state, error: { ...state.error, read: payload } }

        case ADD_SCHOOL: return { ...state, list: state.list.concat(payload) }
        case SET_SCHOOL_ADDING: return { ...state, loading: { ...state.loading, create: payload } }
        case SET_SCHOOL_ADDING_ERROR: return { ...state, error: { ...state.error, create: payload } }

        case REMOVE_SCHOOL: return { ...state, list: state.list.filter(c => c.id !== payload) }
        case SET_SCHOOL_REMOVING: return { ...state, loading: { ...state.loading, delete: payload } }
        case SET_SCHOOL_REMOVING_ERROR: return { ...state, error: { ...state.error, delete: payload } }

        case MODIFY_SCHOOL: return { ...state, list: state.list.map(c => c.id !== payload.id ? c : { ...c, ...payload }) }
        case SET_SCHOOL_MODIFYING: return { ...state, loading: { ...state.loading, update: payload } }
        case SET_SCHOOL_MODIFYING_ERROR: return { ...state, error: { ...state.error, update: payload } }

        default: return state
    }
}