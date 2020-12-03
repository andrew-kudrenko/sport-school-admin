import React from 'react'
import { EnhancedTable } from '../../components/tables/EnhancedTable'
import { requestJSONAuth } from '../../helpers/request.hepler'
import { useFoundGroups, useFoundStudents } from '../../hooks/found-by-city.hook'
import { useRefresh } from '../../hooks/refresh.hook'
import {  IHeadCell } from '../../interfaces/components.interfaces'
import { IStudent } from '../../interfaces/entities.interfaces'

const headCells: Array<IHeadCell<IStudent>> = [
    { id: 'name', label: 'Имя' },
    { id: 'dob', label: 'Дата рождения' },
    { id: 'address', label: 'Адрес' },
    { id: 'group_id', label: 'Группа' }
]

export const ManageStudentsView: React.FC = () => {
    const { groups } = useFoundGroups()
    const { students, execute: refresh } = useFoundStudents()

    const mappedStudents: Array<IStudent> = students.map(s => (
        {
            ...s,
            group_id: String(groups.find(c => c.id === s.group_id)?.year || '')
        }))

    const onRemove = async (id: string) => {
        await requestJSONAuth(`/persons/child/${id}`, 'DELETE')
        await refresh()
    }    

    useRefresh(refresh)

    return (
        <EnhancedTable<IStudent>
            headCells={headCells}
            rows={mappedStudents}
            title={'Ученики'}
            onRemove={onRemove}
        />
    )
}