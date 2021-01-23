import { Grid } from '@material-ui/core';
import React, {useState, useEffect,useCallback,useMemo} from 'react'
import { makeStyles } from '@material-ui/core'
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { FormControl, FormControlLabel, FormLabel , Radio, RadioGroup, InputLabel, MenuItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {useDropzone} from 'react-dropzone';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

const types=[
    {id:'driversLicense', title:"Driver's license"},
    {id:'birthCetificate', title:'Birth cetificate'},
    {id:'Passport', title:'Passport'}
 
]
const initialFValues ={
    id :0,
    citizenship: '',
    documentType : 'driversLicense',
    dragAndDropFile:'',
    
    
    }

    const useStyles = makeStyles(theme =>({
        root:{
            '& .MuiFormControl-root':{
                width:'80%',
                margin: theme.spacing(1)
            },
           },
        
    rootButton:{
        margin:theme.spacing(0.5)
    }
    }))

   
        
    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#82faec',
        borderStyle: 'dashed',
        backgroundColor: '#d0f7f3',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };
    
    const activeStyle = {
        borderColor: '#2196f3'
    };
    
    const acceptStyle = {
        borderColor: '#00e676'
    };
    
    const rejectStyle = {
        borderColor: '#ff1744'
    };



export default function ConfirmIdentityForm(props) {
 
 
    const {addOrEditYourIdentity,recordForEditYourIdentity} =props;
    const[values, setvalues]= useState(initialFValues);
    const[errors, setErrors]= useState({});  
    const classes= useStyles();
    const {children, ...other} =props;
  
  

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles,
        open
    } = useDropzone();


    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} </li>
    ));

    
                
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
        if('citizenship' in fieldValues )
        temp.citizenship=fieldValues.citizenship ? "" : "Your Citizenship Is Required"
       
            
          setErrors({
            ...temp
        })
        if(fieldValues== values)
        return Object.values(temp).every(x => x == "")
     }

     const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            //addOrEditYourIdentity(values,restForm);
         }
    }

     useEffect(()=>{
    if(recordForEditYourIdentity!=null)
    setvalues({
        ...recordForEditYourIdentity
    })
    },[recordForEditYourIdentity])
     
    return (
        <form onSubmit={handleSubmit} className={classes.root} autoComplete="off" {...other} >
           
        <Grid container>
            <Grid >
            <Typography>
                To make sure your account remains secure and compliant, we require additional information to comfirm identity.
             </Typography>
                <br></br>
             <Typography>
                 <b>Make sure your document:</b>
                 <br></br>
                 *Is legible and the most current version
                 <br></br>
                 *Does not exceed a total size of 6MB
                 <br></br>
                 *of .jpg .jpeg .png .pdf format
                 <br></br>
              
             </Typography>
             <br></br>
             </Grid>
            
             <FormLabel>
             Citizenship :
            </FormLabel>

                   <FormControl variant="outlined" >
                  <InputLabel htmlFor="outlined-age-native-simple">Citizenship</InputLabel>
                  <Select
                  native
                  error={errors.citizenship}
                  value={values.citizenship}
                  onChange={handleInputChange}
                  label="English Proficiency "
                  inputProps={{
                  name: 'citizenship',
                }} >
                    <option aria-label="None" value="" />
                    <option value="Low">I am a US citizen/PR holder</option>
                    <option value="Medium">Other authorized US workers</option>
                    
                </Select>
                </FormControl>
                 <FormControl>
                 <FormLabel>Document Type :</FormLabel>
                  <RadioGroup row
                    label="Document Type"
                    name="documentType"
                    value={values.documentType}
                     onChange={handleInputChange}
                     
                     >

                {
                    types.map(
                        (item)=>(
                            <FormControlLabel  key={item.id} value={item.id} control={<Radio/>}  label={item.title}/>   
                        )
                    )
                }

                     </RadioGroup>
                    </FormControl>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                    <div {...getRootProps({style})}>
                        <input {...getInputProps()} 
                         name="dragAndDropFile"
                         value={values.dragAndDropFile}/>
                        <p>Drag 'n' drop some files here, or click to select files </p>
                    </div>
                    <aside>
                        <Grid container>
                        <Grid item xs={5}></Grid>
                        <Grid item xs={7}>
                        <button type="button" onClick={open}>
                        Open File 
                         </button>
                         <br></br>
                         <ul>{files}</ul>
                        </Grid>
                       
                        </Grid>
                  
                   
                    </aside>


                 </Grid>
                 <Grid item xs={3}></Grid>
                    <Grid item xs={7}>
                    <div>   
                    
                    <Button 
                      color="primary"
                      type="reset"
                       onClick={restForm} >
                      Cancel
                     </Button>
                   
                      
                     <Button
                        type="submit"
                        variant="contained"
                        style={{ color: "black", backgroundColor:"#33FFF3"}}
                       className={classes.rootButton}>
                       Save
                       </Button>
                       </div>
                        </Grid>
                      <Grid item xs={5}>
                     
                    </Grid>
                   

                
             </Grid>

 </form>
    )
}
