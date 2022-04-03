import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import {Link} from "react-router-dom";



const theme = createTheme();

export default function OwnerSign() {
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
								<FoodBankIcon sx={{height: '50px', width: '50px'}}/>
							<Typography component="h1" variant="h5">
								Sign Up
							</Typography>
							<Box
								component="form"
								noValidate
								sx={{ mt: 1 }}
							>
								<TextField
									margin="normal"
									required
									fullWidth
									id="restaurant-name"
									label="Restaurant Name"
									name="restaurant-name"
									autoComplete="restaurant-name"
									autoFocus
								/>
							    <TextField
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									id="phone_number"
									label="Phone Number"
									name="phone_number"
									autoComplete="phoneNumber"
								/>
                                <TextField
									margin="normal"
									required
									fullWidth
									id="open-hours"
									label="Open Hour"
									name="open-hours"
									autoComplete="open-hours"
								/>
                                 <TextField
									margin="normal"
									required
									fullWidth
									id="close-hours"
									label="Closing Hour"
									name="close-hours"
									autoComplete="close-hours"
								/>
                                 <TextField
									margin="normal"
									required
									fullWidth
									id="website"
									label="Website"
									name="website"
									autoComplete="website"
								/>
                                 <TextField
									margin="normal"
									required
									fullWidth
									id="image"
									label="Restaurant Image URL"
									name="image"
									autoComplete="image"
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									name="password"
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
									<Link to="/login" variant="body2">
										{'Already have an account? Sign In'}
									</Link>
								</Grid>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</ThemeProvider>
		</>
	);
}
