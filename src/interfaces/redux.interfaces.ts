import { Action } from "redux"
import { ErrorType, ICity, ICoach, IGroup, INews, ISchool, IStatistics, IStudent, ITournament } from "./entities.interfaces"

export interface IAction<T = any> extends Action {
  payload?: T
}

export type ReducerType<T, U extends IAction = IAction> = (state: T, action: U) => T

export interface IStatePartial<T> {
  list: Array<T>
  loading: ICRUDActions<boolean>
  error: ICRUDActions<ErrorType>
}

export interface ICRUDActions<T> {
  create: T
  read: T
  update: T
  delete: T
}

export const defaultCRUDErrorState: ICRUDActions<ErrorType> = { create: null, read: null, update: null, delete: null }

export const defaultCRUDLoadingState: ICRUDActions<boolean> = { create: false, read: false, update: false, delete: false }

export interface IAuthActions<T> {
  register: T
  login: T
  logout: T
}

export interface IAuthState {
  token: string | null
  authorized: boolean
  loading: IAuthActions<boolean>
  error: IAuthActions<ErrorType>
}

export interface IState {
  auth: IAuthState
  cities: IStatePartial<ICity>
  coaches: IStatePartial<ICoach>
  groups: IStatePartial<IGroup>
  students: IStatePartial<IStudent>
  statistics: IStatePartial<IStatistics>
  tournaments: IStatePartial<ITournament>
  news: IStatePartial<INews>
  schools: IStatePartial<ISchool>
}
