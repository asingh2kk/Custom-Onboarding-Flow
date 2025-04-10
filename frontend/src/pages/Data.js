import React, {useState, useEffect} from 'react';
import {Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Box} from '@mui/material';

function Data() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const clearDatabase = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setUsers([]);
      })
      .catch((err) => console.error(err));
  };

  const displayOrNull = (value) => (value == null || value === '' ? 'null' : value);

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            User Data Table
          </Typography>
          <Button variant="contained" color="secondary" onClick={clearDatabase}>
            Clear Database
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>About Me</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Birthdate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{displayOrNull(user.email)}</TableCell>
                <TableCell>{displayOrNull(user.about_me)}</TableCell>
                <TableCell>
                  {`${displayOrNull(user.street)}, ${displayOrNull(user.city)}, ${displayOrNull(user.state)} ${displayOrNull(user.zip)}`}
                </TableCell>
                <TableCell>
                  {user.birthdate ? new Date(user.birthdate).toLocaleDateString() : 'null'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default Data;