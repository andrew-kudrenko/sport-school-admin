import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles, lighten, Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'
import { IEnhancedTableToolbarProps } from '../../interfaces/components.interfaces'
import { NavLink } from 'react-router-dom'

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: '1 1 100%',
        },
    }),
)

export const EnhancedTableToolbar: React.FC<IEnhancedTableToolbarProps> = ({ numSelected, title, onRemove }) => {
    const classes = useToolbarStyles()
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {`${numSelected} выбрано`}
                </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        {title}
                    </Typography>
                )}
            {numSelected > 0 ? (
                <Tooltip title="Удалить">
                    <IconButton onClick={onRemove}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            ) : (   
                    <>
                        {/* <Tooltip title="Фильтры">
                            <IconButton>
                                <FilterList />
                            </IconButton>
                        </Tooltip> */}
                        <Tooltip title="Добавить">
                            <IconButton to="add" component={NavLink}>
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
        </Toolbar>
    )
}