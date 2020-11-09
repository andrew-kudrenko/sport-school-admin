import { Box, Container, makeStyles } from '@material-ui/core'
import React from 'react'
import { Nav } from '../nav/Nav'
import { EditorLayout } from './editor-layout/EditorLayout'

const useStyles = makeStyles(theme => ({
    main: {
        padding: theme.spacing(3),
        paddingTop: `${theme.spacing(3) + 64}px`, 
        paddingLeft: `${theme.spacing(3) + 72}px`
    }
}))

export const RootLayout: React.FC = ({ children }) => {
    const classes = useStyles()

    return (
        <>
            <Nav />
            <Container>
                <Box className={classes.main}>
                    <EditorLayout>
                        {children}
                    </EditorLayout>
                </Box>
            </Container>
        </>
    )
}