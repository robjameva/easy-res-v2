import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
import { QUERY_RESERVATION_BY_OWNER, GET_RESTAURANTS_BY_OWNER } from '../../utils/queries'
import auth from '../../utils/auth'
import { format_business_hour } from '../../utils/helpers'
import { useHistory } from 'react-router-dom';

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

export default function OwnerDash(props) {
  const history = useHistory();
  useEffect(() => {
    const isOwner = localStorage.getItem("isOwner");
    if (!isOwner) history.push(`/owner`);

  });
  const user = auth.getProfile().data._id;

  const { loading, error, data } = useQuery(QUERY_RESERVATION_BY_OWNER,
    { variables: { ownerId: user } });

  const { loading: l1, error: e1, data: d1 } = useQuery(GET_RESTAURANTS_BY_OWNER,
    { variables: { ownerID: user } });

  const reservationData = data?.getReservationsByOwner || [];

  const restaurantData = d1?.getRestaurantsByOwner || [];

  if (loading.length || l1.length) <h1>Loading</h1>

  console.log(reservationData)

  return (
    <Box>
      <div className='singleBanner'>
        <h1>View All Your Reservations in One Place!</h1>
      </div>
      <Grid container style={{ display: 'flex', justifyContent: 'space-around', alignItems: '', marginTop: '5%' }}>
        <Grid item xs={12} sm={4}>
          {restaurantData.map(restaurant => {
            return (
              <Card className='ownerCard' key={restaurant._id} style={{ height: '250px', marginBottom: "5%" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={require(`../../assets/testImg/${restaurant.business_image}`)}
                  alt={restaurant.business_name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {restaurant.business_name}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </Grid>
        {reservationData.length > 0 ? (
          <Grid item xs={12} sm={6} style={{ marginBottom: "20%" }}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>First Name</StyledTableCell>
                    <StyledTableCell>Last Name</StyledTableCell>
                    <StyledTableCell>Time</StyledTableCell>
                    <StyledTableCell>Group Size</StyledTableCell>
                    <StyledTableCell>Restaurant</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservationData.map((reservation, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="reservation">
                        {reservation.user.first_name}
                      </StyledTableCell>
                      <StyledTableCell>{reservation.user.last_name}</StyledTableCell>
                      <StyledTableCell>{format_business_hour(reservation.time_slot)}</StyledTableCell>
                      <StyledTableCell>{reservation.party_size}</StyledTableCell>
                      <StyledTableCell>{reservation.restaurant.business_name}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )
          :
          <h1>There are Currently No Reservations for your Restaurant!</h1>
        }
      </Grid>
    </Box>
  );
}
