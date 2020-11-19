import React, { useEffect, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EditorFormLayout } from '../../components/layouts/EditorFormLayout'
import { useFormHandlers } from '../../hooks/form-handlers.hooks'
import { IEntityEditorProps } from '../../interfaces/components.interfaces'
import { IDType } from '../../interfaces/entities.interfaces'
import { IState } from '../../interfaces/redux.interfaces'
import { addTournament, modifyTournament, removeTournament } from '../../redux/actions/tournaments.actions'

export const TournamentsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
    const editing = mode === 'edit'

    const { id } = useParams<{ id?: IDType }>()
    const { onChange } = useFormHandlers()

    const [text, setText] = useState('')
    const [year, setYear] = useState<number | null>(null)
    const [img, setImg] = useState('')

    const dispatch = useDispatch()

    const { user } = useSelector((state: IState) => state.auth)
    const { loading, list: tournaments } = useSelector((state: IState) => state.tournaments)

    let author_id = user!.id
    const isValid: boolean = [text, img, year].reduce((acc: boolean, item) => Boolean(acc) && Boolean(item), true)

    const onClearAll = () => {
        setText('')
        setYear(null)
        setImg('')
    }

    const onAdd = dispatch.bind(null, addTournament({ text, year: year as number, img, author_id }))

    let onModify = () => {}

    if (editing && id) {
        onModify = dispatch.bind(null, modifyTournament(id, { text, year: year as number, img, author_id }))
    }

    let onRemove = () => {}

    if (editing && !!id?.toString()) {
        onRemove = dispatch.bind(null, removeTournament(id))
    }

    useEffect(() => {
        const tournament = tournaments.find(t => t.id === id)

        if (editing && tournament) {
            author_id = tournament.author_id
            setText(tournament.text)    
            setImg(tournament.img)    
            setYear(tournament.year)    
        }
    }, [])

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
