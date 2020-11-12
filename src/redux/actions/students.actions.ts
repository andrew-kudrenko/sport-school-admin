import { Dispatch } from "redux"
import { requestJSONAuth } from "../../helpers/request.hepler"
import { ErrorType, IStudent, IDType, INonIDStudent } from "../../interfaces/entities.interfaces"
import { IAction } from "../../interfaces/redux.interfaces"
import { ADD_STUDENT, FETCH_STUDENTS, REMOVE_STUDENT, SET_STUDENTS_FETCHING, SET_STUDENTS_FETCHING_ERROR, SET_STUDENT_ADDING, SET_STUDENT_ADDING_ERROR, SET_STUDENT_REMOVING, SET_STUDENT_REMOVING_ERROR } from "../types/students.types"

export const setStudentsFetching = (payload: boolean): IAction<boolean> => ({ type: SET_STUDENTS_FETCHING, payload })
export const setStudentsFetchingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_STUDENTS_FETCHING_ERROR, payload })
export const fetchStudents = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setStudentsFetchingError(null))
    dispatch(setStudentsFetching(true))
    const students: Array<IStudent> = await requestJSONAuth('/structures/students')

    if (!Array.isArray(students)) {
      throw new Error('Ошибка при получении списка учеников')
    }

    dispatch({ type: FETCH_STUDENTS, payload: students })
  } catch (e) {
    dispatch(setStudentsFetchingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setStudentsFetching(false))
  }
}

export const setStudentAdding = (payload: boolean): IAction<boolean> => ({ type: SET_STUDENT_ADDING, payload })
export const setStudentAddingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_STUDENT_ADDING_ERROR, payload })
export const addStudent = (city: INonIDStudent) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setStudentAdding(true))
    await requestJSONAuth('/structures/students', 'POST', city)
    dispatch({ type: ADD_STUDENT, payload: city })
    dispatch(fetchStudents())
  } catch (e) {
    dispatch(setStudentAddingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setStudentAdding(false))
  }
}

export const setStudentRemoving = (payload: boolean): IAction<boolean> => ({ type: SET_STUDENT_REMOVING, payload })
export const setStudentRemovingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_STUDENT_REMOVING_ERROR, payload })
export const removeStudent = (id: IDType | Array<IDType>) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setStudentRemoving(true))

    if (Array.isArray(id)) {
      for (const item of id) {
        await requestJSONAuth(`/structures/students/${item}`, 'DELETE', item)
        dispatch({ type: REMOVE_STUDENT, payload: item })
      }
    } else {
      await requestJSONAuth(`/structures/students/${id}`, 'DELETE', id)
      dispatch({ type: REMOVE_STUDENT, payload: id })
    }

    dispatch(fetchStudents())
  } catch (e) {
    dispatch(setStudentRemovingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setStudentRemoving(false))
  }
}

export const setStudentModifying = (payload: boolean): IAction<boolean> => ({ type: SET_STUDENT_ADDING, payload })
export const setStudentModifyingError = (payload: ErrorType): IAction<ErrorType> => ({ type: SET_STUDENT_ADDING_ERROR, payload })
export const modifyStudent = (city: INonIDStudent) => async (dispatch: Dispatch) => {
  try {
    dispatch(setStudentModifying(true))
    await requestJSONAuth(`/structures/students/${city.id}`, 'PUT', city)
    dispatch({ type: REMOVE_STUDENT, payload: city })
  } catch (e) {
    dispatch(setStudentModifyingError(e instanceof Error ? e.message : String(e)))
  } finally {
    dispatch(setStudentModifying(false))
  }
}