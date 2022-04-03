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
import Auth from '../../utils/auth';

export default function UserDashboard() {
	let [dbReservationData, setDbReservationData] = useState([]);

	const { loading, error, data } = useQuery(QUERY_RESERVATION_BY_USER, {
		variables: { userId: '624513b97cef160e8407c3a1' },
	});

	useEffect(() => {
		const reservationData = data?.getReservationsByUser || [];
		console.log(reservationData);
		setDbReservationData(reservationData);
	}, [loading]);

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
	return (
		<>
			<Link to="/">
				<Button variant="contained" sx={{ mt: 3, mb: 2 }}>
					Edit Reservation
				</Button>
			</Link>
			<Card className="card" sx={{ height: '100%' }}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
							ER
						</Avatar>
					}
					title={dbReservationData.map((reservation) => (
						<>
							<li key="{party}">{reservation.party_size}</li>
							<li key="{time}">{reservation.time_slot}</li>
							{/* <li key="{restaurant}">{reservation.restaurant}</li> */}
						</>
					))}
					subheader="Upscale Restaurant"
				/>
				<CardMedia
					component="img"
					height="194"
					image={dbReservationData.restaurant.business_image}
					alt="Paella dish"
				/>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{dbReservationData.restaurant.business_address}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{dbReservationData.restaurant.business_website}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="call">
						<PhoneIcon />
					</IconButton>
				</CardActions>
			</Card>
		</>
	);
}
