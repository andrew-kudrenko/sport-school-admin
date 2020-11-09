import { ICity } from "../../interfaces/entities.interfaces"
import { ReducerType, IStatePartial, defaultCRUDErrorState, defaultCRUDLoadingState } from "../../interfaces/redux.interfaces"
import { ADD_CITY, FETCH_CITIES, MODIFY_CITY, REMOVE_CITY, SET_CITIES_FETCHING, SET_CITIES_FETCHING_ERROR, SET_CITY_ADDING, SET_CITY_ADDING_ERROR, SET_CITY_MODIFYING, SET_CITY_MODIFYING_ERROR, SET_CITY_REMOVING, SET_CITY_REMOVING_ERROR } from "../types/cities.types"

const initialState: IStatePartial<ICity> = { list: [], loading: defaultCRUDLoadingState, error: defaultCRUDErrorState }

export const citiesReducer: ReducerType<IStatePartial<ICity>> = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_CITIES: return { ...state, list: payload }
        case SET_CITIES_FETCHING: return { ...state, loading: { ...state.loading, read: payload } }
        case SET_CITIES_FETCHING_ERROR: return { ...state, error: { ...state.error, read: payload } }

        case ADD_CITY: return { ...state, list: state.list.concat(payload) }
        case SET_CITY_ADDING: return { ...state, loading: { ...state.loading, create: payload } }
        case SET_CITY_ADDING_ERROR: return { ...state, error: { ...state.error, create: payload } }

        case REMOVE_CITY: return { ...state, list: state.list.filter(c => c.id !== payload) }
        case SET_CITY_REMOVING: return { ...state, loading: { ...state.loading, delete: payload } }
        case SET_CITY_REMOVING_ERROR: return { ...state, error: { ...state.error, delete: payload } }

        case MODIFY_CITY: return { ...state, list: state.list.filter(c => c.id !== payload.id).concat(payload) }
        case SET_CITY_MODIFYING: return { ...state, loading: { ...state.loading, update: payload } }
        case SET_CITY_MODIFYING_ERROR: return { ...state, error: { ...state.error, update: payload } }

        default: return state
    }
}