import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIcon from '@mui/icons-material/Phone';
import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery } from '@apollo/client';
import { QUERY_RESERVATION_BY_USER } from '../../utils/queries';
import auth from '../../utils/auth';
import { format_business_hour } from '../../utils/helpers'

// const theme = createTheme();

export default function UserDashboard() {
  const user = auth.getProfile().data._id;
  let [dbReservationData, setDbReservationData] = useState([]);

  let [userFormToggle, setUserFormToggle] = useState(false);

  const { loading, error, data } = useQuery(QUERY_RESERVATION_BY_USER, {
    variables: { userId: user },
  });

  useEffect(() => {
    const reservationData = data?.getReservationsByUser || [];
    setDbReservationData(reservationData);
  }, [loading]);


  function handleEditRes(restaurantId, reservationId) {
    window.location.assign(`/restaurant/${restaurantId}/${reservationId}`);
  }

  function toggleUserForm() {
    setUserFormToggle(!userFormToggle);
  }

  if (!dbReservationData.length) {
    return <Typography variant="h3" sx={{ textAlign: "center" }}>No Reservations</Typography>
  }

  if (loading) {
    return <h1>Loading</h1>;
  }

  console.log(dbReservationData);

  return (
    <>
      <br />
      <Grid container>
        {dbReservationData.map((reservation, index) => (
          <Grid key={index} item xs={12} padding sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Grid item xs={8} padding>
              <Card sx={{ width: '60vw', maxHeight: '40vh' }}>
                <CardMedia
                  component="img"
                  // image={reservation.restaurant.business_image}
                  image={'https://media-cdn.tripadvisor.com/media/photo-s/1a/b8/46/6d/london-stock.jpg'}
                  alt="Paella dish"
                />
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Card sx={{ width: '60vw', maxHeight: '30vh' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" component="div">
                    Your Reservation at {reservation.restaurant.business_name}
                  </Typography>
                  <Typography variant="h6">
                    Time: {format_business_hour(reservation.time_slot)}
                  </Typography>
                  <Typography variant="h6">
                    Party Size: {reservation.party_size} people
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="call">
                    <PhoneIcon />
                  </IconButton>

                  <Button onClick={() => handleEditRes(reservation.restaurant._id, reservation._id)} variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Edit Reservation
                  </Button>

                </CardActions>
              </Card>
            </Grid>
            <br />
            <br />

            {userFormToggle &&
              <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square >
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box component="form" noValidate padding sx={{ mt: 1, width: '25vw', textAlign: 'center' }}>
                    <Typography variant='h3'>
                      Edit User
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="first_name"
                      label="First Name"
                      name="first_name"
                      // onChange={handleInputChange}
                      // value={userFormData.first_name}
                      autoComplete="firstName"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      // onChange={handleInputChange}
                      // value={userFormData.last_name}
                      autoComplete="lastName"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="phone_number"
                      label="Phone Number"
                      name="phone_number"
                      // onChange={handleInputChange}
                      // value={userFormData.phone_number}
                      autoComplete="phoneNumber"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      // onChange={handleInputChange}
                      // value={userFormData.email}
                      autoComplete="email"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      // onChange={handleInputChange}
                      // value={userFormData.password}
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Confirm Edit
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        {/* {timeSlot && partySize
                      ? <Button onClick={handleReservation} variant="contained" endIcon={<FoodBankIcon />}>
                        Reserve
                      </Button>
                      :
                      <Button disabled variant="contained" endIcon={<FoodBankIcon />}>
                        Reserve
                      </Button>} */}
                      </Grid>
                      <Grid item>

                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>

            }
          </Grid>
        ))}

        <Button onClick={toggleUserForm} variant="contained" sx={{ mt: 3, mb: 2 }}>
          Edit User
        </Button>

      </Grid>
    </>
  );
}
