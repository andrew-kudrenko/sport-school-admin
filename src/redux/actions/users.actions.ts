import { Dispatch } from "redux"
import { requestJSONAuth } from "../../helpers/request.hepler"
import { ErrorType, IUser, IDType, INonIDUser } from "../../interfaces/entities.interfaces"
import { IAction } from "../../interfaces/redux.interfaces"
import { ADD_USER, FETCH_USERS, MODIFY_USER, REMOVE_USER, SET_USERS_FETCHING, SET_USERS_FETCHING_ERROR, SET_USER_ADDING, SET_USER_ADDING_ERROR, SET_USER_REMOVING, SET_USER_REMOVING_ERROR } from "../types/users.types"

export const setUsersFetching = (payload: boolean): IAction<boolean> => ({ type: SET_USERS_FETCHING, payload })
export const setUsersFetchingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_USERS_FETCHING_ERROR, payload })
export const fetchUsers = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setUsersFetchingError(null))
    dispatch(setUsersFetching(true))
    const users: Array<IUser> = await requestJSONAuth('/tg/users')

    if (!Array.isArray(users)) {
      throw new Error('Ошибка при получении списка групп')
    }

    dispatch({ type: FETCH_USERS, payload: users })
  } catch (e) {
    dispatch(setUsersFetchingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setUsersFetching(false))
  }
}

export const setUserAdding = (payload: boolean): IAction<boolean> => ({ type: SET_USER_ADDING, payload })
export const setUserAddingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_USER_ADDING_ERROR, payload })
export const addUser = (city: INonIDUser) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setUserAdding(true))
    await requestJSONAuth('/tg/users', 'POST', city)
    dispatch({ type: ADD_USER, payload: city })
    dispatch(fetchUsers())
  } catch (e) {
    dispatch(setUserAddingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setUserAdding(false))
  }
}

export const setUserRemoving = (payload: boolean): IAction<boolean> => ({ type: SET_USER_REMOVING, payload })
export const setUserRemovingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_USER_REMOVING_ERROR, payload })
export const removeUser = (id: IDType | Array<IDType>) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setUserRemoving(true))

    if (Array.isArray(id)) {
      for (const item of id) {
        await requestJSONAuth(`/tg/users/${item}`, 'DELETE', item)
        dispatch({ type: REMOVE_USER, payload: item })
      }
    } else {
      await requestJSONAuth(`/tg/users/${id}`, 'DELETE', id)
      dispatch({ type: REMOVE_USER, payload: id })
    }

    dispatch(fetchUsers())
  } catch (e) {
    dispatch(setUserRemovingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setUserRemoving(false))
  }
}

export const setUserModifying = (payload: boolean): IAction<boolean> => ({ type: SET_USER_ADDING, payload })
export const setUserModifyingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_USER_ADDING_ERROR, payload })
export const modifyUser = (id: IDType, user: INonIDUser) => async (dispatch: Dispatch) => {
  try {
    dispatch(setUserModifying(true))
    const payload: IUser = await requestJSONAuth(`/tg/users/${id}`, 'PUT', user)
    dispatch({ type: MODIFY_USER, payload })
  } catch (e) {
    dispatch(setUserModifyingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setUserModifying(false))
  }
}