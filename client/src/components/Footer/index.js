

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
        <Link color="inherit" to={"/"}>
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
      //fixed
      sx={{
        py: 2,
        px: 2,
      }}
      style={{ backgroundColor: 'grey', position: "fixed", bottom: "0", width: "100%", margin: '-10px' }}
    >

      <Container width="fullWidth"
        style={{ display: 'flex', justifyContent: 'center' }}>
        <Copyright />
        <Link to={"/user-dashboard"} style={{ textDecoration: 'none', marginLeft: "30px" }}>
          <Button size="medium" variant="contained" style={{ color: '#FFFFFF' }}>Edit User</Button>
        </Link>
      </Container>
    </Box>
  );
}