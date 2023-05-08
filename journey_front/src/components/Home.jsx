import React from 'react'
import ReactDOM from 'react-dom/client'
import {Button} from '@mui/material'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Home</h1>
        <Link to="/">   
            <Button variant="contained">App</Button>
        </Link>
    </div>
  )
}

export default Home