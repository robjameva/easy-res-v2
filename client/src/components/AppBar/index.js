import React, {useState} from 'react';
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

const listItems = [
  {
    listIcon: <Home />,
    listText: "Home"
  },
  {
    listIcon: <DashboardIcon/>,
    listText: "Dashboard"
  },
  {
    listIcon: <PersonIcon />,
    listText: "Owned Restaurants"
  },
  {
    listIcon: <EmailIcon />,
    listText: "Contact Us"
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

  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };

  const SideList = () => (
    <Box sx={{width: 250,
        background: "#2f3136",
        height: "100%"}} component="div">
      <Divider />
      <List>
        {listItems.map((listItem, index) => (
          <ListItem style={{color:'white'}} button key={index}>
            <ListItemIcon style={{color:'white'}}>
              {listItem.listIcon}
            </ListItemIcon>
            <ListItemText primary={listItem.listText} />
          </ListItem>
        ))}
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
            sx={{ mr: 2 }}
          >
            <MenuIcon
             style={{ color: '#14006b' }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            style={{ color: '#14006b' }}
          >
            <img className='logo' src={logo} alt="logo" />
            {/* Easy Res */}
          </Typography>
          <Drawer open={open} anchor="left" onClose={toggleSlider}>
              {SideList()}
            </Drawer>
          <Stack direction="row" spacing={2}>
          <Button className='signBtn' variant="outlined" style={{ color: '#14006b' }}>Sign In</Button>
          <Button className='signBtn' variant="outlined" style={{ color: '#14006b' }}>Sign Up</Button>
          </Stack>
          
          <Search sx={{ borderColor: '#14006b' }}>
            <SearchIconWrapper>
              <SearchIcon style={{ color: '#14006b' }}/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              style={{ color: '#14006b' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}