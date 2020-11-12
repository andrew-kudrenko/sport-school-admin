import { IStatistics } from "../../interfaces/entities.interfaces"
import { ReducerType, IStatePartial, defaultCRUDErrorState, defaultCRUDLoadingState } from "../../interfaces/redux.interfaces"
import { ADD_STATISTICS, FETCH_STATISTICS, MODIFY_STATISTICS, REMOVE_STATISTICS, SET_STATISTICS_FETCHING, SET_STATISTICS_FETCHING_ERROR, SET_STATISTICS_ADDING, SET_STATISTICS_ADDING_ERROR, SET_STATISTICS_MODIFYING, SET_STATISTICS_MODIFYING_ERROR, SET_STATISTICS_REMOVING, SET_STATISTICS_REMOVING_ERROR } from "../types/statistics.types"

const initialState: IStatePartial<IStatistics> = { list: [], loading: defaultCRUDLoadingState, error: defaultCRUDErrorState }

export const statisticsReducer: ReducerType<IStatePartial<IStatistics>> = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_STATISTICS: return { ...state, list: payload }
        case SET_STATISTICS_FETCHING: return { ...state, loading: { ...state.loading, read: payload } }
        case SET_STATISTICS_FETCHING_ERROR: return { ...state, error: { ...state.error, read: payload } }

        case ADD_STATISTICS: return { ...state, list: state.list.concat(payload) }
        case SET_STATISTICS_ADDING: return { ...state, loading: { ...state.loading, create: payload } }
        case SET_STATISTICS_ADDING_ERROR: return { ...state, error: { ...state.error, create: payload } }

        case REMOVE_STATISTICS: return { ...state, list: state.list.filter(c => c.id !== payload) }
        case SET_STATISTICS_REMOVING: return { ...state, loading: { ...state.loading, delete: payload } }
        case SET_STATISTICS_REMOVING_ERROR: return { ...state, error: { ...state.error, delete: payload } }

        case MODIFY_STATISTICS: return { ...state, list: state.list.filter(c => c.id !== payload.id).concat(payload) }
        case SET_STATISTICS_MODIFYING: return { ...state, loading: { ...state.loading, update: payload } }
        case SET_STATISTICS_MODIFYING_ERROR: return { ...state, error: { ...state.error, update: payload } }

        default: return state
    }
}