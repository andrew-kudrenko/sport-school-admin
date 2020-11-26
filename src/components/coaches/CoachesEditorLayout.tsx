import React, { useEffect, useState } from 'react'
import { Chip, createStyles, Grid, Input, makeStyles, MenuItem, Select, TextField, Theme } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { EditorFormLayout } from '../../components/layouts/EditorFormLayout'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { ICoach, IDType, IGroup } from '../../interfaces/entities.interfaces'
import { useFoundCities, useFoundUsers, useFoundGroups } from '../../hooks/found-by-city.hook'
import { useIDParam } from '../../hooks/id-param.hook'
import { useDeleteQuery, useGetQuery, usePostQuery, usePutQuery } from '../../hooks/query.hook'
import { validate } from '../../helpers/truthy-validator.helper'
import { collectCRUDLoading } from '../../helpers/crud-loading.helper'
import { Nullable } from '../../types/common.types'
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

export const CoachesEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
  const classes = useStyles()
  const editing = mode === 'edit'

  const id = useIDParam()
  const { onChange, onSelect, onDateChange } = useFormHandlers()

  const [name, setName] = useState('')
  const [user, setUser] = useState<Nullable<IDType>>(null)
  const [dob, setDOB] = useState<Nullable<Date>>(null)
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [tel, setTel] = useState('')
  const [group, setGroup] = useState<Array<IDType>>([])
  const [city, setCity] = useState<Nullable<IDType>>(null)

  const [forSending, setForSending] = useState({
    item: {
      name,
      description,
      address,
      tel,
      city_id: city,
      dob: splitDate(dob || new Date()),
      user_id: user,
    },
    group_ids: group
  })

  const { cities } = useFoundCities()
  const { users } = useFoundUsers()
  const { groups } = useFoundGroups()

  const { execute: onAdd, loading: adding } = usePostQuery('persons/trainer', forSending)
  const { execute: onModify, loading: modifying } = usePutQuery(`persons/trainer/${id}`, forSending)
  const { execute: onRemove, loading: removing } = useDeleteQuery(`persons/trainer/${id}`)

  let { value: coach, loading: fetching } = useGetQuery<ICoach & { group: Array<IGroup> }>(`persons/trainer/${id}`)
  
  const isValid = validate([name, dob, String(user), description, address, tel, group, city])
  const loading = collectCRUDLoading([adding, fetching, modifying, removing])
  
  const onClearAll = () => {
    setName('')
    setDescription('')
    setAddress('')
    setTel('')
    
    setUser(null)
    setDOB(null)
    setGroup([])
    setCity(null)
  }

  useEffect(() => {
    setForSending({
      item: {
        name,
        description,
        address,
        tel,
        city_id: city,
        dob: splitDate(dob || new Date()),
        user_id: user,
      },
      group_ids: group
    })
  }, [coach, name, description, address, tel, city, dob, user, group])

  useEffect(() => {
    
    if (editing && coach) {
      console.log(coach)
      setUser(coach.user_id)
      setName(coach.name)
      setDOB(new Date(coach.dob))
      setCity(coach.city_id)
      setAddress(coach.address)
      setDescription(coach.description)
      setTel(coach.tel)
      setGroup(coach.group.map(g => g.id))
    }
  }, [coach, editing, user])


  const handleChange = (callback: (value: any) => any) => (event: React.ChangeEvent<{ value: unknown }>) => {
    callback(event.target.value as string[])
  }

  return (
    <EditorFormLayout
      mode={mode}
      onAdd={onAdd}
      onModify={onModify}
      onRemove={onRemove}
      onClearAll={onClearAll}
      isValid={isValid}
      redirectTo="/coaches/"
      title={title}
      loading={loading}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="ФИО"
            autoFocus
            value={name}
            onChange={onChange(setName)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Телефон"
            value={tel}
            onChange={onChange(setTel)}
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
        <Grid item xs={12} sm={6}>
          <Select
            variant="outlined"
            fullWidth
            value={user || ''}
            onChange={onSelect(setUser)}
            displayEmpty
          >
            <MenuItem value='' disabled>{'Пользователь'}</MenuItem>
            {
              users.map(u =>
                <MenuItem value={u.tg_id} key={u.tg_id}>{u.name}</MenuItem>
              )
            }
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            variant="outlined"
            fullWidth
            value={city || ''}
            onChange={onSelect(setCity)}
            displayEmpty
          >
            <MenuItem value='' disabled>{'Город'}</MenuItem>
            {
              cities.map(c =>
                <MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>
              )
            }
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            variant="outlined"
            multiple
            fullWidth
            value={group}
            displayEmpty
            onChange={handleChange(setGroup)}
            input={<Input />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {
                  (selected as string[])?.length
                    ?
                    (selected as string[]).map((value) => (
                      <Chip key={value} label={groups.find(g => g.id === value)?.year || ''} className={classes.chip} />
                    ))
                    : 'Группа'
                }
              </div>
            )}
          >
            <MenuItem value='' disabled>{'Группа'}</MenuItem>
            {
              groups.map(g =>
                <MenuItem value={g.id} key={g.id}>{g.year}</MenuItem>
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
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Описание"
            multiline
            rows={7}
            value={description}
            onChange={onChange(setDescription)}
          />
        </Grid>
      </Grid>
    </EditorFormLayout>
  )
}
