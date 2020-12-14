import React from 'react'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { useFoundLogs, useFoundUsers } from '../../hooks/found-by-city.hook'
import { useGetQuery } from '../../hooks/query.hook'
import { useRefresh } from '../../hooks/refresh.hook'
import { IHeadCell } from '../../interfaces/components.interfaces'
import { ILog, ID, ITransaction } from '../../interfaces/entities.interfaces'

const headCells: Array<IHeadCell<ID<ILog>>> = [
    { id: 'is_add', label: '' },
    { id: 'cost', label: 'Сумма' },
    { id: 'text', label: 'Комментарий' },
    { id: 'user_id', label: 'Пользователь' },
    { id: 'type_transaction_id', label: 'Тип' }
]

export const ManageLogsView: React.FC = () => {
    const { logs, execute: refresh } = useFoundLogs()
    const { value: types } = useGetQuery<Array<ID<ITransaction>>>('transactions/types')

    const { users } = useFoundUsers()

    const mappedLogs: Array<ID<ILog>> = logs?.map(l => (
        {
            ...l,
            user_id: users.find(u => u.tg_id === l.user_id)?.name || '',
            type_transaction_id: types?.find(t => t.id === l.type_transaction_id)?.title || ''
        })) || []

    useRefresh(refresh)

    return (
        <EnhancedTable<ID<ILog>>
            headCells={headCells}
            rows={mappedLogs}
            title={'Лог транзакций'}
            onRemove={() => {}}
        />
    )
}