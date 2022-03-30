import React, { useState } from 'react';
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
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Easy Res
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function SignUpSide() {
	const [userFormData, setUserFormData] = useState({
		username: '',
		first_name: '',
		last_name: '',
		phone_number: '',
		email: '',
		password: '',
	});

	const [createUser, { error }] = useMutation(CREATE_USER);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		// const data = new FormData(event.currentTarget);
		// console.log({
		// 	username: data.get('username'),
		// 	first_name: data.get('first_name'),
		// 	last_name: data.get('last_name'),
		// 	phone_number: data.get('phone_number'),
		// 	email: data.get('email'),
		// 	password: data.get('password'),
		// });

		try {
			console.log('inside try');
			console.log(userFormData);

			const { data } = await createUser({
				variables: {
					first_name: 'nick',
					last_name: 'o',
					phone_number: '12234567890',
					username: 'nicko',
					password: '12345',
					email: 'nick@gmail.com',
				},
			});

			console.log(error);
			console.log(data);
			Auth.login(data.createUser.token);
		} catch (err) {
			console.error(err);
		}

		setUserFormData({
			username: '',
			first_name: '',
			last_name: '',
			phone_number: '',
			email: '',
			password: '',
		});
	};

	return (
		<>
			<ThemeProvider theme={theme}>
				<Grid container component="main" sx={{ height: '100vh' }}>
					<CssBaseline />
					<Grid
						item
						xs={false}
						sm={4}
						md={7}
						sx={{
							backgroundImage: 'url(https://source.unsplash.com/random)',
							backgroundRepeat: 'no-repeat',
							backgroundColor: (t) =>
								t.palette.mode === 'light'
									? t.palette.grey[50]
									: t.palette.grey[900],
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					/>
					<Grid
						item
						xs={12}
						sm={8}
						md={5}
						component={Paper}
						elevation={6}
						square
					>
						<Box
							sx={{
								my: 8,
								mx: 4,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								Sign Up
							</Typography>
							<Box
								component="form"
								noValidate
								onSubmit={handleSubmit}
								sx={{ mt: 1 }}
							>
								<TextField
									margin="normal"
									required
									fullWidth
									id="first_name"
									label="First Name"
									name="first_name"
									onChange={handleInputChange}
									value={userFormData.first_name}
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
									autoComplete="phoneNumber"
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									onChange={handleInputChange}
									value={userFormData.username}
									autoComplete="username"
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
								<TextField
									margin="normal"
									required
									fullWidth
									name="confirm_password"
									label="Confirm Password"
									type="password"
									id="confirm_password"
									autoComplete="current-password"
								/>

								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Sign Up
								</Button>
								<Grid container>
									<Grid item xs></Grid>
									<Grid item>
										<Link to="/sign-in" variant="body2">
											{'Already have an account? Sign In'}
										</Link>
										<br></br>
										<Link to="" variant="body2">
											{'Want to put your restaurant on our site? Sign up here'}
										</Link>
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
