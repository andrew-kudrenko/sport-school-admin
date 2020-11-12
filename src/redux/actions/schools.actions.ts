import { Dispatch } from "redux"
import { requestJSONAuth } from "../../helpers/request.hepler"
import { ErrorType, ISchool, IDType, INonIDSchool } from "../../interfaces/entities.interfaces"
import { IAction } from "../../interfaces/redux.interfaces"
import { ADD_SCHOOL, FETCH_SCHOOLS, REMOVE_SCHOOL, SET_SCHOOLS_FETCHING, SET_SCHOOLS_FETCHING_ERROR, SET_SCHOOL_ADDING, SET_SCHOOL_ADDING_ERROR, SET_SCHOOL_REMOVING, SET_SCHOOL_REMOVING_ERROR } from "../types/schools.types"

export const setSchoolsFetching = (payload: boolean): IAction<boolean> => ({ type: SET_SCHOOLS_FETCHING, payload })
export const setSchoolsFetchingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_SCHOOLS_FETCHING_ERROR, payload })
export const fetchSchools = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setSchoolsFetchingError(null))
    dispatch(setSchoolsFetching(true))
    
    const schools: Array<ISchool> = await requestJSONAuth('/structures/schools')

    if (!Array.isArray(schools)) {
      throw new Error('Ошибка при получении списка школ')
    }

    dispatch({ type: FETCH_SCHOOLS, payload: schools })
  } catch (e) {
    dispatch(setSchoolsFetchingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setSchoolsFetching(false))
  }
}

export const setSchoolAdding = (payload: boolean): IAction<boolean> => ({ type: SET_SCHOOL_ADDING, payload })
export const setSchoolAddingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_SCHOOL_ADDING_ERROR, payload })
export const addSchool = (city: INonIDSchool) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setSchoolAdding(true))
    const response: ISchool = await requestJSONAuth('/structures/schools', 'POST', city)
    dispatch({ type: ADD_SCHOOL, payload: response })
  } catch (e) {
    dispatch(setSchoolAddingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setSchoolAdding(false))
  }
}

export const setSchoolRemoving = (payload: boolean): IAction<boolean> => ({ type: SET_SCHOOL_REMOVING, payload })
export const setSchoolRemovingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_SCHOOL_REMOVING_ERROR, payload })
export const removeSchool = (id: IDType | Array<IDType>) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setSchoolRemoving(true))

    if (Array.isArray(id)) {
      for (const item of id) {
        await requestJSONAuth(`/structures/schools/${item}`, 'DELETE', item)
        dispatch({ type: REMOVE_SCHOOL, payload: item })
      }
    } else {
      await requestJSONAuth(`/structures/schools/${id}`, 'DELETE', id)
      dispatch({ type: REMOVE_SCHOOL, payload: id })
    }
  } catch (e) {
    dispatch(setSchoolRemovingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setSchoolRemoving(false))
  }
}

export const setSchoolModifying = (payload: boolean): IAction<boolean> => ({ type: SET_SCHOOL_ADDING, payload })
export const setSchoolModifyingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_SCHOOL_ADDING_ERROR, payload })
export const modifySchool = (city: INonIDSchool) => async (dispatch: Dispatch) => {
  try {
    dispatch(setSchoolModifying(true))
    await requestJSONAuth(`/structures/schools/${city.id}`, 'PUT', city)
    dispatch({ type: REMOVE_SCHOOL, payload: city })
  } catch (e) {
    dispatch(setSchoolModifyingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setSchoolModifying(false))
  }
}