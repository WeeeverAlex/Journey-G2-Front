import './App.css'
import Typography from '@mui/material/Typography';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
    
    <Box sx={{height:'auto', width: 'auto',display:'flex',flexDirection:'column'}}>
      <NavBar/>
      <Box sx={{display:'flex',flexDirection:'row',margin:30, }}>
      <Box sx={{display:'flex', flexDirection:'column'}}>
      <Typography color='black' fontWeight='bold' variant='h3'>
        Viaje sem limites com a nossa empresa de viagens por aplicativo
      </Typography>
      <Typography color='#77dd77' fontWeight='bold' variant='h3'>
      a jornada começa aqui!

      </Typography>
      </Box>
      <img  src="/taxi.png" alt="logo" className='logo' style={{width:'700px', height:'500px'}}/>
      </Box>
    
      <Typography color='#77dd77' fontWeight='bold' variant='h3'style={{marginLeft: 80}}>
      Nosso Grupo
      </Typography>
        <Box display='flex' flexDirection='row' justifyContent='space-between' margin={10}>
          <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCv22eelbvP7GkaJItUZIASCzclne3su7q0Q&usqp=CAU"
          alt="Bruno"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Julia
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Desenvolvedora Full Stack
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          
          <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCv22eelbvP7GkaJItUZIASCzclne3su7q0Q&usqp=CAU"
          alt="Bruno"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sergio
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Desenvolvedor Front end
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    
          
          <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCv22eelbvP7GkaJItUZIASCzclne3su7q0Q&usqp=CAU"
          alt="Bruno"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Alexandre
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Desenvolvedor Front end
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    
          
          <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCv22eelbvP7GkaJItUZIASCzclne3su7q0Q&usqp=CAU"
          alt="Bruno"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Eduardo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Desenvolvedor Back end
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    
          
          <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCv22eelbvP7GkaJItUZIASCzclne3su7q0Q&usqp=CAU"
          alt="Bruno"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Enzo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Desenvolvedor Back end
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

      
      </Box>
        
        
        </Box>
        
        
        </>
    
  )
}

export default App
