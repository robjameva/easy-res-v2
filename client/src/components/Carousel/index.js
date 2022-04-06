import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_RESTAURANTS } from '../../utils/queries'
import { Link } from 'react-router-dom';
import Carousel from "react-material-ui-carousel";
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
import ReactDOM from "react-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const handleOnDragStart = e => e.preventDefault();



export default function CarouselHome() {
  const { loading, error, data } = useQuery(GET_ALL_RESTAURANTS);

  const restaurantData = data?.getAllRestaurants || [];

  const items = restaurantData;

  if (loading.length) <h1>Loading</h1>


  return (
    <div className="carousel-cards">
      <AliceCarousel
      autoPlay={true}
      autoPlayInterval={4000}
      animationDuration={1000}
      // animationType='fadeout'
      infinite={true}
        responsive={{
          0: {
            items: 1
          },
          700: {
            items: 2
          },
          1024: {
            items: 3
          },
          1300: {
            items: 4
          }
        }}
        mouseDragEnabled
      >
        {items.map((item ,i) => {
          return (
            <Link to={`/restaurant/${item._id}`} key={i}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    ER
                  </Avatar>
                }
                title={item.business_name}
              />
              <CardMedia
                component="img"
                height="194"
                image= {require(`../../assets/testImg/${item.business_image}`)}
                alt="Image"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.business_address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.business_website}
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
          )
        })
        }
      </AliceCarousel>
    </div>
  );
}


