import React from 'react'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { requestJSONAuth } from '../../helpers/request.hepler'
import { useFoundCities, useFoundUsers } from '../../hooks/found-by-city.hook'
import { useGetQuery } from '../../hooks/query.hook'
import { useRefresh } from '../../hooks/refresh.hook'
import {  IHeadCell } from '../../interfaces/components.interfaces'
import { ICoach } from '../../interfaces/entities.interfaces'

const headCells: Array<IHeadCell<ICoach>> = [
    { id: 'name', label: 'ФИО' },
    { id: 'user_id', label: 'Пользователь' },
    { id: 'dob', label: 'Дата рождения' },
    { id: 'description', label: 'Информация' },
    { id: 'address', label: 'Адрес' },
    { id: 'tel', label: 'Телефон' }
]

export const ManageCoachesView: React.FC = () => {    
    const { users } = useFoundUsers()
    const { cities } = useFoundCities()
    const { value: coaches, execute: refresh } = useGetQuery<Array<ICoach>>('persons/trainer')

    const mappedCoaches: Array<ICoach> = coaches?.map(coach => (
        {
            ...coach,
            user_id: users.find(u => u.tg_id === coach.user_id)?.name || '',
            city_id: cities.find(c => c.id === coach.city_id)?.name || '',
        })) || []

    const onRemove = async (id: string) => {
        await requestJSONAuth(`/persons/trainer/${id}`, 'DELETE')
        await refresh()
    }    

    useRefresh(refresh)

    return (
        <EnhancedTable<ICoach>
            headCells={headCells}
            rows={mappedCoaches}
            title={'Тренеры'}
            onRemove={onRemove}
        />
    )
}