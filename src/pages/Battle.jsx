import { Container } from '@mui/system'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useState } from 'react'
import CardMedia from '@mui/material/CardMedia'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import axios from 'axios'
import { Button } from '@mui/material'
import BasicModal from '../components/BasicModal'
import VS from '../assets/VS-PNG.png'
import BATTLE from '../assets/battle.png'
import noPokemon from '../assets/nopokemon.png'
import { SelectPoke } from '../components/SelectPoke'
import { SelectPokeSecondary } from '../components/SelectPoke'

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

const StyledImage = () => ({
  position: 'absolute',
  width: '200px',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  left: '50%'
})

const StyledTitleBattle = () => ({
  width: '450px', 
  margin: 'auto', 
  paddingBlock: '2rem',
  textAlign: 'center',

  //media queries
  '@media (max-width: 768px)': {
    width: '100%'
  }

})

export const Battle = () => {
  const [pokemonsPrimary, setPokemonsPrimary] = useState([])
  const [pokemonsSecondary, setPokemonsSecondary] = useState([])
  const [pokeWinner, setPokeWinner] = useState(null)
  const [imageWinner, setImageWinner] = useState(null)
  const [open, setOpen] = useState(false)

  const searchPokemonPrimary = async name => {
      const endpoint = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      const response = await axios.get(endpoint)
      setPokemonsPrimary([response.data])
  }
  const searchSecondaryPokemon = async name => {
      const endpoint = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      const response = await axios.get(endpoint)
      setPokemonsSecondary([response.data])
  }

  const pokemonPrimary = pokemonsPrimary.map(pokemon => pokemon.name)
  const pokemonPrimaryPicture = pokemonsPrimary.map(
    pokemon => pokemon.sprites?.other.home.front_default
  )
  const pokemonSecondary = pokemonsSecondary.map(pokemon => pokemon.name)
  const pokemonSecondaryPicture = pokemonsSecondary.map(
    pokemon => pokemon.sprites?.other.home.front_default
  )

  const reduceStatsPrimary = pokemonsPrimary.reduce((acc, pokemon) => {
    acc.push(
      pokemon.stats.reduce((acc, stat) => {
        acc += stat.base_stat
        return acc
      }, 0)
    )
    return acc
  }, [])
  const reduceStatsSecondary = pokemonsSecondary.reduce((acc, pokemon) => {
    acc.push(
      pokemon.stats.reduce((acc, stat) => {
        acc += stat.base_stat
        return acc
      }, 0)
    )
    return acc
  }, [])

  const battlePokemon = () => {
    if (reduceStatsPrimary[0] > reduceStatsSecondary[0]) {
      setPokeWinner(pokemonPrimary)
      setImageWinner(pokemonPrimaryPicture)
    } else if (reduceStatsPrimary[0] < reduceStatsSecondary[0]) {
      setPokeWinner(pokemonSecondary)
      setImageWinner(pokemonSecondaryPicture)
    } else if (reduceStatsPrimary[0] === reduceStatsSecondary[0] && pokemonPrimary.length > 0 && pokemonSecondary.length > 0) {
      setPokeWinner(['Empate!'])
      setImageWinner(noPokemon)
    } else {
      setPokeWinner(['Sem pokemons para batalha!'])
      setImageWinner(noPokemon)
    }
    setOpen(true)
  }

  return (
    <Container maxWidth="xl" sx={{ minHeight: '100vh' }}>
      <CardMedia
        component="img"
        src={BATTLE}
        sx={StyledTitleBattle}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2.4rem',
          width: '100%',
          alignItems: 'start',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <Box sx={{ width: '300px' }}>
          <Card>
            <SelectPoke setPokemonsPrimary={setPokemonsPrimary} searchPokemonPrimary={searchPokemonPrimary} />
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
                image={pokemonsPrimary.length > 0 ? pokemonPrimaryPicture : noPokemon}
                alt={pokemonPrimary}
                sx={{ objectFit: 'contain' }}
              />
            </CardContent>
          </Card>
        </Box>
        <CardMedia component="img" image={VS} alt="VS" sx={StyledImage} />
        <Box sx={{ width: '300px' }}>
          <Card>
              <SelectPokeSecondary searchSecondaryPokemon={searchSecondaryPokemon} />
            <Search onChange={e => searchSecondaryPokemon(e.target.value)}>
              <SearchIconWrapper>
                <SearchIcon  />
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
                image={pokemonsSecondary.length > 0 ? pokemonSecondaryPicture : noPokemon}
                alt={pokemonSecondary}
                sx={{ objectFit: 'contain' }}
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
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'center'
        }}
      >
        {pokeWinner && (
          <BasicModal
            pokeWinner={pokeWinner}
            imageWinner={imageWinner}
            setOpen={setOpen}
            open={open}
          />
        )}
        {!pokeWinner && (
          <BasicModal
            pokeWinner={pokeWinner}
            imageWinner={imageWinner}
            setOpen={setOpen}
            open={open}
          />
        )}
      </Box>
    </Container>
  )
}
