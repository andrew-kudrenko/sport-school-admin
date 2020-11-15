import { ICoach } from "../../interfaces/entities.interfaces"
import { ReducerType, IStatePartial, defaultCRUDErrorState, defaultCRUDLoadingState } from "../../interfaces/redux.interfaces"
import { ADD_COACH, FETCH_COACHES, MODIFY_COACH, REMOVE_COACH, SET_COACHES_FETCHING, SET_COACHES_FETCHING_ERROR, SET_COACH_ADDING, SET_COACH_ADDING_ERROR, SET_COACH_MODIFYING, SET_COACH_MODIFYING_ERROR, SET_COACH_REMOVING, SET_COACH_REMOVING_ERROR } from "../types/coaches.types"

const initialState: IStatePartial<ICoach> = { list: [], loading: defaultCRUDLoadingState, error: defaultCRUDErrorState }

export const coachesReducer: ReducerType<IStatePartial<ICoach>> = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_COACHES: return { ...state, list: payload }
        case SET_COACHES_FETCHING: return { ...state, loading: { ...state.loading, read: payload } }
        case SET_COACHES_FETCHING_ERROR: return { ...state, error: { ...state.error, read: payload } }

        case ADD_COACH: return { ...state, list: state.list.concat(payload) }
        case SET_COACH_ADDING: return { ...state, loading: { ...state.loading, create: payload } }
        case SET_COACH_ADDING_ERROR: return { ...state, error: { ...state.error, create: payload } }

        case REMOVE_COACH: return { ...state, list: state.list.filter(c => c.id.toString() !== payload) }
        case SET_COACH_REMOVING: return { ...state, loading: { ...state.loading, delete: payload } }
        case SET_COACH_REMOVING_ERROR: return { ...state, error: { ...state.error, delete: payload } }

        case MODIFY_COACH: return { ...state, list: state.list.map(c => c.id !== payload.id ? c : { ...c, ...payload }) }
        case SET_COACH_MODIFYING: return { ...state, loading: { ...state.loading, update: payload } }
        case SET_COACH_MODIFYING_ERROR: return { ...state, error: { ...state.error, update: payload } }

        default: return state
    }
}