import { Dispatch } from "redux"
import { requestJSONAuth } from "../../helpers/request.hepler"
import { ErrorType, ICoach, IDType, INonIDCoach } from "../../interfaces/entities.interfaces"
import { IAction } from "../../interfaces/redux.interfaces"
import { ADD_COACH, FETCH_COACHES, MODIFY_COACH, REMOVE_COACH, SET_COACHES_FETCHING, SET_COACHES_FETCHING_ERROR, SET_COACH_ADDING, SET_COACH_ADDING_ERROR, SET_COACH_REMOVING, SET_COACH_REMOVING_ERROR } from "../types/coaches.types"

export const setCoachesFetching = (payload: boolean): IAction<boolean> => ({ type: SET_COACHES_FETCHING, payload })
export const setCoachesFetchingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_COACHES_FETCHING_ERROR, payload })
export const fetchCoaches = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setCoachesFetchingError(null))
    dispatch(setCoachesFetching(true))
    const coaches: Array<ICoach> = await requestJSONAuth('/persons/trainer')

    if (!Array.isArray(coaches)) {
      throw new Error('Ошибка при получении списка школ')
    }

    dispatch({ type: FETCH_COACHES, payload: coaches })
  } catch (e) {
    dispatch(setCoachesFetchingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setCoachesFetching(false))
  }
}

export const setCoachAdding = (payload: boolean): IAction<boolean> => ({ type: SET_COACH_ADDING, payload })
export const setCoachAddingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_COACH_ADDING_ERROR, payload })
export const addCoach = (city: INonIDCoach) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setCoachAdding(true))
    console.log(city)
    await requestJSONAuth('/persons/trainer', 'POST', city)
    dispatch({ type: ADD_COACH, payload: city })
    dispatch(fetchCoaches())
  } catch (e) {
    dispatch(setCoachAddingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setCoachAdding(false))
  }
}

export const setCoachRemoving = (payload: boolean): IAction<boolean> => ({ type: SET_COACH_REMOVING, payload })
export const setCoachRemovingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_COACH_REMOVING_ERROR, payload })
export const removeCoach = (id: IDType | Array<IDType>) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setCoachRemoving(true))

    if (Array.isArray(id)) {
      for (const item of id) {
        await requestJSONAuth(`/persons/trainer/${item}`, 'DELETE', item)
        dispatch({ type: REMOVE_COACH, payload: item })
      }
    } else {
      await requestJSONAuth(`/persons/trainer/${id}`, 'DELETE', id)
      dispatch({ type: REMOVE_COACH, payload: id })
    }

    dispatch(fetchCoaches())
  } catch (e) {
    dispatch(setCoachRemovingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setCoachRemoving(false))
  }
}

export const setCoachModifying = (payload: boolean): IAction<boolean> => ({ type: SET_COACH_ADDING, payload })
export const setCoachModifyingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_COACH_ADDING_ERROR, payload })
export const modifyCoach = (id: IDType, coach: INonIDCoach) => async (dispatch: Dispatch) => {
  try {
    dispatch(setCoachModifying(true))
    const payload: ICoach = await requestJSONAuth(`/persons/trainer/${id}`, 'PUT', coach)
    dispatch({ type: MODIFY_COACH, payload })
  } catch (e) {
    dispatch(setCoachModifyingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setCoachModifying(false))
  }
}