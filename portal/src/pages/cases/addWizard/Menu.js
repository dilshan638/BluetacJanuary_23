import {Grid, makeStyles} from "@material-ui/core";
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import {Link} from "react-router-dom";
import React from "react";

const useStyles = makeStyles((theme) => ({

    link: {
        color: '#000',
        textDecoration: 'none',
        fontSize: 14
    },
    sideBarItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 15,
        marginTop:20
    },
    icon: {
        marginRight: 5,
    },
    roundIcon:{
        borderRadius: '25px',
        backgroundColor:"#DFCE97",
        width:'18px',
        height:'18px',
        margin:'0 5px 0 1px'
    }
}));


const Menu =()=>{
    const classes = useStyles();
    return(
        <Grid item sm={4} md={2}>
            <div className={classes.sideBarItem}>
                <div className={classes.roundIcon}>
                    <ArrowDropUpRoundedIcon style={{ color: '#bc796e', fontSize:'20px' }}  className={classes.icon}/>
                </div>
                <Link to="/cases/add" className={classes.link}>
                    {'Case Details'}
                </Link>
            </div>
            <div className={classes.sideBarItem}>
                <div className={classes.roundIcon}>
                    <ArrowDropUpRoundedIcon style={{ color: '#bc796e', fontSize:'20px' }}  className={classes.icon}/>
                </div>
                <Link to="/cases/add/spec" className={classes.link}>
                    {'Specification'}
                </Link>
            </div>
            <div className={classes.sideBarItem}>
                <div className={classes.roundIcon}>
                    <ArrowDropUpRoundedIcon style={{ color: '#bc796e', fontSize:'20px' }}  className={classes.icon}/>
                </div>
                <Link to="/cases/add/review" className={classes.link}>
                    {'Review'}
                </Link>
            </div>
        </Grid>

    )
}

export default Menu;