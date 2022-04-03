import * as React from 'react';
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

  function createData(firstName, lastName, time, groupSize ) {
    return { firstName, lastName, time, groupSize  };
  }
  
  const rows = [
    createData('Chris', 'McCormack', '10:00', 6),
    createData('Nick', 'Perel','11:00', 2),
    createData('Rob', 'Evanik', '2:00', 5),
    createData('Sean', 'Gillepsie', '7:00', 8),
  ];

export default function OwnerDash() {
  return (
    <Box>
        <div className='singleBanner'>
            <h1>View all your reservations in one place!</h1>
          </div>
        <Grid container  style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '3%' }}>
          <Grid item xs={12} sm={4}>
    <Card style={{height:'100%'}}>
      <CardMedia
        component="img"
        height="180"
        image=''
        alt="Restaurant Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Restaurant Name
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid item  xs={12} sm={6}>
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
          {rows.map((row) => (
            <StyledTableRow key={row.firstName}>
              <StyledTableCell component="th" scope="row">
                {row.firstName}
              </StyledTableCell>
              <StyledTableCell>{row.lastName}</StyledTableCell>
              <StyledTableCell>{row.time}</StyledTableCell>
              <StyledTableCell>{row.groupSize}</StyledTableCell>
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
