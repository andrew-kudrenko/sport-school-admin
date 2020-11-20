import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { IGroup } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { removeGroup } from '../../redux/actions/groups.actions'

const headCells: Array<IHeadCell<IGroup>> = [
  { id: 'year', label: 'Год', numeric: false },
  { id: 'school_id', label: 'Школа', numeric: false },
  { id: 'tg_url', label: 'Ссылка на телеграм', numeric: false },
  { id: 'schedule', label: 'Расписание', numeric: false }
]

export const ManageGroupsView: React.FC = (props) => {
  const dispatch = useDispatch()

  const { list: groups } = useSelector((state: IState) => state.groups)
  const { list: schools } = useSelector((state: IState) => state.schools)

  const mappedGroups: Array<IGroup> = groups.map(g => (
    {
      ...g,
      school_id: schools.find(c => c.id === g.school_id)?.name || ''
    }))


  const onRemove: RemoveCallbackType = id => {
    dispatch(removeGroup(id))
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