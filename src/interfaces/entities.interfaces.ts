export type IDType = string | number

export type ErrorType = string | null

export interface ICity {
  id?: IDType
  name: string
}

export interface ISchool {
  id?: IDType
  name: string
  address: string
  description: string
  cityId: IDType
}

export interface IGroup {
  id?: IDType
  year: number
  schedule: string
  tgUrl: string
  schoolId: IDType
}

export interface IUser {
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