import React, { useEffect, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { EditorFormLayout } from '../layouts/EditorFormLayout'
import { useParams } from 'react-router-dom'
import { IDType } from '../../interfaces/entities.interfaces'
import { addNews, modifyNews, removeNews } from '../../redux/actions/news.actions'

export const NewsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
  const editing = mode === 'edit'

  const { id } = useParams<{ id?: IDType }>()
  const { user} = useSelector((state: IState) => state.auth)
  const { list: news } = useSelector((state: IState) => state.news)
  const dispatch = useDispatch()

  const author_id = user?.id
  const [img, setImg] = useState('')
  const [text, setText] = useState('')

  const { loading } = useSelector((state: IState) => state.news)
  const { onChange } = useFormHandlers()

  const isValid: boolean = [text, img].reduce((acc: boolean, item) => Boolean(acc) && Boolean(item), true)

  const onClearAll = () => {
    setText('')
    setImg('')
  }

  const onAdd = dispatch.bind(null, addNews({ author_id: author_id as string, img, text }))

  let onModify = () => { }
  if (!!id?.toString()) {
    onModify = dispatch.bind(null, modifyNews(id, { author_id: author_id as string, img, text }))
  }

  let onRemove = () => { }

  if (editing && !!id?.toString()) {
    onRemove = dispatch.bind(null, removeNews(id))
  }

  useEffect(() => {
    const current = news.find(n => n.id.toString() === id)

    if (editing && current) {
      setText(current.text)
      setImg(current.img)
    }
  }, [])

  return (
    <EditorFormLayout
      mode={mode}
      isValid={isValid}
      redirectTo="/news/"
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
            autoFocus
            variant="outlined"
            fullWidth
            label="Изображение"
            value={img}
            onChange={onChange(setImg)}
          />
        </Grid>
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