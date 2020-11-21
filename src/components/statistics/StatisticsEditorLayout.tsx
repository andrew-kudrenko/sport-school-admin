import React, { useEffect, useState } from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { Grid, TextField, Select, MenuItem } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EditorFormLayout } from '../../components/layouts/EditorFormLayout'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IDType } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { addStatistics, modifyStatistics, removeStatistics } from '../../redux/actions/statistics.actions'
import { useFoundStatistics, useFoundStudents } from '../../hooks/found-by-city.hook'

export const StatisticsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
  const editing = mode === 'edit'

  const { id } = useParams<{ id?: IDType }>()
  const { onChange, onSelect } = useFormHandlers()

  const [child, setChild] = useState<IDType | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [file, setFile] = useState('')

  const dispatch = useDispatch()
  
  const statistics = useFoundStatistics()
  const students = useFoundStudents() 

  const { loading } = useSelector((state: IState) => state.statistics)

  const isValid: boolean = [child, date, file].reduce((acc: boolean, item) => Boolean(acc) && Boolean(item), true)

  const onClearAll = () => {
    setFile('')
    setChild(null)
    setDate(null)
  }

  const onAdd = dispatch.bind(null, addStatistics({ file, date: date?.toJSON().split('T')[0] || '', children_id: child as string }))

  let onModify = () => { }

  if (editing && id) {
    onModify = dispatch.bind(null, modifyStatistics(id, { file, date: date?.toJSON() as string || '', children_id: child as string }))
  }

  let onRemove = () => { }

  if (editing && !!id?.toString()) {
    onRemove = dispatch.bind(null, removeStatistics(id))
  }

  useEffect(() => {
    const stats = statistics.find(s => s.id.toString() === id)

    if (editing && stats) {
      setFile(stats.file)
      setChild(students.find(s => s.id === child)?.id || null)
      setDate(new Date(stats.date))
    }
  }, [])

  const handleDateChange = (date: Date | null) => {
    setDate(date)
  }

  console.log(date?.toJSON())


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
            onChange={handleDateChange}
          />
        </Grid>
      </Grid>
    </EditorFormLayout>
  )
}