import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core'
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Controls from '../DatePicker/Controls';



const initialFValues ={
    id :0,
    institute: '',
    period:  new Date(),
    through:  new Date(),
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
export default function EducationForm(props) {

    
    const {addOrEditEducationSave}= props
    const {addOrEditEducationSaveAndAdd,recordForEditEducation} =props;
    
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
        if('period' in fieldValues )
        temp.period=fieldValues.period ? "" : "Your Period  Is Required"
        if('through' in fieldValues )
        temp.through=fieldValues.through ? "" : "Your Through  Is Required"
        if('institute' in fieldValues )
        temp.institute=fieldValues.institute ? "" : "Your Institute  Is Required"  
          setErrors({
            ...temp
        })
        if(fieldValues== values)
        return Object.values(temp).every(x => x == "")
     }

     const handleSubmitAdd = e => {
        e.preventDefault()
        if(validate()){
            addOrEditEducationSaveAndAdd(values,restForm);
         }
    }

    const handleSubmitSave = e => {
        e.preventDefault()
        if(validate()){
            addOrEditEducationSave(values,restForm);
         }
    }

     useEffect(()=>{
    if(recordForEditEducation!=null)
    setvalues({
        ...recordForEditEducation
    })
    },[recordForEditEducation])


  
    return (
        <div >    
        <form  onSubmit={handleSubmitAdd}  className={classes.root} autoComplete="off" {...other} >
           
        <Grid container>
         
        <TextField
                variant="outlined"
                label="Institute"
                name="institute"
                value={values.institute}
                onChange={handleInputChange}
                error={errors.institute}
                />

                <Grid item xs={5}>
                
                <Controls.DatePicker 
                  name="period"
                  label="Period"
                  onChange={handleInputChange}
                  value={values.period}

                  />
                  </Grid>
                     <Grid item xs={5}>
                   <Controls.DatePicker 
                  name="through"
                  label="Through"
                  onChange={handleInputChange}
                  value={values.through}

                  />
                 </Grid>
           
              
            
              </Grid>  
             </form>
             <Grid container>
            <Grid item xs={6}>

                </Grid>
                <Grid item xs={6}>
                     <form>
                    <Button 
                   color="primary"
                   type="reset"
                   onClick={restForm} >
                   Cancel
                  </Button>        
                 <Button
                    variant="contained" 
                    color="red"
                    className={classes.rootButton}
                    type="sumbit"
                    onClick={handleSubmitAdd}>
                     Save & Add More
                  </Button>
                  
                  <Button
                     type="submit"
                     variant="contained"
                     style={{ color: "black", backgroundColor:"#33FFF3"}}
                    className={classes.rootButton}
                    onClick={handleSubmitSave}>
                    Save
                    </Button>
                     </form>
                     </Grid>
                   
                 </Grid>
            
               </div>
        
    )
}
