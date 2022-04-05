import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../assets/images/logo.png'
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AddIcon from '@mui/icons-material/Add';
import FoodBankIcon from '@mui/icons-material/FoodBank'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { GET_ALL_RESTAURANTS } from '../../utils/queries'
import { useQuery } from "@apollo/client";

const listItems = [
  {
    listIcon: <Home />,
    listText: "Home",
    link: '/'
  },
  {
    listIcon: <DashboardIcon />,
    listText: "Dashboard",
    link: '/user-dashboard'
  },
  {
    listIcon: <RestaurantIcon />,
    listText: "Owned Restaurants",
    link: '/owner-dashboard'
  },
  {
    listIcon: <FoodBankIcon />,
    listText: "Add New Restaurant",
    link: '/add-restaurant'
  },
  {
    listIcon: <FoodBankIcon />,
    listText: "SV",
    link: '/restaurant/:restaurantId'
  },
  {
    listIcon: <PersonIcon />,
    listText: "Login",
    link: '/login'
  },
  {
    listIcon: <AddIcon />,
    listText: "Sign Up",
    link: '/sign-up'
  }
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

 



export default function SearchAppBar() {

  const { loading, error, data } = useQuery(GET_ALL_RESTAURANTS);

  const restaurantData = data?.getAllRestaurants || [];
  const allNames = restaurantData.business_name;

  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  const SideList = () => (
    <Box sx={{
      width: 250,
      background: "#2f3136",
      height: "100%"
    }} component="div">
      <Divider />
      <List>
        {listItems.map((listItem, index) => (
          <Link key={index} to={listItem.link}>
            <ListItem onClick={toggleSlider} style={{ color: 'white' }} button >
              <ListItemIcon style={{ color: 'white' }}>
                {listItem.listIcon}
              </ListItemIcon>
              <ListItemText primary={listItem.listText} />
            </ListItem>
          </Link>
        ))}
        <Link to='#'
          onClick={() => window.location = 'mailto:easyResFakeEmail@notRealEmail.org'}>
          <ListItem onClick={toggleSlider} style={{ color: 'white' }}>
            <ListItemIcon style={{ color: 'white' }}>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary='Contact' />
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#FFFFFF' }}>
        <Toolbar>
          <IconButton onClick={toggleSlider}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 0 }}
          >
            <MenuIcon
              style={{ color: '#21325e' }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            style={{ color: '#21325e' }}
          >
            <Link to='/'>
              <img className='logo' src={logo} alt="logo" />
            </Link>
            {/* Easy Res */}
          </Typography>
          <Drawer open={open} anchor="left" onClose={toggleSlider}>
            {SideList()}
          </Drawer>
          <Stack direction="row" spacing={2}>
            {Auth.loggedIn() ? (
              <>
                <a href="/" onClick={logout}>
                  <Button className='signBtn' variant="outlined" style={{ color: '#21325e' }}>Logout</Button>
                </a>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button size="medium" className='signBtn' variant="outlined" style={{ color: '#21325e' }}>Login</Button>
                </Link>
              </>
            )}
          </Stack>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={allNames}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search" />}
          />

{/* <Search sx={{ borderColor: '#21325e' }}>
              <SearchIconWrapper>
                <SearchIcon style={{ color: '#21325e' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                style={{ color: '#21325e' }}
              />
            </Search> */}

         
        </Toolbar>
      </AppBar>
    </Box>
  );
}