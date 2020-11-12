export type IDType = string | number

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
}

export interface ICoach extends INonIDGroup {
  id: IDType
}

export interface INonIDCoach {
  id?: IDType
}

export interface IStudent extends INonIDStudent {
  id: IDType
}

export interface INonIDStudent {
  id?: IDType
  email: string
  isActive: boolean
  isSuperUser: boolean
  isStaff: boolean
  cityId: IDType
}

export interface INonIDStatistics {
  id?: IDType
}

export interface IStatistics extends INonIDStatistics {
  id: IDType
}

export interface INonIDTournament {
  id?: IDType
}

export interface ITournament extends INonIDTournament {
  id: IDType
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