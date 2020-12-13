import React from 'react'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { requestJSONAuth } from '../../helpers/request.hepler'
import { useGetQuery } from '../../hooks/query.hook'
import { useRefresh } from '../../hooks/refresh.hook'
import {  IHeadCell } from '../../interfaces/components.interfaces'
import { ITransaction } from '../../interfaces/entities.interfaces'

const headCells: Array<IHeadCell<ITransaction>> = [
    { id: 'title', label: 'Название' }
]

export const ManageTransactionsView: React.FC = () => {
    const { value: types, execute: refresh } = useGetQuery<Array<ITransaction>>('transactions/types')

    const onRemove = async (id: string) => {
        await requestJSONAuth(`/transactions/types/${id}`, 'DELETE')
        await refresh()
    }

    useRefresh(refresh)
    
    return (
        <EnhancedTable<ITransaction>
            headCells={headCells}
            rows={types || []}
            title="Виды транзакций"
            onRemove={onRemove}
        />
    )
}