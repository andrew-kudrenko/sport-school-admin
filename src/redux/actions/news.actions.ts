import { Dispatch } from "redux"
import { requestJSONAuth } from "../../helpers/request.hepler"
import { ErrorType, INews, IDType, INonIDNews } from "../../interfaces/entities.interfaces"
import { IAction } from "../../interfaces/redux.interfaces"
import { ADD_NEWS, FETCH_NEWS, REMOVE_NEWS, SET_NEWS_FETCHING, SET_NEWS_FETCHING_ERROR, SET_NEWS_ADDING, SET_NEWS_ADDING_ERROR, SET_NEWS_REMOVING, SET_NEWS_REMOVING_ERROR } from "../types/news.types"

export const setNewsFetching = (payload: boolean): IAction<boolean> => ({ type: SET_NEWS_FETCHING, payload })
export const setNewsFetchingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_NEWS_FETCHING_ERROR, payload })
export const fetchNews = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setNewsFetchingError(null))
    dispatch(setNewsFetching(true))
    const news: Array<INews> = await requestJSONAuth('/structures/news')

    if (!Array.isArray(news)) {
      throw new Error('Ошибка при получении списка новостей')
    }

    dispatch({ type: FETCH_NEWS, payload: news })
  } catch (e) {
    dispatch(setNewsFetchingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setNewsFetching(false))
  }
}

export const setNewsAdding = (payload: boolean): IAction<boolean> => ({ type: SET_NEWS_ADDING, payload })
export const setNewsAddingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_NEWS_ADDING_ERROR, payload })
export const addNews = (city: INonIDNews) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setNewsAdding(true))
    await requestJSONAuth('/structures/news', 'POST', city)
    dispatch({ type: ADD_NEWS, payload: city })
    dispatch(fetchNews())
  } catch (e) {
    dispatch(setNewsAddingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setNewsAdding(false))
  }
}

export const setNewsRemoving = (payload: boolean): IAction<boolean> => ({ type: SET_NEWS_REMOVING, payload })
export const setNewsRemovingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_NEWS_REMOVING_ERROR, payload })
export const removeNews = (id: IDType | Array<IDType>) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setNewsRemoving(true))

    if (Array.isArray(id)) {
      for (const item of id) {
        await requestJSONAuth(`/structures/news/${item}`, 'DELETE', item)
        dispatch({ type: REMOVE_NEWS, payload: item })
      }
    } else {
      await requestJSONAuth(`/structures/news/${id}`, 'DELETE', id)
      dispatch({ type: REMOVE_NEWS, payload: id })
    }

    dispatch(fetchNews())
  } catch (e) {
    dispatch(setNewsRemovingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setNewsRemoving(false))
  }
}

export const setNewsModifying = (payload: boolean): IAction<boolean> => ({ type: SET_NEWS_ADDING, payload })
export const setNewsModifyingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_NEWS_ADDING_ERROR, payload })
export const modifyNews = (city: INonIDNews) => async (dispatch: Dispatch) => {
  try {
    dispatch(setNewsModifying(true))
    await requestJSONAuth(`/structures/news/${city.id}`, 'PUT', city)
    dispatch({ type: REMOVE_NEWS, payload: city })
  } catch (e) {
    dispatch(setNewsModifyingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setNewsModifying(false))
  }
}