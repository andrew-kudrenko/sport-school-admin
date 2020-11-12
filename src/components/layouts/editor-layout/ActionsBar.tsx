import React from 'react'
import { DeleteOutline } from '@material-ui/icons'
import { Box, Button } from '@material-ui/core'
import { IActionsBarProps } from '../../../interfaces/components.interfaces'

export const ActionsBar: React.FC<IActionsBarProps> = ({ onRemove }) => {
  return (
    <Box display="flex" alignItems="center" marginBottom={2}>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteOutline />}
        onClick={onRemove}
      >
        Удалить
      </Button>
    </Box>
  )
}