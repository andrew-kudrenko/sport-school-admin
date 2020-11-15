import { IStudent } from "../../interfaces/entities.interfaces"
import { ReducerType, IStatePartial, defaultCRUDErrorState, defaultCRUDLoadingState } from "../../interfaces/redux.interfaces"
import { ADD_STUDENT, FETCH_STUDENTS, MODIFY_STUDENT, REMOVE_STUDENT, SET_STUDENTS_FETCHING, SET_STUDENTS_FETCHING_ERROR, SET_STUDENT_ADDING, SET_STUDENT_ADDING_ERROR, SET_STUDENT_MODIFYING, SET_STUDENT_MODIFYING_ERROR, SET_STUDENT_REMOVING, SET_STUDENT_REMOVING_ERROR } from "../types/students.types"

const initialState: IStatePartial<IStudent> = { list: [], loading: defaultCRUDLoadingState, error: defaultCRUDErrorState }

export const studentsReducer: ReducerType<IStatePartial<IStudent>> = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_STUDENTS: return { ...state, list: payload }
        case SET_STUDENTS_FETCHING: return { ...state, loading: { ...state.loading, read: payload } }
        case SET_STUDENTS_FETCHING_ERROR: return { ...state, error: { ...state.error, read: payload } }

        case ADD_STUDENT: return { ...state, list: state.list.concat(payload) }
        case SET_STUDENT_ADDING: return { ...state, loading: { ...state.loading, create: payload } }
        case SET_STUDENT_ADDING_ERROR: return { ...state, error: { ...state.error, create: payload } }

        case REMOVE_STUDENT: return { ...state, list: state.list.filter(c => c.id !== payload) }
        case SET_STUDENT_REMOVING: return { ...state, loading: { ...state.loading, delete: payload } }
        case SET_STUDENT_REMOVING_ERROR: return { ...state, error: { ...state.error, delete: payload } }

        case MODIFY_STUDENT: return { ...state, list: state.list.map(c => c.id !== payload.id ? c : { ...c, ...payload }) }
        case SET_STUDENT_MODIFYING: return { ...state, loading: { ...state.loading, update: payload } }
        case SET_STUDENT_MODIFYING_ERROR: return { ...state, error: { ...state.error, update: payload } }

        default: return state
    }
}