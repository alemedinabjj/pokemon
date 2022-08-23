import { Box } from '@mui/system'
import React from 'react'
import Typography from '@mui/material/Typography'

export const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '3rem',
        background: '#1976d2',
        boxSizing: 'border-box',
        margin: 0,
        marginTop: '.5rem',
        position: 'relative',
        bottom: 0
      }}
    >
      <Typography gutterBottom variant="h6" component="div" color="white" textAlign="center">
        &copy; Alexandre Medina
      </Typography>
    </Box>
  )
}
