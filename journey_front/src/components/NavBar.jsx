import {Box,Typography,Button,AppBar,Tabs,Tab} from '@mui/material';
import {Link} from 'react-router-dom';
import ToolBar from '@mui/material/Toolbar';
import { createTheme } from '@mui/material/styles';
import { yellow,grey,green } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: '#fff',
    },
  },
});

export default function () {

    return (
        <AppBar sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',background:'white',padding:2}} >
        
      
        <Button sx={{marginLeft:5}} theme={theme} variant='contained'>
        
          Journey
        
        </Button>
        
      
      <Tabs>
        <Tab label="Nosso time"/>
        <Tab label="O projeto"/>
        <Tab label="Nosso time"/>
      </Tabs>
      <Button sx={{gap:1,marginRight:5}} theme={theme} variant='contained'>
      <AddIcon></AddIcon>
        Começar viagem
      </Button>
 
        </AppBar>
        
    )
}