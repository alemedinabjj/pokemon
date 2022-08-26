import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function BasicModal({ pokeWinner, imageWinner, open, setOpen }) {
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: '300px', textAlign: 'center', marginTop: '1rem' }}>
            <Typography variant="h5" component="h2" textAlign="center">
              Winner
            </Typography>
            <CardContent>
              <Typography variant="h5" component="h2" textAlign="center">
                {pokeWinner ? pokeWinner : 'No winner'}
              </Typography>
              <CardMedia
                component="img"
                height="250"
                image={pokeWinner ? imageWinner : 'Empate'}
                alt={pokeWinner}
              />
            </CardContent>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
