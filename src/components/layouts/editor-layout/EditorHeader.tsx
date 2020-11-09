import { Box, Button, Typography } from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'
import React from 'react'

export const EditorHeader: React.FC = () =>
    <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="h5">
            Выберите для изменения
        </Typography>
        <Button
            variant="contained"
            color="secondary"
            startIcon={<AddCircleOutline />}
        >
            Добавить
        </Button>
    </Box>