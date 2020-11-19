import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { IUser } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { removeSchool } from '../../redux/actions/schools.actions'

const headCells: Array<IHeadCell<IUser>> = [
    { id: 'name', label: 'ФИО', numeric: false },
    { id: 'city_id', label: 'Город', numeric: false },
    { id: 'is_trainer', label: 'Тренер', numeric: false },
    { id: 'is_child', label: 'Ученик', numeric: false },
    { id: 'school_id', label: 'Школа', numeric: false },
    { id: 'date_joined', label: 'Дата регистрации', numeric: false },
    { id: 'is_verify', label: 'Подтверждён', numeric: false }

]

export const ManageUsersView: React.FC = () => {
    const dispatch = useDispatch()

    const { list: users } = useSelector((state: IState) => state.users)
    const { list: schools } = useSelector((state: IState) => state.schools)
    const { list: cities } = useSelector((state: IState) => state.cities)

    const mappedUsers: Array<IUser> = users.map(u => (
        {
            ...u,
            city_id: cities.find(c => c.id === u.city_id)?.name || '',
            school_id: schools.find(s => s.id === u.school_id)?.name || '',
            date_joined: new Date(u.date_joined).toLocaleString()
        }))

    const onRemove: RemoveCallbackType = id => {
        dispatch(removeSchool(id))
    }

    return (
        <EnhancedTable<IUser>
            headCells={headCells}
            rows={mappedUsers}
            title={'Список пользователей'}
            onRemove={onRemove}
        />
    )
}