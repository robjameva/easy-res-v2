import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client"
import { CREATE_RESTAURANT } from '../../utils/mutations';
import auth from '../../utils/auth'

const theme = createTheme();

export default function AddRestaurant() {
	const history = useHistory();

	useEffect(() => {
		const isOwner = localStorage.getItem("isOwner");
		if (!isOwner) history.push(`/owner`);
	});


	const user = auth.getProfile().data._id;

	const [userFormData, setUserFormData] = useState({});

	const [createRestaurant, { error }] = useMutation(CREATE_RESTAURANT);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		userFormData.occupancy = parseInt(userFormData.occupancy)
		userFormData.business_hours_open = parseInt(userFormData.business_hours_open)
		userFormData.business_hours_close = parseInt(userFormData.business_hours_close)

		const images = ['pexels-marcus-herzberg-1058277.jpg', 'pexels-photo-67468.webp',
			'pexels-photo-239975.jpg', 'pexels-photo-260922.jpg', 'pexels-photo-262978.webp',
			'pexels-photo-315755.jpg', 'pexels-photo-382297.jpg', 'pexels-photo-541216.jpg',
			'pexels-photo-580613.webp', 'pexels-photo-687824.webp', 'pexels-photo-914388.jpg',
			'pexels-photo-1126728.webp', 'pexels-photo-1267320.jpg', 'pexels-photo-1581384.jpg',
			'pexels-photo-1833349.jpg', 'pexels-photo-7624446.jpg']

		const randomImage = images[Math.floor(Math.random() * images.length)]

		try {
			const { data } = await createRestaurant({
				variables: { input: { ...userFormData, owner: user, business_image: randomImage } },
			});

			if (data) {
				history.push(`/`);
				window.location.reload();
			}

		} catch (err) {
			console.error(err);
		}
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
							<FoodBankIcon sx={{ height: '50px', width: '50px' }} />
							<Typography component="h1" variant="h5">
								Add New Restaurant
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
									id="business_name"
									label="Restaurant Name"
									name="business_name"
									autoFocus
									onChange={handleInputChange}
									value={userFormData.restaurantName}
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									id="business_address"
									label="Restaurant address"
									name="business_address"
									onChange={handleInputChange}
									value={userFormData.address}
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									id="business_phone"
									label="Phone Number"
									name="business_phone"
									onChange={handleInputChange}
									value={userFormData.phone_number}
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									id="occupancy"
									label="Occupancy"
									name="occupancy"
									onChange={handleInputChange}
									value={userFormData.occupancy}
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									id="business_hours_open"
									label="Open Hour"
									name="business_hours_open"
									onChange={handleInputChange}
									value={userFormData.open}
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									id="business_hours_close"
									label="Closing Hour"
									name="business_hours_close"
									onChange={handleInputChange}
									value={userFormData.close}
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									id="business_website"
									label="Website"
									name="business_website"
									onChange={handleInputChange}
									value={userFormData.website}
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
									onClick={handleSubmit}
								>
									Add Restaurant
								</Button>
								<Grid container>
									<Grid item xs></Grid>
									<Link className='link' to="/login" variant="body2">
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