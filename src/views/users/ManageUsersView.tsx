import React from 'react'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { requestJSONAuth } from '../../helpers/request.hepler'
import { useFoundCities, useFoundSchools } from '../../hooks/found-by-city.hook'
import { useGetQuery } from '../../hooks/query.hook'
import { useRefresh } from '../../hooks/refresh.hook'
import { IHeadCell } from '../../interfaces/components.interfaces'
import { IUser } from '../../interfaces/entities.interfaces'

const headCells: Array<IHeadCell<IUser>> = [
    { id: 'name', label: 'ФИО' },
    { id: 'city_id', label: 'Город' },
    { id: 'is_trainer', label: 'Тренер' },
    { id: 'is_child', label: 'Ученик' },
    { id: 'school_id', label: 'Школа' },
    { id: 'date_joined', label: 'Дата регистрации' },
    { id: 'is_verify', label: 'Подтверждён' }

]

export const ManageUsersView: React.FC = () => {
    const { value: users, execute: refresh } = useGetQuery<Array<IUser>>(`tg/users`)

    const { schools } = useFoundSchools()
    const { cities } = useFoundCities()

    const mappedUsers: Array<IUser> = users?.map(u => (
        {
            ...u,
            id: String(u.tg_id),
            city_id: cities.find(c => c.id === u.city_id)?.name || '',
            school_id: schools.find(s => s.id === u.school_id)?.name || '',
            date_joined: new Date(u.date_joined).toLocaleString()
        })) || []

    const onRemove = async (id: string) => {
        await requestJSONAuth(`/persons/groups/${id}`, 'DELETE')
        await refresh()
    }
    
    useRefresh(refresh)

    return (
        <EnhancedTable<IUser>
            headCells={headCells}
            rows={mappedUsers}
            title={'Список пользователей'}
            onRemove={onRemove}
        />
    )
}