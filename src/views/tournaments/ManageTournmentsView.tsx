import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import {  IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { ITournament } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { removeTournament } from '../../redux/actions/tournaments.actions'

const headCells: Array<IHeadCell<ITournament>> = [
    { id: 'year', label: 'Год', numeric: false },
    { id: 'text', label: 'Описание', numeric: false },
    { id: 'img', label: 'Изображение', numeric: false }

]

export const ManageTournamentsView: React.FC = (props) => {
    const dispatch = useDispatch()
    const { list } = useSelector((state: IState) => state.tournaments)

    const onRemove: RemoveCallbackType = id => {
        dispatch(removeTournament(id))
    }

    return (
        <EnhancedTable<ITournament>
            headCells={headCells}
            rows={list}
            title={'Турниры'}
            onRemove={onRemove}
        />
    )
}