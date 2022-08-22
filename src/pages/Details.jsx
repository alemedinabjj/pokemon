import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Context } from '../Context/Context'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

export const Details = () => {
  const theme = useTheme()

  const [pokemon, setPokemon] = useState({})

  const { pokemons } = useContext(Context)
  const { name } = useParams()

  const getPokemon = () => {
    pokemons.map(pokemon =>
      pokemon.name === name ? setPokemon(pokemon) : null
    )
  }

  useEffect(() => {
    getPokemon()
  }, [pokemon])

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2rem auto',
          maxWidth: '500px'
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 250 }}
          image={pokemon.sprites?.other.home.front_default}
          alt={pokemon.name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {pokemon.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {pokemon.types?.map(type => (
                <span key={type.type.name}>{type.type.name} </span>
              ))}
              {pokemon.weight}
            </Typography>
          </CardContent>
          <Box
            sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
          ></Box>
        </Box>
      </Card>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Button variant="outlined" color="primary">
          <Link to="/">Voltar</Link>
        </Button>
      </Box>
    </>
  )
}