import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TableContainer, Paper, Table, TableBody } from '@material-ui/core'
import { ITableTemplateProps } from '../../interfaces/components.interfaces'

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

export const TableTemplate: React.FC<ITableTemplateProps> = ({ children, header }) => {
  const classes = useStyles()
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        {header}
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
