import React, { useEffect, useState } from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { Grid, TextField, Select, MenuItem } from '@material-ui/core'
import { EditorFormLayout } from '../../components/layouts/EditorFormLayout'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IDType, IStatistics } from '../../interfaces/entities.interfaces'
import { useFoundStudents } from '../../hooks/found-by-city.hook'
import { collectCRUDLoading } from '../../helpers/crud-loading.helper'
import { splitDate } from '../../helpers/date-splitter.helper'
import { useIDParam } from '../../hooks/id-param.hook'
import { usePostQuery, usePutQuery, useDeleteQuery, useGetQuery } from '../../hooks/query.hook'
import { Nullable } from '../../types/common.types'
import { validate } from '../../helpers/truthy-validator.helper'

export const StatisticsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
  const editing = mode === 'edit'

  const id = useIDParam()
  const { onChange, onSelect, onDateChange } = useFormHandlers()

  const [child, setChild] = useState<Nullable<IDType>>(null)
  const [date, setDate] = useState<Nullable<Date>>(null)
  const [file, setFile] = useState('')

  const forSending = { children_id: child, date: splitDate(date || new Date()), file }

  const { students } = useFoundStudents() 

  const { execute: onAdd, loading: adding } = usePostQuery('persons/stats', forSending)
  const { execute: onModify, loading: modifying } = usePutQuery(`persons/stats/${id}`, forSending)
  const { execute: onRemove, loading: removing } = useDeleteQuery(`persons/stats/${id}`)

  const { value: stats, loading: fetching } = useGetQuery<IStatistics>(`persons/stats${id}`)

  const isValid = validate([child, date, file])
  const loading = collectCRUDLoading([adding, fetching, modifying, removing])

  const onClearAll = () => {
    setFile('')
    setChild(null)
    setDate(null)
  }

  useEffect(() => {
    if (editing && stats) {
      setFile(stats.file)
      setChild(students.find(s => s.id === child)?.id || null)
      setDate(new Date(stats.date))
    }
  }, [])

  return (
    <EditorFormLayout
      mode={mode}
      onAdd={onAdd}
      onModify={onModify}
      onRemove={onRemove}
      onClearAll={onClearAll}
      isValid={isValid}
      redirectTo="/statistics/"
      title={title}
      loading={loading}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Файл"
            autoFocus
            value={file}
            onChange={onChange(setFile)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            variant="outlined"
            fullWidth
            value={child || ''}
            onChange={onSelect(setChild)}
            displayEmpty
          >
            <MenuItem value='' disabled>{'Ученик'}</MenuItem>
            {
              students.map(c =>
                <MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>
              )
            }
          </Select>
        </Grid>

        <Grid item xs={12}>
          <KeyboardDatePicker
            fullWidth
            margin="normal"
            label="Дата рождения"
            format="MM/dd/yyyy"
            value={date}
            onChange={onDateChange(setDate)}
          />
        </Grid>
      </Grid>
    </EditorFormLayout>
  )
}