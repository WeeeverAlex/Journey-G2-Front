// import './Motorista.css'
// import NavBar2 from './components/NavBar2';
// import React from 'react'
// import { Paper, Typography,Box,Button, Snackbar, Alert } from '@mui/material';
// import { useState } from 'react';
// import Carregando from './Carregando';
// import { useLocation,useNavigate } from 'react-router-dom';
// import theme from './theme/theme';

// const AlertSnack = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert theme={theme} elevation={6} ref={ref} variant="filled" {...props} />;
// });


// function Motorista() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [carregando,setCarregando] = useState(false);
//     const { datetimevalue, distvalue, orig, dest } = location.state;
//     const precoTotal = motorista_encontrado.precoViagem * distvalue
//     const time = `${datetimevalue.$H}:${datetimevalue.$m}`
//     const dataStart = `${datetimevalue.$D}/${datetimevalue.$W}/${datetimevalue.$y}`
    
//     const [open, setOpen] = React.useState(true);

//     const handleClose = (event, reason) => {
//       if (reason === 'clickaway') {
//         return;
//       }
//       setOpen(false);
//     };
    

//     const change = () => {
//         setTimeout(() => {
//             navigate('/novaviagem')
//         }, 1000);
//         }

//     const handleConfirmClick = async () => {
//         setCarregando(true);
//         change();

//         try {
//             mutate({ 
//                 dataStart : dataStart, 
//                 orig : orig,
//                 dest : dest,
//                 time : time,
//                 preco_total: precoTotal,
//                 identifier : motorista_encontrado.identifier
//             });
//         } catch (e) {
//             // Tratamento de erro aqui
//         }
//     };
    
    
//     return (
//         <>
//         <NavBar2/>
        
//         {carregando || !data ? <Carregando/> : 
        
//         <div className='teste'>
//         <Box component={Paper} sx={{padding:10}}>
//         <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//           Motorista Encontrado !
//         </Alert>
//         </Snackbar>
//         <Typography variant='h5'>
//         Nome: {motorista_encontrado.name}
//         </Typography>
//         <Typography variant='h5'>
//         Placa: {motorista_encontrado.placa}
//         </Typography>
//         <Typography variant='h5'>
//         Carro: {motorista_encontrado.modelo}
//         </Typography>
//         <Typography variant='h5'>
//         Identificador: {motorista_encontrado.identifier}
//         </Typography>
//         <Typography variant='h5'>
//         Ocupação: {motorista_encontrado.ocupacao}
//         </Typography>
//         <Typography variant='h5'>
//         Origem: {orig}
//         </Typography>
//         <Typography variant='h5'>
//         Destino: {dest}
//         </Typography>
//         <Typography variant='h5'>
//         Data Da Viagem : {datetimevalue.$D}/{datetimevalue.$W}/{datetimevalue.$y}
//         </Typography>
//         <Typography variant='h5'>
//         Hora Da Viagem : {datetimevalue.$H}:{datetimevalue.$m}
//         </Typography>
//         <Typography variant='h5'>
//         Preço: {precoTotal} R$   
//         </Typography>
//         <Typography variant='h5'>
//         Distância: {distvalue} km
//         </Typography>
//         <Typography variant='h5'>
//         Status: {motorista_encontrado.status}
//         </Typography>
        

//         <Button theme={theme} variant='contained' onClick={() => {setCarregando(true); handleConfirmClick();}}>
//         Confirmar
//         </Button>

//         </Box>
//         </div>}
          
//         </>
        
//     )
//     }

// export default Motorista;