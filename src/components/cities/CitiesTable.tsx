import React from 'react'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { IState } from '../../interfaces/redux.interfaces'
import { useSelector } from 'react-redux'
import { useSelected } from '../../hooks/selected.hook'
import { Checkbox } from '@material-ui/core'
import { IDType } from '../../interfaces/entities.interfaces'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
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

export const CitiesTable: React.FC = () => {
  const classes = useStyles()
  const { list } = useSelector((state: IState) => state.cities)

  const { selected, select, unselect, has } = useSelected()

  const onToggleAll = () => {
    const keys: Array<IDType> = list.map(c => c.id as IDType)

    if (!selected) {
      select(keys)
    } else {
      unselect(keys)
    }
  }

  const allSelected: boolean = list.length === selected.length

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Checkbox
                checked={allSelected}
                onClick={onToggleAll}
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
                  checked={has(city?.id)}
                  onClick={select.bind(null, city.id as IDType)}
                />              </StyledTableCell>
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
