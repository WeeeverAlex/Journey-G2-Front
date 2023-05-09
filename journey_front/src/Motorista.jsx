import './Motorista.css'
import React from 'react';
import NavBar2 from './components/NavBar2';
import { Paper, Typography,Box,Button } from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Carregando from './Carregando';


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


function Motorista() {
    const navigate = useNavigate();
    const [carregando,setCarregando] = useState(false);

    const change = () => {
        setTimeout(() => {
            navigate('/novaviagem')
        }, 3000);
        }
    
    
    return (
        <>
        <NavBar2/>
        
        {carregando ? <Carregando/> : 
        
        <div className='teste'>
        <Box component={Paper} sx={{padding:10,gap:10}}>
        <Typography variant='h4'>
        Nome: João
        </Typography>
        <Typography variant='h4'>
        Telefone: (11) 99999-9999
        </Typography>
        <Typography variant='h4'>
        Carro: Fiat Uno
        </Typography>
        <Typography variant='h4'>
        Placa: ABC-1234
        </Typography>
        <Typography variant='h4'>
        Cor: Preto
        </Typography>
        <Typography variant='h4'>
        Origem: Rua dos Bobos, 0
        </Typography>
        <Typography variant='h4'>
        Destino: Rua dos Bobos, 0
        </Typography>
        <Typography variant='h4'>
        Data: 01/01/2021
        </Typography>
        <Typography variant='h4'>
        Hora: 00:00
        </Typography>
        <Typography variant='h4'>
        Preço: R$ 10,00
        </Typography>
        <Typography variant='h4'>
        Tempo: 10 minutos
        </Typography>
        <Typography variant='h4'>
        Distância: 10 km
        </Typography>
        
        <Button theme={theme} variant='contained' onClick={() => {setCarregando(true); change()}}>
        Confirmar
        </Button>

        </Box>
        </div>
        }

        
             
        </>
        
    )
    }

export default Motorista;