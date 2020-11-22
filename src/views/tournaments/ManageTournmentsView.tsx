import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { useAuth } from '../../hooks/auth.hooks'
import {  IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { ITournament } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { fetchTournaments, removeTournament } from '../../redux/actions/tournaments.actions'

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

    const { authorized } = useAuth()
  
    useEffect(() => {
      if (authorized) {
        dispatch(fetchTournaments())
      }
    }, [authorized, dispatch])
  

    return (
        <EnhancedTable<ITournament>
            headCells={headCells}
            rows={list}
            title={'Турниры'}
            onRemove={onRemove}
        />
    )
}