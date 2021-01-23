import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core'
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import {FormLabel  } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const initialFValues ={
    id :0,
    englishProficiency :'',
    addOntherLanguage:'',
    ontherLangualgeProficiency:'',
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

export default function LanguageForm(props) {
    const {addOrEditLanguage,recordForEditLanguage} =props;
    const[values, setvalues]= useState(initialFValues);
    const[errors, setErrors]= useState({});  
    const classes= useStyles();
    const {children, ...other} =props;
    const [show,setShow]=useState(false)

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
        if('englishProficiency' in fieldValues )
        temp.englishProficiency=fieldValues.englishProficiency ? "" : "Your English Proficiency Is Required"
       
            
          setErrors({
            ...temp
        })
        if(fieldValues== values)
        return Object.values(temp).every(x => x == "")
     }

     const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            addOrEditLanguage(values,restForm);
        
           
        }
    }

     useEffect(()=>{
    if(recordForEditLanguage!=null)
    setvalues({
        ...recordForEditLanguage
    })
    },[recordForEditLanguage])
     

    return (
        <form onSubmit={handleSubmit} className={classes.root} autoComplete="off" {...other} >
           
        <Grid container >
          <Grid item xs={12}>
                   <FormLabel>
                    What is your English proficiency?
                    </FormLabel>

                   <FormControl variant="outlined" >
                  <InputLabel htmlFor="outlined-age-native-simple">English Proficiency</InputLabel>
                  <Select
                  native
                  error={errors.englishProficiency}
                  value={values.englishProficiency}
                  onChange={handleInputChange}
                  label="English Proficiency "
                  inputProps={{
                  name: 'englishProficiency',
                }} >
                    <option aria-label="None" value="" />
                    <option value="Low">Low</option>
                    <option value="Medium">Medium </option>
                    <option value="Fluent">Fluent</option>
                </Select>
                </FormControl>
                    </Grid>
                   <Grid item xs={12}>
                   <FormLabel>
                   What other languages do you speak?
                    </FormLabel>
                     </Grid>

                     <Grid item xs={6}>
                            <Button 
                            variant="contained" 
                            color=""
                            startIcon={ <AddCircleOutlineIcon/>}
                           onClick={()=>setShow(true) } 
                           >
                            Add Language
                             </Button> 
                     </Grid>
                       
                        <Grid item xs={6}></Grid>
                        <br></br>
                     <Grid item xs={5}>
                         {
                             show? <FormLabel>
                             What is your Languages proficiency?
                             </FormLabel>:null
                             }

                        
                              { show?   <FormControl variant="outlined" >
                                    <InputLabel htmlFor="outlined-age-native-simple">Languages Proficiency</InputLabel>
                                    <Select
                                    native
                                    error={errors.addOntherLanguage}
                                    value={values.addOntherLanguage}
                                    onChange={handleInputChange}
                                    label="English Proficiency "
                                    inputProps={{
                                    name: 'addOntherLanguage',
                                       }} >
                                    <option aria-label="None" value="" />
                                    <option value="Sinhala">Sinhala</option>
                                    <option value="Tamil">Tamil </option>
                                    <option value="Ukrainian">Ukrainian</option>
                                   </Select>
                                </FormControl>:null

                             }

                       </Grid>
                     <Grid item xs={5}>
                     {
                             show? <FormLabel>
                              Proficiency?
                             </FormLabel>:null
                         }

                            {
                             show?  <FormControl variant="outlined" >
                             <InputLabel htmlFor="outlined-age-native-simple">Proficiency</InputLabel>
                             <Select
                             native
                             error={errors.ontherLangualgeProficiency}
                             value={values.ontherLangualgeProficiency}
                             onChange={handleInputChange}
                             label="English Proficiency "
                             inputProps={{
                             name: 'ontherLangualgeProficiency',
                           }} >
                               <option aria-label="None" value="" />
                               <option value="Low">Low</option>
                               <option value="Medium">Medium </option>
                               <option value="Fluent">Fluent</option>
                           </Select>
                           </FormControl>:null
                             }
                           </Grid>
                          
                           <Grid item xs={6}>

                           {
                             show?  <Button 
                             variant="contained" 
                             color=""
                             startIcon={ <HighlightOffIcon/>}
                            onClick={()=>setShow(false) } 
                            >
                             Close Add Onther Language
                              </Button> :null
                             }

                             </Grid>
                             <Grid item xs={6}>
                             
                             </Grid>
                  
                   <Grid item xs={9}>
                   <Button 
                   color="primary"
                   type="reset"
                   onClick={restForm} >
                   Cancel
                  </Button>
                
                   </Grid>
                   <Grid item xs={3}>
                   <Button
                     type="submit"
                     variant="contained"
                     style={{ color: "black", backgroundColor:"#33FFF3"}}
                     className={classes.rootButton}
                     >
                    Save
                    </Button>
                   </Grid>
                
             </Grid>

  </form>
    )
}
