import React from 'react'
import { useDispatch } from 'react-redux'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { useFoundStudents, useFoundStatistics } from '../../hooks/found-by-city.hook'
import {  IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { IStatistics } from '../../interfaces/entities.interfaces'
import { removeStatistics } from '../../redux/actions/statistics.actions'

const headCells: Array<IHeadCell<IStatistics>> = [
    { id: 'children_id', label: 'Ученик', numeric: false },
    { id: 'date', label: 'Дата', numeric: false },
    { id: 'file', label: 'Файл', numeric: false }
]

export const ManageStatisticsView: React.FC = () => {
    const dispatch = useDispatch()

    const students = useFoundStudents()
    const statistics = useFoundStatistics()

    const mappedStatistics: Array<IStatistics> = statistics.map(s => (
      {
          ...s,
          children_id: students.find(c => c.id === s.children_id)?.name || '',
      }))

    const onRemove: RemoveCallbackType = id => {
        dispatch(removeStatistics(id))
    }

    return (
        <EnhancedTable<IStatistics>
            headCells={headCells}
            rows={mappedStatistics}
            title={'Статистические данные'}
            onRemove={onRemove}
        />
    )
}