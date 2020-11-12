import React from 'react'
import { TableHead, TableRow, Checkbox } from '@material-ui/core'
import { ICheckableTableHeaderProps } from '../../interfaces/components.interfaces'
import { StyledTableCell } from './StyledTableCell'

export const CheckableTableHeader: React.FC<ICheckableTableHeaderProps> = ({ allSelected, onToggleAll, children }) =>
    <TableHead>
        <TableRow>
            <StyledTableCell>
                <Checkbox
                    checked={allSelected}
                    onClick={onToggleAll}
                />
            </StyledTableCell>
            {children}
        </TableRow>
    </TableHead>