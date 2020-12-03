import React from 'react'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { requestJSONAuth } from '../../helpers/request.hepler'
import { useGetQuery } from '../../hooks/query.hook'
import { useRefresh } from '../../hooks/refresh.hook'
import { IHeadCell } from '../../interfaces/components.interfaces'
import { ITournament } from '../../interfaces/entities.interfaces'

const headCells: Array<IHeadCell<ITournament>> = [
    { id: 'year', label: 'Год' },
    { id: 'text', label: 'Описание' }
]

export const ManageTournamentsView: React.FC = () => {
    const { value: tournaments, execute: refresh } = useGetQuery<Array<ITournament>>('posts/tournament')

    const onRemove = async (id: string) => {
        await requestJSONAuth(`/posts/tournament/${id}`, 'DELETE')
        await refresh()
    }

    useRefresh(refresh)

    return (
        <EnhancedTable<ITournament>
            headCells={headCells}
            rows={tournaments || []}
            title={'Турниры'}
            onRemove={onRemove}
        />
    )
}