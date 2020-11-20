import React, { useEffect, useState } from 'react'
import { Grid, MenuItem, Select, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { EditorFormLayout } from '../layouts/EditorFormLayout'
import { useParams } from 'react-router-dom'
import { IDType } from '../../interfaces/entities.interfaces'
import { addGroup, modifyGroup, removeGroup } from '../../redux/actions/groups.actions'

export const GroupsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
  const editing = mode === 'edit'

  const { id } = useParams<{ id?: IDType }>()
  const { list: schools } = useSelector((state: IState) => state.schools)
  const { loading, list: groups } = useSelector((state: IState) => state.groups)

  const [school, setSchool] = useState<IDType | null>(null)
  const [year, setYear] = useState<number | null>(null)
  const [schedule, setSchedule] = useState('')
  const [tgUrl, setTgUrl] = useState('')

  const dispatch = useDispatch()
  const { onChange, onSelect } = useFormHandlers()

  const onClearAll = () => {
    setSchool(null)
    setYear(null)
    setSchedule('')
    setTgUrl('')
  }

  const onAdd = dispatch.bind(null, addGroup({ year: year as number, schedule, school_id: school as string, tg_url: tgUrl }))

  let onModify = () => { }
  if (!!id?.toString()) {
    onModify = dispatch.bind(null, modifyGroup(id, { year: year as number, schedule, school_id: school as string, tg_url: tgUrl }))
  }

  let onRemove = () => { }

  if (editing && !!id?.toString()) {
    onRemove = dispatch.bind(null, removeGroup(id))
  }

  const isValid: boolean = [year, schedule, tgUrl, school].reduce((acc: boolean, item) => Boolean(acc) && Boolean(item), true)


  useEffect(() => {
    const group = groups.find(g => g.id.toString() === id)

    if (editing && group) {
      setYear(group.year)
      setSchool(group.school_id)
      setTgUrl(group.tg_url)
      setSchedule(group.schedule)
    }
  }, [])

  return (
    <EditorFormLayout
      mode={mode}
      isValid={isValid}
      redirectTo="/groups/"
      title={title}
      loading={loading}
      onAdd={onAdd}
      onClearAll={onClearAll}
      onRemove={onRemove}
      onModify={onModify}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Год"
            autoFocus
            value={year}
            onChange={onChange(setYear)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            variant="outlined"
            fullWidth
            value={school || ''}
            onChange={onSelect(setSchool)}
            displayEmpty
          >
            <MenuItem value='' disabled>{'Школа'}</MenuItem>
            {
              schools.map(c =>
                <MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>
              )
            }
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Расписание"
            value={schedule}
            onChange={onChange(setSchedule)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Ссылка на телеграм"
            value={tgUrl}
            onChange={onChange(setTgUrl)}
          />
        </Grid>
      </Grid>
    </EditorFormLayout>
  )
}