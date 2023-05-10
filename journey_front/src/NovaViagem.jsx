import './Motorista.css'
import React from 'react';
import NavBar2 from './components/NavBar2';
import { Paper, Typography,Box,Button ,Card,CardMedia,CardActionArea,CardContent,CardActions} from '@mui/material';
import {createTheme} from '@mui/material/styles';


function NovaViagem() {

    
    return (
        <>
        <NavBar2/>
        <div className='teste'>

        <Card sx={{ maxWidth: 750,maxHeight:750 }}>
      <CardMedia
        component="img"
        alt="taxi animation"
        height="500"
        image="https://cdn.dribbble.com/users/674925/screenshots/4749353/media/e2f370153a90139d89c57e9ac459b991.gif"
        
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Viagem em Progresso
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="error" size="small">Finalizar Viagem</Button>
        
      </CardActions>
    </Card>
        </div>  
        </>
    )
    }

export default NovaViagem;