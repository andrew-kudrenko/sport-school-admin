import { Box, Button } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import React from 'react'

export const ActionsBar: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" marginBottom={2}>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteOutline />}
      >
        Delete
      </Button>
    </Box>
  )
}