import React, { useEffect } from 'react';
import NavBar2 from './components/NavBar2';
import { useQuery,useMutation } from 'react-query';
import { useState} from 'react';
import axios from 'axios';
import {Button, Typography,TableContainer,TableCell,TableRow,Table,TableHead,TableBody,Paper,Box,useMediaQuery,Dialog,DialogActions,DialogTitle} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import theme from './theme/theme';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import Carregando from './Carregando';

const DeletaViagem = async (viagemId) => {
  
    const response = await fetch(`http://localhost:8081/viagem/${viagemId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      
    });
  
    return response;
  };

function ListaViagem() {

    const [open, setOpen] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [idatual,setIdAtual] = useState();
    const [reload,setReload] = useState(false);

    const { data, isLoading, error } = useQuery("viagens", () => 
        axios.get("http://localhost:8081/viagem").then((res) => res.data)
    );
    

    const { mutate } = useMutation(DeletaViagem,{
        onSuccess: () => {
            setOpen(false);
            setReload(!reload);
            }
    });
      
    const handleClickDelete = () =>{
    mutate(idatual)  ;
    setOpen(false);
    setReload(!reload);
    };

    useEffect(()=>{
    },[]);

    const handleClose = () => {
        setOpen(false);
  
      };  
    const handleOpen = (idAtual) => {
        setOpen(true);
        setIdAtual(idAtual);
  
      };  

    if (isLoading) {
        return <Carregando />
    }

    if (error) {
        return <span>Error: {error.message}</span>
    }
    
    return (
        <>
        <Box sx={{height:'auto', width: 'auto',display:'flex',flexDirection:'column'}}>
        <NavBar2/>
        {!data || data === null || data===undefined ? <Typography sx={{marginTop:10}} variant='h3'>Não há viagens para exibir</Typography> :
        <>
        <Typography sx={{alignSelf:'center',marginTop:10}} variant='h3'>Lista de Viagens</Typography>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Data da Viagem</TableCell>
                        <TableCell align="right">Endereço de Origem</TableCell>
                        <TableCell align="right">Endereço de Destino</TableCell>
                        <TableCell align="right">Horário da Viagem</TableCell>
                        <TableCell align="right">Tempo Total da Viagem</TableCell>
                        <TableCell align="right">Preço da Viagem</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                        {row.id}
                        </TableCell>
                        <TableCell align="right">{row.dataStart}</TableCell>
                        <TableCell align="right">{row.origem}</TableCell>
                        <TableCell align="right">{row.destino}</TableCell>
                        <TableCell align="right">{row.horasStart}</TableCell>
                        <TableCell align="right">{row.tempoTotal}</TableCell>
                        <TableCell align="right">{row.precoTotal}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right"><Button onClick={() => handleOpen(row.id)} sx={{color:'red'}}>
<DeleteForeverIcon></DeleteForeverIcon>
                        </Button></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer></>}
        <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
    
    <>
        <DialogTitle id="responsive-dialog-title">
            Certeza que deseja deletar a viagem ?
        </DialogTitle>
        <DialogActions>
            <Button theme={theme} autoFocus onClick={handleClose}>
              <CancelIcon></CancelIcon>
                Cancelar
            </Button>
            
            <Button theme={theme} onClick={() => handleClickDelete()} autoFocus>
            <CheckIcon></CheckIcon>
                Confirmar
            </Button>
        </DialogActions>
    </>
      </Dialog> 
        </Box>
        </>
      )
    }
    
    export default ListaViagem
