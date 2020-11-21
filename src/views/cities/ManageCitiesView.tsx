import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { useFoundCities } from '../../hooks/found-by-city.hook'
import { useRole } from '../../hooks/role.hook'
import {  IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { ICity } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { removeCity } from '../../redux/actions/cities.actions'

const headCells: Array<IHeadCell<ICity>> = [
    { id: 'name', label: 'Название', numeric: false }
]

export const ManageCitiesView: React.FC = (props) => {
    const dispatch = useDispatch()
    const cities = useFoundCities()

    const onRemove: RemoveCallbackType = id => {
        dispatch(removeCity(id))
    }

    return (
        <EnhancedTable<ICity>
            headCells={headCells}
            rows={cities}
            title={'Список городов'}
            onRemove={onRemove}
        />
    )
}