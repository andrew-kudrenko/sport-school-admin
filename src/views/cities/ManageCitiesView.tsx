import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import {  IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { ICity } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { removeCity } from '../../redux/actions/cities.actions'

const headCells: Array<IHeadCell<ICity>> = [
    { id: 'name', label: 'Название', numeric: false }
]

export const ManageCitiesView: React.FC = (props) => {
    const dispatch = useDispatch()
    const { list } = useSelector((state: IState) => state.cities)

    const onRemove: RemoveCallbackType = id => {
        dispatch(removeCity(id))
    }

    return (
        <EnhancedTable<ICity>
            headCells={headCells}
            rows={list}
            title={'Список городов'}
            onRemove={onRemove}
        />
    )
}