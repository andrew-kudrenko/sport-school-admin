import { Dispatch } from "redux"
import { requestJSONAuth } from "../../helpers/request.hepler"
import { ErrorType, IStatistics, IDType, INonIDStatistics } from "../../interfaces/entities.interfaces"
import { IAction } from "../../interfaces/redux.interfaces"
import { ADD_STATISTICS, FETCH_STATISTICS, REMOVE_STATISTICS, SET_STATISTICS_FETCHING, SET_STATISTICS_FETCHING_ERROR, SET_STATISTICS_ADDING, SET_STATISTICS_ADDING_ERROR, SET_STATISTICS_REMOVING, SET_STATISTICS_REMOVING_ERROR, MODIFY_STATISTICS } from "../types/statistics.types"

export const setStatisticsFetching = (payload: boolean): IAction<boolean> => ({ type: SET_STATISTICS_FETCHING, payload })
export const setStatisticsFetchingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_STATISTICS_FETCHING_ERROR, payload })
export const fetchStatistics = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setStatisticsFetchingError(null))
    dispatch(setStatisticsFetching(true))
    const statictics: Array<IStatistics> = await requestJSONAuth('/persons/stats')

    if (!Array.isArray(statictics)) {
      throw new Error('Ошибка при получении статистических данных')
    }

    dispatch({ type: FETCH_STATISTICS, payload: statictics })
  } catch (e) {
    dispatch(setStatisticsFetchingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setStatisticsFetching(false))
  }
}

export const setStatisticsAdding = (payload: boolean): IAction<boolean> => ({ type: SET_STATISTICS_ADDING, payload })
export const setStatisticsAddingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_STATISTICS_ADDING_ERROR, payload })
export const addStatistics = (city: INonIDStatistics) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setStatisticsAdding(true))
    await requestJSONAuth('/persons/stats', 'POST', city)
    dispatch({ type: ADD_STATISTICS, payload: city })
    dispatch(fetchStatistics())
  } catch (e) {
    dispatch(setStatisticsAddingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setStatisticsAdding(false))
  }
}

export const setStatisticsRemoving = (payload: boolean): IAction<boolean> => ({ type: SET_STATISTICS_REMOVING, payload })
export const setStatisticsRemovingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_STATISTICS_REMOVING_ERROR, payload })
export const removeStatistics = (id: IDType | Array<IDType>) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setStatisticsRemoving(true))

    if (Array.isArray(id)) {
      for (const item of id) {
        await requestJSONAuth(`/persons/stats/${item}`, 'DELETE', item)
        dispatch({ type: REMOVE_STATISTICS, payload: item })
      }
    } else {
      await requestJSONAuth(`/persons/stats/${id}`, 'DELETE', id)
      dispatch({ type: REMOVE_STATISTICS, payload: id })
    }

    dispatch(fetchStatistics())
  } catch (e) {
    dispatch(setStatisticsRemovingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setStatisticsRemoving(false))
  }
}

export const setStatisticsModifying = (payload: boolean): IAction<boolean> => ({ type: SET_STATISTICS_ADDING, payload })
export const setStatisticsModifyingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_STATISTICS_ADDING_ERROR, payload })
export const modifyStatistics = (id: IDType, statistics: INonIDStatistics) => async (dispatch: Dispatch) => {
  try {
    dispatch(setStatisticsModifying(true))
    const payload: IStatistics = await requestJSONAuth(`/persons/stats/${id}`, 'PUT', statistics)
    dispatch({ type: MODIFY_STATISTICS, payload })
  } catch (e) {
    dispatch(setStatisticsModifyingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setStatisticsModifying(false))
  }
}