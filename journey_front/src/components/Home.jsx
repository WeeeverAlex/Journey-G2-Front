import React from 'react'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';

function Home() {
  return (
    
    <div>
        <Box display='flex' flexDirection='row' justifyContent='space-between' margin={10} marginTop={30}>
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
    </div>
  )
}

export default Home