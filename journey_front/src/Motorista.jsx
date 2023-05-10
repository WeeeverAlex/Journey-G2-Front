import './Motorista.css'
import React from 'react';
import NavBar2 from './components/NavBar2';
import { Paper, Typography,Box,Button } from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { useState } from 'react';
import Carregando from './Carregando';
import {useQuery} from 'react-query';
import { useLocation,useNavigation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import axios from "axios";

// const api = "http://localhost:8080/viagem";

// const postData = async (dateTimeValue, orig,dest,timevalue,preco_total, data) => {
//     const response = await fetch(api, {
//         method: "POST",
//         body: JSON.stringify({
//         id: data.identifier,
//         dataStart: dateTimeValue,
//         origem: orig,
//         destino: dest,
//         horasTotal : timevalue,
//         precoTotal : preco_total,
//         status : "CONFIRMADO" 
//         }),
//         headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         },
//     });

// return response.json();
// };


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
    const navigate = useNavigation();
    const [carregando,setCarregando] = useState(false);
    const { datetimevalue, distvalue,timevalue, orig, dest } = location.state;
    const {data,isLoading,error} = useQuery("motorista", () => axios.get("http://localhost:8081/motorista").then((res) => res.data));
    
    if (isLoading) {
        return <CircularProgress/>
    }
    if (error) {
        return <Alert severity="error">This is an error alert — check it out!</Alert>;
    }
    const motorista_encontrado = data[0];
    if (motorista_encontrado == null){
        return <Alert severity="error">This is an error alert — check it out!</Alert>;
    }

    const precoTotal = (motorista_encontrado.precoViagem * distvalue)

    const change = () => {
        setTimeout(() => {
            navigate('/novaviagem')
        }, 3000);
        }

    // const { mutate } = useMutation(postData, {
    //     onSuccess: () => {
    //         setCarregando(false);
    //     },
    //     onError: (error) => {
    //         setCarregando(false);
    //     }
    //     });

    

    // const handleConfirmClick = async () => {
    //     setCarregando(true);
    //     change();

    //     try {
    //         mutate({ 
    //             dateTimeValue, 
    //             orig,
    //             dest,
    //             timevalue,
    //             preco_total: precoTotal,
    //             data
    //         });
    //     } catch (e) {
    //         // Tratamento de erro aqui
    //     }
    // };
    console.log(motorista_encontrado.precoViagem * distvalue)
    console.log(distvalue)
    console.log(datetimevalue)
    
    return (
        <>
        <NavBar2/>
        
        {carregando || !data ? <Carregando/> : 
        
        <div className='teste'>
        <Box component={Paper} sx={{padding:10}}>
        <Typography variant='h5'>
        Nome: {motorista_encontrado.name}
        </Typography>
        <Typography variant='h5'>
        Placa: {motorista_encontrado.placa}
        </Typography>
        <Typography variant='h5'>
        Carro: {motorista_encontrado.modelo}
        </Typography>
        <Typography variant='h5'>
        Identificador: {motorista_encontrado.identifier}
        </Typography>
        <Typography variant='h5'>
        Ocupação: {motorista_encontrado.ocupacao}
        </Typography>
        <Typography variant='h5'>
        Origem: {orig}
        </Typography>
        <Typography variant='h5'>
        Destino: {dest}
        </Typography>
        <Typography variant='h5'>
        Data Da Viagem : {datetimevalue.$D}/{datetimevalue.$W}/{datetimevalue.$y}
        </Typography>
        <Typography variant='h5'>
        Hora Da Viagem : {datetimevalue.$H}:{datetimevalue.$m}
        </Typography>
        <Typography variant='h5'>
        Preço: {precoTotal} R$   
        </Typography>
        <Typography variant='h5'>
        Tempo: {timevalue} min
        </Typography>
        <Typography variant='h5'>
        Distância: {distvalue} km
        </Typography>
        <Typography variant='h5'>
        Status: {motorista_encontrado.status}
        </Typography>
        

        <Button theme={theme} variant='contained' onClick={() => {setCarregando(true); change();handleConfirmClick();}}>
        Confirmar
        </Button>

        </Box>
        </div>}
        

        
             
        </>
        
    )
    }

export default Motorista;