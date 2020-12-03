import { useSelector } from "react-redux"
import { IState } from "../interfaces/redux.interfaces"

export function useRole() {
  const { user } = useSelector((state: IState) => state.auth)

  const isSuperAdmin: boolean = !!user?.is_superuser
  const isStaff: boolean = !!user?.is_staff

  return { isStaff, isSuperAdmin, city_id: user?.city_id }
}