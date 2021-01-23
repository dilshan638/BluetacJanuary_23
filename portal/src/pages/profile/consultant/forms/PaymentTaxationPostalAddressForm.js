import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core'
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button';


const initialFValues ={
    id :0,
    }

    const useStyles = makeStyles(theme =>({
        root:{
            '& .MuiFormControl-root':{
                width:'80%',
                margin: theme.spacing(1)
            }
        },
        
    rootButton:{
        margin:theme.spacing(0.5)
    }
    }))

export default function PaymentTaxationPostalAddressForm(props) {
    const {addOrEditCetification,recordForEditCertification} =props;
    const[values, setvalues]= useState(initialFValues);
    const[errors, setErrors]= useState({});  
    const classes= useStyles();
    const {children, ...other} =props;

    const handleInputChange=e=>{
        const {name, value} = e.target
        setvalues({
            ...values,
            [name]: value
        }) 
    }

    const restForm =()=>{
        setvalues(initialFValues);
        setErrors({})
    }
    const validate =(fieldValues= values)=>{
        let temp ={...errors}
        if('title' in fieldValues )
       
          setErrors({
            ...temp
        })
        if(fieldValues== values)
        return Object.values(temp).every(x => x == "")
     }

     const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            addOrEditCetification(values,restForm);
        
       }
    }

     useEffect(()=>{
    if(recordForEditCertification!=null)
    setvalues({
        ...recordForEditCertification
    })
    },[recordForEditCertification])
     

    return (
        <form onSubmit={handleSubmit} className={classes.root} autoComplete="off" {...other} >
           
        <Grid container>
                   
                 <div>
                 <h6>Payment Taxation Postal Address</h6>
                    <br></br>
                    <br></br>
                    
                     <Button
                     type="submit"
                     variant="contained"
                     color="primary"
                    className={classes.rootButton}>
                    Save
                    </Button>

                    <Button
                    variant="contained" 
                    color="red"
                    className={classes.rootButton}
                    type="reset"
                    onClick={restForm}>
                    Cancel
                  </Button>
                   

                </div>
             </Grid>


             
   </form>
    )
}
