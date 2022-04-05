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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_RESERVATION_BY_USER } from '../../utils/queries';
import auth from '../../utils/auth';

const theme = createTheme();

export default function UserDashboard() {
	const user = auth.getProfile().data._id;

	const { loading, error, data } = useQuery(QUERY_RESERVATION_BY_USER, {
		variables: { userId: user },
	});

	useEffect(() => {
		const reservationData = data?.getReservationsByUser || [];
		// console.log(reservationData);
		setDbReservationData(reservationData);
	}, [loading]);

	let [dbReservationData, setDbReservationData] = useState([]);

  let [resFormToggle, setResFormToggle] = useState(false);
  let [userFormToggle, setUserFormToggle] = useState(false);

  const [timeSlot, setTimeSlot] = React.useState('');
  const [partySize, setpartySize] = React.useState('');

  const handleTimeChange = (event) => {
    setTimeSlot(event.target.value);
  };

  const handlePartyChange = (event) => {
    setpartySize(event.target.value);
  };

  // const handleReservation = () => {
  //   const user = auth.getProfile().data._id
  //   const unformattedhour = unformat_business_hours(timeSlot)

  //   try {
  //     makeRes({
  //       variables: {
  //         input: {
  //           party_size: partySize,
  //           time_slot: unformattedhour,
  //           user: user,
  //           restaurant: restaurantId
  //         }
  //       }
  //     });

  //     window.location.assign('/');

  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  function toggleResForm() {
    setResFormToggle(!resFormToggle);
  }

  function toggleUserForm() {
    setUserFormToggle(!userFormToggle);
  }

	if (!dbReservationData.length) {
		return (
			<>
				<Typography variant="h3" sx={{textAlign: "center"}}>No Reservations</Typography>

				
					<Button onClick={toggleUserForm} variant="contained" sx={{ mt: 3, mb: 2 }}>
						Edit User
					</Button>
				
			</>
		);
	}
	if (loading) {
		return <h1>Loading</h1>;
	}
	console.log(dbReservationData);
	return (
		<>
      <br/>
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
									image={reservation.restaurant.business_image}
									alt="Paella dish"
								/>
              </Card>
            </Grid>
						<Grid item xs={8}>
            <Card sx={{ width: '60vw', maxHeight: '30vh' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    ER
                  </Avatar>
                }
                title={reservation.restaurant.business_name}
                titleTypographyProps={{ variant:'h3' }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" component="div">
                  Reservation Information
                </Typography>
                <Typography variant="h6">
                  Time:{reservation.time_slot}
                </Typography>
                <Typography variant="h6">
                  Party Size:{reservation.party_size}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="call">
                  <PhoneIcon />
                </IconButton>
                
                  <Button onClick={toggleResForm} variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Edit Reservation
                  </Button>
                
              </CardActions>
            </Card>
						</Grid>
            <br/>
            <br/>
          {resFormToggle && 
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
                  {reservation.restaurant.business_name}
                </Typography>
                <Typography variant='h4'>{reservation.restaurant.business_website}</Typography>
                <Typography variant='h6'>{reservation.restaurant.business_address}</Typography>
                <Typography variant='h6'>{reservation.restaurant.business_phone}</Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Time</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={timeSlot}
                    label="timeSlot"
                    onChange={handleTimeChange}
                  >
                    {/* {restaurantData.hours.map(hour => <MenuItem key={hour} value={hour}>{hour}</MenuItem>)} */}


                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Party Size</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={reservation.partySize}
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
                </FormControl>
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
          <br/>
          <br/>
          
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
