import React, { useEffect, useState } from 'react'
import { Grid, MenuItem, Select, TextField } from '@material-ui/core'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { EditorFormLayout } from '../layouts/EditorFormLayout'
import { useIDParam } from '../../hooks/id-param.hook'
import { useDeleteQuery, useGetQuery, usePostQuery, usePutQuery } from '../../hooks/query.hook'
import { validate } from '../../helpers/truthy-validator.helper'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { IDType } from '../../interfaces/entities.interfaces'
import { Nullable } from '../../types/common.types'
import { useFoundCities } from '../../hooks/found-by-city.hook'
import { splitDate } from '../../helpers/date-splitter.helper'

export const TicketsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title: pageTitle }) => {
  const editing = mode === 'edit'
  const baseURL = 'shop/season_tickets'

  const id = useIDParam()
  let { value: tickets, loading, execute: fetchTickets } = useGetQuery<Array<any>>(baseURL)
  const { cities } = useFoundCities()

  const [title, setTitle] = useState('')
  const [cost, setCost] = useState(0)
  const [lessons, setLessons] = useState<Nullable<number>>(null)
  const [date, setDate] = useState<Nullable<Date>>(null)
  const [city, setCity] = useState<Nullable<IDType>>(null)

  const forSending = { title, cost, lessons, city_id: city, to_date: date ? splitDate(date) : null }

  const { onChange, onDateChange, onSelect } = useFormHandlers()
  const onClearAll = () => {
    setTitle('')
    setCost(0)
    setLessons(null)
    setDate(null)
    setCity(null)
  }

  const { execute: onAdd, loading: adding } = usePostQuery(baseURL, forSending)
  const { execute: onModify, loading: modifying } = usePutQuery(`${baseURL}/${id}`, forSending)
  const { execute: onRemove, loading: removing } = useDeleteQuery(`${baseURL}/${id}`)

  const isValid = validate([title, String(cost)])

  useEffect(() => {
    const current = tickets?.find(t => String(t.id) === id)

    if (editing && current) {
      setTitle(current.title)
      setCost(current.cost)

      if (current.city) {
        setCity(current.city_id)
      }

      if (current.date) {
        setDate(current.date)
      }

      if (current.lessons) {
        setLessons(current.lessons)
      }
    }
  }, [tickets])

  return (
    <EditorFormLayout
      mode={mode}
      isValid={isValid}
      redirectTo="/tickets/"
      title={pageTitle}
      loading={{ read: loading, create: adding, update: modifying, delete: removing }}
      onAdd={onAdd}
      onClearAll={onClearAll}
      onRemove={async () => {
        await onRemove()
        await fetchTickets()
      }}
      onModify={onModify}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Название"
            autoFocus
            value={title}
            onChange={onChange(setTitle)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Стоимость"
            value={cost}
            onChange={onChange(setCost)}
          />
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
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Уроки"
            value={String(lessons)}
            onChange={onChange(setLessons)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <KeyboardDatePicker
            fullWidth
            margin="normal"
            label="Дата действия"
            format="MM/dd/yyyy"
            value={date}
            onChange={onDateChange(setDate)}
          />
        </Grid>
      </Grid>
    </EditorFormLayout>
  )
}