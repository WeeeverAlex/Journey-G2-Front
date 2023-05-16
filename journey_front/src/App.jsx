import './App.css'
import Typography from '@mui/material/Typography';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import NavBar from './components/NavBar';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
    
    <Box sx={{height:'auto', width: 'auto',display:'flex',flexDirection:'column'}}>
      <NavBar/>
      </Box>
      <video src="/journey.mp4" autoPlay loop muted style={{width:'100%', height:'100%', objectFit:'cover'}}></video>
    </>
    
  )
}

export default App
