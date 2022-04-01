import React, { useState, useEffect } from "react";
import autoBind from 'react-autobind';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Carousel from 'react-material-ui-carousel'
import { useQuery } from "@apollo/client";
import { GET_ALL_RESTAURANTS } from '../../utils/queries'
import { Link } from 'react-router-dom';

function Carouseld(props) {

  const { loading, error, data } = useQuery(GET_ALL_RESTAURANTS);


  const restaurantData = data?.getAllRestaurants || [];
  console.log(restaurantData)

  const items = [
    {
      Name: "Restaurant 1",
      Image: require('../../assets/testImg/1.jpg'),
      Description: 'This is a great place to eat!',
      Address: '135 Test St. Tampa Fl',
      Initials: 'R1',
    },
    {
      Name: "Restaurant 2",
      Image: require('../../assets/testImg/2.jpg'),
      Description: 'This is a great place to eat!',
      Address: '135 Test St. Tampa Fl',
      Initials: 'R2',
    },
    {
      Name: "Restaurant 3",
      Image: require('../../assets/testImg/3.webp'),
      Description: 'This is a great place to eat!',
      Address: '135 Test St. Tampa Fl',
      Initials: 'R3',
    },
    {
      Name: "Restaurant 4",
      Image: require('../../assets/testImg/4.jpg'),
      Description: 'This is a great place to eat!',
      Address: '135 Test St. Tampa Fl',
      Initials: 'R4',
    },
    {
      Name: "Restaurant 5",
      Image: require('../../assets/testImg/5.jpg'),
      Description: 'This is a great place to eat!',
      Address: '135 Test St. Tampa Fl',
      Initials: 'R5',
    },
    {
      Name: "Restaurant 6",
      Image: require('../../assets/testImg/6.webp'),
      Description: 'This is a great place to eat!',
      Address: '135 Test St. Tampa Fl',
      Initials: 'R6',
    }
  ];

  if (loading.length) <h1>Loading</h1>

  return (
    <Grid>
      <Carousel>
        {
          restaurantData.map((RestaurantData, i) => <Item key={i} RestaurantData={RestaurantData} />)
        }
      </Carousel>
    </Grid>
  )
}

function Item({ RestaurantData }) {
  return (
    <Grid item>
      <Link to={`/${RestaurantData._id}`}>
        <Card className='card' sx={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                ER
              </Avatar>
            }
            title={RestaurantData.business_name}
            subheader="Upscale Restaurant"
          />
          {/* <CardMedia
          component="img"
          height="194"
          image={RestaurantData.Image}
          alt="Paella dish"
        /> */}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {RestaurantData.business_address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {RestaurantData.business_website}
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
      </Link>
    </Grid>
  )
}

export default Carouseld;

