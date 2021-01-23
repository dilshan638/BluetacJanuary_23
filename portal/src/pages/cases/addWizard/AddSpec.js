import React, {useState} from 'react';
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Menu from "./Menu";
import Specification from "../config/Specification";

const useStyles = makeStyles((theme) => ({

    container: {
        marginTop: theme.spacing(3),
        paddingLeft: theme.spacing(3)
    },
    containerMenu: {
        padding: 20,
    },
    link: {
        color: '#000',
        textDecoration: 'none',
        fontSize: 11,
    },
    button: {
        color:'#040f13',
        backgroundColor: 'white',
        textTransform: 'capitalize',
        marginTop: 7,
        marginBottom: 15,
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
    divider: {
        marginTop:'15px'
    },
    tableItem: {
        marginBottom: 15,
        fontSize: 14,
    },
    delete: {
        marginLeft: 'auto',
        textAlign: 'right',
        padding: 0,
    },
    tableContent:{
        backgroundColor:'#e4e4e4',
        padding:10
    }
}));




const Spec = (props)=>{
    const classes = useStyles();
    const [addSpec, setAddSpec] = useState(false);

    const {spec} = props.state;
    console.log(spec)

    function deleteRow(idx){
        props.dispatch({
            type:"recordRemoved",
            id:idx
        })
    }
    return(
        <Grid container className={classes.container}>
            <Menu/>

            <Grid item sm={8} md={9} className={classes.containerMenu} >
                <Typography variant='h3' gutterBottom>Specifications</Typography>

                <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<AddCircleOutlineIcon style={{ color: '#55D5FF' }}  />}
                    onClick={()=>setAddSpec(true)}
                >
                    <small>Add Specification</small>
                </Button>

                {addSpec ?<Specification onAdd={()=>setAddSpec(false)} dispatch={props.dispatch} state={props.state} />:<div></div>}

                <div>
                    <header>
                        <Grid container>
                            <Grid item xs={6} md={3}>
                                <small>
                                    <b>Vendor</b>
                                </small>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <small>
                                    <b>Technology area</b>
                                </small>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <small>
                                    <b>Sub Tech</b>
                                </small>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <small>
                                    <b>Consultant</b>
                                </small>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <small>
                                    <b>Cost per hour</b>
                                </small>
                            </Grid>
                        </Grid>
                    </header>
                    <Divider className={classes.divider} />
                    <section className={classes.tableContent}>
                        {spec.length===0 ? <div>You have not added any specification yet</div> :
                            spec.map((row , id) => {
                                return (
                                    <Grid container>
                                        <Grid item xs={5} md={3}>
                                            <div className={classes.tableItem}>
                                                {row.vendor}
                                            </div>
                                        </Grid>
                                        <Grid item xs={5} md={2}>
                                            <div className={classes.tableItem}>
                                                {row.technology}
                                            </div>
                                        </Grid>
                                        <Grid item xs={5} md={2}>
                                            <div className={classes.tableItem}>
                                                {row.subTech}
                                            </div>
                                        </Grid>
                                        <Grid item xs={5} md={2}>
                                            <div className={classes.tableItem}>
                                                {row.consultant.displayName ? row.consultant.displayName : row.consultant}
                                            </div>
                                        </Grid>
                                        <Grid item xs={5} md={2}>
                                            <div className={classes.tableItem}>
                                                150
                                            </div>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <div className={classes.tableItem}>
                                                <div className={classes.buttonNext}>
                                                    <IconButton aria-label="delete" className={classes.delete}
                                                                onClick={() => deleteRow(id)}>
                                                        <DeleteOutlineIcon fontSize="small" />
                                                    </IconButton>
                                                </div>
                                            </div>

                                        </Grid>
                                    </Grid>
                                )
                            })}
                    </section>
                </div>


                <Grid container className={classes.end}>
                    <Grid item xs={6} md={10}>
                        <Link to='/cases/add' className={classes.linkPrimary}>Back</Link>

                    </Grid>
                    <Grid item xs={1} md={2}>

                        <div className={classes.buttonNext}>
                            <Button component={Link}  to='/cases/add/review' variant="contained" color="primary">
                                <small>Next</small>
                            </Button>
                        </div>

                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    )
}



export default Spec;