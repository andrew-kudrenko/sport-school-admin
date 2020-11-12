import React from 'react'
import { useSelector } from 'react-redux'
import { CheckableTableHeader } from '../../components/tables/CheckableTableHeader'
import { CheckableTableRow } from '../../components/tables/CheckableTableRow'
import { StyledTableCell } from '../../components/tables/StyledTableCell'
import { TableTemplate } from '../../components/tables/TableTemplate'
import { useSelected } from '../../hooks/selected.hook'
import { IState } from '../../interfaces/redux.interfaces'

export const ManageCitiesView: React.FC = () => {
    const { list } = useSelector((state: IState) => state.cities)
    const { allSelected, onToggleAll, has, onToggle } = useSelected()

    return (
        <>
            <TableTemplate
                header={
                    <CheckableTableHeader
                        allSelected={allSelected(list)}
                        onToggleAll={onToggleAll.bind(null, list)}
                    >
                        <StyledTableCell>
                            {'Название'}
                        </StyledTableCell>
                    </CheckableTableHeader>
                }
            >
                {
                    list.map(c =>
                        <CheckableTableRow
                            key={c.id}
                            checked={has(c.id)}
                            onToggle={onToggle.bind(null, c.id)}
                        >
                            <StyledTableCell>
                                {c.name}
                            </StyledTableCell>
                        </CheckableTableRow>
                    )
                }
            </TableTemplate>
        </>
    )
}