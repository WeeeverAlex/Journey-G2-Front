import React from 'react'
import Box from '@mui/material/Box';
import NavBar2 from './components/NavBar2';
import { useQuery } from 'react-query';
import axios from 'axios';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';

function ListaViagem() {
    const { data, isLoading, error } = useQuery("viagens", () => 
        axios.get("http://localhost:8080/motorista/available").then((res) => res.data)
    );

    if (isLoading) {
        return <CircularProgress />
    }

    if (error) {
        return <span>Error: {error.message}</span>
    }

    return (
        <>
        <Box sx={{height:'auto', width: 'auto',display:'flex',flexDirection:'column'}}>
        <NavBar2/>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Nome do Motorista</TableCell>
                        <TableCell align="right">Destino</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                        {row.id}
                        </TableCell>
                        <TableCell align="right">{row.driverName}</TableCell>
                        <TableCell align="right">{row.destination}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
        </>
      )
    }
    
    export default ListaViagem
