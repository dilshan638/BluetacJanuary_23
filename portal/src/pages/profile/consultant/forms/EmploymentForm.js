import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core'
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button';

import { countries } from "../../../../util/countries";
import Select from "@material-ui/core/Select";
import { FormControl, FormControlLabel, FormLabel , Radio, RadioGroup, InputLabel, MenuItem } from '@material-ui/core';
import Controls from '../DatePicker/Controls';




const initialFValues ={
    id :0,
    company:'',
    city:'',
    state:'',
    companyTitle:'',
    period:  new Date(),
    through:  new Date(),
    description:''
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


export default function EmploymentForm(props) {
    
    const {addOrEditEmployementSave}= props
    const {addOrEditEmployementSaveAndAdd,recordForEditEmployment} =props;
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
        
        if('companyTitle' in fieldValues )
        temp.companyTitle=fieldValues.companyTitle ? "" : "Your Title  Is Required"
        if('company' in fieldValues )
        temp.company=fieldValues.company ? "" : "Your Company  Is Required"
        if('city' in fieldValues )
        temp.city=fieldValues.city ? "" : "Your City  Is Required"
        if('state' in fieldValues )
        temp.state=fieldValues.state ? "" : "Your State  Is Required"
        if('period' in fieldValues )
        temp.period=fieldValues.period ? "" : "Your Period  Is Required"
        if('through' in fieldValues )
        temp.through=fieldValues.through ? "" : "Your Through  Is Required"
        if('description' in fieldValues )
        temp.description=fieldValues.description ? "" : "Your Description  Is Required"
        
            
          setErrors({
            ...temp
        })
        if(fieldValues== values)
        return Object.values(temp).every(x => x == "")
     }

     const handleSubmitAdd = e => {
        e.preventDefault()
        if(validate()){
            addOrEditEmployementSaveAndAdd(values,restForm);
         }
    }

    const handleSubmitSave = e => {
        e.preventDefault()
        if(validate()){
            addOrEditEmployementSave(values,restForm);
         }
    }

     useEffect(()=>{
    if(recordForEditEmployment!=null)
    setvalues({
        ...recordForEditEmployment
    })
    },[recordForEditEmployment])


    

    const countriesArray = []

    countries.forEach(res => {
    countriesArray.push(<option value={res.value}>{res.label}</option>)
})

    return (
        
      <div >    
      <form  onSubmit={handleSubmitAdd}  className={classes.root} autoComplete="off" {...other} >
         
      <Grid container>
       
            
                    <TextField
                     variant="outlined"
                      label="Company"
                      name="company"
                      value={values.company}
                      onChange={handleInputChange}
                      error={errors.company}
                      />

                <Grid item xs={5}>
                <TextField
                    variant="outlined"
                    label="City"
                    name="city"
                    value={values.city}
                    onChange={handleInputChange}
                    error={errors.city}
                    />
                </Grid>
                <Grid item xs={5}>
                
                <FormControl
                 variant="outlined" >
       
               <InputLabel>Country</InputLabel>
               <Select 
               variant="outlined"
               native
               label="State"
               name="state"
               value={values.state}
               onChange={handleInputChange}
                >
               <MenuItem value="">None</MenuItem>
               <option aria-label="State" value="" />
               {countriesArray}
               </Select>
 
                </FormControl>
                 </Grid>

                    <TextField
                    variant="outlined"
                    label="Title"
                    name="companyTitle"
                    value={values.companyTitle}
                    onChange={handleInputChange}
                    error={errors.companyTitle}
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
