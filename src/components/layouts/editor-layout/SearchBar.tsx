import React from 'react'
import { createStyles, IconButton, InputBase, makeStyles, Paper, Theme } from '@material-ui/core'
import { Search } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      marginBottom: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: 800
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
)

export const SearchBar: React.FC = () => {
  const classes = useStyles()

  return (
    <Paper component="form" className={classes.root}>
      {/* <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <InputBase
        className={classes.input}
        placeholder="Введите поисковой запрос"
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <Search />
      </IconButton>
    </Paper>
  )
}