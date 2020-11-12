import React from 'react'
import { Theme, createStyles, TableRow } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

export const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        // root: {
        //     '&:nth-of-type(odd)': {
        //         backgroundColor: theme.palette.action.hover,
        //     },
        // },
    }),
)(TableRow)