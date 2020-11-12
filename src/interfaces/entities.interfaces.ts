export type IDType = string | number

export type ErrorType = string | null

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
  cityId: IDType
}

export interface IGroup extends INonIDGroup {
  id: IDType
}


export interface INonIDGroup {
  id?: IDType
  year: number
  schedule: string
  tgUrl: string
  schoolId: IDType
}

export interface IUser extends INonIDUser {
  id: IDType
}

export interface INonIDUser {
  id?: IDType
  email: string
  isActive: boolean
  isSuperUser: boolean
  isStaff: boolean
  cityId: IDType
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