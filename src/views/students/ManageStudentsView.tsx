import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { useAuth } from '../../hooks/auth.hooks'
import {  IHeadCell, RemoveCallbackType } from '../../interfaces/components.interfaces'
import { IStudent } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { fetchStudents, removeStudent } from '../../redux/actions/students.actions'

const headCells: Array<IHeadCell<IStudent>> = [
    { id: 'name', label: 'Имя', numeric: false },
    { id: 'dob', label: 'Дата рождения', numeric: false },
    { id: 'address', label: 'Адрес', numeric: false },
    { id: 'group_id', label: 'Группа', numeric: false },
    { id: 'img', label: 'Изображение', numeric: false }
]

export const ManageStudentsView: React.FC = (props) => {
    const dispatch = useDispatch()

    const { list: students } = useSelector((state: IState) => state.students)
    const { list: groups } = useSelector((state: IState) => state.groups)

    const mappedStudents: Array<IStudent> = students.map(s => (
      {
          ...s,
          group_id: groups.find(c => c.id === s.group_id)?.year.toString() || '',
      }))

    const onRemove: RemoveCallbackType = id => {
        dispatch(removeStudent(id))
    }

    const { authorized } = useAuth()
  
    useEffect(() => {
      if (authorized) {
        dispatch(fetchStudents())      
      }
    }, [authorized, dispatch])
  

    return (
        <EnhancedTable<IStudent>
            headCells={headCells}
            rows={mappedStudents}
            title={'Ученики'}
            onRemove={onRemove}
        />
    )
}