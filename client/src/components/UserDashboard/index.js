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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_RESERVATION_BY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';

export default function UserDashboard() {
	let [dbReservationData, setDbReservationData] = useState({});

	const { loading, error, data } = useQuery(QUERY_RESERVATION_BY_USER, {
		variables: { userId: '6244d77959260156a4ace91d' },
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
			<ul>
				{dbReservationData.map((reservation) => (
					<>
						<li key="{party}">{reservation.party_size}</li>
						<li key="{time}">{reservation.time_slot}</li>
						{/* <li key="{restaurant}">{reservation.restaurant}</li> */}
					</>
				))}
			</ul>

			<Link to="/">
				<Button variant="contained" sx={{ mt: 3, mb: 2 }}>
					Edit User
				</Button>
			</Link>
		</>
	);
}
