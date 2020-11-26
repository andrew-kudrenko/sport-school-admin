import React from 'react'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { requestJSONAuth } from '../../helpers/request.hepler'
import { useFoundSchools } from '../../hooks/found-by-city.hook'
import { useGetQuery } from '../../hooks/query.hook'
import { IHeadCell } from '../../interfaces/components.interfaces'
import { IGroup } from '../../interfaces/entities.interfaces'

const headCells: Array<IHeadCell<IGroup>> = [
  { id: 'year', label: 'Год' },
  { id: 'school_id', label: 'Школа' },
  { id: 'tg_url', label: 'Ссылка на телеграм' }
]

export const ManageGroupsView: React.FC = () => {
  const { schools } = useFoundSchools()
  const { value: groups, execute: refresh } = useGetQuery<Array<IGroup>>(`persons/groups`)  

  const mappedGroups: Array<IGroup> = groups?.map(g => (
    {
      ...g,
      school_id: schools?.find(c => c.id === g.school_id)?.name || ''
    })) || []

  const onRemove = async (id: string) => {
    await requestJSONAuth(`/persons/groups/${id}`, 'DELETE')
    await refresh()
  } 

  return (
    <EnhancedTable<IGroup>
      headCells={headCells}
      rows={mappedGroups}
      title={'Спортивные группы'}
      onRemove={onRemove}
    />
  )
}