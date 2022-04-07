import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_RESERVATION_BY_USER, GET_USER_INFO } from '../../utils/queries';
import { EDIT_USER, DELETE_RESERVATION } from '../../utils/mutations'
import auth from '../../utils/auth';
import { format_business_hour } from '../../utils/helpers'



export default function UserDashboard({ userFormToggle }) {
  const user = auth.getProfile().data._id;
  const [userFormData, setUserFormData] = useState({});
  const [editUser, { error: editUserError }] = useMutation(EDIT_USER);
  const [deleteRes, { error: deleteResError }] = useMutation(DELETE_RESERVATION);

  let [dbReservationData, setDbReservationData] = useState([]);

  const { loading, error, data } = useQuery(QUERY_RESERVATION_BY_USER, {
    variables: { userId: user },
  });

  const { loading: l1, error: e1, data: d1 } = useQuery(GET_USER_INFO, {
    variables: { userId: user },
  });
  const userData = d1?.getUser || [];

  useEffect(() => {
    const reservationData = data?.getReservationsByUser || [];
    setDbReservationData(reservationData);
  }, [loading]);


  function handleEditRes(restaurantId, reservationId) {
    window.location.assign(`/restaurant/${restaurantId}/${reservationId}`);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmitEditUser = async (event) => {
    event.preventDefault();

    try {
      const response = await editUser({
        variables: { input: { ...userFormData, _id: user } },
      });
      window.location.assign('/user-dashboard')

    } catch (err) {
      console.error(err);
    }

  };

  const handleDeleteRes = async (reservationID) => {

    try {
      const response = await deleteRes({
        variables: { id: reservationID },
      });

      window.location.assign('/user-dashboard')

    } catch (err) {
      console.error(err);
    }

  };

  // if (!dbReservationData.length) {
  //   return <Typography variant="h3" sx={{ textAlign: "center" }}>No Reservations</Typography>
  // }

  if (loading || l1) {
    return <h1>Loading</h1>;
  }

  console.log(dbReservationData)
  return (
    <>
      <br />
      <Grid container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {dbReservationData.length ?
          dbReservationData.map((reservation, index) => (
            <Grid key={index} item xs={12} padding >
              <Grid item xs={8} padding>
                <Card sx={{ width: '60vw', maxHeight: '40vh' }}>
                  <CardMedia
                    component="img"
                    image={require(`../../assets/testImg/${reservation.restaurant.business_image}`)}
                    alt={reservation.restaurant.business_name}
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
                      Party: {reservation.party_size} people
                    </Typography>
                  </CardContent>
                  <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                    <CardActions disableSpacing>
                      <Button style={{ width: "91.2px" }} onClick={() => handleEditRes(reservation.restaurant._id, reservation._id)} variant="outlined" sx={{ mt: 3, mb: 2, mx: 0.5 }}>
                        Edit
                      </Button>

                      <Button style={{ width: "91.2px" }} onClick={() => handleDeleteRes(reservation._id)} variant="outlined" color="error" sx={{ mt: 3, mb: 2, mx: 0.5 }} >
                        Cancel
                      </Button>

                    </CardActions>
                  </Grid>
                </Card>
              </Grid>
              <br />
              <br />
            </Grid>
          )) :
          <h1>No Reservations!</h1>}

        {userFormToggle && <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
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
                onChange={handleInputChange}
                value={userFormData.first_name}
                defaultValue={userData.first_name}
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
                onChange={handleInputChange}
                value={userFormData.last_name}
                defaultValue={userData.last_name}
                autoComplete="lastName"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone_number"
                label="Phone Number"
                name="phone_number"
                onChange={handleInputChange}
                value={userFormData.phone_number}
                defaultValue={userData.phone_number}
                autoComplete="phoneNumber"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleInputChange}
                value={userFormData.email}
                defaultValue={userData.email}
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={handleInputChange}
                value={userFormData.password}
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
                onClick={handleSubmitEditUser}
              >
                Confirm Edit
              </Button>
              <Grid container>
                <Grid item xs>

                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>}
      </Grid>
    </>
  );
}
