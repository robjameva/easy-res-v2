
   
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

function Copyright() {
  return (
    <>
      
      <Typography variant="body2" color="text.secondary">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Easy Res
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
}

export default function Footer() {
  return (
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
        }}
        style={{backgroundColor:'white'}}
      >
        
        <Container width="fullWidth" 
        style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Copyright />
          <Link to="/user-dashboard" style={{ textDecoration: 'none' }}>
              <Button size="medium" variant="outlined" style={{ color: '#21325e' }}>Edit User</Button>
          </Link>
        </Container>
      </Box>
  );
}