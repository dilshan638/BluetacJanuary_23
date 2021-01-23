import React, {useState} from "react";
import {Button, Grid, makeStyles,Typography} from "@material-ui/core";
import Menu from "./Menu";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Link} from "react-router-dom";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import {useHistory} from 'react-router-dom'
import {postCase} from "../../../data/casesApi";
import {initialState} from "../config/Reducer";


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
    buttonNext:{
        textAlign: 'right',
    },
    end: {
        marginTop: 15,
    },
    bold:{
        fontWeight: 'bold'
    },
    from:{
        width:'35ch'
    },
    resize:{
        fontSize:14
    },
    scehduleRow:{
        display:'flex',
        marginBottom:15
    },
    text:{
        padding:'5px 10px'
    }
}));


const Review =(props)=>{

    const classes = useStyles();
    const {stepOne,spec} = props.state;
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const {title,description,time,from,to} = props.state.stepOne;
    const fromCast = moment(from).format('LLLL')
    const toCast = moment(to).format('LLLL');

    const schema = []


    spec.forEach((data)=>{
        schema.push({
            subTech:data.subTech,
            vendor:data.vendor,
            technology: data.technology,
            consultant: data.consultant === 'System Pick' ? data.consultant :   {
                uid:data.consultant.uid,
                displayName:data.consultant.displayName
            }


        })
    })


    const data={
        status:"Active",
        title:stepOne.title,
        description:stepOne.description,
        type:stepOne.time,
        sheduledFromTime:stepOne.from,
        sheduledToTime:stepOne.to,
        specifications:schema,
        hoursWorked:0,

    }

    const handleClick= ()=>{

        setLoading(true);


        postCase(data).then(
            (data) => {
                props.dispatch({
                    type: 'reset'
                })
                setLoading(false);

                history.push('/cases')

            }
        ).catch((err) => {
            console.log(err.message)
            setLoading(false);
        });
    }

    return (
        <Grid container className={classes.container}>
            <Menu/>

            <Grid item sm={8} md={8} className={classes.containerMenu} >
                <Typography variant='h3' gutterBottom>Review</Typography>

                <Typography subtitle1='h3' className={classes.bold}  gutterBottom>Title</Typography>
                <Typography variant='h6' gutterBottom>{title}</Typography>

                <Typography subtitle1='h3' className={classes.bold}  gutterBottom>Description</Typography>
                <Typography variant='h6' gutterBottom>{description}</Typography>

                <Typography subtitle1='h3' className={classes.bold} gutterBottom>How soon the technical resources are required</Typography>
                <Typography variant='h6' gutterBottom>{time}</Typography>

                {time === 'Schedule' &&

                <div className={classes.scehduleRow}>
                    <TextField
                        disabled
                        className={classes.from}
                        id="filled-disabled"
                        size="small"
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}
                        value={fromCast}
                        variant="outlined"
                    />
                    <Typography variant='h6' className={classes.text}>To</Typography>

                    <TextField
                        disabled
                        className={classes.from}
                        id="filled-disabled"
                        size="small"
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}
                        value={toCast}
                        variant="outlined"
                    />
                </div>
                }



                <Typography subtitle1='h3' className={classes.bold}  gutterBottom>Specification</Typography>

                {props.state.spec.map((row)=>(
                    <>
                        <TableRow className={classes.row}>
                            <TableCell component="th" scope="row">{row.vendor}</TableCell>
                            <TableCell align="left">{row.technology}</TableCell>
                            <TableCell align="left">{row.subTech}</TableCell>
                            <TableCell align="left">{row.consultant.displayName ? row.consultant.displayName : row.consultant}</TableCell>
                        </TableRow>
                    </>
                ))}

                <Grid container className={classes.end}>
                    <Grid item xs={6} md={10}>
                        <Link to='/cases/add/spec' className={classes.linkPrimary}>Back</Link>

                    </Grid>
                    <Grid item xs={1} md={2}>

                        <div className={classes.buttonNext}>
                            <Button onClick={handleClick} variant="contained" color="primary">
                                <small>Create Case</small>
                            </Button>
                        </div>

                    </Grid>
                </Grid>

            </Grid>
        </Grid>

    )


}

export default Review;