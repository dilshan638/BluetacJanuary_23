import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core'
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button';

import { countries } from "../../../util/countries";
import Select from "@material-ui/core/Select";
import { FormControl, FormControlLabel, FormLabel , Radio, RadioGroup, InputLabel, MenuItem } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';



const initialFValues ={
    id :0,
    contractorName: '',
    addressLine1: '',
    addressLine2: '',
    city:'',
    stateProvinceRegion:'',
    zipPostalCode:'',
    country:'',
    phone1:'',
    phone2:'',
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
    
export default function BillingAddressForm(props) {
    const {addOrEditBillingAddress,recordForEditBAddress} =props;

    //const [BA, setBA]=React.useState([]);
  //  const [newBA, setnewBA]=React.useState('');
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
        if('contractorName' in fieldValues )
        temp.contractorName=fieldValues.contractorName ? "" : "Your Name Is Required"
        if('addressLine1' in fieldValues )
        temp.addressLine1=fieldValues.addressLine1 ? "" : "Your Address  Is Required"
        if('addressLine2' in fieldValues )
        temp.addressLine2=fieldValues.addressLine2 ? "" : "Your Address  Is Required"
        if('city' in fieldValues )
        temp.city=fieldValues.city ? "" : "Your Address  Is Required"
        if('stateProvinceRegion' in fieldValues )
        temp.stateProvinceRegion=fieldValues.stateProvinceRegion ? "" : "Your StateProvinceRegion  Is Required"
        if('zipPostalCode' in fieldValues )
        temp.zipPostalCode=fieldValues.zipPostalCode ? "" : "Your ZipPostalCode  Is Required"
        if('country' in fieldValues )
        temp.country=fieldValues.country ? "" : "Your country  Is Required"
        if('phone1' in fieldValues )
        temp.phone1=fieldValues.phone1 ? "" : "Your Contact Number  Is Required"
        if('phone2' in fieldValues )
        temp.phone2=fieldValues.phone2 ? "" : "Your Contact Number  Is Required"
            
          setErrors({
            ...temp
        })
        if(fieldValues== values)
        return Object.values(temp).every(x => x == "")
     }

     const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
        addOrEditBillingAddress(values,restForm);
        
           
        }
    }

       
    useEffect(()=>{
    if(recordForEditBAddress!=null)
    setvalues({
        ...recordForEditBAddress
    })
    },[recordForEditBAddress])
       
    const countriesArray = []

        countries.forEach(res => {
        countriesArray.push(<option value={res.value}>{res.label}</option>)
    })
  

    return (
       <form onSubmit={handleSubmit} className={classes.root} autoComplete="off" {...other} >
            <Grid container>
            
            <FormControlLabel
            control={<Checkbox onChange={handleInputChange} />}
            label="Same as company address" />
            
            <TextField
                     variant="outlined"
                      label="Contractor Name"
                      name="contractorName"
                      value={values.contractorName}
                      onChange={handleInputChange}
                      error={errors.contractorName}
                      />
                   <TextField
                    variant="outlined"
                    label="Address Line1"
                    name="addressLine1"
                    value={values.addressLine1}
                    onChange={handleInputChange}
                    error={errors.addressLine1}
                    />

                    <TextField
                    variant="outlined"
                    label="Address line2"
                    name="addressLine2"
                    value={values.addressLine2}
                    onChange={handleInputChange}
                    error={errors.addressLine2}
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
                 <TextField
                    variant="outlined"
                    label="State/Province/Region"
                    name="stateProvinceRegion"
                    value={values.stateProvinceRegion}
                    onChange={handleInputChange}
                    error={errors.stateProvinceRegion}
                    />
                  </Grid>

                  <Grid item xs={5}>
                <TextField
                    variant="outlined"
                    label="Zip/Postal Code"
                    name="zipPostalCode"
                    value={values.zipPostalCode}
                    onChange={handleInputChange}
                    error={errors.zipPostalCode}
                    />
                </Grid>
                 <Grid item xs={5}>
                
                 <FormControl
                  variant="outlined" >
        
                <InputLabel>Country</InputLabel>
                <Select 
                variant="outlined"
                native
                label="Country"
                name="country"
                value={values.country}
                onChange={handleInputChange}
                 >
                <MenuItem value="">None</MenuItem>
                <option aria-label="Country" value="" />
                {countriesArray}
                </Select>
  
                 </FormControl>
                  

                  </Grid>

                  <Grid item xs={5}>
                <TextField
                    variant="outlined"
                    label="Phone"
                    name="phone1"
                    value={values.phone1}
                    onChange={handleInputChange}
                    error={errors.phone1}
                    />
                </Grid>
                 <Grid item xs={5}>
                 <TextField
                    variant="outlined"
                    label="Phone"
                    name="phone2"
                    value={values.phone2}
                    onChange={handleInputChange}
                    error={errors.phone2}
                    />
                  </Grid>
                    
                     <div>
                        
                         <Button
                         type="submit"
                         variant="contained"
                         color="primary"
                        className={classes.rootButton}>
                        Submit
                        </Button>

                        <Button
                        variant="contained" 
                        color="red"
                        className={classes.rootButton}
                        type="reset"
                        onClick={restForm}>
                        Reset
                      </Button>
                       

                    </div>
                 </Grid>


                 
       </form>
    )
}
