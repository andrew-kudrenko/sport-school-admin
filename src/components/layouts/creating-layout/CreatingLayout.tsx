import React from 'react'
import { Typography, Box, Button } from '@material-ui/core'
import { SaveOutlined } from '@material-ui/icons'
import { ICreatingLayoutProps } from '../../../interfaces/components.interfaces'

export const CreatingLayout: React.FC<ICreatingLayoutProps> = ({ children, onSaveAndResume, onSave }) => {
    return (
        <>
            <Typography variant="h5">
                {'Добавить'}
            </Typography>
            { children}
            <Box 
                display="flex" 
                justifyContent="flex-end" 
                alignItems="center" 
                marginBottom={2}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<SaveOutlined />}
                    onClick={onSaveAndResume}
                >
                    {'Сохранить и продолжить редактирование'}
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<SaveOutlined />}
                    onClick={onSave}
                >
                    {'Сохранить и добавить другой объект'}
                </Button>
            </Box>
        </>
    )
}