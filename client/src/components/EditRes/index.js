import React from 'react';
import Grid from '@mui/material/Grid';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_RESTAURANT_BY_ID } from '../../utils/queries'
import { EDIT_RESERVATION } from '../../utils/mutations'
import unformat_business_hours from '../../utils/helpers'
import { useHistory } from 'react-router-dom';


const theme = createTheme();

export default function EditRes() {
  const history = useHistory();
  const { restaurantId } = useParams();
  const { reservationId } = useParams();
  const [timeSlot, setTimeSlot] = React.useState('');
  const [partySize, setpartySize] = React.useState('');
  const [editRes] = useMutation(EDIT_RESERVATION);

  const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
    variables: { restaurantId }
  });

  const restaurantData = data?.getRestaurant || [];

  const handleTimeChange = (event) => {
    setTimeSlot(event.target.value);
  };

  const handlePartyChange = (event) => {
    setpartySize(event.target.value);
  };

  const handleReservation = async () => {
    const unformattedhour = unformat_business_hours(timeSlot)

    try {
      editRes({
        variables: {
          input: {
            reservationID: reservationId,
            party_size: partySize,
            time_slot: unformattedhour
          }
        }
      });

      history.push(`/`);
      window.location.reload();

    } catch (e) {
      console.error(e);
    }
  }


  return (
    <>
      {loading ? <h1>Loading</h1> :
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
              sm={12}
              md={6}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <img className='singleImage' src={require(`../../assets/testImg/${restaurantData.restaurant.business_image}`)}></img>
            </Grid>
            <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
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
                  <Grid item xs={12} style={{ marginTop: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
                    <Grid item xs={12} >
                      <InputLabel>Time</InputLabel>
                      <Select
                        sx={{ width: '100%' }}
                        value={timeSlot}
                        label="timeSlot"
                        onChange={handleTimeChange}
                      >
                        {restaurantData.hours.map(hour => <MenuItem key={hour} value={hour}>{hour}</MenuItem>)}
                      </Select>
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel>Party Size</InputLabel>
                      <Select
                        sx={{ width: '100%' }}
                        value={partySize}
                        label="partySize"
                        onChange={handlePartyChange}
                      >
                        <MenuItem value={1}>{1}</MenuItem>
                        <MenuItem value={2}>{2}</MenuItem>
                        <MenuItem value={3}>{3}</MenuItem>
                        <MenuItem value={4}>{4}</MenuItem>
                        <MenuItem value={5}>{5}</MenuItem>
                        <MenuItem value={6}>{6}</MenuItem>
                        <MenuItem value={7}>{7}</MenuItem>
                        <MenuItem value={8}>{8}</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid container style={{ marginTop: '10%' }}>
                    <Grid item >
                      {timeSlot && partySize
                        ? <Button onClick={handleReservation} variant="contained" endIcon={<FoodBankIcon />}>
                          Reserve
                        </Button>
                        :
                        <Button disabled variant="contained" endIcon={<FoodBankIcon />}>
                          Reserve
                        </Button>
                      }
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>}
    </>
  );
}