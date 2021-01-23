import React, {useEffect, useState} from 'react';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import {CircularProgress, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {getCase, getConsultants} from "../../data/casesApi";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import CloseIcon from '@material-ui/icons/Close'
import {addConst} from "../../data/adminApi";

const useStyles = makeStyles((theme) => ({

    containerMenu: {
        backgroundColor: '#e4e4e4',
        padding: 20,
    },
    link: {
        color: '#000',
        textDecoration: 'none',
        fontSize: 11,
    },
    linkPrimary: {
        color: '#44c7ee',
        textDecoration: 'none',
        fontSize: 11,
    },
    sideBarItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 15,
    },
    icon: {
        marginRight: 5,
    },
    button: {
        color:'#55D5FF',
        backgroundColor: 'white',
        textTransform: 'capitalize',
        marginTop: 7,
        marginBottom: 15,
    },
    buttonMargin: {
        backgroundColor:'white',
        marginTop: 7,
        marginBottom: 15,
        marginLeft: 20,
    },
    buttonNext:{
        textAlign: 'right',
    },
    end: {
        marginTop: 15,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        width: '50%'
    },
    input: {
        width: '100%',
    },
    formGroup: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    formControl: {
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    marginRight: {
        marginRight: '20px',
    },
    marginLeft: {
        marginLeft: '20px',
    },
    workExp:{
        margin:'15px 0'
    },
    textColor:{
        color:'#55D5FF'
    },
    rightButton:{
        float:'right'
    }
}));

const Model = (props)=>{
    const classes = useStyles();
    const {state,onClose,caseId} = props;

    const [data,setData] = useState(null)
    const [loading, setLoading] = useState(true);

    const [consultant,setConsultant] = useState([])

    const [user,setUser] = useState([])

    const handleChange = index=>e=>{

        setConsultant(user[e.target.value])
    }


    const loadingPage = ()=>{
            return <CircularProgress color="secondary" />
    }

    const onEdit = (index)=>{
        setLoading(true)
        const data ={
            consultantID :consultant.uid,
            consultantName:consultant.displayName,
            index:index
        }
        if(!data.consultantID){
            return ''
        }else{
            addConst(caseId,data)
                .then((res)=>{
                    setLoading(false)

                })
                .catch(e=>{
                    console.log(e.response)
                })
        }
    }

    const def = (row)=>{
        function pls(){
            for(var i = 0; i < user.length; i++) {
                if (row.consultant.uid === user[i].uid) {
                        return i;
                }
            }
        }
        return Number(pls(row));
    }

    useEffect(()=>{
        getCase(caseId)
            .then((response)=>{

                setData(response.data)
                getConsultants()
                    .then((res)=>{

                        setUser(res.data)
                        setLoading(false)

                    })
                    .catch((e)=>{
                        console.log(e.message)
                    })
            })
            .catch((e)=>{
                console.log(e.message)
            })

    },[loading])


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={state}
            onClose={onClose}
            closeAfterTransition
            className={classes.modal}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={state}>
                <div className={classes.paper}>
                    <Button
                        onClick={onClose}
                        className={classes.rightButton}
                        variant="contained"
                        color="primary"
                        >
                        <CloseIcon/>
                    </Button>
                    <h2>Assign Consultants</h2>
                    {
                        loading ? loadingPage() :
                        <form className={classes.root} noValidate autoComplete="off">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant='h6'><small>{data.title}</small></Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h6'><small>Specifications</small></Typography>
                                </Grid>
                                {data.specifications && data.specifications.map((row,index) => (
                                    <div key={index}>
                                        <TableRow className={classes.row}>
                                            <TableCell component="th" scope="row">{row.vendor}</TableCell>
                                            <TableCell align="left">{row.product}</TableCell>
                                            <TableCell align="left">{row.technology}</TableCell>
                                            <TableCell align="left">
                                                <FormControl className={classes.formControl}>

                                                    <InputLabel >Consultant</InputLabel>
                                                    <Select
                                                        className={classes.marginRight}
                                                        native
                                                        defaultValue={def(row)}
                                                        onChange={handleChange(index)}
                                                    >
                                                        <option aria-label="None" value="" />

                                                        {user && user.length!==0 && user.map((option, index) =>
                                                            <option key={index} value={index}>
                                                                {option.displayName}
                                                            </option>
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button
                                                    onClick={()=>onEdit(index)}
                                                    style={{
                                                        backgroundColor: "#55D5FF",
                                                    }}
                                                    variant="contained" className={classes.buttonMargin} size='small'>
                                                    <small> Save</small>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </div>
                                ))}
                            </Grid>
                    </form>
                    }
                </div>
            </Fade>
        </Modal>
    )
}

export default Model