import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const SelectPoke = ({ setPokemonsPrimary, searchPokemonPrimary }) => {
  const [pokemons, setPokemons] = React.useState([]);

  const getPokemon = async (e) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50`)
    setPokemons(response.data.results)
    const pokemons = response.data.results.map(pokemon => pokemon.name)
  }

  useEffect(() => {
    getPokemon()
  } , [])

  const handleChange = (event) => {
    console.log(event.target.value)
  }

  return (
    <div>
      <FormControl variant="outlined" sx={{width: "100%", marginTop: '.5rem'}}>
        <InputLabel id="demo-simple-select-outlined-label">Pokemon</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={pokemons}
          label="Pokemon"
          sx={{ width: '100%'}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            pokemons.map(pokemon => (
              <MenuItem key={pokemon.name} value={pokemon.name} onClick={ e => searchPokemonPrimary(pokemon.name) }>{pokemon.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
}

export const SelectPokeSecondary = ({ setPokemonsSecondary, searchSecondaryPokemon }) => {
  const [pokemons, setPokemons] = React.useState([]);

  const getPokemon = async (e) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100`)
    setPokemons(response.data.results)
    const pokemons = response.data.results.map(pokemon => pokemon.name)
  }

  useEffect(() => {
    getPokemon()
  } , [])

  const handleChange = (event) => {
    console.log(event.target.value)
  }

  return (
    <div>
      <FormControl variant="outlined" sx={{width: "100%", marginTop: '.5rem'}}>
        <InputLabel id="demo-simple-select-outlined-label">Pokemon</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={pokemons}
          label="Pokemon"
          sx={{ width: '100%' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            pokemons.map(pokemon => (
              <MenuItem key={pokemon.name} value={pokemon.name} onClick={ e => searchSecondaryPokemon(pokemon.name) }>{pokemon.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
}