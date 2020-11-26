import React from 'react'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { requestJSONAuth } from '../../helpers/request.hepler'
import { useFoundStudents } from '../../hooks/found-by-city.hook'
import { useGetQuery } from '../../hooks/query.hook'
import {  IHeadCell } from '../../interfaces/components.interfaces'
import { IStatistics } from '../../interfaces/entities.interfaces'

const headCells: Array<IHeadCell<IStatistics>> = [
    { id: 'children_id', label: 'Ученик' },
    { id: 'date', label: 'Дата' }
]

export const ManageStatisticsView: React.FC = () => {
    const { students } = useFoundStudents()
    const { value: statistics, execute: refresh } = useGetQuery<Array<IStatistics>>(`persons/stats`)  

    const mappedStatistics: Array<IStatistics> = statistics?.map(s => (
      {
          ...s,
          children_id: students.find(c => c.id === s.children_id)?.name || '',
      })) || []

      const onRemove = async (id: string) => {
        await requestJSONAuth(`/persons/stats/${id}`, 'DELETE')
        await refresh()
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