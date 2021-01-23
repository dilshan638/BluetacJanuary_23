import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// import AppIcon from '../../images/icon.png';
import { Link, useHistory } from 'react-router-dom';

// MUI Stuff
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';



// Redux stuff
import { signupCheckUser } from '../../data/userApi';

// Other stuff
import Page from '../../layout/Page';

//Joi Validation
import Joi from "joi-browser";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function Signup(props) {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const classes = useStyles(props);
  const { setPendingEmail } = props;
  const history = useHistory();

  const {search} = props.location

  const schema = {
    email:Joi.string()
        .required()
        .email()
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate({email}, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validate();


    if(errors){
      setErrors(errors)
      return;
    }

    setLoading(true);
    const newUserData = {
      email,
    };
    signupCheckUser(newUserData)
      .then((userExists) => {
        if (userExists) {
          setErrors({ ...errors, general: 'Email registered already' })
        } else {
          setPendingEmail(email);
          search ? history.push(`/signup/step2${search}`) : history.push('/signup/step2')

        }
      })
        .catch(e=>{
          if(e.response && e.response.data){
            setErrors({ ...errors, general: e.response.data.email })
          }

        })
      .finally(() => {
        setLoading(false);
      })
  };
  const handleChange = (event) => {
    setEmail(event.target.value);
    (errors && event.target.value === '') ? setErrors({ email: 'Email is empty' }) : setErrors({});
  };


  return (
    <Page
    className={classes.root}
    title="Signup - Enter email"
  >
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
      className='signupStep1'
    >
      <Container maxWidth="sm">



        <Box mb={3}>
          <Typography
            color="textPrimary"
            variant="h2"
          >
            Sign up
                </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
          >
            Get your free account
                </Typography>
          {search && (
              <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
              >
                Now you are about to sign up as a Consultant
              </Typography>
          )}
          {search && (
              <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
              >
                You can still register as a customer by
                <Link target={"_blank"} to="signup"> click </Link>
                this
              </Typography>
          )}
          {(errors && errors.general) && (
            <Alert severity="error">{errors.general}</Alert>
          )}
        </Box>



        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors && errors.email}
            error={(errors && errors.email) ? true : false}
            value={email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin='dense'
            autoFocus
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Box mb={2}>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
              fullWidth

            >
              SignUp
            {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </Box>
          <small>
            Already have an account ? Login <Link to="/login">here</Link>
          </small>
          <br/>
          {!search &&

              (
                  <small>
                    Need to signup as a consultant? Click
                    <Link target={"_blank"} to="signup?name=consultant"> here</Link>
                  </small>
              )
          }

        </form>
        <Box mb={3} mt={3}>
          <Divider variant="middle" />
        </Box>
      </Container>
    </Box>
  </Page>
  );
}

Signup.propTypes = {
  setPendingEmail: PropTypes.func.isRequired,
}
export default Signup;
