import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Container, Button} from '@mui/material';
import Onboarding from './pages/Onboarding';
import Admin from './pages/Admin';
import Data from './pages/Data';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Custom Onboarding Flow
          </Typography>
          <Button color="inherit" component={Link} to="/">Onboarding</Button>
          <Button color="inherit" component={Link} to="/admin">Admin</Button>
          <Button color="inherit" component={Link} to="/data">Data Table</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;