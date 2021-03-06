import React, { Component, Fragment ,  useState  } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';

// MUI stuff 
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import cyan from '@material-ui/core/colors/cyan'
import grey from '@material-ui/core/colors/grey'
import lightGreen from '@material-ui/core/colors/lightGreen';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import BusinessIcon from '@material-ui/icons/Business';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import RouterIcon from '@material-ui/icons/Router';

//------------Company Information------------------------

import CIForms from '../profile/forms/CIForms'
import { TableBody, TableCell, TableRow, Table,  TableHead } from '@material-ui/core';
import * as ciServices from '../profile/service/ciServices'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CloseIcon from '@material-ui/icons/Close'
import Notifications from '../profile/components/Notifications'
import ConfimDialog from './components/ConfimDialog';
import TechnologyPopUp from '../profile/popups/TechnologyPopUp'


//-------------Technoligies--------------------------------

import TechForms from '../profile/forms/TechForms'
import * as technologyServices from '../profile/service/technologyServices'
import CompanyInfaormationPopUp from '../profile/popups/CompanyInformationPopUp'



//-----------Billing Address-------------------------------

import BAForm from '../profile/forms/BAForm'
import * as billingaddressServices from '../profile/service/billingaddressServices'
import BillingAddressPopUp from '../profile/popups/BillingAddressPopUp'



//Redux 
import { uploadImage } from '../../data/userApi';
import { useAppContext } from '../../AppContext';
import PageLoader from '../../util/PageLoader';
import { EditOutlined } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360, 
    backgroundColor: theme.palette.background.paper,
  },
  paperRoot: {
    backgroundImage: 'linear-gradient(-20deg,#2b5876,#4e4376)',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
  },

  
  paperRootPaper:{
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  caption: {
    color: theme.palette.grey[400],
    
  },
  
pageContent: {
  margin: theme.spacing(5),
  padding:theme.spacing(3)
},
table :{
  marginTop:theme.spacing(3),
  borderStyle: 'solid',
  borderRadius: theme.spacing(2),
  
  '& thead th':{
      fontWeight:'600',
      color: theme.palette.grey[1200],
      backgroundColor:theme.palette.info.light,
      padding:theme.spacing(1),
      
    },
  '& tbody td':{
      fontWeight: '1000',
      backgroundColor:'#fffbf2',

  },
  '& tbody tr:hover':{
     
  },
},

 
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


const headCellsTech =[
     {id:'venders', label:'Venders'},
     {id:'actions', label:'Actions'},
   ]
      


function Profile(props) {
  const { user } = useAppContext();
  
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    uploadImage(formData).then(() => {
      //TODO update the user info
    })
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  const classes = useStyles();
  if (!user) {
    return <PageLoader />;
  }
  const {user: {country, createdAt, email, firstName, imageUrl, lastName, userId} } = user;
  console.info(imageUrl);

  const [records, setRecords] =useState(ciServices.getAllInformation());
  const [recordsBA, setRecordsBA] =useState(billingaddressServices.getAllBillingAddress());
  const [recordsTech, setRecordsTech] =useState(technologyServices.getAllTechnoligy());

  const [openPopupComInf, setOpenPopupComInf] =useState(false)
  const [openPopupBAddress, setOpenPopupBAddress] =useState(false)
  const [openPopupTechnology, setOpenPopupTechnology] =useState(false)

  const [recordForEdit ,setRecordForEdit] =useState(null);
  const [recordForEditBAddress ,setRecordForEditBAddress] =useState(null);
  const [recordForEditTechnology ,setRecordForEditTechnology] =useState(null);

  const [notify,setNotify]=useState({isOpen:false, message:'',type:''})
  const[ confirmDialog, setConfGialog]=useState({isOpen:false, title:'',subTitle:''});
 
    
 const addOrEdit =(information , restForm)=>{
   if(information.id==0)
    ciServices.insertInformation(information)
    else
        ciServices.updateInformation(information)
    restForm()
    setRecordForEdit(null)
    setOpenPopupComInf(false)
    setRecords(ciServices.getAllInformation())
    setNotify({
      isOpen:true,
      message:'Submitted Successfully',
     type:'success'
     })

     
}

   
  const addOrEditBillingAddress =(billingAddress , restForm)=>{
    if(billingAddress.id==0)
    billingaddressServices.insertBillingAddress(billingAddress)
      else
      billingaddressServices.updateBillingAddress(billingAddress)
      restForm()
     setRecordForEditBAddress(null)
     setOpenPopupBAddress(false)
     setRecordsBA(billingaddressServices.getAllBillingAddress())
      setNotify({
       isOpen:true,
       message:'Submitted Successfully',
      type:'success'
    })

}


 
const addOrEditTechnologies =(technoligy , restForm)=>{
  if(technoligy.id==0)
  technologyServices.insertTechnoligy(technoligy)
    else
    technologyServices.updateTechnology(technoligy)
    restForm()
    
    setRecordForEditTechnology(null)
    setOpenPopupTechnology(false)
    setRecordsTech(technologyServices.getAllTechnoligy())
    setNotify({
      isOpen:true,
      message:'Submitted Successfully',
      type:'success'
  })

}
  const openInPopup = item=>{
    setRecordForEdit(item)
    setOpenPopupComInf(true)
}


const openInPopupBAddress = item=>{
  setRecordForEditBAddress(item)
  setOpenPopupBAddress(true)
}


const openInPopupTechnology = item=>{
  setRecordForEditTechnology(item)
  setOpenPopupTechnology(true)
}
const onDelete=id=>{
  setConfGialog({
    ...confirmDialog,
    isOpen:false
  })
    ciServices.deleteInformation(id);
     setRecords(ciServices.getAllInformation())
      
      setNotify({
          isOpen:true,
          message:'Deleted Successfully',
          type:'error'
      })
  
}


const onDeleteBAddress=id=>{
  setConfGialog({
    ...confirmDialog,
    isOpen:false
  })
    billingaddressServices.deleteBillingAddress(id);
    setRecordsBA(billingaddressServices.getAllBillingAddress())

      setNotify({
          isOpen:true,
          message:'Deleted Successfully',
          type:'error'
      })
  
}




const onDeleteTechnology=id=>{
  setConfGialog({
    ...confirmDialog,
    isOpen:false
  })
  technologyServices.deleteTechnology(id);
  setRecordsTech(technologyServices.getAllTechnoligy())
 

      setNotify({
          isOpen:true,
          message:'Deleted Successfully',
          type:'error'
      })
  
}



const TblContainerTech =props=>(
  <Table className={classes.table}>
         {props.children}
   </Table>
)
     const TblheadTech = props=>{ 
      return(<TableHead>
     <TableRow>
     {
     headCellsTech.map(headCellsTech=>(<TableCell key={headCellsTech.id}>
         {headCellsTech.label}
     </TableCell>))
     }
     </TableRow>
</TableHead>)
}

    return(<>
      <div className='title-container'>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Box mt={2} display='flex' alignItems='center'>
              <Chip
                icon={<CheckCircleOutlineIcon
                  style={{ color: 'white' }}
                />}
                label="Active"
                style={{ background: cyan[900], color: 'white', marginRight: 2 }}
              />
              <Typography variant='body2'>
                Everything is set for you to create cases.
              </Typography>
            </Box>
            <Box mt={2}>
              <Box display='flex' alignItems='center'>
                <CheckCircleIcon style={{ color: lightGreen[500], fontSize: 30}}
                />
                <Typography variant='h3'
                >
                  Company information
                </Typography>
                <EditIcon 
                 onClick={()=> {setOpenPopupComInf(true);setRecordForEdit(null);}} />
              </Box>
              
              <Paper classes={{ root: classes.paperRoot }}>
                <Box position='relative'>
                  <Box position='absolute' zIndex='2' left={80} right={24}>
                    <Avatar style={{ backgroundColor: grey[900] }}>
                      <MyButton
                        tip="Edit profile picture"
                        onClick={handleEditPicture}
                        btnClassName="button"
                      >
                        <EditIcon
                          style={{ color: grey[100], fontSize: 24 }}
                        />
                      </MyButton>
                    </Avatar>

                  </Box>
                  <input
                    type="file"
                    id="imageInput"
                    hidden="hidden"
                    onChange={handleImageChange}
                  />
                  <Avatar alt="Remy Sharp" src={imageUrl} className={classes.avatar} />
                </Box>
               

                <Box color='white'>
                  <Box mb={2} mt={1}>
                    <Typography variant="body2">{userId}</Typography>
                    <Typography variant="caption" className={classes.caption}>Company name ( Display Name)</Typography>
                 
         
           <br></br>
           <br></br>
           <Grid  >
           { records.map(item=>(
           <Paper key={item.id} classes={{ root: classes.paperRootPaper }}><b>{item.contractorName}</b><br></br>
           <b>{item.addressLine1}    ,</b>
           <b> {item.addressLine2}   ,</b>
           <b>{item.city}    ,</b>
           <b>{item.stateProvinceRegion}    ,</b>
            <b>{item.zipPostalCode}   ,</b>
            <b>{item.country}</b> <br></br>
            <Grid container spacing={3}>
            <Grid item xs={10}>
            <b>{item.phone1}/{item.phone2}</b>
            </Grid>
            <Grid item xs={2}>
          <EditOutlinedIcon
                       frontSize="small"
                       onClick={()=>{openInPopup(item)}}/>
                       <CloseIcon 
                       frontSize="small"
                      onClick={()=>{setConfGialog({
                       isOpen:true,
                       title:'Are You Sure To Delete This Record? ',
                       subTitle:"You Can't undo this Operation",
                       onConfirm:()=>{onDelete(item.id)}
                      })}}
                      />
                   </Grid>
                  </Grid>
                  </Paper> ))  }
                  </Grid>
               <br></br>
                 </Box>
                  <Box mb={2}>
                    <Typography variant="caption">Joined {dayjs(createdAt).format('MMM YYYY')}</Typography>
                  </Box>
                  {email && (<Box mb={2}>
                    <Typography variant="body2">{email}</Typography>
                    <Typography variant="caption" className={classes.caption}>Company description</Typography>
                  </Box>)}
                </Box>

                  </Paper>
                 </Box>
                 </Grid>

          <Grid item xs={3}>
            <Box mt={2}>
              <Typography variant='h4'>
                Quick Navigation
            </Typography>
              <Paper elevation={6} style={{ marginTop: 8 }}>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button>
                    <ListItemIcon>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary="Company information"
                    onClick={()=> {setOpenPopupComInf(true);setRecordForEdit(null);}}
                    />

                     <CompanyInfaormationPopUp 
                     openPopupComInf={openPopupComInf}
                     setOpenPopupComInf={setOpenPopupComInf} >
                       <CIForms
                       recordForEdit={recordForEdit}
                     addOrEdit={addOrEdit}/>
                    </CompanyInfaormationPopUp>
                    <Notifications
                    notify={notify}
                    setNotify={setNotify}
                    />
                    <ConfimDialog
                    confirmDialog={confirmDialog}
                    setConfGialog={setConfGialog}
                    />

                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <CreditCardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Credit card details" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <ContactMailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Billing address"
                    onClick={()=> {setOpenPopupBAddress(true);setRecordForEditBAddress(null);}} />

                    <BillingAddressPopUp
                    openPopupBAddress={openPopupBAddress}
                    setOpenPopupBAddress={setOpenPopupBAddress}>
                      <BAForm
                      recordForEditBAddress={recordForEditBAddress}
                      addOrEditBillingAddress={addOrEditBillingAddress}

                      />
                    </BillingAddressPopUp>
                  </ListItem>
                  <ListItem button>
                      <ListItemIcon>
                      <RouterIcon />
                    </ListItemIcon>
                    <ListItemText primary="Technologie"
                    onClick={()=> {setOpenPopupTechnology(true);setRecordForEditTechnology(null);}} />
                    <TechnologyPopUp
                      openPopupTechnology={openPopupTechnology}
                      setOpenPopupTechnology={setOpenPopupTechnology}>
                        
                        <TechForms
                        addOrEditTechnologies={addOrEditTechnologies}
                        recordForEditTechnology={recordForEditTechnology}/>
                    </TechnologyPopUp>             
                  </ListItem>
                </List>
              </Paper>
           </Box>
          </Grid>
      </Grid>
      <br></br>
      
        
      </div>

      <div className='title-container'>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Box mt={2} display='flex' alignItems='center'>
              
            </Box>
            <Box mt={2}>
                  
            <Box display='flex' alignItems='center'>
                <CheckCircleIcon style={{ color: lightGreen[500], fontSize: 30}}/>
                <Typography variant='h3'
                >
                 Billing Address
                </Typography>
                <EditIcon
                 onClick={()=> {setOpenPopupBAddress(true);setRecordForEditBAddress(null);}}  />
              </Box><br></br>
              
              <Paper classes={{ root: classes.paperRoot }} >
                
                 <Grid  >
           { recordsBA.map(item=>(
           <Paper key={item.id} classes={{ root: classes.paperRootPaper }}><b>{item.contractorName}</b><br></br>
           <b>{item.addressLine1}    ,</b>
           <b> {item.addressLine2}   ,</b>
           <b>{item.city}    ,</b>
           <b>{item.stateProvinceRegion}    ,</b>
            <b>{item.zipPostalCode}   ,</b>
            <b>{item.country}</b> <br></br>
            <Grid container spacing={3}>
            <Grid item xs={10}>
            <b>{item.phone1}/{item.phone2}</b>
            </Grid>
            <Grid item xs={2}>
          <EditOutlinedIcon
                       frontSize="small"
                       onClick={()=>{openInPopupBAddress(item)}}/>
                       <CloseIcon 
                       frontSize="small"
                      onClick={()=>{setConfGialog({
                       isOpen:true,
                       title:'Are You Sure To Delete This Record? ',
                       subTitle:"You Can't undo this Operation",
                       onConfirm:()=>{onDeleteBAddress(item.id)}
                      })}}
                      />
                   </Grid>
                  </Grid>
                  </Paper> ))  }
                  </Grid>
                  <br></br>
                    {country && (
                    <Box mb={2}>
                      <Typography variant="body2">{country}</Typography>
                      <Typography variant="caption" className={classes.caption}>Company address</Typography>
                    </Box>
                  )}
                
                </Paper>
                <br></br> 
                          </Box>
            
          </Grid>
          </Grid>
            <br></br>
           </div>
          <div className='title-container'>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Box mt={2} display='flex' alignItems='center'>
              
            </Box>
            <Box mt={2}>
            <Box display='flex' alignItems='center'>
                <CheckCircleIcon style={{ color: lightGreen[500], fontSize: 30}}/>
                <Typography variant='h3'
                >
                 Technologie
                </Typography>
                <EditIcon 
                  onClick={()=> {setOpenPopupTechnology(true);setRecordForEditTechnology(null);}}  />
              </Box>
              <br></br>
              <Paper >
               
                {/*---------------------Technology Table-------------------------*/}
                 <TblContainerTech>
                <TblheadTech/>
                  
                <TableBody>
               {
                 recordsTech.map(item=>(
                   <TableRow key={item.id}>
                     <TableCell> {item.venders} </TableCell>
                    <TableCell>
                      <EditOutlinedIcon
                      frontSize="small"
                      onClick={()=>{openInPopupTechnology(item)}}
                      />
                      
                      <CloseIcon 
                     frontSize="small"
                      onClick={()=>{setConfGialog({
                      isOpen:true,
                      title:'Are You Sure To Delete This Record? ',
                      subTitle:"You Can't undo this Operation",
                      onConfirm:()=>{onDeleteTechnology(item.id)}
                     })}}
                     />
                   
                      </TableCell>
                   
                  </TableRow> ))
               }
            </TableBody>
                </TblContainerTech>
               
                </Paper> 
                          </Box>
            
          </Grid>
       </Grid>
      <br></br>
     
      </div>
       </>)

}
export default Profile;
