import { INews } from "../../interfaces/entities.interfaces"
import { ReducerType, IStatePartial, defaultCRUDErrorState, defaultCRUDLoadingState } from "../../interfaces/redux.interfaces"
import { ADD_NEWS, FETCH_NEWS, MODIFY_NEWS, REMOVE_NEWS, SET_NEWS_FETCHING, SET_NEWS_FETCHING_ERROR, SET_NEWS_ADDING, SET_NEWS_ADDING_ERROR, SET_NEWS_MODIFYING, SET_NEWS_MODIFYING_ERROR, SET_NEWS_REMOVING, SET_NEWS_REMOVING_ERROR } from "../types/news.types"

const initialState: IStatePartial<INews> = { list: [], loading: defaultCRUDLoadingState, error: defaultCRUDErrorState }

export const newsReducer: ReducerType<IStatePartial<INews>> = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_NEWS: return { ...state, list: payload }
        case SET_NEWS_FETCHING: return { ...state, loading: { ...state.loading, read: payload } }
        case SET_NEWS_FETCHING_ERROR: return { ...state, error: { ...state.error, read: payload } }

        case ADD_NEWS: return { ...state, list: state.list.concat(payload) }
        case SET_NEWS_ADDING: return { ...state, loading: { ...state.loading, create: payload } }
        case SET_NEWS_ADDING_ERROR: return { ...state, error: { ...state.error, create: payload } }

        case REMOVE_NEWS: return { ...state, list: state.list.filter(c => c.id.toString() !== payload) }
        case SET_NEWS_REMOVING: return { ...state, loading: { ...state.loading, delete: payload } }
        case SET_NEWS_REMOVING_ERROR: return { ...state, error: { ...state.error, delete: payload } }

        case MODIFY_NEWS: return { ...state, list: state.list.map(c => c.id !== payload.id ? c : { ...c, ...payload }) }
        case SET_NEWS_MODIFYING: return { ...state, loading: { ...state.loading, update: payload } }
        case SET_NEWS_MODIFYING_ERROR: return { ...state, error: { ...state.error, update: payload } }

        default: return state
    }
}