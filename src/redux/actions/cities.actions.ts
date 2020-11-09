import { Dispatch } from "redux"
import { useAuthRequest } from "../../hooks/request.hooks"
import { ICity, IDType } from "../../interfaces/entities.interfaces"
import { IAction } from "../../interfaces/redux.interfaces"
import { ADD_CITY, FETCH_CITIES, REMOVE_CITY, SET_CITIES_FETCHING, SET_CITIES_FETCHING_ERROR, SET_CITY_ADDING, SET_CITY_ADDING_ERROR } from "../types/cities.types"

export const setCitiesFetching = (payload: boolean): IAction<boolean> => ({ type: SET_CITIES_FETCHING, payload })
export const setCitiesFetchingError = (payload: string): IAction<string> => ({ type: SET_CITIES_FETCHING_ERROR, payload })
export const fetchCities = () => async (dispatch: Dispatch) => {
  const { requestJSON } = useAuthRequest()

  try {
    dispatch(setCitiesFetching(true))
    const cities = await requestJSON('/structures/cities')
    dispatch({ type: FETCH_CITIES, payload: cities })
  } catch (e) {
    setCitiesFetchingError(e instanceof Error ? e.message : String(e))
  } finally {
    setCitiesFetching(false)
  }
}

export const setCityAdding = (payload: boolean): IAction<boolean> => ({ type: SET_CITY_ADDING, payload })
export const setCityAddingError = (payload: string): IAction<string> => ({ type: SET_CITY_ADDING_ERROR, payload })
export const addCity = (city: ICity) => async (dispatch: Dispatch) => {
  const { requestJSON } = useAuthRequest()

  try {
    dispatch(setCityAdding(true))
    await requestJSON('/structures/cities', 'POST', city)
    dispatch({ type: ADD_CITY, payload: city })
  } catch (e) {
    setCityAddingError(e instanceof Error ? e.message : String(e))
  } finally {
    setCityAdding(false)
  }
}

export const setCityRemoving = (payload: boolean): IAction<boolean> => ({ type: SET_CITY_ADDING, payload })
export const setCityRemovingError = (payload: string): IAction<string> => ({ type: SET_CITY_ADDING_ERROR, payload })
export const removeCity = (id: IDType) => async (dispatch: Dispatch) => {
  const { requestJSON } = useAuthRequest()

  try {
    dispatch(setCityRemoving(true))
    await requestJSON(`/structures/cities/${id}`, 'DELETE', id)
    dispatch({ type: REMOVE_CITY, payload: id })
  } catch (e) {
    setCityRemovingError(e instanceof Error ? e.message : String(e))
  } finally {
    setCityRemoving(false)
  }
}

export const setCityModifying = (payload: boolean): IAction<boolean> => ({ type: SET_CITY_ADDING, payload })
export const setCityModifyingError = (payload: string): IAction<string> => ({ type: SET_CITY_ADDING_ERROR, payload })
export const modifyCity = (city: ICity) => async (dispatch: Dispatch) => {
  const { requestJSON } = useAuthRequest()

  try {
    dispatch(setCityModifying(true))
    await requestJSON(`/structures/cities/${city.id}`, 'PATCH', city)
    dispatch({ type: REMOVE_CITY, payload: city })
  } catch (e) {
    setCityModifyingError(e instanceof Error ? e.message : String(e))
  } finally {
    setCityModifying(false)
  }
}