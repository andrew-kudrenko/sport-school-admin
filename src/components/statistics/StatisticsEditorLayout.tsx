import React, { useEffect, useState } from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { Grid, Select, MenuItem } from '@material-ui/core'
import { EditorFormLayout } from '../../components/layouts/EditorFormLayout'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IDType, IStatistics, IStudent } from '../../interfaces/entities.interfaces'
import { useFoundStudents } from '../../hooks/found-by-city.hook'
import { collectCRUDLoading } from '../../helpers/crud-loading.helper'
import { splitDate } from '../../helpers/date-splitter.helper'
import { useIDParam } from '../../hooks/id-param.hook'
import { usePostQuery, usePutQuery, useDeleteQuery, useGetQuery } from '../../hooks/query.hook'
import { useDocumentFileUploading } from '../../hooks/file-uploading'
import { Nullable } from '../../types/common.types'
import { validate } from '../../helpers/truthy-validator.helper'
import { DocumentFileLoader } from '../file-loader/DocumentFileLoader'
import { API_URL } from '../../helpers/api.helper'

export const StatisticsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
  const editing = mode === 'edit'

  const id = useIDParam()
  const { onSelect, onDateChange } = useFormHandlers()

  const { preview, setPreview, locked, ...rest } = useDocumentFileUploading(`/persons/stats/${id}/upload_stats_pdf/`)

  const [child, setChild] = useState<Nullable<IDType>>(null)
  const [date, setDate] = useState<Nullable<Date>>(new Date())
  const [img, setImg] = useState<Nullable<string>>(null)

  const forSending = { children_id: Number.parseInt(child || ''), date: splitDate(date || new Date()), file: preview ? img : null }

  const { students } = useFoundStudents()

  const { execute: onAdd, loading: adding } = usePostQuery('persons/stats', forSending)
  const { execute: onModify, loading: modifying } = usePutQuery(`persons/stats/${id}`, forSending)
  const { execute: onRemove, loading: removing } = useDeleteQuery(`persons/stats/${id}`)

  const { value: stats, loading: fetching } = useGetQuery<IStatistics & { children: IStudent }>(`persons/stats/${id}`)

  const isValid = validate([child, date, !locked])
  const loading = collectCRUDLoading([adding, fetching, modifying, removing])

  const onClearAll = () => {
    setChild(null)
    setDate(new Date())
    setPreview(null)
    setImg(null)
  }

  useEffect(() => {
    if (editing && stats) {
      setChild(stats.children.id)
      setDate(new Date(stats.date))
      
      if (stats.file) {
        setImg(stats.file)
        setPreview(`${API_URL}/${stats.file}`)
      }
    }
  }, [stats])

  console.log(preview, img)

  return (
    <EditorFormLayout
      mode={mode}
      onAdd={async () => {
        await onAdd()

        window.setTimeout(async () => {
          await rest.onUpload()
        }, 500)
      }}
      onModify={async () => {
        await onModify()

        window.setTimeout(async () => {
          await rest.onUpload()
        }, 500)
      }}
      onRemove={onRemove}
      onClearAll={onClearAll}
      isValid={isValid}
      redirectTo="/statistics/"
      title={title}
      loading={loading}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        {
          editing &&
          <Grid item xs={12}>
            <DocumentFileLoader preview={preview} {...rest} />
          </Grid>
        }
        <Grid item xs={12}>
          <KeyboardDatePicker
            fullWidth
            margin="normal"
            label="Дата"
            format="MM/dd/yyyy"
            value={date}
            onChange={onDateChange(setDate)}
          />
        </Grid>
      </Grid>
    </EditorFormLayout>
  )
}