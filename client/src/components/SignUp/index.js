import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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



const theme = createTheme();

export default function SignUpSide() {
	const [userFormData, setUserFormData] = useState({
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

		try {
			const { data } = await createUser({
				variables: { input: { ...userFormData } },
			});

			if (data.createUser.user.isOwner) localStorage.setItem('isOwner', false);

			Auth.login(data.createUser.token);
		} catch (err) {
			console.error(err);
		}

		setUserFormData({
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
				<Grid container component="main" sx={{ height: '120vh' }}>
					<CssBaseline />
					<Grid
						item
						xs={false}
						sm={4}
						md={7}
						sx={{
							backgroundImage: 'url(https://source.unsplash.com/random/?food-drink)',
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
										<Link to="/login" variant="body2">
											{'Already have an account?'}
										</Link>
										<br></br>
										<Link to="/owner" variant="body2">
											{'Use Easy Res at your restaurant!'}
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
