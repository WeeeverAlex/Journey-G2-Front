import {Button} from '@mui/material'
import React from 'react';
import {createTheme} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Carregando from '../Carregando';
import { useNavigate } from 'react-router-dom'
import ResponsiveDateTimePickers from './DateTimePicker';
import Map from './Maps';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

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


  return (
    <>
    {carregando ? <Carregando/> : 
      <div className='container'>
        <Box sx={{display:'flex',flexDirection:'column',gap:2,padding:10,width:700}} className='form' component={Paper}>
            {/* <Map></Map> */}
            <ResponsiveDateTimePickers></ResponsiveDateTimePickers>
            <input type="text" placeholder="Origem" className='origem'/>
            <input type="text" placeholder="Destino" className='destino'/>
            <Button type="submit" theme={theme} variant='contained' className='buscando' onClick={() => {setCarregando(true); change()}}>
      <AddIcon></AddIcon>
        Buscar Viagem
      </Button>
        </Box>
        </div>

    }
    </>
    
  )
}

export default Form
