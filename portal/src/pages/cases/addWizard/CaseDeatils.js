import { Button, FormControl, FormControlLabel, Grid,  makeStyles, TextField, Typography } from '@material-ui/core';
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

// Icons
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Menu from "./Menu";


const useStyles = makeStyles((theme) => ({

    container: {
        marginTop: theme.spacing(3),
        paddingLeft: theme.spacing(3)
    },
    containerMenu: {
        padding: 20,
    },
    linkPrimary: {
        color: '#1d65e2',
        textDecoration: 'none',
        fontSize: 15,
    },
    margin:{
        marginBottom:20
    },
    buttonNext:{
        textAlign: 'right',
    },
    end: {
        marginTop: 15,
    },
    schedule:{
        backgroundColor:'#e4e4e4',
        height:'130px',
        gridColumnEnd: 'span 8',
        padding:20
    },
    items: {
        minWidth: '100%'
    },
    date:{
        [theme.breakpoints.between('md', 'xl')]: {
            paddingLeft:40
        }
    }
}));



const CaseDetails = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const {stepOne} = props.state

    const [title , setTitle] = useState(Object.keys(stepOne).length === 0  ? "" : stepOne.title)
    const [description , setDescription] = useState(Object.keys(stepOne).length === 0 ? "" : stepOne.description)
    const [from , setFrom] = useState(Object.keys(stepOne).length === 0  ? "" : stepOne.from)
    const [to , setTo] = useState(Object.keys(stepOne).length === 0  ? "" : stepOne.to)
    const [time , setTime] = useState(Object.keys(stepOne).length === 0  ? "Immediate" : stepOne.time)


    const handleChange = (event) => {
         setTime(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        props.dispatch({
            type: 'stepOneSubmitted',
            submittedData: {
                title: title,
                description : description,
                from:from,
                to:to,
                time:time,
            }
        });
        history.push('/cases/add/spec');
    }

    const scheduler = ()=>{
        if(time==='Schedule'){
            return (
                <Grid container className={classes.schedule}>
                    <Grid className={classes.items}>
                        <Typography variant='small'>Scheduled Times</Typography>
                    </Grid>
                    <Grid container>
                        <form noValidate>
                            <TextField
                                id="datetime-local"
                                label="From"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                className={classes.textField}
                                value={from}
                                onChange={e =>setFrom(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                        <form noValidate className={classes.date}>
                            <TextField
                                id="datetime-local"
                                label="To"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                value ={to}
                                onChange={e => setTo(e.target.value)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                    </Grid>
                </Grid>
            )
        }
    }


    return (
        <Grid container className={classes.container}>
            <Menu/>

            <Grid item sm={8} md={8} className={classes.containerMenu} >
                <Typography variant='h3' gutterBottom>Case Details</Typography>

                <Typography variant='h6' gutterBottom>Title</Typography>
                <form noValidate onSubmit={handleSubmit}>

                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <TextField id="outlined-basic" variant="outlined" size="small"
                                   value={title} onChange={e => setTitle(e.target.value)} />
                    </FormControl>



                    <Typography variant='h6' gutterBottom>Description (Optional)</Typography>

                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={2}
                            variant="outlined"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </FormControl>


                    <Typography variant='h6' gutterBottom>How soon Technical resources are required</Typography>

                    <FormControl component="fieldset">

                        <RadioGroup row aria-label="position" name="position" defaultValue="top"
                                    value={time}
                                    onChange={handleChange}>
                            <FormControlLabel value="Immediate" control={<Radio color="primary" />} label="Immediate" />
                            <FormControlLabel value="Schedule" control={<Radio color="primary" />} label="Schedule" />
                        </RadioGroup>
                    </FormControl>



                    {scheduler()}

                    <Grid container className={classes.end}>
                        <Grid item xs={6} md={10}>
                            <Link to='/' className={classes.linkPrimary}>Back</Link>

                        </Grid>
                        <Grid item xs={1} md={2}>

                            <div className={classes.buttonNext}>
                                <Button type="submit" variant="contained" color="primary"
                                        to='/cases/add/spec'>

                                    <small>Next</small>
                                </Button>
                            </div>

                        </Grid>
                    </Grid>

                </form>

            </Grid>
        </Grid>

    )
}

export default CaseDetails;