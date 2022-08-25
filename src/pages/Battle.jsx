import { Container } from '@mui/system'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Context } from '../Context/Context'
import { useState } from 'react'
import CardMedia from '@mui/material/CardMedia'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import axios from 'axios'
import { Button } from '@mui/material'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

export const Battle = () => {
  const [pokemonsPrimary, setPokemonsPrimary] = useState([])
  const [pokemonsSecondary, setPokemonsSecondary] = useState([])
  const [pokeWinner, setPokeWinner] = useState(null)
  const [imageWinner, setImageWinner] = useState(null)

  const searchPokemonPrimary = async name => {
    if (name === '') {
      getPokemons()
    } else {
      const endpoint = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      const response = await axios.get(endpoint)
      setPokemonsPrimary([response.data])
    }
  }
  const searchSecondaryPokemon = async name => {
    if (name === '') {
      getPokemons()
    } else {
      const endpoint = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      const response = await axios.get(endpoint)
      setPokemonsSecondary([response.data])
    }
  }

  const pokemonPrimary = pokemonsPrimary.map(pokemon => pokemon.name)
  const pokemonPrimaryPicture = pokemonsPrimary.map(
    pokemon => pokemon.sprites?.other.home.front_default
  )
  const pokemonSecondary = pokemonsSecondary.map(pokemon => pokemon.name)
  const pokemonSecondaryPicture = pokemonsSecondary.map(
    pokemon => pokemon.sprites?.other.home.front_default
  )
  const hpPrimary = pokemonsPrimary.map(pokemon => pokemon.stats[0].base_stat)
  console.log(hpPrimary)
  const attackPrimary = pokemonsPrimary.map(
    pokemon => pokemon.stats[1].base_stat
  )
  const defensePrimary = pokemonsPrimary.map(
    pokemon => pokemon.stats[2].base_stat
  )
  const speedPrimary = pokemonsPrimary.map(
    pokemon => pokemon.stats[3].base_stat
  )

  const hpSecondary = pokemonsSecondary.map(
    pokemon => pokemon.stats[0].base_stat
  )
  console.log(attackPrimary)
  const attackSecondary = pokemonsSecondary.map(
    pokemon => pokemon.stats[1].base_stat
  )
  const defenseSecondary = pokemonsSecondary.map(
    pokemon => pokemon.stats[2].base_stat
  )
  const speedSecondary = pokemonsSecondary.map(
    pokemon => pokemon.stats[3].base_stat
  )
  console.log(attackSecondary)

  console.log(pokeWinner)

  const battlePokemon = () => {
    if (
      hpPrimary[0] > hpSecondary[0] &&
      attackPrimary[0] > attackSecondary[0] &&
      defensePrimary[0] > defenseSecondary[0] &&
      speedPrimary[0] > speedSecondary[0]

    ) {
      setPokeWinner(pokemonPrimary)
      setImageWinner(pokemonPrimaryPicture)
    } else if (
      hpPrimary[0] < hpSecondary[0] &&
      attackPrimary[0] < attackSecondary[0] &&
      defensePrimary[0] < defenseSecondary[0] &&
      speedPrimary[0] < speedSecondary[0]
    ) {
      setPokeWinner(pokemonSecondary)
      setImageWinner(pokemonSecondaryPicture)
    } else {
      return 'draw'
    }
  }



  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Battle
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          width: '100%',
          alignItems: "start",
          justifyContent: "center"
        }}
      >
        <Box sx={{ width: '300px' }}>
          <Card>
            <Search onChange={e => searchPokemonPrimary(e.target.value)}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <CardContent>
              <Typography variant="h5" component="h2" textAlign="center">
                {pokemonPrimary}
              </Typography>
              <CardMedia
                component="img"
                height="250"
                image={pokemonPrimaryPicture}
                alt={pokemonPrimary}
              />
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ width: '300px' }}>
          <Card>
            <Search onChange={e => searchSecondaryPokemon(e.target.value)}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <CardContent>
              <Typography variant="h5" component="h2" textAlign="center">
                {pokemonSecondary}
              </Typography>
              <CardMedia
                component="img"
                height="250"
                image={pokemonSecondaryPicture}
                alt={pokemonSecondary}
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box sx={{ width: '100%', textAlign: 'center', marginTop: '1rem' }}>
        <Button
          variant="contained"
          color="primary"
          margin="auto"
          onClick={battlePokemon}
        >
          Battle
        </Button>
      </Box>
     <Box sx={{ width: '100%', textAlign: 'center', marginTop: '1rem', display: 'flex', alignItems: "start", justifyContent:"center"  }}>
     <Box sx={{ width: '300px', textAlign: 'center', marginTop: '1rem'}}>
      <Typography variant="h5" component="h2" textAlign="center">
        Winner
      </Typography>
      <CardContent>
        <Typography variant="h5" component="h2" textAlign="center">
          {pokeWinner}
        </Typography>
        <CardMedia
          component="img"
          height="250"
          image={imageWinner}
          alt={pokeWinner}
        />
      </CardContent>
      </Box>
      </Box>
    </Container>
  )
}
