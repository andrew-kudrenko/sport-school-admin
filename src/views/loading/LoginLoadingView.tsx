import React from 'react'
import { Box, LinearProgress, makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
    },
    progress: {
        display: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
    },
    main: {
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    img: {
        width: 128,
        height: 128
    }
}))

export const LoginLoadingView: React.FC = () => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <LinearProgress className={classes.progress} />
            <Box className={classes.main}>
                {/* <img
                    alt="Login..."
                    src="https://image.flaticon.com/icons/png/128/1960/1960858.png"
                />
                <Typography variant="h3">
                    {'Вход в систему...'}
                </Typography> */}
            </Box>
        </Box>
    )
}