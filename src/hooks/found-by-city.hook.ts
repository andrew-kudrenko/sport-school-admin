import { useSelector } from "react-redux"
import { ICity, ICoach, IGroup, ISchool, IStatistics, IUser } from "../interfaces/entities.interfaces"
import { IState } from "../interfaces/redux.interfaces"
import { useRole } from "./role.hook"

export function useFoundCities(): Array<ICity> {
  const { city_id, isSuperAdmin } = useRole()
  const { list: cities } = useSelector((state: IState) => state.cities)

  if (!isSuperAdmin) {
    return cities.filter(c => c.id === city_id)
  }

  return cities
}

export function useFoundSchools(): Array<ISchool> {
  const { list: schools } = useSelector((state: IState) => state.schools)
  const cities = useFoundCities()
  
  return schools.filter(s => cities.find(c => c.id === s.city_id))
}

export function useFoundGroups(): Array<IGroup> {
  const schools = useFoundSchools()
  const { list: groups } = useSelector((state: IState) => state.groups)

  return groups.filter(g => schools.find(s => s.id === g.school_id))
}

export function useFoundUsers(): Array<IUser> {
  const cities = useFoundCities()
  const { list: users } = useSelector((state: IState) => state.users)

  return users.filter(u => cities.find(c => c.id === u.city_id))
}

export function useFoundCoaches(): Array<ICoach> {
  const cities = useFoundCities()
  const { list: coaches } = useSelector((state: IState) => state.coaches)

  return coaches.filter(coach => cities.find(c => c.id === coach.city_id))
}

export function useFoundStatistics(): Array<IStatistics> {
  const students = useFoundStudents()
  const { list: statistics } = useSelector((state: IState) => state.statistics)

  return statistics.filter(stats => students.find(s => stats.children_id === s.id))
}

export function useFoundStudents() {
  const groups = useFoundGroups()

  const { list: students } = useSelector((state: IState) => state.students)

  return students.filter(s => groups.find(g => g.id === s.group_id))
}
