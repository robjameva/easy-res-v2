import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import IconButton, { IconButtonProps } from '@mui/material/IconButton'; import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FavoriteIcon from '@mui/icons-material/Favorite';
import image from '../../assets/testImg/1.jpg';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_RESTAURANT_BY_ID, GET_ALL_RESTAURANTS } from '../../utils/queries'
import { MAKE_RESERVATION } from '../../utils/mutations'
import { requirePropFactory } from "@mui/material";
import unformat_business_hours from '../../utils/helpers'
import auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RestaurantIcon from '@mui/icons-material/Restaurant';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const theme = createTheme();

export default function SingleView() {
  const [expanded, setExpanded] = React.useState(false);
  // const { restaurantId } = useParams();
  // const [timeSlot, setTimeSlot] = React.useState('');
  // const [partySize, setpartySize] = React.useState('');
  // const [makeRes] = useMutation(MAKE_RESERVATION);

  const { loading, error, data } = useQuery(GET_ALL_RESTAURANTS);
  const allRest = data?.getAllRestaurants || [];

  const randRest = allRest[Math.floor(Math.random() * allRest.length)];

  // const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
  //   variables: { restaurantId }
  // });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const restaurantData = data?.getRestaurant || [];
  // console.log(restaurantData)


  // const handleTimeChange = (event) => {
  //   setTimeSlot(event.target.value);
  // };

  // const handlePartyChange = (event) => {
  //   setpartySize(event.target.value);
  // };

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

  // if (loading) {
  //   return <h1>Loading</h1>
  // }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid item xs={12} sm={12}>
          <div className='singleBanner'>
            <h1>Making Reservations Easy!</h1>
          </div>
        </Grid>
        <Grid container component="main" sx={{ height: '85vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={12}
            md={6}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <Card sx={{ width: '70%' }}>
              <CardMedia
                component="img"
                height="300"
                image={image}
                alt="Paella dish"
              />
              <CardActions disableSpacing>
                <Typography>
                  Contact Restaurant
                </Typography>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Phone" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Favorite" />
                      </ListItemButton>
                    </ListItem>
                  </List>

                </CardContent>
              </Collapse>
            </Card>
            <div className='bottomBanner'>
              <h3>Not What You Were Looking For? Try feggeeg </h3>
              {/* <Link to={`/restaurant/${randRest._id}`}> */}
              <Button variant="contained" startIcon={<RestaurantIcon />}>
                Try It Out
              </Button>
              {/* </Link> */}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <Typography variant='h2'>
                  Rest name
                  {/* {restaurantData.restaurant.business_name} */}
                </Typography>
                {/* <Typography variant='h4'>{restaurantData.restaurant.business_website}</Typography>
                <Typography variant='h6'>{restaurantData.restaurant.business_address}</Typography>
                <Typography variant='h6'>{restaurantData.restaurant.business_phone}</Typography> */}
                <Grid comtainer xs={12} style={{ marginTop: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
                  <Grid item xs={12} >
                    <InputLabel>Time</InputLabel>
                    <Select
                      sx={{ width: '100%' }}
                      // value={timeSlot}
                      label="timeSlot"
                      value='10'
                    // onChange={handleTimeChange}
                    >
                      {/* {restaurantData.hours.map(hour => <MenuItem key={hour} value={hour}>{hour}</MenuItem>)} */}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Party Size</InputLabel>
                    <Select
                      sx={{ width: '100%' }}
                      // value={partySize}
                      label="partySize"
                    // onChange={handlePartyChange}
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
                  </Grid>
                </Grid>
                <Grid container style={{ marginTop: '10%' }}>
                  <Grid item >
                    {/* {timeSlot && partySize */}
                    {/* ? <Button onClick={handleReservation} variant="contained" endIcon={<FoodBankIcon />}>
                        Reserve
                      </Button>
                      : */}
                    <Button disabled variant="contained" endIcon={<FoodBankIcon />}>
                      Reserve
                    </Button>
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