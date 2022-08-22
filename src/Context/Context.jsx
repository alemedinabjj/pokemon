import { createContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


export const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    getPokemons()
  }, [])

  const getPokemons = async () => {
    let endpoints = []
    for (let i = 1; i <= 20; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
    }
    const promises = endpoints.map(endpoint => axios.get(endpoint))
    const responses = await Promise.all(promises)
    const data = responses.map(response => response.data)
    setPokemons(data)
    console.log(data)
  }

  const searchPokemons = name => {
    name === ''
      ? getPokemons()
      : setPokemons(
          pokemons.filter(pokemon => pokemon.name.includes(name.toLowerCase()))
        )
  }

  const morePokemon = async () => {
    let endpoints = []
    for (let i = pokemons.length + 1; i <= pokemons.length + 10; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
    }
    const promises = endpoints.map(endpoint => axios.get(endpoint))
    const responses = await Promise.all(promises)
    const data = responses.map(response => response.data)
    setPokemons([...pokemons, ...data])
  }

  useEffect(() => {
    morePokemon()
  }, [])

  return (
    <Context.Provider value={{ pokemons, setPokemons, morePokemon, searchPokemons, getPokemons }}>
      {children}
    </Context.Provider>
  )
}
