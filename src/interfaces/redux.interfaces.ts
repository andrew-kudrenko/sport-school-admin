import { Action } from "redux"
import { ErrorType, ICity, ICoach, IdentifiedEntity, IDType, IGroup, INews, ISchool, IStatistics, IStudent, ITournament, IUser } from "./entities.interfaces"

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
  user: { is_superuser: boolean, is_staff: boolean, city_id: IDType } & IdentifiedEntity | null
  token: string | null
  login: string | null
  authorized: boolean
  loading: IAuthActions<boolean>
  error: IAuthActions<ErrorType>
}

export enum Themes {
  Dark,
  Light
}

export interface IThemeState {
  theme: Themes
}

export interface IState {
  auth: IAuthState
  themes: IThemeState
}
