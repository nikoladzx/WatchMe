import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/store/configureStore';
import { logInUser, registerAdmin, registerUser } from '../login/loginSlice';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="text.primary" href="http://localhost:3000/">
        WatchMe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [admin, setAdmin] = React.useState(false);
  const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm();
   

    async function submitForm(data: FieldValues) {
      try {
        if (admin===false)
        {if ((await dispatch(registerUser(data))).meta.requestStatus==="fulfilled") {navigate('/login');}}
        if (admin===true)
          {
            if ((await dispatch(registerAdmin(data))).meta.requestStatus==="fulfilled") {navigate('/login');
          }
          }
      }
      catch (error) {console.log(error)}
      }
      ;
    

  function handleAdmin(event: any) {
    setAdmin(!admin);
    console.log(admin);
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
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              error={!!errors.username}
              {...register('username', {required : 'username is required'})}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Email"
              label="Email"
              error={!!errors.email}
              {...register('email', {required : 'email is required'})}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              {...register('password', {required : 'password is required'})}
              error={!!errors.password}
              label="Password"
              type="password"
              id="password"
              
            />
            <FormControlLabel onChange={handleAdmin}
              control={<Checkbox value="admin" color="primary" />}
              label="Admin"
            />
            <LoadingButton
              disabled={!isValid}
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="about" variant="body2">
                  About us
                </Link>
              </Grid>
              <Grid item>
                <Link href="login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}