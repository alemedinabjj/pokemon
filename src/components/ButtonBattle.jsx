import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export const ButtonBattle = () => {
  return (
    <Button variant="contained" color="primary" sx={{
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      zIndex: '1'
    }}>
      <Link to="/battle">
        Battle
      </Link>
    </Button>
  )
}
