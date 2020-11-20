import React, { useEffect, useState } from 'react'
import { Chip, createStyles, Grid, makeStyles, MenuItem, Select, TextField, Theme } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { useDispatch, useSelector } from 'react-redux'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { EditorFormLayout } from '../layouts/EditorFormLayout'
import { useParams } from 'react-router-dom'
import { IDType } from '../../interfaces/entities.interfaces'
import { addStudent, modifyStudent, removeStudent } from '../../redux/actions/students.actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    }
  })
)

export const ChildrenEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
  const classes = useStyles()
  const editing = mode === 'edit'

  const { id } = useParams<{ id?: IDType }>()
  const { list: users } = useSelector((state: IState) => state.users)
  const { list: groups } = useSelector((state: IState) => state.groups)
  const { loading, list: students } = useSelector((state: IState) => state.students)

  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [dob, setDOB] = useState<Date | null>(null)
  const [address, setAddress] = useState('')
  const [group, setGroup] = useState<IDType | null>(null)
  const [parents, setParents] = useState<Array<IDType>>([])

  const dispatch = useDispatch()
  const { onChange, onSelect } = useFormHandlers()

  const onClearAll = () => {
    setName('')
    setImg('')
    setDOB(null)
    setAddress('')
    setGroup(null)
    setParents([])
  }

  const onAdd = dispatch.bind(null, addStudent({ name, address, img, parents_id: parents, group_id: group as string, dob: dob?.toJSON().split('T')[0] as string }))

  let onModify = () => { }
  if (!!id?.toString()) {
    onModify = dispatch.bind(null, modifyStudent(id, { name, img, address, parents_id: parents, group_id: group as string, dob: dob?.toJSON().split('T')[0] as string }))
  }

  let onRemove = () => { }

  if (editing && !!id?.toString()) {
    onRemove = dispatch.bind(null, removeStudent(id))
  }

  const isValid: boolean = [name, address, parents, group, dob].reduce((acc: boolean, item) => Boolean(acc) && Boolean(item), true)


  useEffect(() => {
    const child = students.find(g => g.id.toString() === id)

    if (editing && child) {
      setName(child.name)
      setDOB(new Date(child.dob))
      setAddress(child.address)
      setGroup(child.group_id)
      setParents(child.parents_id)
      setImg(child.img)
    }
  }, [])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGroup(event.target.value as string)
  }

  const handleDateChange = (date: Date | null) => {
    setDOB(date)
  }

  return (
    <EditorFormLayout
      mode={mode}
      isValid={isValid}
      redirectTo="/students/"
      title={title}
      loading={loading}
      onAdd={onAdd}
      onClearAll={onClearAll}
      onRemove={onRemove}
      onModify={onModify}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Имя"
            autoFocus
            value={name}
            onChange={onChange(setName)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Адрес"
            value={address}
            onChange={onChange(setAddress)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Изображение"
            value={img}
            onChange={onChange(setImg)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Изображение"
            value={img}
            onChange={onChange(setImg)}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            variant="outlined"
            multiple
            fullWidth
            value={parents || ''}
            displayEmpty
            onChange={handleChange}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {
                  (selected as string[]).length
                    ?
                    (selected as string[]).map((value) => (
                      <Chip key={value} label={users.find(g => g.id === value)?.name || ''} className={classes.chip} />
                    ))
                    : 'Родители'
                }
              </div>
            )}
          >
            {
              users.map(g =>
                <MenuItem value={g.id} key={g.id}>{g.name}</MenuItem>
              )
            }
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            variant="outlined"
            fullWidth
            value={group || ''}
            onChange={onSelect(setGroup)}
            displayEmpty
          >
            <MenuItem value='' disabled>{'Группа'}</MenuItem>
            {
              groups.map(c =>
                <MenuItem value={c.id} key={c.id}>{c.year}</MenuItem>
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
            value={dob}
            onChange={handleDateChange}
          />
        </Grid>
      </Grid>
    </EditorFormLayout>
  )
}
