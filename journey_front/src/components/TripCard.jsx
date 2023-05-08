import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import ResponsiveDateTimePickers from './DatePicker'
import Map from './GoogleMaps'
import AddIcon from '@mui/icons-material/Add';



export default function TripCard(){

    return (
        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignContent:'center',justifyItems:'center',justifySelf:'center',alignItems:'center',alignSelf:'center',width:500}} margin={50} component={Paper} gap={10} padding={10}>
            
            <ResponsiveDateTimePickers>
            </ResponsiveDateTimePickers>
            
        <Map></Map>
        
      <Button sx={{gap:1,marginRight:5}} variant='contained'>
      <AddIcon></AddIcon>
        Começar viagem
      </Button>
      
        </Box> 
            
        
    )

}