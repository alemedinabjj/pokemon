import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Context } from '../Context/Context'
import { useTheme } from '@mui/material/styles'
import { CardDetails } from '../components/CardDetails'

export const Details = ({ hp }) => {
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
    <CardDetails pokemon={pokemon} />
  )
}
