import React from 'react'
import { Link, Typography } from '@material-ui/core'

export const Copyright: React.FC = () =>
  <Typography
    variant="body2"
    color="textSecondary"
    align="center"
  >
    {'Copyright © '}
    <Link
      color="inherit"
      href="https://material-ui.com/"
      target="_blank"
    >
      Your Website
      </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>