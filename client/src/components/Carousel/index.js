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


function CarouselArr(props) {

  const { loading, error, data } = useQuery(GET_ALL_RESTAURANTS);


  const restaurantData = data?.getAllRestaurants || [];
  const [carouselNumber, setCarouselNumber] = useState(4);

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900 && window.innerWidth <= 1535) {
      setCarouselNumber(3)
    }
  })

  if (loading.length) <h1>Loading</h1>


  const sliderItems = data.length > carouselNumber ? carouselNumber : data.length;
  const items = [];

  for (let i = 0; i < data.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <Card raised className="Banner" key={i.toString()}>
          <Grid container spacing={0} className="BannerGrid">
            {data.slice(i, i + sliderItems).map((item, i) => {
              return <Item key={i} item={item} />;
            })}
          </Grid>
        </Card>
      );
    }
  }

  return (
    <Carousel>
      {
        restaurantData.map((RestaurantData, i) => <Item key={i} RestaurantData={RestaurantData} />)
      }
    </Carousel>
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
          <CardMedia
            component="img"
            height="194"
            image={RestaurantData.Image}
            alt="Paella dish"
          />
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

export default CarouselArr;

