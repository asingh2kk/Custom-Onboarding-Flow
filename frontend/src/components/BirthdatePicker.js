import React from 'react';
import {TextField, Box} from '@mui/material';

function BirthdatePicker({birthdate, setBirthdate}) {
  return (
    <Box sx={{my: 2}}>
      <TextField
        label="Birthdate"
        type="date"
        fullWidth
        required
        variant="outlined"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
}

export default BirthdatePicker;