import React from 'react'
import { Checkbox } from '@material-ui/core'
import { ICheckableTableProps } from '../../interfaces/components.interfaces'
import { StyledTableCell } from './StyledTableCell'
import { StyledTableRow } from './StyledTableRow'

export const CheckableTableRow: React.FC<ICheckableTableProps> = ({ checked, onToggle, children }) =>
    <StyledTableRow>
        <StyledTableCell component="th" scope="row">
            <Checkbox
                checked={checked}
                onClick={onToggle}
            />
        </StyledTableCell>
        {children}
    </StyledTableRow>
