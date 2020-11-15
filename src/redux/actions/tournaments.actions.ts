import { Dispatch } from "redux"
import { requestJSONAuth } from "../../helpers/request.hepler"
import { ErrorType, ITournament, IDType, INonIDTournament } from "../../interfaces/entities.interfaces"
import { IAction } from "../../interfaces/redux.interfaces"
import { ADD_TOURNAMENT, FETCH_TOURNAMENTS, MODIFY_TOURNAMENT, REMOVE_TOURNAMENT, SET_TOURNAMENTS_FETCHING, SET_TOURNAMENTS_FETCHING_ERROR, SET_TOURNAMENT_ADDING, SET_TOURNAMENT_ADDING_ERROR, SET_TOURNAMENT_REMOVING, SET_TOURNAMENT_REMOVING_ERROR } from "../types/tournaments.types"

export const setTournamentsFetching = (payload: boolean): IAction<boolean> => ({ type: SET_TOURNAMENTS_FETCHING, payload })
export const setTournamentsFetchingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_TOURNAMENTS_FETCHING_ERROR, payload })
export const fetchTournaments = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setTournamentsFetchingError(null))
    dispatch(setTournamentsFetching(true))
    const tournaments: Array<ITournament> = await requestJSONAuth('/structures/tournaments')

    if (!Array.isArray(tournaments)) {
      throw new Error('Ошибка при получении списка турниров')
    }

    dispatch({ type: FETCH_TOURNAMENTS, payload: tournaments })
  } catch (e) {
    dispatch(setTournamentsFetchingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setTournamentsFetching(false))
  }
}

export const setTournamentAdding = (payload: boolean): IAction<boolean> => ({ type: SET_TOURNAMENT_ADDING, payload })
export const setTournamentAddingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_TOURNAMENT_ADDING_ERROR, payload })
export const addTournament = (city: INonIDTournament) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setTournamentAdding(true))
    await requestJSONAuth('/structures/tournaments', 'POST', city)
    dispatch({ type: ADD_TOURNAMENT, payload: city })
    dispatch(fetchTournaments())
  } catch (e) {
    dispatch(setTournamentAddingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setTournamentAdding(false))
  }
}

export const setTournamentRemoving = (payload: boolean): IAction<boolean> => ({ type: SET_TOURNAMENT_REMOVING, payload })
export const setTournamentRemovingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_TOURNAMENT_REMOVING_ERROR, payload })
export const removeTournament = (id: IDType | Array<IDType>) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setTournamentRemoving(true))

    if (Array.isArray(id)) {
      for (const item of id) {
        await requestJSONAuth(`/structures/tournaments/${item}`, 'DELETE', item)
        dispatch({ type: REMOVE_TOURNAMENT, payload: item })
      }
    } else {
      await requestJSONAuth(`/structures/tournaments/${id}`, 'DELETE', id)
      dispatch({ type: REMOVE_TOURNAMENT, payload: id })
    }

    dispatch(fetchTournaments())
  } catch (e) {
    dispatch(setTournamentRemovingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setTournamentRemoving(false))
  }
}

export const setTournamentModifying = (payload: boolean): IAction<boolean> => ({ type: SET_TOURNAMENT_ADDING, payload })
export const setTournamentModifyingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_TOURNAMENT_ADDING_ERROR, payload })
export const modifyTournament = (tournament: INonIDTournament) => async (dispatch: Dispatch) => {
  try {
    dispatch(setTournamentModifying(true))
    const payload: ITournament = await requestJSONAuth(`/structures/tournaments/${tournament.id}`, 'PUT', tournament)
    dispatch({ type: MODIFY_TOURNAMENT, payload })
  } catch (e) {
    dispatch(setTournamentModifyingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setTournamentModifying(false))
  }
}