import { Dispatch } from "redux"
import { requestJSONAuth } from "../../helpers/request.hepler"
import { ErrorType, ICity, IDType, INonIDCity } from "../../interfaces/entities.interfaces"
import { IAction } from "../../interfaces/redux.interfaces"
import { ADD_CITY, FETCH_CITIES, REMOVE_CITY, SET_CITIES_FETCHING, SET_CITIES_FETCHING_ERROR, SET_CITY_ADDING, SET_CITY_ADDING_ERROR, SET_CITY_REMOVING, SET_CITY_REMOVING_ERROR } from "../types/cities.types"

export const setCitiesFetching = (payload: boolean): IAction<boolean> => ({ type: SET_CITIES_FETCHING, payload })
export const setCitiesFetchingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_CITIES_FETCHING_ERROR, payload })
export const fetchCities = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setCitiesFetchingError(null))
    dispatch(setCitiesFetching(true))
    const cities: Array<ICity> = await requestJSONAuth('/structures/cities')

    if (!Array.isArray(cities)) {
      throw new Error('Ошибка при получении списка городов')
    }

    dispatch({ type: FETCH_CITIES, payload: cities })
  } catch (e) {
    dispatch(setCitiesFetchingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setCitiesFetching(false))
  }
}

export const setCityAdding = (payload: boolean): IAction<boolean> => ({ type: SET_CITY_ADDING, payload })
export const setCityAddingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_CITY_ADDING_ERROR, payload })
export const addCity = (city: INonIDCity) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setCityAdding(true))
    await requestJSONAuth('/structures/cities', 'POST', city)
    dispatch({ type: ADD_CITY, payload: city })
    dispatch(fetchCities())
  } catch (e) {
    dispatch(setCityAddingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setCityAdding(false))
  }
}

export const setCityRemoving = (payload: boolean): IAction<boolean> => ({ type: SET_CITY_REMOVING, payload })
export const setCityRemovingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_CITY_REMOVING_ERROR, payload })
export const removeCity = (id: IDType | Array<IDType>) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setCityRemoving(true))

    if (Array.isArray(id)) {
      for (const item of id) {
        await requestJSONAuth(`/structures/cities/${item}`, 'DELETE', item)
        dispatch({ type: REMOVE_CITY, payload: item })
      }
    } else {
      await requestJSONAuth(`/structures/cities/${id}`, 'DELETE', id)
      dispatch({ type: REMOVE_CITY, payload: id })
    }

    dispatch(fetchCities())
  } catch (e) {
    dispatch(setCityRemovingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setCityRemoving(false))
  }
}

export const setCityModifying = (payload: boolean): IAction<boolean> => ({ type: SET_CITY_ADDING, payload })
export const setCityModifyingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_CITY_ADDING_ERROR, payload })
export const modifyCity = (city: INonIDCity) => async (dispatch: Dispatch) => {
  try {
    dispatch(setCityModifying(true))
    await requestJSONAuth(`/structures/cities/${city.id}`, 'PUT', city)
    dispatch({ type: REMOVE_CITY, payload: city })
  } catch (e) {
    dispatch(setCityModifyingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setCityModifying(false))
  }
}