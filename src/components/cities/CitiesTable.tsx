import React from 'react'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Checkbox } from '@material-ui/core'
import { ICity } from '../../interfaces/entities.interfaces'
import { ITableProps } from '../../interfaces/components.interfaces'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

export const CitiesTable: React.FC<ITableProps<ICity>> = ({ allSelected, list, has, onToggle, onToggleAll }) => {
  const classes = useStyles()
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Checkbox
                checked={allSelected(list)}
                onClick={onToggleAll.bind(null, list)}
              />
            </StyledTableCell>
            <StyledTableCell>
              {'Название'}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((city) => (
            <StyledTableRow key={city.id}>
              <StyledTableCell component="th" scope="row">
                <Checkbox
                  checked={has(city.id)}
                  onClick={onToggle.bind(null, city.id)}
                />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {city.name}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
