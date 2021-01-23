import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core'
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Controls from '../DatePicker/Controls';


const initialFValues ={
    id :0,
    titleCertification: '',
    number: '',
    description: '',
    obtainedDate : new Date(),
    expiration : new Date(),
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
    
  
export default function CertificationForm(props) {

    const {addOrEditCertificationSave}= props
    const {addOrEditCertificationSaveAndAdd,recordForEditCertification} =props;
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
        if('titleCertification' in fieldValues )
        temp.titleCertification=fieldValues.titleCertification ? "" : "Your Title Is Required"
        if('number' in fieldValues )
        temp.number=fieldValues.number ? "" : "Your Number  Is Required"
        if('description' in fieldValues )
        temp.description=fieldValues.description ? "" : "Your Description  Is Required"
        if('obtainedDate' in fieldValues )
        temp.obtainedDate=fieldValues.obtainedDate ? "" : "Your Date Obtained  Is Required"
        if('expiration' in fieldValues )
        temp.expiration=fieldValues.expiration ? "" : "Your Expiration  Is Required"
           
          setErrors({
            ...temp
        })
        if(fieldValues== values)
        return Object.values(temp).every(x => x == "")
     }

     const handleSubmitAdd = e => {
        e.preventDefault()
        if(validate()){
          addOrEditCertificationSaveAndAdd(values,restForm);
         }
    }

    const handleSubmitSave = e => {
        e.preventDefault()
        if(validate()){
          addOrEditCertificationSave(values,restForm);
         }
    }

     useEffect(()=>{
    if(recordForEditCertification!=null)
    setvalues({
        ...recordForEditCertification
    })
    },[recordForEditCertification])


  
    return (
      
      <div >    
        <form  onSubmit={handleSubmitAdd}  className={classes.root} autoComplete="off" {...other} >
           
        <Grid container>
          <Grid item xs={6}>
            <TextField
                 variant="outlined"
                  label="Title"
                  name="titleCertification"
                  value={values.titleCertification}
                  onChange={handleInputChange}
                  error={errors.titleCertification}
                  />
              </Grid>
              <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Number"
                name="number"
                value={values.number}
                onChange={handleInputChange}
                error={errors.number}
                />
              </Grid>
              <Grid item xs={6}>
                     <Controls.DatePicker 
                    name="obtainedDate"
                    label="Date Obtained"
                    onChange={handleInputChange}
                    value={values.obtainedDate}

                    />
            </Grid>
              <Grid item xs={6}>
                
              <Controls.DatePicker 
                    name="expiration"
                    label="Expiration"
                    onChange={handleInputChange}
                    value={values.expiration}

                    />
              </Grid>
              
             <Grid item xs={12}>
               <TextField
              label="Description(Optional)"
              name="description"
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
              multiline
              rows={4}
              variant="outlined"/>

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
