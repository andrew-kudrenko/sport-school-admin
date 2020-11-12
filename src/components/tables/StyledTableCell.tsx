import React from 'react'
import { Theme, createStyles, TableCell } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

export const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            // backgroundColor: theme.palette.primary.main,
            // color: theme.palette.common.white
        },
        body: {
            fontSize: 14
        },
    }),
)(TableCell)
