import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core'
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button';


const initialFValues ={
    id :0,
    displayName: '',
    
    }
    
const useStyles = makeStyles(theme =>({
        root:{
            '& .MuiFormControl-root':{
                width:'80%',
                margin: theme.spacing(1)
            }
        },
        
    rootText:{
        padding:theme.spacing(1),
    }
    }))
    
  
export default function PersonalInfoForm(props) {
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
        if('displayName' in fieldValues )
        temp.displayName=fieldValues.displayName ? "" : "Your Title Is Required"
        
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
         <Grid  item xs={12}>
          <TextField
            variant="outlined"
            label="Display Name"
            name="displayName"
            value={values.displayName}
            onChange={handleInputChange}
            error={errors.displayName}
            />
            </Grid>
            <Grid  item xs={12} className={classes.rootText}>  
            Your username is selected  as the display name by default.<br></br>
            if you prefer not to expose the realname to customers, you can define your nick name here.
            </Grid>
             <Grid item xs={10}>
             <br></br>
               <Button 
                color="primary"
                type="reset"
                onClick={restForm} >
                 Cancel
               </Button>

                </Grid>
               
                <Grid item xs={2}>
                <Button
                 type="submit"
                 variant="contained"
                 style={{ color: "black", backgroundColor:"#33FFF3"}}
                 className={classes.rootButton}>
                 Save
                </Button>
                </Grid>
                
         </Grid>

</form>
    )
}
