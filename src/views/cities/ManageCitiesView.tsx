import React from 'react'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { requestJSONAuth } from '../../helpers/request.hepler'
import { useFoundCities } from '../../hooks/found-by-city.hook'
import { useRefresh } from '../../hooks/refresh.hook'
import {  IHeadCell } from '../../interfaces/components.interfaces'
import { ICity } from '../../interfaces/entities.interfaces'

const headCells: Array<IHeadCell<ICity>> = [
    { id: 'name', label: 'Название' }
]

export const ManageCitiesView: React.FC = () => {
    const { cities, execute: refresh } = useFoundCities()

    const onRemove = async (id: string) => {
        await requestJSONAuth(`/structures/cities/${id}`, 'DELETE')
        await refresh()
    }

    useRefresh(refresh)
    
    return (
        <EnhancedTable<ICity>
            headCells={headCells}
            rows={cities}
            title="Список городов"
            onRemove={onRemove}
        />
    )
}