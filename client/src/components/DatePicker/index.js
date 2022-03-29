import  React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function NativePickers() {
    const d = new Date();
  return (
    <Grid
    sx={{
        py: 10,
        mt: 'auto',
      }}
      style={{display: 'flex', justifyContent: 'center'}}
      >
      <TextField
        id="date"
        label="Reservation Date"
        type="date"
        defaultValue= {d}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="time"
        label="Reservation Time"
        type="time"
        defaultValue="12:00"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
    </Grid>
  );
}
