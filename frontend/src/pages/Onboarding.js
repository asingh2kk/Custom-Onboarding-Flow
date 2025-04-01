import React, {useState, useEffect} from 'react';
import {Container, Paper, Typography, Button, Grid, TextField} from '@mui/material';
import StepWizard from '../components/StepWizard';
import AboutMe from '../components/AboutMe';
import AddressForm from '../components/AddressForm';
import BirthdatePicker from '../components/BirthdatePicker';

function Onboarding() {
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '' });
  const [birthdate, setBirthdate] = useState('');
  const [config, setConfig] = useState({ page2: [], page3: [] });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/config`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched config:", data);
        setConfig({
          page2: typeof data.page2 === 'string' ? JSON.parse(data.page2) : data.page2,
          page3: typeof data.page3 === 'string' ? JSON.parse(data.page3) : data.page3,
        });
        console.log("Config state set to:", {
          page2: typeof data.page2 === 'string' ? JSON.parse(data.page2) : data.page2,
          page3: typeof data.page3 === 'string' ? JSON.parse(data.page3) : data.page3,
        });
      })
      .catch((err) => console.error("Config fetch error:", err));
  }, []);

  const handleNext = async (e) => {
    e.preventDefault();

    //email/pass validation
    if (currentStep === 1) {
      if (!email.includes('@')) {
        setEmailError('Please enter a valid email address');
        return;
      } else {
        setEmailError('');
      }
    }

    //get components present on current step
    let currentComponents = [];
    if (currentStep === 2) {
      currentComponents = config.page2;
    } else if (currentStep === 3) {
      currentComponents = config.page3;
    }

    //validate other required fields
    if (currentStep > 1) {
      if (currentComponents.includes('BirthdatePicker') && !birthdate) {
        alert('Birthdate is required');
        return;
      }
      if (currentComponents.includes('AddressForm')) {
        if (!address.street || !address.city || !address.state || !address.zip) {
          alert('All address fields are required');
          return;
        }
      }
    }

    if (currentStep === totalSteps) {
      const userData = {
        email,
        password,
        aboutMe: aboutMe === '' ? null : aboutMe,
        ...address,
        birthdate,
        currentStep,
      };

      await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      alert('Data submitted!');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                if (!email.includes('@')) {
                  setEmailError('Please enter a valid email address');
                } else {
                  setEmailError('');
                }
              }}
              error={Boolean(emailError)}
              helperText={emailError}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
        </Grid>
      );
    } else if (currentStep === 2) {
      return config.page2.map((comp, idx) => {
        if (comp === 'AboutMe')
          return <AboutMe key={idx} aboutMe={aboutMe} setAboutMe={setAboutMe} />;
        if (comp === 'AddressForm')
          return <AddressForm key={idx} address={address} setAddress={setAddress} />;
        if (comp === 'BirthdatePicker')
          return <BirthdatePicker key={idx} birthdate={birthdate} setBirthdate={setBirthdate} />;
        return null;
      });
    } else if (currentStep === 3) {
      return config.page3.map((comp, idx) => {
        if (comp === 'AboutMe')
          return <AboutMe key={idx} aboutMe={aboutMe} setAboutMe={setAboutMe} />;
        if (comp === 'AddressForm')
          return <AddressForm key={idx} address={address} setAddress={setAddress} />;
        if (comp === 'BirthdatePicker')
          return <BirthdatePicker key={idx} birthdate={birthdate} setBirthdate={setBirthdate} />;
        return null;
      });
    }
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>User Onboarding</Typography>
        <StepWizard currentStep={currentStep} totalSteps={totalSteps} />
        <form onSubmit={handleNext}>
          {renderStepContent()}
          <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
            {currentStep === totalSteps ? 'Submit' : 'Next'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Onboarding;