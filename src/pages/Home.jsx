import { Container } from '@mui/material'
import React from 'react'
import PokeCard from '../components/PokeCard'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { Context } from '../Context/Context'
import { useContext } from 'react'


export const Home = () => {

  const { pokemons, morePokemon, getPokemons } = useContext(Context)

  return (
    <div>
      <Container maxWidth="false">
        <Grid container spacing={4}>
          {pokemons.map(pokemon => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={pokemon.name}>
              <PokeCard pokemon={pokemon} />
            </Grid>
          ))}
        </Grid>
        <Box
          mt={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Button variant="contained" color="primary" onClick={morePokemon}>
            More Pokemon
          </Button>
        </Box>
      </Container>
    </div>
  )
}
