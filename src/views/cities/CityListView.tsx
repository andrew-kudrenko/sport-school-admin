import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CitiesTable } from '../../components/cities/CitiesTable'
import { EditorLayout } from '../../components/layouts/editor-layout/EditorLayout'
import { TableLayout } from '../../components/layouts/TableLayout'
import { useSelected } from '../../hooks/selected.hook'
import { IState } from '../../interfaces/redux.interfaces'
import { removeCity } from '../../redux/actions/cities.actions'

export const CityListView: React.FC = () => {
    const dispatch = useDispatch()
    const { list, error, loading } = useSelector((state: IState) => state.cities)

    const { selected, ...s } = useSelected()
    
    const onRemove = () => {
        dispatch(removeCity(selected))
    }

    return (
        <EditorLayout onRemove={onRemove}>
            <TableLayout list={list} error={error.read} loading={loading.read}>
                <CitiesTable list={list} {...s} />
            </TableLayout>
        </EditorLayout>
    )
}