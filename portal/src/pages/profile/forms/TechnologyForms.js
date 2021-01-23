import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core'
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { FormControlLabel ,FormLabel,FormControl } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as TechnologyServices from '../service/TechnologyServices'


const initialFValues ={
    id :0,
   venders:''
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
    },
    rootChip: {
        width: 500,
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    
}))

export default function TechnologyForms(props) {
    const {addOrEditTechnologies,recordForEditTechnology} =props;

 
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
        if('venders' in fieldValues )
         temp.venders=fieldValues.venders ? "" : "Your Vender Is Required"
           
          setErrors({
            ...temp
        })
        if(fieldValues== values)
        return Object.values(temp).every(x => x == "")
     }

     const handleSubmit = e => {
        e.preventDefault()
      
         addOrEditTechnologies(values,restForm);
     }

  
    useEffect(()=>{
    if(recordForEditTechnology!=null)
    setvalues({
        ...recordForEditTechnology
    })
    },[recordForEditTechnology])

   
   return (

    
        <form onSubmit={handleSubmit} className={classes.root} autoComplete="off" {...other} >
          
         
           
            <Grid container>
            <FormControl>
               <FormLabel >Select vendors</FormLabel>
               <div className={classes.rootChip}>

                <Autocomplete
                 multiple
                 options={TechnologyServices.getDepartment()}
                 getOptionLabel={(option) => option.title}
                 renderInput={(params) => (
              <TextField
            {...params}
            variant="standard"
            placeholder="Choose a character"
            value={values.venders}
            name="venders"
            onChange={handleInputChange}
           
          />
        )}
      />
           </div>
                    </FormControl>
                      <div>
                        
                        <Button
                         type="submit"
                         variant="contained"
                         color="primary"
                        className={classes.rootButton}>
                        Submit
                        </Button>

                    </div>
                 </Grid>
        </form>
    )
}