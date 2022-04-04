import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useQuery } from "@apollo/client";
import { GET_RESERVATION_BY_RESTAURANT } from '../../utils/queries'
import { Link } from 'react-router-dom';

const image = require('../../assets/testImg/5.jpg')

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#21325e',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


// function createData(firstName, lastName, time, groupSize ) {
//   return { firstName, lastName, time, groupSize  };
// }

// const reservationData = [
//   createData('Chris', 'McCormack', '10:00', 6),
//   createData('Nick', 'Perel','11:00', 2),
//   createData('Rob', 'Evanik', '2:00', 5),
//   createData('Sean', 'Gillepsie', '7:00', 8),
// ];

export default function OwnerDash(props) {

  const { loading, error, data } = useQuery(GET_RESERVATION_BY_RESTAURANT, { variables: { restaurantId: "62486976b4820550339306bd" } });
  const reservationData = data?.getReservationsByRestaurant || [];
  // const [dbResData, setDbResData] = useState()
  console.log(reservationData)

  if (loading.length) <h1>Loading</h1>



  return (
    <Box>
      <div className='singleBanner'>
        <h1>View all your reservations in one place!</h1>
      </div>
      <Grid container style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '3%' }}>
        <Grid item xs={12} sm={4}>
          <Card style={{ height: '100%' }}>
            <CardMedia
              component="img"
              height="180"
              image={image}
              alt="Restaurant Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Restaurant Name
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>First Name</StyledTableCell>
                  <StyledTableCell>Last Name</StyledTableCell>
                  <StyledTableCell>Time</StyledTableCell>
                  <StyledTableCell>Group Size</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservationData.map((reservation, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="reservation">
                      {reservation.user.first_name}
                    </StyledTableCell>
                    <StyledTableCell>{reservation.user.last_name}</StyledTableCell>
                    <StyledTableCell>{reservation.time_slot}</StyledTableCell>
                    <StyledTableCell>{reservation.party_size}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
