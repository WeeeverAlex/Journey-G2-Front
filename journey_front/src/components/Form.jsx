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

  const handleClick = searchViag => {

    const data = {
        'origem': origem,
        'destino': destino,
        'idMotorista': 123,
        'dataStart': 1,
    }
  
    fetch('http://localhost:8080/viagem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.status === 200) {
            alert('Viagens Encontradas: ')
            setOpen(true)
        }
    }).catch(ex => {
        alert('Erro ao achar viagens')
        setOpen(true)
    })
  
  }

  const [carregando,setCarregando] = useState(false);

  const navigate = useNavigate()

  const [origem, setOrigem] = useState();
  const [destino, setDestino] = useState();

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
            <input type="text" variant="standard" placeholder="Origem" className='origem' label='origem' onChange={searchViag => setOrigem(searchViag.target.value)}/>
            <input type="text" variant="standard" placeholder="Destino" className='destino' label='destino' onChange={searchViag => setDestino(searchViag.target.value)}/>

            {/* onClick={() => {setCarregando(true); change()}} */}
            <Button theme={theme} variant='contained' className='buscando' onClick={handleClick} >
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
