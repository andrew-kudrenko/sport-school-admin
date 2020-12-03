import React from 'react'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { requestJSONAuth } from '../../helpers/request.hepler'
import { useFoundCities, useFoundTickets } from '../../hooks/found-by-city.hook'
import { useRefresh } from '../../hooks/refresh.hook'
import { IHeadCell } from '../../interfaces/components.interfaces'

const headCells: Array<IHeadCell<any>> = [
    { id: 'title', label: 'Название' },
    { id: 'cost', label: 'Стоимость' },
    { id: 'city_id', label: 'Город' },
    { id: 'lessons', label: 'Уроки' },
    { id: 'to_date', label: 'Дата' }
]

export const ManageTicketsView: React.FC = () => {
    const { cities } = useFoundCities()
    const { tickets, execute: refresh } = useFoundTickets()

    const mappedTickets: Array<any> = tickets?.map(t => (
        {
            ...t,
            city_id: cities.find(c => c.id === t.city_id)?.name || ''
        })) || []

    const onRemove = async (id: string) => {
        await requestJSONAuth(`/shop/season_tickets/${id}`, 'DELETE')
        await refresh()
    }    

    useRefresh(refresh)

    return (
        <EnhancedTable<any>
            headCells={headCells}
            rows={mappedTickets}
            title={'Абонементы'}
            onRemove={onRemove}
        />
    )
}