import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { Skelet } from './Skelet'

export default function PokeCard({ pokemon, loading }) {
  return (
    <>
    {loading ?  <Skelet /> : (
      <Card sx={{minWidth: 345, maxWidth: 345, marginTop: '2rem', background: "linear-gradient(0deg, white 20%, #1976d2 90%)"}}>
      <CardMedia
        component="img"
        height="340"
        image={pokemon.sprites.other.home.front_default}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={`/details/${pokemon.name}`}>Detalhes</Link>
        </Button>
      </CardActions>
    </Card> )  }
    </>
  )
}
