import './Motorista.css'
import React from 'react';
import NavBar2 from './components/NavBar2';
import { Paper, Typography,Box,Button } from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { useState } from 'react';
import Carregando from './Carregando';
import {useQuery} from 'react-query';
import { useLocation } from 'react-router-dom';

const api = "http://localhost:8080/viagem";

const postData = async (dateTimeValue, orig,dest,timevalue,preco_total, data) => {
    const response = await fetch(api, {
        method: "POST",
        body: JSON.stringify({
        id: data[0].identifier,
        dataStart: dateTimeValue,
        origem: orig,
        destino: dest,
        horasTotal : timevalue,
        precoTotal : preco_total,
        status : "CONFIRMADO" 
        }),
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        },
    });

return response.json();
};


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
    const location = useLocation();
    const [carregando,setCarregando] = useState(false);
    const { dateTimeValue, sliderValue,timevalue, orig, dest } = location.state;
    const precoTotal = data[0][3] * dest
    const {data,isLoading,error} = useQuery("motorista", () => axios.get("http://localhost:8081/motorista").then((res) => res.data));

    if (isLoading) {
        return <CircularProgress/>
    }
    if (error) {
        return <Alert severity="error">This is an error alert — check it out!</Alert>;
    }

  console.log(data[0])

    const change = () => {
        setTimeout(() => {
            navigate('/novaviagem')
        }, 3000);
        }

    const { mutate, isError } = useMutation(postData, {
        onSuccess: (sucessData) => {
            console.log(sucessData);
        },
        });

        if (isLoading) {
        return <CircularProgress/>
        }
        if (isError) {
        return <Alert severity="error">This is an error alert — check it out!</Alert>;
        }
    
    
    return (
        <>
        <NavBar2/>
        
        {carregando || !data ? <Carregando/> : 
        
        <div className='teste'>
        <Box component={Paper} sx={{padding:10,gap:10}}>
        <Typography variant='h4'>
        Nome: {data[0][0]}
        </Typography>
        <Typography variant='h4'>
        Placa: {data[0][1]}
        </Typography>
        <Typography variant='h4'>
        Carro: {data[0][2]}
        </Typography>
        <Typography variant='h4'>
        Identificador: {data[0][4]}
        </Typography>
        <Typography variant='h4'>
        Ocupação: {data[0][5]}
        </Typography>
        <Typography variant='h4'>
        Origem: {orig}
        </Typography>
        <Typography variant='h4'>
        Destino: {dest}
        </Typography>
        <Typography variant='h4'>
        Data e Hora : {dateTimeValue}
        </Typography>
        <Typography variant='h4'>
        Preço: {precoTotal}
        </Typography>
        <Typography variant='h4'>
        Tempo: {timevalue}
        </Typography>
        <Typography variant='h4'>
        Distância: {sliderValue}km
        </Typography>
        <Typography variant='h4'>
        Status: {data[0][6]}
        </Typography>
        

        <Button theme={theme} variant='contained' onClick={({dateTimeValue, orig,dest,timevalue,preco_total, data}) => {setCarregando(true); change();mutate({ dateTimeValue, orig,dest,timevalue,preco_total, data})}}>
        Confirmar
        </Button>

        </Box>
        </div>}
        

        
             
        </>
        
    )
    }

export default Motorista;