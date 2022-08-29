import { Container } from '@mui/material'
import React, { useCallback, useRef } from 'react'
import PokeCard from '../components/PokeCard'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Context } from '../Context/Context'
import { useContext, useEffect, useState } from 'react'
import { Skelet } from '../components/Skelet'
import { ButtonBattle } from '../components/ButtonBattle'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'

export const Home = () => {
  const { loading, pokemons, setPokemons, setLoading } = useContext(Context)

  const elementRef = useRef(null)

  const morePokemon = useCallback(async () => {
    let endpoints = []
    for (let i = pokemons.length + 1; i <= pokemons.length + 10; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
    }
    try {
      setLoading(true)
      const promises = endpoints.map(endpoint => axios.get(endpoint))
      const responses = await Promise.all(promises)
      const data = responses.map(response => response.data)
      setPokemons([...pokemons, ...data])
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    if (pokemons.length === 1 || pokemons.length === 0) {
      return
    }

    const intersectionObserver = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setLoading(true)
          console.log('Intersecting')
          setTimeout(() => {
            morePokemon()
          }, 700)
        }
      },
      { threshold: 0.5 }
    )

    intersectionObserver.observe(elementRef.current)
    return () => intersectionObserver.disconnect()
  }, [pokemons])

  return (
    <div style={{ minHeight: '100vh' }}>
      <Container maxWidth="false">
        <Grid container spacing={4} sx={{ margin: 'auto' }}>
          {pokemons.length === 0 ? (
            <Skelet />
          ) : (
            pokemons.map(pokemon => (
              <Grid
                display="flex"
                alignItems="center"
                justifyContent="center"
                item
                xs={12}
                sm={6}
                md={4}
                xl={3}
                key={pokemon.name}
              >
                <PokeCard pokemon={pokemon} />
              </Grid>
            ))
          )}
        </Grid>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            height: '2rem'
          }}
        >
          {loading && <CircularProgress />}
        </Box>

        <Box
          mt={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <div ref={elementRef}></div>
        </Box>
      </Container>
      <ButtonBattle />
    </div>
  )
}
