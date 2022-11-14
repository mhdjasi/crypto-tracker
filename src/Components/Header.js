import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {

const darkTheme = createTheme({
  palette: {
    primary:{
      main: "#fff",
    },
    type: "dark",
},
});

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
  <Container>
    <Toolbar>
     
        <Typography className='title' variant='h6'>
          <Link to={'/'}><h3 className='title'>Crypto Tracker</h3></Link>
        </Typography>
      
      <Select variant='outlined' style={{
        width:100,
        height:40,
        marginLeft: 15,
      }}>
        <MenuItem value={"USD"} style={{color:"white"}}>USD</MenuItem>
        <MenuItem value={"INR"}>INR</MenuItem>
      </Select>
    </Toolbar>
  </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header