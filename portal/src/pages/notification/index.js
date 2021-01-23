import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import {Link as MUILink, Link, Typography} from "@material-ui/core";
import {getNotification} from "../../data/casesApi";
import jwtDecode from "jwt-decode";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin:'0 10rem'
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
         // color: theme.palette.text.secondary,
    },
    heading:{
        fontWeight :'bold',
        fontSize:'150%'
    },
    header:{
        fontWeight :'bold',
        margin:'1.5rem 0.5rem'
    }

}));

const Notification = ()=>{

    const classes = useStyles();

    const [count, setCount] = useState(0)

    const [caseTitle, setCaseTitle] = useState([])

    const token = localStorage.FBIdToken;
    let decodedToken = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }



    useEffect(() => {
        if (decodedToken && decodedToken.consultant) {
            getNotification()
                .then((data) => {
                    setCount(data.data.count)
                    setCaseTitle(data.data.data)
                })
                .catch((e) => {
                    console.log(e.response)
                })
        }

    }, [token])


    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography className={classes.header} variant="h3" gutterBottom>
                        Notification
                    </Typography>
                    <Paper className={classes.paper}>
                        <Typography className={classes.heading} variant="button" display="block" gutterBottom>
                            Today
                        </Typography>

                        {caseTitle && caseTitle.length > 0 && caseTitle.map((item)=>{
                            return (
                                <Typography variant="body2" display="block" gutterBottom>

                                    New case
                                    <Link href="#">
                                        {" "} { item.title}
                                    </Link>
                                    has been assign to you
                                </Typography>
                            )
                        })}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper} >

                        <Typography className={classes.heading} variant="button"  display="block" gutterBottom>
                            Earlier
                        </Typography>
                        <Grid >

                            <Typography variant="body2" display="block" gutterBottom>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi deserunt dignissimos ducimus eveniet id non officiis quasi ut veritatis voluptas!
                            </Typography>
                            <Typography variant="body2" display="block" gutterBottom>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi deserunt dignissimos ducimus eveniet id non officiis quasi ut veritatis voluptas!
                            </Typography>
                            <Typography variant="body2" display="block" gutterBottom>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi deserunt dignissimos ducimus eveniet id non officiis quasi ut veritatis voluptas!
                            </Typography>
                        </Grid>


                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Notification;