import React, {useState} from "react";
import {makeStyles, Typography, Button, TextField} from "@material-ui/core";
import {getUserData, loginUser} from "../../../data/adminApi";
import {useAppContext} from "../../../AppContext";
import {Link, useLocation, Redirect} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
//Joi Validation
import Joi from "joi-browser";

const useStyles = makeStyles(theme => ({
    root: {
        background: "#0d131d",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
    },
    mBottom: {
        marginBottom: ".5rem"
    },
    button: {
        marginTop: ".85rem"
    },
    loginCard: {
        width: "275px",
        borderRadius: 5,
        background: "#fff",
        padding: ".85rem"
    },
    textField: {
        background: '#9E9E9E'
    }
}));

const LoginPage = props => {
    const classes = useStyles();
    const {history} = props;

    const {setUser} = useAppContext();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [value, setValues] = useState({
        email: 'hasheemhush+4@gmail.com',
        password: 'hush123'
    });

    const {email, password} = value;

    const loginData = {
        email,
        password,
    };

    const schema = {
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
    };

    const validate = () => {
        const options = {abortEarly: false};
        const {error} = Joi.validate(loginData, schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    const [
        redirectToReferrer,
        setRedirectToReferrer
    ] = useState(false);

    const {state} = useLocation()

    const handleChange = (event) => {

        setValues({
            ...value,
            [event.target.name]: event.target.value
        });
        if (errors) {
            if (event.target.value === '') {
                setErrors({...errors, [event.target.name]: `${event.target.name} is empty`});
            } else {
                setErrors({...errors, [event.target.name]: null});
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate();


        if (errors) {
            setErrors(errors)
            return;
        }
        setLoading(true);

        const userData = {
            email,
            password
        };

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
            setErrors({...errors, general: err.message});
            return;
        });
    };

    if (redirectToReferrer === true) {
        return <Redirect to={state ? state.from : '/'}/>
    }


    return (
        <div className={classes.root}>
            <div className={classes.loginCard}>
                <Typography variant="h5" component="h1">
                    Login
                </Typography>
                <Typography className={classes.mBottom} variant="body1">
                    Sign In to your account
                </Typography>
                {errors && errors.general && (
                    <Alert severity="error">{errors.general.error}</Alert>
                )}
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        className={classes.textField}
                        size="small"
                        label="Username"
                        variant="outlined"
                        margin="dense"
                        helperText={errors && errors.email}
                        error={(errors && errors.email) ? true : false}
                        fullWidth
                        name="email"
                        value={email}
                        type="email"
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        size="small"
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="dense"
                        helperText={errors && errors.password}
                        error={(errors && errors.password) ? true : false}
                        fullWidth
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                    {/*<Button*/}
                    {/*  onClick={() => history.push("/pages/auth/forgot-password")}*/}
                    {/*  color="primary"*/}
                    {/*>*/}
                    {/*  Forgot password?*/}
                    {/*</Button>*/}
                    <div className={classes.mBottom}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.button}
                            type="submit"
                        >
                            Login
                        </Button>
                        {/*<Button*/}
                        {/*  variant="outlined"*/}
                        {/*  color="primary"*/}
                        {/*  fullWidth*/}
                        {/*  className={classes.button}*/}
                        {/*  onClick={() => history.push("/pages/auth/register")}*/}
                        {/*>*/}
                        {/*  Register Now!*/}
                        {/*</Button>*/}
                    </div>
                </form>
                <Typography variant="caption">&copy; BlueTac | React Admin</Typography>
            </div>
        </div>
    );
};

export default LoginPage;
