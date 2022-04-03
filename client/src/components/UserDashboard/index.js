import React, { useEffect, useState } from 'react';
import SearchAppBar from '../AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIcon from '@mui/icons-material/Phone';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_RESERVATION_BY_USER } from '../../utils/queries';
import auth from '../../utils/auth';

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

	if (!dbReservationData.length) {
		return (
			<>
				<h3>No Reservations</h3>

				<Link to="/">
					<Button variant="contained" sx={{ mt: 3, mb: 2 }}>
						Edit User
					</Button>
				</Link>
			</>
		);
	}
	if (loading) {
		return <h1>Loading</h1>;
	}
	console.log(dbReservationData);
	return (
		<>
			<Grid container>
				{dbReservationData.map((reservation, index) => (
					<Grid key={index} item xs={12} padding>
						<Grid item xs={3}>
							<Card className="card" sx={{ height: '100%' }}>
								<CardHeader
									avatar={
										<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
											ER
										</Avatar>
									}
									title={reservation.restaurant.business_name}
									subheader="Upscale Restaurant"
								/>
								<CardMedia
									component="img"
									height="194"
									image={reservation.restaurant.business_image}
									alt="Paella dish"
								/>
								<CardContent>
									<Typography variant="body2" color="text.secondary">
										{reservation.restaurant.business_address}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{reservation.restaurant.business_website}
									</Typography>
								</CardContent>
								<CardActions disableSpacing>
									<IconButton aria-label="add to favorites">
										<FavoriteIcon />
									</IconButton>
									<IconButton aria-label="call">
										<PhoneIcon />
									</IconButton>
									<Link to="/">
										<Button variant="contained" sx={{ mt: 3, mb: 2 }}>
											Edit Reservation
										</Button>
									</Link>
								</CardActions>
							</Card>
						</Grid>

						<Grid item padding>
							<Typography variant="h4">Reservation Info:</Typography>
							<Typography>Time:{reservation.time_slot}</Typography>
							<Typography>Party Size:{reservation.party_size}</Typography>
						</Grid>
					</Grid>
				))}
				<Link to="/">
					<Button variant="contained" sx={{ mt: 3, mb: 2 }}>
						Edit User
					</Button>
				</Link>
			</Grid>
		</>
	);
}
