// import React from 'react';
// import SearchAppBar from '../AppBar';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { Link } from 'react-router-dom';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { useMutation } from '@apollo/client';
// import { UPDATE_USER } from '../../utils/mutations';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import auth from '../../utils/auth';

// function Copyright(props) {
// 	return (
// 		<Typography
// 			variant="body2"
// 			color="text.secondary"
// 			align="center"
// 			{...props}
// 		>
// 			{'Copyright © '}
// 			<Link color="inherit" href="https://mui.com/">
// 				Easy Res
// 			</Link>{' '}
// 			{new Date().getFullYear()}
// 			{'.'}
// 		</Typography>
// 	);
// }

// const theme = createTheme();

// export default function LoginSide() {
// 	const user = auth.getProfile().data._id;

// 	const { loading, error, data } = useQuery(QUERY_RESERVATION_BY_USER, {
// 		variables: { userId: user },
// 	});

// 	const [editUserData, setEditUserData] = useState({});

// 	const handleSubmit = async (event) => {
// 		event.preventDefault();

// 		const data = new FormData(event.currentTarget);
// 		console.log({
// 			email: data.get('email'),
// 			password: data.get('password'),
// 		});
// 	};

// 	return (
// 		<>
// 			<SearchAppBar />
// 			<ThemeProvider theme={theme}>
// 				<Grid container component="main" sx={{ height: '100vh' }}>
// 					<CssBaseline />
// 					<Grid
// 						item
// 						xs={false}
// 						sm={4}
// 						md={7}
// 						sx={{
// 							backgroundImage:
// 								'url(https://source.unsplash.com/random/?food-drink)',
// 							backgroundRepeat: 'no-repeat',
// 							backgroundColor: (t) =>
// 								t.palette.mode === 'light'
// 									? t.palette.grey[50]
// 									: t.palette.grey[900],
// 							backgroundSize: 'cover',
// 							backgroundPosition: 'center',
// 						}}
// 					/>
// 					<Grid
// 						item
// 						xs={12}
// 						sm={8}
// 						md={5}
// 						component={Paper}
// 						elevation={6}
// 						square
// 					>
// 						<Box
// 							sx={{
// 								my: 8,
// 								mx: 4,
// 								display: 'flex',
// 								flexDirection: 'column',
// 								alignItems: 'center',
// 							}}
// 						>
// 							<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
// 								<LockOutlinedIcon />
// 							</Avatar>
// 							<Typography component="h1" variant="h5">
// 								Edit User
// 							</Typography>
// 							<Box
// 								component="form"
// 								noValidate
// 								onSubmit={handleSubmit}
// 								sx={{ mt: 1 }}
// 							>
// 								<TextField
// 									margin="normal"
// 									required
// 									fullWidth
// 									id="first_name"
// 									label="First Name"
// 									name="firstName"
// 									autoComplete="firstName"
// 									autoFocus
// 								/>
// 								<TextField
// 									margin="normal"
// 									required
// 									fullWidth
// 									id="last_name"
// 									label="Last Name"
// 									name="lastName"
// 									autoComplete="lastName"
// 								/>
// 								<TextField
// 									margin="normal"
// 									required
// 									fullWidth
// 									id="phone_number"
// 									label="Phone Number"
// 									name="phoneNumber"
// 									autoComplete="phoneNumber"
// 								/>
// 								<TextField
// 									margin="normal"
// 									required
// 									fullWidth
// 									id="username"
// 									label="Username"
// 									name="username"
// 									autoComplete="username"
// 								/>
// 								<TextField
// 									margin="normal"
// 									required
// 									fullWidth
// 									id="email"
// 									label="Email Address"
// 									name="email"
// 									autoComplete="email"
// 								/>
// 								<TextField
// 									margin="normal"
// 									required
// 									fullWidth
// 									name="password"
// 									label="Password"
// 									type="password"
// 									id="password"
// 									autoComplete="current-password"
// 								/>
// 								<TextField
// 									margin="normal"
// 									required
// 									fullWidth
// 									name="confirm_password"
// 									label="Confirm Password"
// 									type="password"
// 									id="password"
// 									autoComplete="current-password"
// 								/>

// 								<Button
// 									type="submit"
// 									fullWidth
// 									variant="contained"
// 									sx={{ mt: 3, mb: 2 }}
// 								>
// 									Edit
// 								</Button>
// 								<Grid container>
// 									<Grid item xs></Grid>
// 									<Grid item>
// 										<Link to="/login" variant="body2">
// 											{'Already have an account? Sign In'}
// 										</Link>
// 									</Grid>
// 								</Grid>
// 							</Box>
// 						</Box>
// 					</Grid>
// 				</Grid>
// 			</ThemeProvider>
// 		</>
// 	);
// }