import './Motorista.css'
import React from 'react';
import NavBar2 from './components/NavBar2';
import { Paper, Typography,Box,Button, Snackbar } from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { useState } from 'react';
import Carregando from './Carregando';
import {useQuery} from 'react-query';
import { useLocation,useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import axios from "axios";



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
const AlertSnack = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert theme={theme} elevation={6} ref={ref} variant="filled" {...props} />;
});


const api = "http://localhost:8080/viagem";

const postData = async (dataStart, orig,dest,time,preco_total, identifier) => {
  console.log(dataStart,orig,dest,time,preco_total,identifier)
    const response = await fetch(api, {
        method: "POST",
        body: JSON.stringify({
        idMotorista: identifier,
        dataStart: dataStart,
        origem: orig,
        destino: dest,
        horasStart : time,
        precoTotal : preco_total,
        status : "CONFIRMADO"
        }),
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        },
    });
    

return response.json();
};



function Motorista() {
    const location = useLocation();
    const navigate = useNavigate();
    const [carregando,setCarregando] = useState(false);
    const { datetimevalue, distvalue, orig, dest } = location.state;
    console.log(datetimevalue,distvalue,orig,dest)
    

    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };
    
    const {data,isLoading,error} = useQuery("motorista", () => axios.get("http://192.168.10.117:8080/motorista").then((res) => res.data));
    console.log(data)
    const { mutate } = useMutation(postData, {
        onSuccess: () => {
            setCarregando(false);
        },
        onError: (error) => {
            setCarregando(false);
        }
        });
    
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

    const precoTotal = motorista_encontrado.precoViagem * distvalue
    const time = `${datetimevalue.$H}:${datetimevalue.$m}`
    const dataStart = `${datetimevalue.$D}/${datetimevalue.$W}/${datetimevalue.$y}`

    const change = () => {
        setTimeout(() => {
            navigate('/novaviagem')
        }, 1000);
        }

    const handleConfirmClick = async () => {
        setCarregando(true);
        change();

        try {
            mutate({ 
                dataStart : dataStart, 
                orig : orig,
                dest : dest,
                time : time,
                preco_total: precoTotal,
                identifier : motorista_encontrado.identifier
            });
        } catch (e) {
            // Tratamento de erro aqui
        }
    };
    
    
    return (
        <>
        <NavBar2/>
        
        {carregando || !data ? <Carregando/> : 
        
        <div className='teste'>
        <Box component={Paper} sx={{padding:10}}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Motorista Encontrado !
        </Alert>
        </Snackbar>
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
        Distância: {distvalue} km
        </Typography>
        <Typography variant='h5'>
        Status: {motorista_encontrado.status}
        </Typography>
        

        <Button theme={theme} variant='contained' onClick={() => {setCarregando(true); handleConfirmClick();}}>
        Confirmar
        </Button>

        </Box>
        </div>}
        

        
             
        </>
        
    )
    }

export default Motorista;