import '../App.css'
import {Button} from '@mui/material'
import {Link} from 'react-router-dom'
import Typography from '@mui/material/Typography';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar'
import NavBar from '../components/NavBar';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Home from '../components/Home'

function  HomePage() {
  

  return (
    <>
    <NavBar />
    <Home />
    </>
    
  )
}

export default HomePage
