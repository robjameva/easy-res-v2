import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import image from '../../assets/images/logoHalf.png'
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_RESTAURANT_BY_ID, GET_ALL_RESTAURANTS } from '../../utils/queries'
import { MAKE_RESERVATION } from '../../utils/mutations'
import unformat_business_hours from '../../utils/helpers'
import auth from '../../utils/auth';
import { Link, useHistory } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Stack from '@mui/material/Stack'

const theme = createTheme();

export default function SingleView() {
  const history = useHistory();

  useEffect(() => {
    if (!auth.loggedIn()) history.push(`/login`);
  });

  const [expanded, setExpanded] = React.useState(false);
  const { restaurantId } = useParams();
  const [timeSlot, setTimeSlot] = React.useState('');
  const [partySize, setpartySize] = React.useState('');
  const [makeRes] = useMutation(MAKE_RESERVATION);

  const { loading: loading1, error: erro1, data: data1 } = useQuery(GET_ALL_RESTAURANTS);
  const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
    variables: { restaurantId }
  });

  const allRest = data1?.getAllRestaurants || [];

  const randRest = allRest[Math.floor(Math.random() * allRest.length)];

  const restaurantData = data?.getRestaurant || [];

  const handleTimeChange = (event) => {
    setTimeSlot(event.target.value);
  };

  const handlePartyChange = (event) => {
    setpartySize(event.target.value);
  };

  const handleReservation = async () => {
    const user = auth.getProfile().data._id
    const unformattedhour = unformat_business_hours(timeSlot)

    try {
      const res = await makeRes({
        variables: {
          input: {
            party_size: partySize,
            time_slot: unformattedhour,
            user: user,
            restaurant: restaurantId
          }
        }
      });

      if (res) history.push(`/user-dashboard`);


    } catch (e) {
      console.error(e);
    }
  }

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
            sm={12}
            md={6}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <img className='singleImage' src={require(`../../assets/testImg/${restaurantData.restaurant.business_image}`)}></img>
            <div className='bottomBanner'>
              <Grid container style={{ marginTop: "60px" }}>
                <Grid item xs={6} style={{ display: "flex" }}>
                  <h3>Not What You Had in Mind? Maybe Try {randRest.business_name}! </h3>
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Stack style={{ display: 'flex', alignItems: 'center', padding: '3%' }}>
                    <img className='singleLogo' src={image}></img>
                    <Link className='link' to={`/restaurant/${randRest._id}`}>
                      <Button style={{ backgroundColor: 'white', fontWeight: 'bold', color: 'black', marginTop: '25%' }} variant="contained" startIcon={<RestaurantIcon />}>
                        Try It Out!
                      </Button>
                    </Link>
                  </Stack>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid className='singleView' item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component="form" noValidate sx={{ mt: 1 }} style={{ display: "flex", flexWrap: "wrap", marginTop: "20%" }}>
                <Stack>
                  <Typography variant='h2'>
                    {restaurantData.restaurant.business_name}
                  </Typography>
                  <Typography sx={{ my: 2 }} variant='h4'>{restaurantData.restaurant.business_website}</Typography>
                  <Typography sx={{ my: 2 }} variant='h6'>{restaurantData.restaurant.business_address}</Typography>
                  <Typography sx={{ my: 2 }} variant='h6'>{restaurantData.restaurant.business_phone}</Typography>
                </Stack>
                <Grid item xs={12} style={{ marginTop: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                  <Grid item xs={12}>
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
                  <Grid item xs={12} style={{}}>
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
      </ThemeProvider>
    </>
  );
}