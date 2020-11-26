import React, { useEffect, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { EditorFormLayout } from '../../components/layouts/EditorFormLayout'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { ITournament, IUser } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { collectCRUDLoading } from '../../helpers/crud-loading.helper'
import { useIDParam } from '../../hooks/id-param.hook'
import { useGetQuery, usePostQuery, usePutQuery, useDeleteQuery } from '../../hooks/query.hook'

export const TournamentsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
    const editing = mode === 'edit'

    const id = useIDParam()
    const { onChange } = useFormHandlers()
    const { user } = useSelector((state: IState) => state.auth)

    const [author, setAuthor] = useState(user?.id || '')
    const [text, setText] = useState('')
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [img, setImg] = useState('')

    const [forSending, setForSending] = useState({ text, year, img, author_id: author })
    console.log(forSending)

    const { value: tournament, loading: fetching } = useGetQuery<ITournament & { author: IUser }>(`posts/tournament/${id}`)

    const { execute: onAdd, loading: adding } = usePostQuery('posts/tournament', forSending)
    const { execute: onModify, loading: modifying } = usePutQuery(`posts/tournament/${id}`, forSending)
    const { execute: onRemove, loading: removing } = useDeleteQuery(`posts/tournament/${id}`)

    const isValid: boolean = [text, img, year].reduce((acc: boolean, item) => Boolean(acc) && Boolean(item), true)
    const loading = collectCRUDLoading([adding, fetching, modifying, removing])

    const onClearAll = () => {
        setAuthor('')
        setText('')
        setYear(new Date().getFullYear())
        setImg('')
    }

    useEffect(() => {
        if (editing && tournament) {
            setAuthor(tournament.author.id)
            setText(tournament.text)
            setImg(tournament.img)
            setYear(tournament.year)
        }
    }, [tournament])

    useEffect(() => {
        setForSending({ text, year, img, author_id: author })
    }, [text, year, img, user])

    return (
        <EditorFormLayout
            mode={mode}
            onAdd={onAdd}
            onModify={onModify}
            onRemove={onRemove}
            onClearAll={onClearAll}
            isValid={isValid}
            redirectTo="/tournaments/"
            title={title}
            loading={loading}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Год"
                        autoFocus
                        value={year}
                        onChange={onChange(setYear)}
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
                        label="Описание"
                        multiline
                        rows={7}
                        value={text}
                        onChange={onChange(setText)}
                    />
                </Grid>
            </Grid>
        </EditorFormLayout>
    )
}
