import {Button, Typography, Stack, TextField,Paper,Box,useMediaQuery,Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText,Snackbar,Alert} from '@mui/material'
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect, useRef ,useReducer} from 'react';
import Carregando from '../Carregando';
import dayjs from 'dayjs';
import { useLoadScript, Autocomplete,GoogleMap, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import theme from '../theme/theme';
import {useQuery,useMutation} from 'react-query';
import { useNavigate } from 'react-router-dom';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

const libraries = ["places"];

const center = {
  lat: -23.5505,
  lng: -46.6333,
};
const mapContainerStyle = {
  width: "100%",
  height: "80vh",
};

const AlertSnack = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CadastraViagem = async ({dataStart, orig, dest, horasStart,tempoTotal, preco_total, identifier}) => {
  
  const response = await fetch("http://localhost:8081/viagem", {
    method: "POST",
    body: JSON.stringify({
      idMotorista: identifier,
      dataStart: dataStart,
      origem: orig,
      destino: dest,
      horasStart : horasStart,
      tempoTotal: tempoTotal,
      precoTotal : preco_total,
      status : "CONFIRMADO"
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    
  });

  const responseData = await response.json();
  return responseData;
};
// const OcupaMotorista = async (identifier) => {
  
//   const response = await fetch(`http://localhost:8081/motorista/${identifier}/ocupacao/ocupa`, {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
    
//   });

//   const responseData = await response.json();
//   return responseData;
// };

  function Form() {
    
    const [Loading,setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [originText, setOriginText] = useState("");
  const [dest, setDestText] = useState("");
  const [prevOrigin, setPrevOrigin] = useState(null);
  const [prevDest, setPrevDest] = useState(null);
    const [time,setTime] = useState("");
    const [alertOpen,setAlertOpen] = useState(false);
    
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [directions, setDirections] = useState(null);
    const [distance, setDistance] = useState(null);
    const [mutateError,setMutateError] = useState("");
    
    

    const { data, isLoading, error } = useQuery("motorista", () => 
    axios.get("http://localhost:8080/motorista").then((res) => res.data)
    );
    

    const navigate = useNavigate();
    const change = (id) => {
      setOpen(false);
      setLoadingDialog(true);
      setTimeout(() => {
          navigate('/novaviagem',{
            state :{
              motoristaId: data[0].identifier,
              viagemId: id
            }
      })
      }, 2000);
      }

    const { mutate } = useMutation(CadastraViagem, {
      onSuccess: (responseData) => {
        setLoading(false);
        change(responseData.id);
      },
      onError: (error) => {
        setLoading(false);
        setAlertOpen(true);
        setMutateError(error.message);
      }
    });

    // const { mutate1 } = useMutation(OcupaMotorista)
    
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: "AIzaSyBV-zcj7u49pTK9S-JiayGv5g_4MIaofLo",
      libraries,
    });
    
    const autocompleteOrigin = useRef(null);
    const autocompleteDestination = useRef(null);
     
    const [loadingDialog, setLoadingDialog] = useState(false);

    const handleClickOpen = () => {
      setLoadingDialog(true); 
      setTimeout(() => { 
        setOpen(true);
        setLoadingDialog(false);  
      }, 1000);
    };
    
  
    const handleClose = () => {
      setOpen(false);

    };  

    const handleAlertClose = () => {
      setAlertOpen(false);
    }
      
    // const fetchMotorista = async () => {
    //   const response = await fetch("http://localhost:8080/motorista/available");
    //   const data = response.data;
    //   console.log(data);
    //   setRealData(data);
    // }
    
    // useEffect(() => {
    //   if (!isDataFetched) {
    //     const fetchMotorista = async () => {
    //       try {
    //         const response = await axios.get("http://localhost:8080/motorista/available");
    //         const data = response.data;
    //         setRealData(data);
    //         setIsDataFetched(true);
    //       } catch (error) {
    //         // Tratamento de erro aqui
    //         console.error(error);
    //       }
    //     };
  
    //     fetchMotorista();
    //   }
    // }, [isDataFetched]);

    useEffect(() => {

      if (origin && destination) {
        setDirections(null); // Clears the previous directions result before getting new ones
      }
    }, [origin, destination]);
    
    const onLoadOrigin = (autocomplete) => {
      autocompleteOrigin.current = autocomplete;
    };
  
    const onLoadDestination = (autocomplete) => {
      autocompleteDestination.current = autocomplete;
    };
  
    const onPlaceChangedOrigin = () => {
      if (autocompleteOrigin.current) {
        const place = autocompleteOrigin.current.getPlace();
        if (place.geometry.location !== prevOrigin) {
          setOrigin(place.geometry.location);
          setPrevOrigin(place.geometry.location);
        }
      }
    };
  
    const onPlaceChangedDestination = () => {
      if (autocompleteDestination.current) {
        const place = autocompleteDestination.current.getPlace();
        if (place.geometry.location !== prevDest) {
          setDestination(place.geometry.location);
          setPrevDest(place.geometry.location);
        }
      }
    };
  
    const directionsCallback = (response) => {
      if (response !== null) {
        if (response.status === "OK") {
          setDirections(response);
          setDistance(response.routes[0].legs[0].distance.text);
          setDestText(response.routes[0].legs[0].end_address);
          setOriginText(response.routes[0].legs[0].start_address);
          setTime(response.routes[0].legs[0].duration.text);
        } else {
          console.log("response: ", response);
        }
      }
    };
  
    if (loadError) return "Erro ao carregar mapas";
    if (!isLoaded) return "Carregando mapas";
  
  
  const handleConfirmClick = async () => {
    
    try {
        mutate({ 
            dataStart : `${dayjs().format('YYYY-MM-DD')}`,
            orig : `${originText}`,
            dest : `${dest}`,
            horasStart : `${dayjs().format('HH:mm:ss')}`,
            tempoTotal : `${time}`,
            preco_total: parseFloat(distance.match(/\d+(\.\d+)?/)[0]) * data[0].precoViagem ,
            identifier : `${data[0].identifier}`
        });
        // mutate1(`${data[0].identifier}`)
    } catch (e) {
        // Tratamento de erro aqui
    }
};

  return (
    <>
     
    {Loading ? <Carregando></Carregando>:
      <div className='container'>
      {mutateError && 
      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
            <Alert severity="error"><Typography>
              Erro ao se conectar com o servidor
            </Typography></Alert>
      </Snackbar>}
        <Stack direction="column" spacing={2} >
        <Box sx={{display:'flex',flexDirection:'column',gap:5,padding:10,width:750}} className='form' component={Paper}>
        <Stack sx={{alignItems:"center"}} direction="row" spacing={4}  >
        <Autocomplete
          onLoad={onLoadOrigin}
          onPlaceChanged={onPlaceChangedOrigin}
          fields={["geometry.location", "place_id"]}
        >
          <TextField
            required
            label="Endereço de origem"
            variant="outlined"
            
          />
        </Autocomplete>
        <ArrowForwardIcon sx={{color:'#77dd77'}} fontSize='large' ></ArrowForwardIcon>

        <Autocomplete

          onLoad={onLoadDestination}
          onPlaceChanged={onPlaceChangedDestination}
          fields={["geometry.location", "place_id"]}
        >
          <TextField
          label="Endereço de destino"
        
          required
            variant="outlined" 
          />
        </Autocomplete>
        </Stack>
        <GoogleMap id="map" mapContainerStyle={mapContainerStyle} zoom={11} center={center}>
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
      
    
      <Button size='large' type="submit" theme={theme} variant='contained' className='buscando' onClick={handleClickOpen }>

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
    
    <>
        <DialogTitle id="responsive-dialog-title">
            {!data || data === undefined && directions ? "Motorista não encontrado" : directions && data ? "Motorista Encontrado" : "Dados inválidos"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
   
    
    {!directions || !distance ? <Typography>Digite os endereços de origem e destino para poder buscar por um motorista</Typography> :
    
    !data ? <Typography>Não há motoristas disponíveis no momento</Typography> :
                <Stack direction="column" spacing={3}>
                <Stack direction="row" spacing={1}>
                <AccountCircleIcon>
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
                  {distance ? parseFloat(distance.match(/\d+(\.\d+)?/)[0]) * data[0].precoViagem:0} 
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                <AccessTimeFilledIcon >
                </AccessTimeFilledIcon>
                <Typography>
                  {time} 
                    </Typography>
                </Stack>
                    
                </Stack>}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button theme={theme} autoFocus onClick={handleClose}>
              <CancelIcon></CancelIcon>
                Cancelar
            </Button>
            {directions && data  &&
            <Button theme={theme} onClick={handleConfirmClick} autoFocus>
            <CheckIcon></CheckIcon>
                Confirmar
            </Button>}
        </DialogActions>
    </>
      </Dialog> 
        </Box>
        </Stack>
        </div>
    }
    </>
    
  )}


export default Form;
