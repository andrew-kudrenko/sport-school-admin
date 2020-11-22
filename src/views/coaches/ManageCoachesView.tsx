import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { useAuth } from '../../hooks/auth.hooks'
import {  IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { ICoach } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { fetchCoaches, removeCoach } from '../../redux/actions/coaches.actions'

const headCells: Array<IHeadCell<ICoach>> = [
    { id: 'name', label: 'ФИО', numeric: false },
    { id: 'user_id', label: 'Пользователь', numeric: false },
    { id: 'dob', label: 'Дата рождения', numeric: false },
    { id: 'description', label: 'Информация', numeric: false },
    { id: 'address', label: 'Адрес', numeric: false },
    { id: 'tel', label: 'Телефон', numeric: false }
]

export const ManageCoachesView: React.FC = (props) => {
    const dispatch = useDispatch()
    
    const { list: users } = useSelector((state: IState) => state.users)
    const { list: coaches } = useSelector((state: IState) => state.coaches)
    const { list: cities } = useSelector((state: IState) => state.cities)

    const mappedCoaches: Array<ICoach> = coaches.map(coach => (
        {
            ...coach,
            user_id: users.find(u => u.id === coach.user_id)?.name || '',
            city_id: cities.find(c => c.id === coach.city_id)?.name || '',
        }))

    const onRemove: RemoveCallbackType = id => {
        dispatch(removeCoach(id))
    }

    const { authorized } = useAuth()
  
    useEffect(() => {
      if (authorized) {
        dispatch(fetchCoaches())
      }
    }, [authorized, dispatch])
  

    return (
        <EnhancedTable<ICoach>
            headCells={headCells}
            rows={mappedCoaches}
            title={'Тренеры'}
            onRemove={onRemove}
        />
    )
}