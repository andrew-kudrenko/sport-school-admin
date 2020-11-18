// import React, { useEffect, useState } from 'react'
// import { Grid, TextField, Select, MenuItem } from '@material-ui/core'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { EditorFormLayout } from '../../components/layouts/EditorFormLayout'
// import { useFormHandlers } from '../../hooks/form-handlers.hooks'
// import { IEntityEditorProps } from '../../interfaces/components.interfaces'
// import { IDType } from '../../interfaces/entities.interfaces'
// import { IState } from '../../interfaces/redux.interfaces'
// import { addTournament, modifyTournament, removeTournament } from '../../redux/actions/tournaments.actions'

// export const TournamentsEditorLayout: React.FC<IEntityEditorProps> = ({ mode, title }) => {
//     const editing = mode === 'edit'

//     const { id } = useParams<{ id?: IDType }>()
//     const { onChange, onSelect } = useFormHandlers()

//     const [name, setName] = useState('')
//     const [date, setDate] = useState<Date | null>(null)
//     const [time, setTime] = useState<Date | null>(null)
//     const [year, setYear] = useState<number | null>(null)
//     const [image, setImage] = useState('')
//     const [description, setDescription] = useState('')

//     const dispatch = useDispatch()
//     const { loading, list: tournaments } = useSelector((state: IState) => state.tournaments)

//     const isValid: boolean = !!name && !!date && !!time && !!year && !!image && !!description

//     const onClearAll = () => {
//         setName('')
//         setDate(null)
//         setTime(null)
//         setYear(null)
//         setImage('')
//         setDescription('')
//     }

//     const onAdd = dispatch.bind(null, addTournament({ name, city_id: city as string, address, description }))

//     let onModify = () => {}

//     if (editing && id) {
//         onModify = dispatch.bind(null, modifyTournament(id, { name, city_id: city as string, address, description }))
//     }

//     let onRemove = () => {}

//     if (editing && !!id?.toString()) {
//         onRemove = dispatch.bind(null, removeTournament(id))
//     }

//     useEffect(() => {
//         const tournament = tournaments.find(t => t.id === id)

//         if (editing && tournament) {
//             setName(tournament.name)    
//             set(tournament.city_id)    
//             setDescription(tournament.description)    
//             setAddress(tournament.address)    
//         }
//     }, [])

//     return (
//         <EditorFormLayout
//             mode={mode}
//             onAdd={onAdd}
//             onModify={onModify}
//             onRemove={onRemove}
//             onClearAll={onClearAll}
//             isValid={isValid}
//             redirectTo="/schools/"
//             title={title}
//             loading={loading}
//         >
//             <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         variant="outlined"
//                         fullWidth
//                         label="Название"
//                         autoFocus
//                         value={name}
//                         onChange={onChange(setName)}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Select
//                         variant="outlined"
//                         fullWidth
//                         value={city || ''}
//                         onChange={onSelect(setCity)}
//                         displayEmpty
//                     >
//                         <MenuItem value='' disabled>{'Город'}</MenuItem>
//                         {
//                             cities.map(c =>
//                                 <MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>
//                             )
//                         }
//                     </Select>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField
//                         variant="outlined"
//                         fullWidth
//                         label="Адрес"
//                         value={address}
//                         onChange={onChange(setAddress)}
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField
//                         variant="outlined"
//                         fullWidth
//                         label="Описание"
//                         multiline
//                         rows={7}
//                         value={description}
//                         onChange={onChange(setDescription)}
//                     />
//                 </Grid>
//             </Grid>
//         </EditorFormLayout>
//     )
// }

export const a = 0