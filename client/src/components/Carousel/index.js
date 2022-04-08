import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_RESTAURANTS } from '../../utils/queries'
import { Link } from 'react-router-dom';
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
import CardActions from '@mui/material/CardActions';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Stack } from "@mui/material";

const handleOnDragStart = e => e.preventDefault();

export default function CarouselHome() {
  const { loading, error, data } = useQuery(GET_ALL_RESTAURANTS);

  const restaurantData = data?.getAllRestaurants || [];

  const items = restaurantData;

  return (
    <>
      {loading ? <h1>Loading</h1> :
        <div className="carousel-cards">
          <AliceCarousel
            autoPlay={true}
            autoPlayInterval={4000}
            animationDuration={1000}
            disableButtonsControls={true}
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
              1500: {
                items: 4
              }
            }}
            mouseDragEnabled
          >
            {items.map((item, i) => {
              return (
                <Card key={i} sx={{ height: '100%', padding: "1px" }}>
                  <CardHeader
                    style={{
                      backgroundColor: '#F0F0F0'
                    }}
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {item.business_name[0]}
                      </Avatar>
                    }
                    title={item.business_name}
                  />
                  <Link className='link' to={`/restaurant/${item._id}`} >
                    <CardMedia
                      component="img"
                      height="194"
                      image={require(`../../assets/testImg/${item.business_image}`)}
                      alt="Image"
                    />
                  </Link>
                  <Grid container
                    style={{ height: "100px", backgroundColor: '#F0F0F0' }}
                  >
                    <Grid item xs={11} style={{ display: "flex", justifyContent: 'flex-start', alignItems: "space-around" }}>
                      <CardContent
                        style={{
                          backgroundColor: '#F0F0F0',
                        }}
                      >
                        <Stack>
                          <Typography variant="body2" color="text.secondary">
                            {item.business_address}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.business_website}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.business_phone}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Grid>
                    <Grid item xs={1} style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                      <CardActions disableSpacing
                        style={{
                          backgroundColor: '#F0F0F0',
                        }}
                      >
                        <Stack>
                          <IconButton aria-label="add to favorites">
                            <a className="carousel-icon-link" target={"_blank"} href={`https://google.com/maps/place/${item.business_address}`}>
                              <PinDropIcon fontSize="medium">

                              </PinDropIcon>
                            </a>
                          </IconButton>
                          <IconButton>
                            <a className="carousel-icon-link" target={"_blank"} href={`https://www.yelp.com/search?find_desc=${item.business_name}`}>
                              <ReviewsIcon fontSize="medium">

                              </ReviewsIcon>
                            </a>
                          </IconButton>
                        </Stack>
                      </CardActions>
                    </Grid>
                  </Grid>
                </Card>
              )
            })
            }
          </AliceCarousel>
        </div>}
    </>)
}



