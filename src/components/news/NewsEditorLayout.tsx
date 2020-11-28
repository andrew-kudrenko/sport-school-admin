import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Grid, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
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

const useStyles = makeStyles((theme: Theme) => ({
  preview: {
    height: 75,
  },
  fileLoader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loaderButtons: {
    display: 'flex',
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  input: {
    display: 'hidden',
  },
}))

export const NewsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title: pageTitle }) => {
  const classes = useStyles()
  const editing = mode === 'edit'

  const id = useIDParam()

  const { user } = useSelector((state: IState) => state.auth)
  const author_id = useRef(user?.id).current

  const { value: news, loading: fetching } = useGetQuery<INews>(`posts/news/${id}`)
  const { change, clearFile, upload, preview, setPreview, locked } = useFileUploading()

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
  }, [title, text, preview])

  useEffect(() => {
    if (editing && news) {
      setTitle(news.title)
      setText(news.text)

      if (news.img) {
        setPreview(news.img)
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
      onAdd={onAdd}
      onClearAll={onClearAll}
      onRemove={onRemove}
      onModify={onModify}
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
          <>
            <Grid item xs={12}>
              <Box className={classes.fileLoader}>
                <Box>
                  {
                    preview
                      ? <img alt="preview" src={preview} className={classes.preview} />
                      : <Typography variant="subtitle1">{'Выберите изображение'}</Typography>
                  }
                </Box>
                <input
                  style={{ display: 'none' }}
                  accept="image/*"
                  className={classes.input}
                  id="file-loader"
                  type="file"
                  onChange={(event) => {
                    change(event)
                  }}
                />
                <Box className={classes.loaderButtons}>
                  <Button
                    onClick={async () => {
                      await upload(`http://localhost:8000/posts/news/${id}/upload_photo/`)
                    }}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    {'Сохранить'}
                  </Button>
                  <label htmlFor="file-loader">
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      component="span"
                    >
                      {'Загрузить'}
                    </Button>
                  </label>
                  <Button
                    onClick={clearFile}
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                  >
                    {'Очистить'}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </>
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