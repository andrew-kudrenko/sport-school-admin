import { ITournament } from "../../interfaces/entities.interfaces"
import { ReducerType, IStatePartial, defaultCRUDErrorState, defaultCRUDLoadingState } from "../../interfaces/redux.interfaces"
import { ADD_TOURNAMENT, FETCH_TOURNAMENTS, MODIFY_TOURNAMENT, REMOVE_TOURNAMENT, SET_TOURNAMENTS_FETCHING, SET_TOURNAMENTS_FETCHING_ERROR, SET_TOURNAMENT_ADDING, SET_TOURNAMENT_ADDING_ERROR, SET_TOURNAMENT_MODIFYING, SET_TOURNAMENT_MODIFYING_ERROR, SET_TOURNAMENT_REMOVING, SET_TOURNAMENT_REMOVING_ERROR } from "../types/tournaments.types"

const initialState: IStatePartial<ITournament> = { list: [], loading: defaultCRUDLoadingState, error: defaultCRUDErrorState }

export const tournamentsReducer: ReducerType<IStatePartial<ITournament>> = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_TOURNAMENTS: return { ...state, list: payload }
        case SET_TOURNAMENTS_FETCHING: return { ...state, loading: { ...state.loading, read: payload } }
        case SET_TOURNAMENTS_FETCHING_ERROR: return { ...state, error: { ...state.error, read: payload } }

        case ADD_TOURNAMENT: return { ...state, list: state.list.concat(payload) }
        case SET_TOURNAMENT_ADDING: return { ...state, loading: { ...state.loading, create: payload } }
        case SET_TOURNAMENT_ADDING_ERROR: return { ...state, error: { ...state.error, create: payload } }

        case REMOVE_TOURNAMENT: return { ...state, list: state.list.filter(c => c.id !== payload) }
        case SET_TOURNAMENT_REMOVING: return { ...state, loading: { ...state.loading, delete: payload } }
        case SET_TOURNAMENT_REMOVING_ERROR: return { ...state, error: { ...state.error, delete: payload } }

        case MODIFY_TOURNAMENT: return { ...state, list: state.list.map(c => c.id !== payload.id ? c : { ...c, ...payload }) }
        case SET_TOURNAMENT_MODIFYING: return { ...state, loading: { ...state.loading, update: payload } }
        case SET_TOURNAMENT_MODIFYING_ERROR: return { ...state, error: { ...state.error, update: payload } }

        default: return state
    }
}