import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';


export const Skelet = () => {

  return (
    <Container maxWidth="false" sx={{marginTop: "2rem"}}>
      <Grid container spacing={4}>
       <Grid item xs={12} sm={6} md={4} xl={3}>
          <Skeleton variant="rect" width={345} height={500} />
        </Grid>
      </Grid>
    </Container>
  )
}
