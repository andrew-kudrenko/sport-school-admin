import React, { useEffect, useState } from 'react'
import { Chip, createStyles, Grid, Input, makeStyles, MenuItem, Select, TextField } from '@material-ui/core'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { EditorFormLayout } from '../layouts/EditorFormLayout'
import { IDType, IGroup } from '../../interfaces/entities.interfaces'
import { useFoundCoaches, useFoundSchools } from '../../hooks/found-by-city.hook'
import { Nullable } from '../../types/common.types'
import { validate } from '../../helpers/truthy-validator.helper'
import { useIDParam } from '../../hooks/id-param.hook'
import { useGetQuery, usePostQuery, usePutQuery, useDeleteQuery } from '../../hooks/query.hook'
import { collectCRUDLoading } from '../../helpers/crud-loading.helper'

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

export const GroupsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
  const classes = useStyles()
  const editing = mode === 'edit'

  const id = useIDParam()
  const { value: group, loading: fetching } = useGetQuery<IGroup>(`persons/groups/${id}`)

  const { schools } = useFoundSchools()
  const { coaches } = useFoundCoaches()

  const [school, setSchool] = useState<Nullable<IDType>>(null)
  const [year, setYear] = useState<Nullable<number>>(null)
  const [schedule, setSchedule] = useState('')
  const [tgUrl, setTgUrl] = useState('')
  const [coachesID, setCoachesID] = useState<Array<IDType>>([])

  const [forSending, setForSending] = useState({
    item: {
      year,
      schedule,
      tg_url: tgUrl,
      school_id: school,
    },
    trainer_ids: coachesID
  })

  const { onChange, onSelect } = useFormHandlers()

  const onClearAll = () => {
    setSchool(null)
    setYear(null)
    setSchedule('')
    setTgUrl('')
    setCoachesID([])
  }

  const { execute: onAdd, loading: adding } = usePostQuery('persons/groups', forSending)
  const { execute: onModify, loading: modifying } = usePutQuery(`persons/groups/${id}`, forSending)
  const { execute: onRemove, loading: removing } = useDeleteQuery(`persons/groups/${id}`)

  const isValid = validate([year, schedule, tgUrl, school])

  const loading = collectCRUDLoading([adding, fetching, modifying, removing])

  useEffect(() => {
    setForSending({
      item: {
        year,
        schedule,
        tg_url: tgUrl,
        school_id: school,
      },
      trainer_ids: coachesID
    })
  }, [year, schedule, tgUrl, school, coachesID])
  console.log(forSending)
  useEffect(() => {
    if (editing && group) {
      setYear(group.year)
      setSchool(group.school_id)
      setTgUrl(group.tg_url)
      setSchedule(group.schedule)
    }
  }, [group])

  const handleChange = (callback: (value: any) => any) => (event: React.ChangeEvent<{ value: unknown }>) => {
    callback(event.target.value as string[])
  }

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
          <Grid item xs={12}>
            <Select
              variant="outlined"
              multiple
              fullWidth
              value={coachesID || ''}
              displayEmpty
              onChange={handleChange(setCoachesID)}
              input={<Input />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {
                    (selected as string[])?.length
                      ?
                      (selected as string[]).map((value) => (
                        <Chip key={value} label={coaches.find(c => c.id === value)?.name || ''} className={classes.chip} />
                      ))
                      : 'Тренеры'
                  }
                </div>
              )}
            >
              <MenuItem value='' disabled>{'Тренеры'}</MenuItem>
              {
                coaches.map(c =>
                  <MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>
                )
              }
            </Select>
          </Grid>
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