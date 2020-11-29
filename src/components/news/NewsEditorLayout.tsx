import React, { useEffect, useRef, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { EditorFormLayout } from '../layouts/EditorFormLayout'
import { useIDParam } from '../../hooks/id-param.hook'
import { useDeleteQuery, useGetQuery, usePostQuery, usePutQuery } from '../../hooks/query.hook'
import { INews } from '../../interfaces/entities.interfaces'
import { validate } from '../../helpers/truthy-validator.helper'
import { collectCRUDLoading } from '../../helpers/crud-loading.helper'
import { useFileUploading } from '../../hooks/file-uploading'
import { FileLoader } from '../file-loader/FileLoader'

export const NewsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title: pageTitle }) => {
  const editing = mode === 'edit'

  const id = useIDParam()

  const { user } = useSelector((state: IState) => state.auth)
  const author_id = useRef(user?.id).current

  const { value: news, loading: fetching } = useGetQuery<INews>(`posts/news/${id}`)
  const { preview, setPreview, locked, ...rest } = useFileUploading(`/posts/news/${id}/upload_photo/`)

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const [forSending, setForSending] = useState({ title, text, img: preview, author_id })

  const { onChange } = useFormHandlers()

  const isValid = validate([text, pageTitle, !locked])

  const { execute: onAdd, loading: adding } = usePostQuery('posts/news', forSending)
  const { execute: onModify, loading: modifying } = usePutQuery(`posts/news/${id}`, forSending)
  const { execute: onRemove, loading: removing } = useDeleteQuery(`posts/news/${id}`)

  const loading = collectCRUDLoading([fetching, adding, modifying, removing])

  const onClearAll = () => {
    setText('')
    setTitle('')
    setPreview(null)
  }

  useEffect(() => {
    if (isValid) {
      setForSending({ title, text, img: preview, author_id })
    }
  }, [title, text])

  useEffect(() => {
    if (editing && news) {
      setTitle(news.title)
      setText(news.text)

      if (news.img) {
        setPreview(`http://localhost:8000/${news.img}`)
      }
    }
  }, [news])

  return (
    <EditorFormLayout
      mode={mode}
      isValid={isValid}
      redirectTo="/news/"
      title={pageTitle}
      loading={loading}
      onAdd={async () => {
        await onAdd()
        await rest.onUpload()
      }}
      onClearAll={onClearAll}
      onRemove={onRemove}
      onModify={async () => {
        await onModify()
        await rest.onUpload()
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoFocus
            variant="outlined"
            fullWidth
            label="Заголовок"
            value={title}
            onChange={onChange(setTitle)}
          />
        </Grid>
        {
          editing &&
          <Grid item xs={12}>
            <FileLoader preview={preview} {...rest} />
          </Grid>
        }
        <Grid item xs={12}>
          <TextField
            multiline
            rows={7}
            variant="outlined"
            fullWidth
            label="Текст"
            value={text}
            onChange={onChange(setText)}
          />
        </Grid>
      </Grid>
    </EditorFormLayout>
  )
}