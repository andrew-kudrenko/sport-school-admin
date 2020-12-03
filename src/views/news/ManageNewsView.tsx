import React from 'react'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { requestJSONAuth } from '../../helpers/request.hepler'
import { useGetQuery } from '../../hooks/query.hook'
import { useRefresh } from '../../hooks/refresh.hook'
import {  IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { INews } from '../../interfaces/entities.interfaces'

const headCells: Array<IHeadCell<INews>> = [
    { id: 'title', label: 'Заголовок' },
    { id: 'text', label: 'Текст' }
]

export const ManageNewsView: React.FC = () => {
    const { value: news, execute: refresh } = useGetQuery<Array<INews>>('posts/news')

    const onRemove: RemoveCallbackType = async (id) => {
        await requestJSONAuth(`/posts/news/${id}`, 'DELETE')
        await refresh()
    }
    
    useRefresh(refresh)

    return (
        <EnhancedTable<INews>
            headCells={headCells}
            rows={news || []}
            title={'Список новостей'}
            onRemove={onRemove}
        />
    )
}