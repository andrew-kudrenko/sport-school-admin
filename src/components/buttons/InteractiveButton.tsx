import React from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { Button, CircularProgress } from '@material-ui/core'
import { InteractiveButtonProps } from '../../interfaces/components.interfaces'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative'
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700]
            }
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12
        }
    }),
)

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({ loading, success, onClick, children, ...props }) => {
    const classes = useStyles()
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success
      })

    return (
        <div className={classes.wrapper}>
            <Button
                {...props}
                className={buttonClassname}
                disabled={loading}
                onClick={onClick}
            >
                {children}
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    )
}