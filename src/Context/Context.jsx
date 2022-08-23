import { createContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false)

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

  const searchPokemons = async (name) => {
    setLoading(true)
    if(name === '') {
      getPokemons()
    } else {
      const endpoint = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      const response = await axios.get(endpoint)
      setPokemons([response.data])
      setLoading(false)
    }
    
  }

  const morePokemon = async () => {
    let endpoints = []
    for (let i = pokemons.length + 1; i <= pokemons.length + 10; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
    }
   try{
    setLoading(true)
    const promises = endpoints.map(endpoint => axios.get(endpoint))
    const responses = await Promise.all(promises)
    const data = responses.map(response => response.data)
    setPokemons([...pokemons, ...data])
    setLoading(false)
   }catch(error){
     console.log(error)
   }
  }

  useEffect(() => {
    morePokemon()
  }, [])

  return (
    <Context.Provider value={{ loading, pokemons, setPokemons, morePokemon, searchPokemons, getPokemons }}>
      {children}
    </Context.Provider>
  )
}
