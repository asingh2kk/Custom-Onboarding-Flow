import React from 'react';
import {Box, Typography, LinearProgress} from '@mui/material';

function StepWizard({currentStep, totalSteps}) {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <Box sx={{my: 2}}>
      <Typography variant="subtitle1">
        Step {currentStep} of {totalSteps}
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

export default StepWizard;