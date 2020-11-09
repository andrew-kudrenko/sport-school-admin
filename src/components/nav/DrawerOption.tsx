import React from 'react'
import { Box, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { IDrawerOptionProps } from '../../interfaces/components.interfaces'

export const DrawerOption: React.FC<IDrawerOptionProps> = ({ icon, text, to }) =>
  <ListItem
    to={to}
    component={NavLink}
    button
  >
    <Box width={"100%"} display="flex" justifyContent="space-between" alignItems="center">
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
      {/* <Box display="flex" justifyContent="space-between" alignItems="center">
        <NavLink to={`${to}/add`}>
          <ListItemIcon>
            <AddCircleOutline />
          </ListItemIcon>
        </NavLink>
      </Box> */}
    </Box>
  </ListItem>