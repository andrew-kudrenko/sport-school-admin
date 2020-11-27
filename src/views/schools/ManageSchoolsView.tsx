import React from 'react'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { requestJSONAuth } from '../../helpers/request.hepler'
import { useFoundCities, useFoundSchools } from '../../hooks/found-by-city.hook'
import { useRefresh } from '../../hooks/refresh.hook'
import { IHeadCell } from '../../interfaces/components.interfaces'
import { ISchool } from '../../interfaces/entities.interfaces'

const headCells: Array<IHeadCell<ISchool>> = [
    { id: 'name', label: 'Название' },
    { id: 'city_id', label: 'Город' },
    { id: 'address', label: 'Адрес' },
    { id: 'description', label: 'Описание' }
]

export const ManageSchoolsView: React.FC = () => {
    const { cities } = useFoundCities()
    const { schools, execute: refresh } = useFoundSchools()

    const mappedSchools: Array<ISchool> = schools.map(s => (
        {
            ...s,
            city_id: cities.find(c => c.id === s.city_id)?.name || ''
        }))

    const onRemove = async (id: string) => {
        await requestJSONAuth(`/structures/schools/${id}`, 'DELETE')
        await refresh()
    }    

    useRefresh(refresh)

    return (
        <EnhancedTable<ISchool>
            headCells={headCells}
            rows={mappedSchools}
            title={'Список школ'}
            onRemove={onRemove}
        />
    )
}