import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, Redirect } from 'react-router-dom';

// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import {loginUser, getUserData, googleSignIn} from '../data/userApi';
import { useAppContext } from '../AppContext';

//Other stuff
import Page from '../layout/Page';

//joi Validation
import Joi from "joi-browser";

import {GoogleLogin} from 'react-google-login'

const clientId = '908852086425-lid9bofec79ftqcfecbcj8jdedctmnha.apps.googleusercontent.com'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function Login() {
  const { setUser } = useAppContext();
  const [value, setValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [
    redirectToReferrer,
    setRedirectToReferrer
  ] = useState(false);

  const { state } = useLocation()
  const classes = useStyles();

  const {email,password} = value;

  const schema = {
    email:Joi.string()
        .required()
        .email(),
    password:Joi.string()
        .required()
  };

  const loginData = {
    email,
    password,
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(loginData, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const errors = validate();

    const userData = {
      email,
      password
    };

    if(errors){
      setErrors(errors)
      setLoading(false);
      return;
    }

    loginUser(userData).then(
      (data) => {
        getUserData().then((data) => {

          setUser(data);
          setLoading(false);
          setRedirectToReferrer(true)
        });
      }
    ).catch((err) => {
      setLoading(false);
      setErrors({...errors,general:err.response.data});
    });
  };
  const handleChange = (event) => {
    setValues({
      ...value,
      [event.target.name]: event.target.value
    });
    if (errors) {
      if (event.target.value === '') {
        setErrors({ ...errors, [event.target.name]: `${event.target.name} is empty` });
      } else {
        setErrors({ ...errors, [event.target.name]: null });
      }
    }
  };

  if (redirectToReferrer === true) {
    return <Redirect to={state ? state.from : '/'} />
  }

  const onSuccess =(res)=>{

    tokenSetup(res)
        .then((res)=>{
          googleSignIn({token:res})
              .then((res)=>{
                getUserData().then((data) => {

                  setUser(data);
                  setLoading(false);
                  setRedirectToReferrer(true)
                });
              })
        })
        .catch(e=>{
          console.log(e.response)
        })
  }

  const onFailure =(res)=>{
    console.log(res)
  }

  const tokenSetup =async (res)=>{

    const newAuthRes = await res.reloadAuthResponse();
    return newAuthRes.id_token;
  }

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Box mb={3}>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              Sign in
                  </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Sign in on the internal platform
                  </Typography>
            {(errors && errors.general) && (
              <Alert severity="error">{errors.general.error}</Alert>
            )}
          </Box>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <Button
                color="primary"
                fullWidth
                startIcon={<img src='images/facebook.svg' width='24' alt='f' />}
                size="large"
                variant="contained"
              >
                Login with Facebook
                    </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >

              <GoogleLogin
                  clientId={clientId}
                  buttonText="Login with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  // cookiePolicy={'single_host_origin'}
                  // isSignedIn={true}
              />

              {/*<Button*/}
              {/*  fullWidth*/}
              {/*  startIcon={<img src='images/google.svg' width='24' alt='f' />}*/}
              {/*  size="large"*/}
              {/*  variant="contained"*/}
              {/*>*/}
              {/*  Login with Google*/}
              {/*      </Button>*/}
            </Grid>
          </Grid>

          <Box
            mt={3}
            mb={1}
          >
            <Typography
              align="center"
              color="textSecondary"
              variant="body1"
            >
              or login with email address
                  </Typography>
          </Box>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={errors && errors.email}
              error={(errors && errors.email) ? true : false}
              value={email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin='dense'
              autoFocus
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={errors && errors.password}
              error={(errors && errors.password) ? true : false}
              value={password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin='dense'
            />

            <Box mb={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
              >
                Login with email
              {loading && (
                  <CircularProgress size={30} />
                )}
              </Button>
            </Box>
            <small>
              Don't have an account ? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Container>
      </Box>
    </Page>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

export default Login;
