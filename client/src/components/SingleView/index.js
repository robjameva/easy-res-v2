import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import image from '../../assets/testImg/1.jpg';
import DatePicker from "../DatePicker";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function SingleView() {
  
  return (
    <> 
    <ThemeProvider theme={theme}>
      <Grid item xs={12} sm={12}>
      <div className='singleBanner'>
        <h1>Making Reservations Easy!</h1>
      </div>
      </Grid>
      <Grid container component="main" sx={{ height: '85vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap'}}
        >
            <img className='singleImg' src={image}></img>
            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <IconButton aria-label="add to favorites">
            <FavoriteIcon style={{height: '50px', width: '50px'}}/>
          </IconButton>
          <IconButton aria-label="call">
            <PhoneIcon style={{height: '50px', width: '50px'}}/>
          </IconButton>
          <IconButton>
            <EmailIcon style={{height: '50px', width: '50px'}}/>
          </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate sx={{ mt: 1 }}>
            <Typography variant='h2'>
                Restaurant 1
            </Typography>
            <Typography variant='h4'>Casual Dining</Typography>
              <DatePicker/>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                 
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  );
}