import { Dispatch } from "redux"
import { requestJSONAuth } from "../../helpers/request.hepler"
import { ErrorType, IGroup, IDType, INonIDGroup } from "../../interfaces/entities.interfaces"
import { IAction } from "../../interfaces/redux.interfaces"
import { ADD_GROUP, FETCH_GROUPS, MODIFY_GROUP, REMOVE_GROUP, SET_GROUPS_FETCHING, SET_GROUPS_FETCHING_ERROR, SET_GROUP_ADDING, SET_GROUP_ADDING_ERROR, SET_GROUP_REMOVING, SET_GROUP_REMOVING_ERROR } from "../types/groups.types"

export const setGroupsFetching = (payload: boolean): IAction<boolean> => ({ type: SET_GROUPS_FETCHING, payload })
export const setGroupsFetchingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_GROUPS_FETCHING_ERROR, payload })
export const fetchGroups = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setGroupsFetchingError(null))
    dispatch(setGroupsFetching(true))
    const groups: Array<IGroup> = await requestJSONAuth('/structures/groups')

    if (!Array.isArray(groups)) {
      throw new Error('Ошибка при получении списка групп')
    }

    dispatch({ type: FETCH_GROUPS, payload: groups })
  } catch (e) {
    dispatch(setGroupsFetchingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setGroupsFetching(false))
  }
}

export const setGroupAdding = (payload: boolean): IAction<boolean> => ({ type: SET_GROUP_ADDING, payload })
export const setGroupAddingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_GROUP_ADDING_ERROR, payload })
export const addGroup = (city: INonIDGroup) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setGroupAdding(true))
    await requestJSONAuth('/structures/groups', 'POST', city)
    dispatch({ type: ADD_GROUP, payload: city })
    dispatch(fetchGroups())
  } catch (e) {
    dispatch(setGroupAddingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setGroupAdding(false))
  }
}

export const setGroupRemoving = (payload: boolean): IAction<boolean> => ({ type: SET_GROUP_REMOVING, payload })
export const setGroupRemovingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_GROUP_REMOVING_ERROR, payload })
export const removeGroup = (id: IDType | Array<IDType>) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setGroupRemoving(true))

    if (Array.isArray(id)) {
      for (const item of id) {
        await requestJSONAuth(`/structures/groups/${item}`, 'DELETE', item)
        dispatch({ type: REMOVE_GROUP, payload: item })
      }
    } else {
      await requestJSONAuth(`/structures/groups/${id}`, 'DELETE', id)
      dispatch({ type: REMOVE_GROUP, payload: id })
    }

    dispatch(fetchGroups())
  } catch (e) {
    dispatch(setGroupRemovingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setGroupRemoving(false))
  }
}

export const setGroupModifying = (payload: boolean): IAction<boolean> => ({ type: SET_GROUP_ADDING, payload })
export const setGroupModifyingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_GROUP_ADDING_ERROR, payload })
export const modifyGroup = (id: IDType, group: INonIDGroup) => async (dispatch: Dispatch) => {
  try {
    dispatch(setGroupModifying(true))
    const payload: IGroup = await requestJSONAuth(`/structures/groups/${id}`, 'PUT', group)
    dispatch({ type: MODIFY_GROUP, payload })
  } catch (e) {
    dispatch(setGroupModifyingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setGroupModifying(false))
  }
}