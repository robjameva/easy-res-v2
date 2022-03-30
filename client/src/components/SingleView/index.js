import React from "react";
import SearchAppBar from "../AppBar";
import Footer from "../Footer";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import image from '../../assets/testImg/1.jpg';
import DatePicker from "../DatePicker";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { requirePropFactory } from "@mui/material";

const theme = createTheme();

export default function SingleView() {
  
  return (
    <> 
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '85vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
        //   sx={{
        //     backgroundImage: `url(${image})`,
        //     backgroundRepeat: 'no-repeat',
        //     backgroundColor: (t) =>
        //       t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center',
        //   }}
        >
            <img className='singleImg' src={image}></img>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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