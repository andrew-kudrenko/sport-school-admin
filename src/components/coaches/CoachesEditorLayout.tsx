import React, { useEffect, useState } from 'react'
import { Chip, createStyles, Grid, makeStyles, MenuItem, Select, TextField, Theme } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EditorFormLayout } from '../../components/layouts/EditorFormLayout'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IDType } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { addCoach, modifyCoach, removeCoach } from '../../redux/actions/coaches.actions'

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

export const CoachesEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
  const classes = useStyles()
  const editing = mode === 'edit'

  const { id } = useParams<{ id?: IDType }>()
  const { onChange, onSelect } = useFormHandlers()

  const [name, setName] = useState('')
  const [user, setUser] = useState<IDType | null>(null)
  const [dob, setDOB] = useState<Date | null>(null)
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [tel, setTel] = useState('')
  const [group, setGroup] = useState<Array<IDType>>([])
  const [city, setCity] = useState<IDType | null>(null)


  const dispatch = useDispatch()

  const { list: cities } = useSelector((state: IState) => state.cities)
  const { list: users } = useSelector((state: IState) => state.users)
  const { list: groups } = useSelector((state: IState) => state.groups)

  const { loading, list: coaches } = useSelector((state: IState) => state.coaches)

  const isValid: boolean = [name, dob, String(user), description, address, tel, group, city].reduce((acc: boolean, item) => Boolean(acc) && Boolean(item), true)

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

  const onAdd = dispatch.bind(null, addCoach({ name, dob: dob?.toJSON().split('T')[0] || '', tel, address, group_id: group, city_id: city as string, description, user_id: user as string }))

  let onModify = () => { }

  if (editing && id) {
    onModify = dispatch.bind(null, modifyCoach(id, {
      name,
      dob: dob?.toJSON().split('T')[0] || '',     
      tel,
      address,
      group_id: group,
      city_id: city as string,
      description,
      user_id: user as string
    }))
  }

  let onRemove = () => { }

  if (editing && !!id?.toString()) {
    onRemove = dispatch.bind(null, removeCoach(id))
  }

  useEffect(() => {
    const coach = coaches.find(с => с.id === id)

    if (editing && coach) {
      setUser(coach.user_id)
      setName(coach.name)
      setDOB(new Date(coach.dob))
      setCity(coach.city_id)
      setAddress(coach.address)
      setDescription(coach.description)
      setTel(coach.tel)
      setGroup(coach.group_id)
    }
  }, [])

  const handleDateChange = (date: Date | null) => {
    setDOB(date)
  }

  const handleChangeMultiple = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement
    const value: string[] = []
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    setGroup(value)
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGroup(event.target.value as string[])
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
        <Grid item xs={12}>
          <Select
            variant="outlined"
            fullWidth
            value={String(user) || ''}
            onChange={onSelect(setUser)}
            displayEmpty
          >
            <MenuItem value='' disabled>{'Пользователь'}</MenuItem>
            {
              users.map(u =>
                <MenuItem value={u.id} key={u.id}>{u.name}</MenuItem>
              )
            }
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            variant="outlined"
            multiple
            fullWidth
            value={group || ''}
            displayEmpty
            onChange={handleChange}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {
                  (selected as string[]).length
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
          <KeyboardDatePicker
            fullWidth
            margin="normal"
            label="Дата рождения"
            format="MM/dd/yyyy"
            value={dob}
            onChange={handleDateChange}
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
