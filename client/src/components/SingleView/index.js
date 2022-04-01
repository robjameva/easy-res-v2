import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FavoriteIcon from '@mui/icons-material/Favorite';
import image from '../../assets/testImg/1.jpg';
import DatePicker from "../DatePicker";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { GET_RESTAURANT_BY_ID } from '../../utils/queries'

const theme = createTheme();

export default function SingleView() {

  const { restaurantId } = useParams();

  const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
    variables: { restaurantId }
  });

  const restaurantData = data?.getRestaurant || [];
  console.log(restaurantData)

  const [timeSlot, setTimeSlot] = React.useState('');

  const handleChange = (event) => {
    setTimeSlot(event.target.value);
  };

  if (loading) {
    return <h1>Loading</h1>
  }

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
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}
          >
            <img className='singleImg' src={image}></img>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon style={{ height: '50px', width: '50px' }} />
              </IconButton>
              <IconButton aria-label="call">
                <PhoneIcon style={{ height: '50px', width: '50px' }} />
              </IconButton>
              <IconButton>
                <EmailIcon style={{ height: '50px', width: '50px' }} />
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
                  {restaurantData.restaurant.business_name}
                </Typography>
                <Typography variant='h4'>{restaurantData.restaurant.business_website}</Typography>
                <Typography variant='h6'>{restaurantData.restaurant.business_address}</Typography>
                <Typography variant='h6'>{restaurantData.restaurant.business_phone}</Typography>
                {/* <DatePicker /> */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Time</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={timeSlot}
                    label="timeSlot"
                    onChange={handleChange}
                  >
                    {restaurantData.hours.map(hour => <MenuItem key={hour} value={hour}>{hour}</MenuItem>)}


                  </Select>
                </FormControl>
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