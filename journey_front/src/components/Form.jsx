import {Button} from '@mui/material'
import React from 'react';
import {createTheme} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Carregando from '../Carregando';
import { useNavigate } from 'react-router-dom'
import ResponsiveDateTimePickers from './DateTimePicker';
import InputSlider from './Slider';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { SnackbarProvider, useSnackbar } from 'notistack';

const theme = createTheme({
    palette: {
      primary: {
        main: '#77dd77',
      },
      secondary: {
        main: '#fff',
      },
    },
  });


function Form() {

  const [carregando,setCarregando] = useState(false);

  const navigate = useNavigate()

  const change = () => {
    setTimeout(() => {
        navigate('/motorista')
    }, 3000);
    }

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Motorista Encontrado', { variant });
  };

  return (
    <>
    {carregando ? <Carregando/> : 
    <SnackbarProvider maxSnack={3}>
      <div className='container'>
        <Box sx={{display:'flex',flexDirection:'column',gap:2,padding:10,width:700}} className='form' component={Paper}>
            {/* <Map></Map> */}
            <Stack direction="row" spacing={2} >
            <ResponsiveDateTimePickers></ResponsiveDateTimePickers>
            <InputSlider></InputSlider>
            </Stack>
            <TextField  color="success" id="outlined-basic" label="Origem" variant="outlined" />
            <TextField  color="success" id="outlined-basic" label="Destino" variant="outlined" />
            <Button type="submit" theme={theme} variant='contained' className='buscando' onClick={() => {setCarregando(true); change();handleClickVariant('success')}}>
      <AddIcon></AddIcon>
        Buscar Viagem
      </Button>
        </Box>
        </div>
        </SnackbarProvider>

    }
    </>
    
  )
}

export default Form
