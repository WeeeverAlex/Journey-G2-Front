import {Button} from '@mui/material'
import React from 'react';
import {createTheme} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Carregando from '../Carregando';
import { useNavigate } from 'react-router-dom'

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
        navigate('/')
    }, 3000);
    }


  return (
    <>
    {carregando ? <Carregando/> : 
      <div className='container'>
        <form className='form'>
            <input type="text" placeholder="Origem" className='origem'/>
            <input type="text" placeholder="Destino" className='destino'/>
            <Button type="submit" theme={theme} variant='contained' className='buscando' onClick={() => {setCarregando(true); change()}}>
      <AddIcon></AddIcon>
        Buscar Viagem
      </Button>
        </form>
        </div>

    }
    </>
    
  )
}

export default Form
