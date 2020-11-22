import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { useAuth } from '../../hooks/auth.hooks'
import {  IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { INews } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { fetchNews, removeNews } from '../../redux/actions/news.actions'

const headCells: Array<IHeadCell<INews>> = [
    { id: 'text', label: 'Текст', numeric: false },
    { id: 'img', label: 'Изображение', numeric: false }
]

export const ManageNewsView: React.FC = (props) => {
    const dispatch = useDispatch()
    const { list } = useSelector((state: IState) => state.news)

    const onRemove: RemoveCallbackType = id => {
        dispatch(removeNews(id))
    }

    const { authorized } = useAuth()
  
    useEffect(() => {
      if (authorized) {
        dispatch(fetchNews())
      }
    }, [authorized, dispatch])

    return (
        <EnhancedTable<INews>
            headCells={headCells}
            rows={list}
            title={'Список новостей'}
            onRemove={onRemove}
        />
    )
}