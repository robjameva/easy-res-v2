

import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

function Copyright() {
  return (
    <>

      <Typography className='copyright' 
      variant="body2" 
      color="text.secondary"
      sx={{px: 1}}
      style={{fontWeight: 'bold', textAlign: 'right'}}>
        {'Copyright © '}
        <Link className='link' color="inherit" to={"/"}>
          Easy Res
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
}

export default function Footer({setUserFormToggle, userFormToggle}) {
  function toggleUserForm() {
    setUserFormToggle(!userFormToggle);
    
  }

  

  return (
    <React.Fragment>
    <CssBaseline />
    <AppBar position="fixed" 
    style={{backgroundColor: '#c5c7c5'}}
    sx={{ top: 'auto', bottom: 0 }}>
    <Toolbar>
    <Grid container xs={12}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item xs={6} md={3}>
          <Link className='link' to={"/user-dashboard"} style={{ textDecoration: 'none'}}>
            <IconButton onClick={toggleUserForm} aria-label="delete" size="large">
              <SettingsIcon />
              <Typography sx={{px: 1}} varient="h6">Edit User</Typography>
            </IconButton>
          </Link>
          </Grid>
          <Grid item xs={6} md={3}>
          <Copyright />
          </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
</React.Fragment>
  );
}