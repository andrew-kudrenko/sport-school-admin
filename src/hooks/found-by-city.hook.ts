import { ICity, ICoach, IGroup, ISchool, IStatistics, IStudent, IUser } from "../interfaces/entities.interfaces"
import { useGetQuery } from "./query.hook"
import { useRole } from "./role.hook"

export function useFoundCities() {
  const { city_id, isSuperAdmin } = useRole()
  let { value: cities, ...rest } = useGetQuery<Array<ICity>>('structures/cities')

  if (!isSuperAdmin) {
    cities = cities?.filter(c => c.id === city_id) || []
  }

  if (!cities) {
    cities = []
  }

  return { cities, ...rest }
}

export function useFoundSchools() {
  let { value: schools, ...rest } = useGetQuery<Array<ISchool>>('structures/schools')
  const { cities } = useFoundCities()
   
  schools = schools?.filter(s => cities.find(c => c.id === s.city_id)) || []

  return { schools, ...rest }
}

export function useFoundGroups() {
  const { schools } = useFoundSchools()
  let { value: groups, ...rest } = useGetQuery<Array<IGroup>>('persons/groups')

  groups = groups?.filter(g => schools.find(s => s.id === g.school_id)) || []

  return { groups, ...rest }
}

export function useFoundUsers() {
  const { cities } = useFoundCities()
  let { value: users, ...rest } = useGetQuery<Array<IUser>>('tg/users')

  users = users?.filter(u => cities.find(c => c.id === u.city_id)) || []

  return { users, ...rest }
}

export function useFoundCoaches() {
  const { cities } = useFoundCities()
  let { value: coaches, ...rest } = useGetQuery<Array<ICoach>>('persons/trainer')

  coaches = coaches?.filter(coach => cities.find(c => c.id === coach.city_id)) || []

  return { coaches, ...rest }
}

export function useFoundStatistics() {
  const { students } = useFoundStudents()
  let { value: statistics, ...rest } = useGetQuery<Array<IStatistics>>('persons/stats')

  statistics = statistics?.filter(stats => students.find(s => stats.children_id === s.id)) || []

  return { statistics, ...rest }
}

export function useFoundStudents() {
  const { groups } = useFoundGroups()
  let { value: students, ...rest } = useGetQuery<Array<IStudent>>('persons/child')

  students = students?.filter(s => groups.find(g => g.id === s.group_id)) || []

  return { students, ...rest }
}
