import React from "react";
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


function Banner(props) {
  if (props.newProp) console.log(props.newProp);
  return (
    <Card raised className="Banner">
      <Grid container spacing={0} className="BannerGrid">
      <Grid item xs={12 / 1} sm={12 / 2} md={12 / 3} lg={12 / 3} xl={12 / 4}>
      <Card sx={{ height: '100%' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              ER
            </Avatar>
          }
          title={items.Name}
          subheader="Upscale Restaurant"
        />
        <CardMedia
          component="img"
          height="194"
          image={items.Image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {items.Address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {items.Description}
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
      </Grid>
    </Card>
  );
}


class BannerClass extends React.Component {
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
      <div style={{ paddingTop: "35px", marginTop: "0px", color: "#494949" }}>

        <Carousel style={{ display: 'flex', justify_content: 'center' }}
          className="Example"
          autoPlay={this.state.autoPlay}
          animation={this.state.animation}
          indicators={this.state.indicators}
          timeout={3000}
          cycleNavigation={this.state.cycleNavigation}
          navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
          navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
        >
           <Card raised className="Banner">
      <Grid container spacing={0} className="BannerGrid">
          {items.map((item, index) => {
            console.log(index)
            return (
              <Banner
                item={item}
                key={index}
              />
      //         <Grid item xs={12 / 1} sm={12 / 2} md={12 / 3} lg={12 / 3} xl={12 / 4} key={index}>
      // <Card sx={{ height: '100%' }}>
      //   <CardHeader
      //     avatar={
      //       <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
      //         ER
      //       </Avatar>
      //     }
      //     title={item.Name}
      //     subheader="Upscale Restaurant"
      //   />
      //   <CardMedia
      //     component="img"
      //     height="194"
      //     image={item.Image}
      //     alt="Paella dish"
      //   />
      //   <CardContent>
      //     <Typography variant="body2" color="text.secondary">
      //       {item.Address}
      //     </Typography>
      //     <Typography variant="body2" color="text.secondary">
      //       {item.Description}
      //     </Typography>
      //   </CardContent>
      //   <CardActions disableSpacing>
      //     <IconButton aria-label="add to favorites">
      //       <FavoriteIcon />
      //     </IconButton>
      //     <IconButton aria-label="call">
      //       <PhoneIcon />
      //     </IconButton>
      //   </CardActions>

      // </Card>
      // </Grid>
  
            );
          })}
           
            </Grid>
    </Card>
        </Carousel>
      </div>
    );
  }
}

export default BannerClass;