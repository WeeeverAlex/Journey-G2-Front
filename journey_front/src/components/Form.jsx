import {Button} from '@mui/material'
import React from 'react';
import {createTheme} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useState } from 'react';
import Carregando from '../Carregando';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material/styles';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;

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


  // const handleClick = searchViag => {

  //   const data = {
  //       'origem': origem,
  //       'destino': destino,
  //       'idMotorista': 123,
  //       'dataStart': 1,
  //   }
  
  //   fetch('http://localhost:8080/viagem', {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //   }).then(response => {
  //       if (response.status === 200) {
  //           alert('Viagens Encontradas: ')
  //           setOpen(true)
  //       }
  //   }).catch(ex => {
  //       alert('Erro ao achar viagens')
  //       setOpen(true)
  //   })
  
  // }

  function Form() {

  const [orig,setOrig] = useState("");
  const [dest,setDest] = useState("");

  const [distvalue, setDistValue] = React.useState(30);
  

  const handleSliderDistChange = (event, newValue) => {
    setDistValue(newValue);
    
  };

  const handleInputDistChange = (event) => {
    setDistValue(event.target.value === '' ? '' : Number(event.target.value));
    
  };

  const handleDistBlur = () => {
    if (value < 0) {
      setDistValue(0);
      
    } else if (value > 100) {
      setDistValue(100);
      
    }
  };
  
  const [datetimevalue, setDateTimeValue] = React.useState(dayjs('2023-00-00T 00:00:00.000Z'));

  const [carregando,setCarregando] = useState(false);

  const navigate = useNavigate();

  const change = () => {
    setTimeout(() => {
        navigate('/motorista',{
          state :{
            datetimevalue,
            distvalue,
            orig,
            dest
          }
        })
    }, 1000);
    }


  

  return (
    <>
    {carregando ? <Carregando/> : 
    
      <div className='container'>
        <Stack direction="column" spacing={2} >
        <Box sx={{display:'flex',flexDirection:'column',gap:2,padding:10,width:700}} className='form' component={Paper}>
            {/* <Map></Map> */}
            <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DateTimePicker
            renderInput={(params) => <TextField {...params} />}
            value={datetimevalue}
            onChange={(newValue) => {
            setDateTimeValue(newValue);
          }}
          disablePast
          label="Data e Hora"
          inputFormat="DD/MM/YYYY HH:mm"
          
        />
      
    </LocalizationProvider>
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Distancia
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <NavigationIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderDistChange}
            aria-labelledby="input-slider"
            theme={theme}
          />
        </Grid>
        <Grid item>
          <Input
            value={distvalue}
            size="small"
            onChange={handleInputDistChange}
            onBlur={handleDistBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
      <TextField value={orig} onChange={(e) => setOrig(e.target.value)}  color="success" id="Origem" label="Origem" variant="outlined" />
      <TextField value={dest} onChange={(e) => setDest(e.target.value)}  color="success" id="Destino" label="Destino" variant="outlined" />
      <Button type="submit" theme={theme} variant='contained' className='buscando' onClick={() => {setCarregando(true); change();handleClickVariant('success')}}>

      <AddIcon></AddIcon>
        Buscar Viagem
      </Button>
        </Box>
        </Stack>
        </div>
        
    }
    </>
    
  )}


export default Form;
