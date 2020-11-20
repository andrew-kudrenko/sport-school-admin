export type IDType = string

export type ErrorType = string | null

export interface IdentifiedEntity {
  id: IDType
}

export interface ICity extends INonIDCity {
  id: IDType
}

export interface INonIDCity {
  id?: IDType | undefined
  name: string
}

export interface ISchool extends INonIDSchool {
  id: IDType
}

export interface INonIDSchool {
  id?: IDType
  name: string
  address: string
  description: string
  city_id: IDType
}

export interface IGroup extends INonIDGroup {
  id: IDType
}

export interface INonIDGroup {
  id?: IDType
  year: number
  schedule: string
  tg_url: string
  school_id: IDType
}

export interface ICoach extends INonIDGroup {
  id: IDType
}

export interface INonIDCoach {
  id?: IDType
}

export interface INews extends INonIDNews {
  id: IDType
}

export interface INonIDNews {
  id?: IDType
  author_id: string
  text: string
  img: string
}

export interface ICoach extends INonIDCoach {
  id: IDType
}

export interface INonIDCoach {
  id?: IDType
  name: string
  user_id: string
  dob: string
  description: string
  address: string
  tel: string
  group_id: Array<IDType>
  city_id: IDType
}

export interface INonIDUser {
  id?: IDType
  login: string
  name: string
  is_trainer: boolean
  is_child: boolean
  is_verify: boolean
  was_activate: boolean
  city_id: IDType
  address: string
  tel: string
  date_joined: string
  school_id: IDType
}

export interface IStudent extends INonIDStudent {
  id: IDType
}

export interface INonIDStudent {
  id?: IDType
  img: string
  name: string
  dob: string
  address: string
  group_id: IDType
  parents_id: Array<IDType>
}

export interface INonIDStatistics {
  id?: IDType
  children_id: string
  date: string
  file: string
}

export interface IStatistics extends INonIDStatistics {
  id: IDType
}

export interface INonIDTournament {
  id?: IDType
  author_id: IDType
  text: string
  year: number
  img: string
}

export interface ITournament extends INonIDTournament {
  id: IDType
}

export interface IStatistics extends INonIDStatistics {
  id: IDType
}

export interface IUser extends INonIDUser {
  id: IDType
}

export interface INonIDUser {
  id?: IDType
  login: string
  name: string
  is_trainer: boolean
  is_child: boolean
  is_verify: boolean
  was_activate: boolean
  city_id: IDType
  address: string
  tel: string
  date_joined: string
  school_id: IDType
  childs_id: Array<IDType>
}

export interface ILoginCredentials {
    login: string
    password: string
}

export interface ICachedUserData {
  login?: string
  token?: string
}

export type TokenType = string