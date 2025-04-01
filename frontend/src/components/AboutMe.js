import React from 'react';
import {TextField, Box} from '@mui/material';

function AboutMe({aboutMe, setAboutMe}) {
  return (
    <Box sx={{ my: 2 }}>
      <TextField
        label="About Me"
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        value={aboutMe}
        onChange={(e) => setAboutMe(e.target.value)}
      />
    </Box>
  );
}

export default AboutMe;