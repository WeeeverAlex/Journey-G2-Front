import './Lista.css'
import React from 'react';
import NavBar2 from './components/NavBar2';
import {Button} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';



function Lista() {
    
    const handleClick = returnViag => {

        const data = {
            'idMotorista': 123,
        }
      
        fetch('http://localhost:8080/viagem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                alert('Viagens Encontradas: ')
                console.log(response.json)
                
            }
        }).catch(ex => {
            alert('Erro ao achar viagens')
            setOpen(true)
        })
      
      }
    
    return (
        <>
        <NavBar2/>
        <div className='teste'>
        <h1>Lista de Viagens</h1>

        <Button variant='contained' className='buscando' onClick={handleClick} >
        <AddIcon></AddIcon>
            Encontrar viagens
        </Button>

        </div>
             
        </>
        
    )
    }

export default Lista;