import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { useAuth } from '../../hooks/auth.hooks'
import { useFoundSchools, useFoundGroups } from '../../hooks/found-by-city.hook'
import { IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { IGroup } from '../../interfaces/entities.interfaces'
import { fetchGroups, removeGroup } from '../../redux/actions/groups.actions'

const headCells: Array<IHeadCell<IGroup>> = [
  { id: 'year', label: 'Год', numeric: false },
  { id: 'school_id', label: 'Школа', numeric: false },
  { id: 'tg_url', label: 'Ссылка на телеграм', numeric: false },
  { id: 'schedule', label: 'Расписание', numeric: false }
]

export const ManageGroupsView: React.FC = () => {
  const dispatch = useDispatch()

  const schools = useFoundSchools()
  const groups = useFoundGroups()  

  const mappedGroups: Array<IGroup> = groups.map(g => (
    {
      ...g,
      school_id: schools.find(c => c.id === g.school_id)?.name || ''
    }))


  const onRemove: RemoveCallbackType = id => {
    dispatch(removeGroup(id))
  }

  const { authorized } = useAuth()

  useEffect(() => {
    if (authorized) {
      dispatch(fetchGroups())      
    }
  }, [authorized, dispatch])


  return (
    <EnhancedTable<IGroup>
      headCells={headCells}
      rows={mappedGroups}
      title={'Спортивные группы'}
      onRemove={onRemove}
    />
  )
}