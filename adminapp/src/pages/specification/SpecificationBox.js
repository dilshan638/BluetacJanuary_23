import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    }
}));


const SpecificationBox = ({spec}) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Typography variant="h6" component="h1">
                        Vendor
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6" component="h1">
                        Technology
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="h6" component="h1">
                        Sub Technology
                    </Typography>
                </Grid>
            </Grid>

            {
                spec &&
                spec.map((item, index) => (
                        <Grid key={index} container spacing={3}>
                            <Grid item xs={3}>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Typography variant="subtitle1" component="h1">
                                            {item.Vendor}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <CancelOutlinedIcon/>
                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid item xs={9}>

                                {Object.keys(item.Technology).map((keyName, i) => (

                                    <Grid container key={i}>
                                        <Grid item xs={4}>
                                            <Grid container spacing={1} key={i}>
                                                <Grid item>
                                                    <Typography variant="subtitle1" component="h1">
                                                        {keyName}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <CancelOutlinedIcon/>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={8}>
                                            {item.Technology[keyName].map((i, index) => (

                                                <Grid container spacing={1} key={index}>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" component="h1">
                                                            {i}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <CancelOutlinedIcon/>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Grid>

                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    )
                )
            }
        </div>
    );

}

export default SpecificationBox;