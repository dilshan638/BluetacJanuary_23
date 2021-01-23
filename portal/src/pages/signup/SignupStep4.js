import React, {useEffect, useRef, useState} from 'react';
import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';

// Icon
import blueTacUser from '../../assets/svgs/blueTacUser.svg'

import {emailVerification, logoutUser} from "../../data/userApi";


const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        alignItems: 'center',
        margin: 'auto',
        backgroundColor: '#F1F1F1',
        height: '78vh',
    },
    container: {
        backgroundColor: '#Fff',
    },
    IconContainer: {
        backgroundColor: "#1F86A7", textAlign: 'center', padding: '20px 0'
    },
    button: {
        padding: '5px 40px',
    }
}));


const SignUpHire = ()=> {
    const classes = useStyles();
    const history = useHistory();
    const isMounted = useMounted();

    const getUrl =()=>{
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let foo = params.get('oobCode');
        if(!foo){
            history.push('/login')
        }

        emailVerification(foo)
            .then((res)=>{
                  logoutUser()
                  console.log(res)
            })
            .catch((e)=>{
                console.log(e.response)
                history.push('/login')
            })
    }

    const isFirstRun = useRef(true);
    useEffect (() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        getUrl();
    });

    function useMounted() {
        const [isMounted, setIsMounted] = useState(false)
        React.useEffect(() => {
            setIsMounted(true)
        }, [])
        return isMounted
    }

    return (
        <main className={classes.main}>
            <Container maxWidth="sm" className={classes.container} disableGutters>
                <div className={classes.IconContainer}>
                    <img height='100%' src={blueTacUser} alt='blueTacUser'/>
                </div>
                <Box p={4}>
                    <Typography variant='h5' align='center'>Join BlueTac  to hire technology specialists</Typography>

                    <Box mt={3} mb={2}>
                        <Typography variant='h6'>Hi,</Typography>
                    </Box>

                    <Box my={2}>
                        <Typography variant='h6'>Thanks for your interest in BlueTac!</Typography>
                    </Box>

                    <Box mt={3} textAlign='right'>
                        <Button
                            component={Link}
                            to='/login'
                            disableElevation
                            color='primary'
                            variant="contained"
                            className={classes.button}
                        >
                            <Typography  variant="button" color='body1'>
                                Login
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Container>
        </main>
    );
}

export default SignUpHire;
