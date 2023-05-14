import {Button, Typography, Stack, TextField,Paper,Box,useMediaQuery,Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText,} from '@mui/material'
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect, useRef } from 'react';
import Carregando from '../Carregando';
import dayjs from 'dayjs';
import { useLoadScript, Autocomplete,GoogleMap, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import theme from '../theme/theme';
import axios from "axios";
import {useQuery,useMutation} from 'react-query';
import { useNavigate } from 'react-router-dom';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

const libraries = ["places"];
const center = {
  lat: -23.5505,
  lng: -46.6333,
};
const mapContainerStyle = {
  width: "100%",
  height: "80vh",
};

const CadastraViagem = async ({dataStart, orig, dest, time, preco_total, identifier}) => {
  console.log(dataStart,orig,dest,time,preco_total,identifier)
  const response = await fetch("http://localhost:8081/viagem", {
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

  function Form() {
    const [Loading,setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [originText,setOriginText] = useState("");
    const [dest,setDestText] = useState("");
    
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [directions, setDirections] = useState(null);
    const [distance, setDistance] = useState(null);
    
    const { data, isLoading, error } = useQuery("motorista", () => 
    axios.get("http://localhost:8080/motorista").then((res) => res.data)
    );
    
    const { mutate } = useMutation(CadastraViagem, {
      onSuccess: () => {
        setLoading(false);
      },
      onError: (error) => {
        setLoading(false);
      }
    });
    
    
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: "AIzaSyBV-zcj7u49pTK9S-JiayGv5g_4MIaofLo",
      libraries,
    });
    
    
    const autocompleteOrigin = useRef(null);
    const autocompleteDestination = useRef(null);
    
    const [loadingDialog, setLoadingDialog] = useState(false);

    const handleClickOpen = () => {
      setLoadingDialog(true);  // Inicia o loading
      console.log(originText,dest)
      setTimeout(() => {
        // Aqui você pode colocar o código que era executado anteriormente em handleClickOpen
        if (error) return <Typography>Erro ao buscar motoristas</Typography>;
        if (data === undefined) return <Typography>Não há motoristas disponíveis no momento</Typography>;
      
        setOpen(true);

        setLoadingDialog(false);  // Finaliza o loading após 2 segundos
      }, 1000);
    };
    
  
    const handleClose = () => {
      setOpen(false);
    };
      
  
    useEffect(() => {

      if (origin && destination) {
        setDirections(null); // Clears the previous directions result before getting new ones
      }
    }, [origin, destination]);
    
    const onLoadOrigin = (autocomplete) => {
      autocompleteOrigin.current = autocomplete;
      setOriginText(autocompleteDestination)
    };
  
    const onLoadDestination = (autocomplete) => {
      autocompleteDestination.current = autocomplete;
      setDestText(autocompleteDestination)
    };
  
    const onPlaceChangedOrigin = () => {
      if (autocompleteOrigin.current) {
        const place = autocompleteOrigin.current.getPlace();
        setOrigin(place.geometry.location);
      }
    };
  
    const onPlaceChangedDestination = () => {
      if (autocompleteDestination.current) {
        const place = autocompleteDestination.current.getPlace();
        setDestination(place.geometry.location);
      }
    };
  
    const directionsCallback = (response) => {
      if (response !== null) {
        if (response.status === "OK") {
          setDirections(response);
          setDistance(response.routes[0].legs[0].distance.text);
        } else {
          console.log("response: ", response);
        }
      }
    };
  
    if (loadError) return "Erro ao carregar mapas";
    if (!isLoaded) return "Carregando mapas";

 
  
  const change = () => {
    setTimeout(() => {
        useNavigate('/novaviagem'),{
          state :{
            identifier: data[0].identifier
          }
    }
    }, 1000);
    }
  const handleConfirmClick = async () => {
    setLoading(true);
    change();

    try {
        mutate({ 
            dataStart : `${dayjs().format('YYYY-MM-DD')}`,
            orig : `${originText}`,
            dest : `${dest}`,
            time : `${dayjs().format('HH:mm:ss')}`,
            preco_total: `${parseFloat(distance.match(/\d+(\.\d+)?/)[0]) * data[0].precoViagem}` ,
            identifier : `${data[0].identifier}`
        });
    } catch (e) {
        // Tratamento de erro aqui
    }
};



  return (
    <>
     
    {Loading ? <Carregando></Carregando>:
      <div className='container'>
        <Stack direction="column" spacing={2} >
        <Box sx={{display:'flex',flexDirection:'column',gap:5,padding:10,width:750}} className='form' component={Paper}>
        <Stack direction="row" spacing={10}  >
        <Autocomplete
          onLoad={onLoadOrigin}
          onPlaceChanged={onPlaceChangedOrigin}
          fields={["geometry.location", "place_id"]}
        >
          <TextField
          
             placeholder='Digite um endereço de origem' variant="outlined"
            
          />
        </Autocomplete>

        <Autocomplete

          onLoad={onLoadDestination}
          onPlaceChanged={onPlaceChangedDestination}
          fields={["geometry.location", "place_id"]}
        >
          <TextField
          
          
            variant="outlined" placeholder='Digite um endereço de destino'
          />
        </Autocomplete>
        </Stack>
        <GoogleMap id="map" mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
        {origin !== "" && destination !== "" && (
          <DirectionsService
            options={{
              destination: destination,
              origin: origin,
              travelMode: "DRIVING",
            }}
            callback={directionsCallback}
          />
        )}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      
    
      <Button type="submit" theme={theme} variant='contained' className='buscando' onClick={handleClickOpen }>

      <AddIcon></AddIcon>
        Buscar
      </Button>
      
       {loadingDialog && <Carregando />}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
   {isLoading && <Carregando />}
    {error && <Typography>Erro ao buscar motoristas</Typography>}
    
    {data === null && <Typography>Não há motoristas disponíveis no momento</Typography>}
    {data && distance &&
    <>
        <DialogTitle id="responsive-dialog-title">
            {"Motorista Encontrado"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                <Stack direction="column" spacing={3}>
                <Stack direction="row" spacing={1}>
                <AccountCircleIcon >
                </AccountCircleIcon>
                <Typography>
                        {data[0].name}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                <LocalTaxiIcon >
                </LocalTaxiIcon>
                <Typography>
                        {data[0].modelo}
                    </Typography>
                </Stack>
                    
                    
                <Stack direction="row" spacing={1}>
                <AttachMoneyIcon >
                </AttachMoneyIcon>
                <Typography>
                  {parseFloat(distance.match(/\d+(\.\d+)?/)[0]) * data[0].precoViagem} 
                    </Typography>
                </Stack>
                    
                </Stack>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Cancelar
            </Button>
            <Button onClick={handleConfirmClick} autoFocus>
                Confirmar
            </Button>
        </DialogActions>
    </>}
      </Dialog> 
        </Box>
        </Stack>
        </div>
    }
    </>
    
  )}


export default Form;
