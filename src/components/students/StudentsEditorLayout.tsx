import React, { useEffect, useState } from 'react'
import { Chip, createStyles, Grid, makeStyles, MenuItem, Select, TextField } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { EditorFormLayout } from '../layouts/EditorFormLayout'
import { IDType, IStudent, IUser } from '../../interfaces/entities.interfaces'
import { useFoundGroups, useFoundUsers } from '../../hooks/found-by-city.hook'
import { validate } from '../../helpers/truthy-validator.helper'
import { Nullable } from '../../types/common.types'
import { useDeleteQuery, useGetQuery, usePostQuery, usePutQuery } from '../../hooks/query.hook'
import { useIDParam } from '../../hooks/id-param.hook'
import { collectCRUDLoading } from '../../helpers/crud-loading.helper'
import { splitDate } from '../../helpers/date-splitter.helper'

const useStyles = makeStyles(() =>
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

export const StudentsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
  const classes = useStyles()
  const editing = mode === 'edit'

  const id = useIDParam()
  const { users } = useFoundUsers()
  const { groups } = useFoundGroups()
  const { value: student, loading: fetching } = useGetQuery<{ parent: Array<IUser> } & IStudent>(`persons/child/${id}`)

  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [dob, setDOB] = useState<Date | null>(null)
  const [address, setAddress] = useState('')
  const [group, setGroup] = useState<Nullable<IDType>>(null)
  const [parents, setParents] = useState<Array<IDType>>([])

  const [forSending, setForSending] = useState({
    item: {
      name,
      address,
      img,
      group_id: group,
      dob: splitDate(dob || new Date())
    },
    parent_ids: parents
  })

  const { onChange, onSelect, onDateChange, onChangeMultiple } = useFormHandlers()

  const onClearAll = () => {
    setName('')
    setImg('')
    setDOB(null)
    setAddress('')
    setGroup(null)
    setParents([])
  }

  const { execute: onAdd, loading: adding } = usePostQuery('persons/child', forSending)
  const { execute: onModify, loading: modifying } = usePutQuery(`persons/child/${id}`, forSending)
  const { execute: onRemove, loading: removing } = useDeleteQuery(`persons/child/${id}`)

  const loading = collectCRUDLoading([adding, fetching, modifying, removing])
  const isValid = validate([name, address, parents, group, dob])

  useEffect(() => {
    setForSending({
      item: {
        name,
        address,
        img,
        group_id: group,
        dob: splitDate(dob || new Date())
      },
      parent_ids: parents
    })
  }, [name, img, dob, address, group, parents, student])

  useEffect(() => {
    if (editing && student) {
      console.log(student)
      setName(student.name)
      setDOB(new Date(student.dob))
      setAddress(student.address)
      setGroup(student.group_id)
      setParents(student.parent.map(p => String(p.tg_id)))
      setImg(student.img)
    }
  }, [student])

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
          <Select
            variant="outlined"
            multiple
            fullWidth
            value={parents || ''}
            displayEmpty
            onChange={onChangeMultiple(setParents)}
            renderValue={(selected) => {
              return (

                <div className={classes.chips}>
                  {
                    (selected as string[]).length
                      ?
                      (selected as string[])?.map((value) => (
                        <Chip key={value} label={users.find(u => String(u.tg_id) == value)?.name || ''} className={classes.chip} />
                      ))
                      : 'Родители'
                  }
                </div>
              )
            }}
          >
            {
              users.map(u => {
                return <MenuItem value={u.tg_id} key={u.tg_id}>{u.name}</MenuItem>
              }
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
            onChange={onDateChange(setDOB)}
          />
        </Grid>
      </Grid>
    </EditorFormLayout>
  )
}
