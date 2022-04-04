import React, { useState, useEffect } from "react";
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
import autoBind from 'react-autobind';


function Banner(props) {
  const totalItems = props.length ? props.length : 3;
  const mediaLength = totalItems;

  if (loading.length) <h1>Loading</h1>
  console.log(data)

  const { loading, error, data } = useQuery(GET_ALL_RESTAURANTS);

  const restaurantData = data?.getAllRestaurants || [];

  let items = [];

  restaurantData.map((i) => {
   const items = restaurantData[i];
    const media = (
      <Grid item xs={12/3 } key={i}>
        <Link to={`/restaurant/${restaurantData._id}`}>
        <Card sx={{ height: '100%'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            ER
          </Avatar>
        }
        title={restaurantData.business_name}
        subheader="Casual Dining"
      />
      <CardMedia
        component="img"
        height="194"
        image={restaurantData.Image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {restaurantData.business_address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <Typography variant="body2" color="text.secondary">
          {restaurantData.business_website}
          </Typography>
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
    );

    items.push(media);
  })

 
  return (
    <Card raised className="Banner">
      <Grid container spacing={0} className="BannerGrid">
        {items}
      </Grid>
    </Card>
  );
}

// const items = restaurantData;


class CarouselHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      animation: "fade",
      indicators: true,
      timeout: 500,
      navButtonsAlwaysVisible: false,
      navButtonsAlwaysInvisible: false,
      cycleNavigation: true
    };

    autoBind(this);
  }

  toggleAutoPlay() {
    this.setState({
      autoPlay: !this.state.autoPlay
    });
  }

  toggleIndicators() {
    this.setState({
      indicators: !this.state.indicators
    });
  }

  toggleNavButtonsAlwaysVisible() {
    this.setState({
      navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible
    });
  }

  toggleNavButtonsAlwaysInvisible() {
    this.setState({
      navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible
    });
  }

  toggleCycleNavigation() {
    this.setState({
      cycleNavigation: !this.state.cycleNavigation
    });
  }

  changeAnimation(event) {
    this.setState({
      animation: event.target.value
    });
  }

  changeTimeout(event, value) {
    this.setState({
      timeout: value
    });
  }

  render() {
    return (
      <div style={{ paddingTop:"35px", marginTop: "0px", color: "#494949" }}>

        <Carousel style={{display: 'flex', justify_content: 'center'}}
          className="Example"
          autoPlay={this.state.autoPlay}
          animation={this.state.animation}
          indicators={this.state.indicators}
          timeout={this.state.timeout}
          cycleNavigation={this.state.cycleNavigation}
          navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
          navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
        >
          {items.map((item, index) => {
            return (
              <Banner
                item={items}
                key={index}
              />
            );
          })}
        </Carousel>
      </div>
    );
  }
}

export default CarouselHome;