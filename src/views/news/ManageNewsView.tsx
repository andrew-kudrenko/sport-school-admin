import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import {  IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { INews } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { removeNews } from '../../redux/actions/news.actions'

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

    return (
        <EnhancedTable<INews>
            headCells={headCells}
            rows={list}
            title={'Список новостей'}
            onRemove={onRemove}
        />
    )
}