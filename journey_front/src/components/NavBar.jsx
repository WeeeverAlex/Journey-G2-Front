import {Box,Typography,Button,AppBar,Tabs,Tab} from '@mui/material';
import {Link} from 'react-router-dom';
import ToolBar from '@mui/material/Toolbar';
import { createTheme } from '@mui/material/styles';
import { yellow,grey,green } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';

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


export default function () {

    return (
      <AppBar sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',background:'white',padding:2}} >
          <img  src="/logo.png" alt="logo" className='logo' style={{width:'100px', height:'50px'}}/>
      
      <Link to='/viagem'>
      <Button sx={{gap:1,marginRight:5}} theme={theme} variant='contained'>
      <AddIcon></AddIcon>
        Começar viagem
      </Button>
      </Link>
      <Link to='/listaviagem'>
      <Button sx={{gap:1,marginRight:5}} theme={theme} variant='contained'>
      <AddIcon></AddIcon>
        Lista viagens
      </Button>
      </Link>
      
      </AppBar>
    )
}