import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import agent from '../../app/API/agent';

import { useEffect, useState } from 'react';
import { UserInfo } from './info';
import { Email } from '@mui/icons-material';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function ProfilePage() {
    const [info, setInfo] = useState<UserInfo | undefined>(undefined);

    useEffect(() => {
        agent.Info.get().then(info=> setInfo(info))
        .catch(error => console.log(error))
        .finally(()=> console.log("jej"));
      }, [])
    
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    agent.Info.update(info).then(i=> setInfo(i))
    .catch(error => console.log(error))
    .finally(()=> console.log("jej"));
    };
  

    function handleNameChange(event: any){
        //info!.username = event.target.value;
        const updatedInfo = {...info!, name : event.target.value};
        
        setInfo(updatedInfo);
    }

    function handleSurnameChange(event: any){
        //info!.username = event.target.value;
        const updatedInfo = {...info!, surname : event.target.value};
        
        setInfo(updatedInfo);
    }

    function handleEmailChange(event: any){
        //info!.username = event.target.value;
        const updatedInfo = {...info!, email : event.target.value};
        
        setInfo(updatedInfo);
    }

    // function handleUsernameChange(event: any){
    //     //info!.username = event.target.value;
    //     const updatedInfo = {...info!, username : event.target.value};
        
    //     setInfo(updatedInfo);
    // }

    function handleCityChange(event: any){
        //info!.username = event.target.value;
        const updatedInfo = {...info!, city : event.target.value};
        
        setInfo(updatedInfo);
    }

    function handleStreetChange(event: any){
        //info!.username = event.target.value;
        const updatedInfo = {...info!, street : event.target.value};
        
        setInfo(updatedInfo);
    }

    function handleNumberChange(event: any){
        //info!.username = event.target.value;
        const updatedInfo = {...info!, number : event.target.value};
        
        setInfo(updatedInfo);
    }

    function handlePhoneNumberChange(event: any){
        //info!.username = event.target.value;
        const updatedInfo = {...info!, phoneNumber : event.target.value};
        
        setInfo(updatedInfo);
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  defaultValue=" "
                  value={info?.name}
                  autoFocus
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  defaultValue=" "
                  value={info?.surname}
                  onChange={handleSurnameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  defaultValue=" "
                  value={info?.email}
                  onChange={handleEmailChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  id="username"
                  defaultValue=" "
                  value={info?.username}
                  onChange={handleUsernameChange}
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  type="city"
                  id="city"
                  defaultValue=" "

                  value={info?.city}
                  onChange={handleCityChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="street"
                  label="Street"
                  type="street"
                  id="street"
                  defaultValue=" "
                  onChange={handleStreetChange}
                  value={info?.street}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Number"
                  label="Number"
                  type="number"
                  id="number"
                  defaultValue={0}
                  value={info?.number}
                  onChange={handleNumberChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="phonenumber"
                  id="phonenumber"
                  defaultValue={0}
                  value={info?.phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm Change
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Home
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}