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
import { useFileUploading } from '../../hooks/file-uploading'
import { validate } from '../../helpers/truthy-validator.helper'
import { FileLoader } from '../file-loader/FileLoader'
import { Nullable } from '../../types/common.types'

export const TournamentsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
    const editing = mode === 'edit'

    const id = useIDParam()
    const { onChange } = useFormHandlers()
    const { user } = useSelector((state: IState) => state.auth)

    const { preview, setPreview, locked, ...rest } = useFileUploading(`/posts/tournament/${id}/upload_photo/`)

    const [author, setAuthor] = useState(user?.id || '')
    const [text, setText] = useState('')
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [img, setImg] = useState<Nullable<string>>(null)

    const [forSending, setForSending] = useState({ text, year, img: preview ? img : null, author_id: author })

    const { value: tournament, loading: fetching } = useGetQuery<ITournament & { author: IUser }>(`posts/tournament/${id}`)

    const { execute: onAdd, loading: adding } = usePostQuery('posts/tournament', forSending)
    const { execute: onModify, loading: modifying } = usePutQuery(`posts/tournament/${id}`, forSending)
    const { execute: onRemove, loading: removing } = useDeleteQuery(`posts/tournament/${id}`)

    const isValid: boolean = validate([text, !locked, year])
    const loading = collectCRUDLoading([adding, fetching, modifying, removing])

    const onClearAll = () => {
        setAuthor('')
        setText('')
        setYear(new Date().getFullYear())
        setPreview(null)
        setImg(null)
    }

    useEffect(() => {
        if (editing && tournament) {
            setAuthor(tournament.author.id)
            setText(tournament.text)
            setYear(tournament.year)

            if (tournament.img) {
                setImg(tournament.img)
                setPreview(`http://localhost:8000/${tournament.img}`)
            }
        }
    }, [tournament])

    useEffect(() => {
        if (isValid) {
            setForSending({ text, year, img: preview ? img : null, author_id: author })
        }
    }, [text, year, user, img, preview])

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
                }, 250)
            }}
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
                {
                    editing &&
                    <Grid item xs={12}>
                        <FileLoader preview={preview} {...rest} />
                    </Grid>
                }
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
