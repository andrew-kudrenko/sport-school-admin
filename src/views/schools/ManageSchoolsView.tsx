import React from 'react'
import { useDispatch } from 'react-redux'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { useFoundCities, useFoundSchools } from '../../hooks/found-by-city.hook'
import { IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { ISchool } from '../../interfaces/entities.interfaces'
import { removeSchool } from '../../redux/actions/schools.actions'

const headCells: Array<IHeadCell<ISchool>> = [
    { id: 'name', label: 'Название', numeric: false },
    { id: 'city_id', label: 'Город', numeric: false },
    { id: 'address', label: 'Адрес', numeric: false },
    { id: 'description', label: 'Описание', numeric: false }
]

export const ManageSchoolsView: React.FC = () => {
    const dispatch = useDispatch()

    const cities = useFoundCities()
    const schools = useFoundSchools()

    const mappedSchools: Array<ISchool> = schools.map(s => (
        {
            ...s,
            city_id: cities.find(c => c.id === s.city_id)?.name || ''
        }))

    const onRemove: RemoveCallbackType = id => {
        dispatch(removeSchool(id))
    }

    return (
        <EnhancedTable<ISchool>
            headCells={headCells}
            rows={mappedSchools}
            title={'Список школ'}
            onRemove={onRemove}
        />
    )
}