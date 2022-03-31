import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
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

<<<<<<< HEAD:client/src/components/Login/index.js
export default function LoginSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <> 
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '85vh' }}>
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
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link to="/sign-up" variant="body2">
                      {"Don't have an account? Sign Up"}
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
=======
export default function SignInSide() {
	const [userFormData, setUserFormData] = useState({ email: '', password: '' });
	const [validated] = useState(false);
	const [login] = useMutation(LOGIN_USER);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		});
		if (data.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		try {
			const { data } = await login({
				variables: { ...userFormData },
			});
			console.log(data);

			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}

		// clear form values
		setUserFormData({
			email: '',
			password: '',
		});
	};

	return (
		<>
			<ThemeProvider theme={theme}>
				<Grid container component="main" sx={{ height: '85vh' }}>
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
								Sign in
							</Typography>
							<Box
								component="form"
								noValidate
								validated={validated}
								onSubmit={handleSubmit}
								sx={{ mt: 1 }}
							>
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
									autoFocus
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
								<FormControlLabel
									control={<Checkbox value="remember" color="primary" />}
									label="Remember me"
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Sign In
								</Button>
								<Grid container>
									<Grid item xs></Grid>
									<Grid item>
										<Link href="#" variant="body2">
											{"Don't have an account? Sign Up"}
										</Link>
									</Grid>
								</Grid>
								<Copyright sx={{ mt: 5 }} />
							</Box>
						</Box>
					</Grid>
				</Grid>
			</ThemeProvider>
		</>
	);
}
>>>>>>> feature/use-query-hooks:client/src/components/SignIn/index.js
