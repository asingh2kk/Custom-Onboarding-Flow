import React, { useState, useEffect } from 'react';
import {Container, Paper, Typography, Button, FormControl, InputLabel, Select, MenuItem, Box} from '@mui/material';

function Admin() {
  const [page2, setPage2] = useState(["AboutMe"]);
  const [page3, setPage3] = useState(["AddressForm", "BirthdatePicker"]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/config`)
      .then((res) => res.json())
      .then((data) => {
        setPage2(typeof data.page2 === 'string' ? JSON.parse(data.page2) : data.page2);
        setPage3(typeof data.page3 === 'string' ? JSON.parse(data.page3) : data.page3);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSave = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page2, page3 })
    })
      .then((res) => res.json())
      .then(() => alert('Configuration updated!'))
      .catch((err) => console.error(err));
  };

  const handleChangePage2 = (event) => {
    const { target: { value } } = event;
    setPage2(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangePage3 = (event) => {
    const { target: { value } } = event;
    setPage3(typeof value === 'string' ? value.split(',') : value);
  };

  const options = ["AboutMe", "AddressForm", "BirthdatePicker"];

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Admin Configuration
        </Typography>
        <Box sx={{ my: 2 }}>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="page2-label">Page 2 Components</InputLabel>
            <Select
              labelId="page2-label"
              multiple
              value={page2}
              label="Page 2 Components"
              onChange={handleChangePage2}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="page3-label">Page 3 Components</InputLabel>
            <Select
              labelId="page3-label"
              multiple
              value={page3}
              label="Page 3 Components"
              onChange={handleChangePage3}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Configuration
        </Button>
      </Paper>
    </Container>
  );
}

export default Admin;