import { Dispatch } from "redux"
import { requestJSONAuth } from "../../helpers/request.hepler"
import { ICity, IDType, INonIDCity } from "../../interfaces/entities.interfaces"
import { IAction } from "../../interfaces/redux.interfaces"
import { ADD_CITY, FETCH_CITIES, REMOVE_CITY, SET_CITIES_FETCHING, SET_CITIES_FETCHING_ERROR, SET_CITY_ADDING, SET_CITY_ADDING_ERROR } from "../types/cities.types"

export const setCitiesFetching = (payload: boolean): IAction<boolean> => ({ type: SET_CITIES_FETCHING, payload })
export const setCitiesFetchingError = (payload: string): IAction<string> => ({ type: SET_CITIES_FETCHING_ERROR, payload })
export const fetchCities = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setCitiesFetching(true))
    const cities: Array<ICity> = await requestJSONAuth('/structures/cities')
    dispatch({ type: FETCH_CITIES, payload: cities })
  } catch (e) {
    dispatch(setCitiesFetchingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setCitiesFetching(false))
  }
}

export const setCityAdding = (payload: boolean): IAction<boolean> => ({ type: SET_CITY_ADDING, payload })
export const setCityAddingError = (payload: string): IAction<string> => ({ type: SET_CITY_ADDING_ERROR, payload })
export const addCity = (city: INonIDCity) => async (dispatch: Dispatch) => {
  try {
    dispatch(setCityAdding(true))
    await requestJSONAuth('/structures/cities', 'POST', city)
    dispatch({ type: ADD_CITY, payload: city })
    dispatch({ type: FETCH_CITIES })
  } catch (e) {
    dispatch(setCityAddingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setCityAdding(false))
  }
}

export const setCityRemoving = (payload: boolean): IAction<boolean> => ({ type: SET_CITY_ADDING, payload })
export const setCityRemovingError = (payload: string): IAction<string> => ({ type: SET_CITY_ADDING_ERROR, payload })
export const removeCity = (id: IDType) => async (dispatch: Dispatch) => {
  try {
    dispatch(setCityRemoving(true))
    await requestJSONAuth(`/structures/cities/${id}`, 'DELETE', id)
    dispatch({ type: REMOVE_CITY, payload: id })
  } catch (e) {
    dispatch(setCityRemovingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setCityRemoving(false))
  }
}

export const setCityModifying = (payload: boolean): IAction<boolean> => ({ type: SET_CITY_ADDING, payload })
export const setCityModifyingError = (payload: string): IAction<string> => ({ type: SET_CITY_ADDING_ERROR, payload })
export const modifyCity = (city: INonIDCity) => async (dispatch: Dispatch) => {
  try {
    dispatch(setCityModifying(true))
    await requestJSONAuth(`/structures/cities/${city.id}`, 'PATCH', city)
    dispatch({ type: REMOVE_CITY, payload: city })
  } catch (e) {
    dispatch(setCityModifyingError(e instanceof Error ? e.message : String(e)))
  } finally {
    (setCityModifying(false))
  }
}