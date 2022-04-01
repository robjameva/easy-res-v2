import React, { useState } from "react";
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
import Carousel from 'react-material-ui-carousel';


function CarouselArr(props) {
  const [carouselNumber, setCarouselNumber] = useState(4);

  window.addEventListener("resize", () => {
        if (window.innerWidth >= 900 && window.innerWidth <= 1535) {
                setCarouselNumber(3)
        } 
  })

  const data = [
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
    },
    {
      Name: "Restaurant 7",
      Image: require('../../assets/testImg/5.jpg'),
      Description: 'This is a great place to eat!',
      Address: '135 Test St. Tampa Fl',
      Initials: 'R5',
    },
    {
      Name: "Restaurant 8",
      Image: require('../../assets/testImg/6.webp'),
      Description: 'This is a great place to eat!',
      Address: '135 Test St. Tampa Fl',
      Initials: 'R6',
    }
  ];

  function render () {
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
        {items}
      </Carousel>
  )
  }
  return (
    <>
      {render()}
    </>
  );
};

//   return (
//     <Grid>
//     <Carousel>
//       {
//         items.map((item, i) => <Item key={i} item={item} />)
//       }
//     </Carousel>
//     </Grid>
//   )
// }

function Item(props) {
  return (
    <Grid item xs={12 / 1} sm={12 / 2} md={12 / 3} xl={12 / 4}>
      <Card className='card' sx={{ height: '100%' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              ER
            </Avatar>
          }
          title={props.item.Name}
          subheader="Upscale Restaurant"
        />
        <CardMedia
          component="img"
          height="194"
          image={props.item.Image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.item.Address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.item.Description}
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
    </Grid>
  )
}

export default CarouselArr;

