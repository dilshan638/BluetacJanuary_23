import React, {   useState  } from 'react';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';

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

import {Link} from 'react-scroll';

//Company Information
import CompanyInformationForm from './forms/CompanyInformationForm'
import { TableBody, TableCell, TableRow, Table,  TableHead } from '@material-ui/core';
import * as CompanyInformationServices from '../profile/service/CompanyInformationServices'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CloseIcon from '@material-ui/icons/Close'
import Notifications from '../profile/components/Notifications'
import ConfimDialog from './components/ConfimDialog';
import CompanyInfaormationPopUp from '../profile/popups/CompanyInformationPopUp'


//Technoligies
import TechnologyForms from './forms/TechnologyForms'
import * as TechnologyServices from './service/TechnologyServices'
import TechnologyPopUp from '../profile/popups/TechnologyPopUp'


//Billing Address
import BillingAddressForm from './forms/BillingAddressForm'
import * as BillingaddressServices from './service/BillingaddressServices'
import BillingAddressPopUp from '../profile/popups/BillingAddressPopUp'


//Redux 
import { uploadImage } from '../../data/userApi';
import { useAppContext } from '../../AppContext';
import PageLoader from '../../util/PageLoader';


//Consultant
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import CardMembershipSharpIcon from '@material-ui/icons/CardMembershipSharp';
import GTranslateSharpIcon from '@material-ui/icons/GTranslateSharp';
import SupervisedUserCircleSharpIcon from '@material-ui/icons/SupervisedUserCircleSharp';
import CastForEducationSharpIcon from '@material-ui/icons/CastForEducationSharp';
import TodaySharpIcon from '@material-ui/icons/TodaySharp';
import ExploreSharpIcon from '@material-ui/icons/ExploreSharp';
import ErrorIcon from '@material-ui/icons/Error';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import * as ConsultantService from './consultant/service/ConsultantService'
import moment from 'moment';
import TableContainer from '@material-ui/core/TableContainer';


//ImportConsultantPages
import EmploymentForm from '../profile/consultant/forms/EmploymentForm';
import CertificationForm from './consultant/forms/CertificationForm';
import EducationForm from '../profile/consultant/forms/EducationForm';
import ConfirmIdentityForm from '../profile/consultant/forms/ConfirmIdentityForm';
import PaymentTaxationSSNForm from '../profile/consultant/forms/PaymentTaxationSSNForm';
import PaymentTaxationPostalAddressForm from '../profile/consultant/forms/PaymentTaxationPostalAddressForm';
import CalendarAvailabilityForm from '../profile/consultant/forms/CalendarAvailabilityForm';
import GeolocationAvailabilityForm from '../profile/consultant/forms/GeolocationAvailabilityForm';
import LanguageForm from '../profile/consultant/forms/LanguageForm';
import PersonalInfoForm from '../profile/consultant/forms/PersonalInfoForm';


//Consultant PopUps 
import EmploymentPopUp from '../profile/consultant/popups/EmploymentPopUp'
import CertificationPopUp from './consultant/popups/CertificationPopUp'
import EducationPopUp from '../profile/consultant/popups/EducationPopUp'
import ConfimIdentityPopUp from '../profile/consultant/popups/ConfimIdentityPopUp'
import PaymentSSNPopUp from '../profile/consultant/popups/PaymentSSNPopUp'
import PaymentPostalAddressPopUp from '../profile/consultant/popups/PaymentPostalAddressPopUp'
import CalenderAvailabilityPopup from '../profile/consultant/popups/CalenderAvailabilityPopup'
import GeolocationAvailabilityPopUp from '../profile/consultant/popups/GeolocationAvailabilityPopUp'
import LanguagePopUp from '../profile/consultant/popups/LanguagePopUp'
import PersonalInfoPopup from '../profile/consultant/popups/PersonalInfoPopup'

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

  tables: {
    minWidth: 650,
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
const headCellsTConsultantCertifications =[
    {id:'titleCertification', label:'Title'},
    {id:'expiration', label:'Expire Date'},
    {id:'actions', label:'Actions'},
    ]
const headCellsTConsultantEmployment =[
    {id:'companyTitle', label:'Title|Company'},
    {id:'period', label:'Duration'},
    {id:'actions', label:'Actions'},
    ]
const headCellsTConsultantEducation =[
    {id:'institute', label:'Title'},
    {id:'period', label:'Duration'},
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

  //Service
  const [records, setRecords] =useState(CompanyInformationServices.getAllInformation());
  const [recordsBA, setRecordsBA] =useState(BillingaddressServices.getAllBillingAddress());
  const [recordsTech, setRecordsTech] =useState(TechnologyServices.getAllTechnoligy());

  //Popups
  const [openPopupComInf, setOpenPopupComInf] =useState(false)
  const [openPopupBAddress, setOpenPopupBAddress] =useState(false)
  const [openPopupTechnology, setOpenPopupTechnology] =useState(false)
  
  const [recordForEdit ,setRecordForEdit] =useState(null);
  const [recordForEditBAddress ,setRecordForEditBAddress] =useState(null);
  const [recordForEditTechnology ,setRecordForEditTechnology] =useState(null);

  //Notifications And Dialog
  const [notify,setNotify]=useState({isOpen:false, message:'',type:''})
  const[ ConfirmDialogBox, setConfirmDialogBox]=useState({isOpen:false, title:'',subTitle:''});

  //Consultant
  const [openPopupEmployment, setOpenPopupEmployment] =useState(false)
  const [openPopupCertification, setOpenPopupCertification]=useState(false)
  const [openPopupEducation, setOpenPopupEducation]=useState(false)
  const [openPopupConfimIdentity, setOpenPopupConfimIdentity]=useState(false)
  const [openPopupPTSSN, setOpenPopupPTSSN]=useState(false)
  const [openPopupPPAddress, setOpenPopupPPAddress]=useState(false)
  const [openPopupCalenderAvailibility, setOpenPopupCalenderAvailibility]=useState(false)
  const [openPopupGeolocationAvailibility, setOpenPopupopenPopupGeolocationAvailibility]=useState(false)
  const [openPopupLanguage, setOpenPopuplanguage]=useState(false)
  const [openPopupPersonalInfo, setOpenPopupPersonalInfo]=useState(false)

  const [recordForEditCertification ,setRecordForEditCertfication] =useState(null);
  const [recordForEditEmployment ,setRecordForEditEmployement] =useState(null);
  const [recordForEditEducation ,setRecordForEditEducation] =useState(null);
  const [recordForEditLanguage ,setRecordForEditLanguage] =useState(null);
  const [recordForEditYourIdentity ,setRecordForEditYourIdentity] =useState(null);
  const [recordsCertification, setRecordsCertification] =useState(ConsultantService.getAllCertification());   
  const [recordsEmployement, setRecordsEmployment] =useState(ConsultantService.getAllEmployment());   
  const [recordsEducation, setRecordsEducation] =useState(ConsultantService.getAllEducation());   
  const [recordsLanguage, setRecordsLanguage] =useState(ConsultantService.getAllLanguage());   
  const [recordsYourIdentity, setRecordsYourIdentity] =useState(ConsultantService.getAllYourIdentity());   

  
//Customer
 const addOrEdit =(information , restForm)=>{
    if(information.id==0)
    CompanyInformationServices.insertInformation(information)
    else
    CompanyInformationServices.updateInformation(information)
    restForm()
    setRecordForEdit(null)
    setOpenPopupComInf(false)
    setRecords(CompanyInformationServices.getAllInformation())
  
     setNotify({
     isOpen:true,
     message:'Submitted Successfully',
     type:'success'
   })
}

 const addOrEditBillingAddress =(billingAddress , restForm)=>{
     if(billingAddress.id==0)
     BillingaddressServices.insertBillingAddress(billingAddress)
     else
     BillingaddressServices.updateBillingAddress(billingAddress)
     restForm()
     setRecordForEditBAddress(null)
     setOpenPopupBAddress(false)
     setRecordsBA(BillingaddressServices.getAllBillingAddress())
     setNotify({
     isOpen:true,
     message:'Submitted Successfully',
     type:'success'
    })}


const addOrEditTechnologies =(technoligy , restForm)=>{
    if(technoligy.id==0)
    TechnologyServices.insertTechnoligy(technoligy)
    else
    TechnologyServices.updateTechnology(technoligy)
    restForm()
    setRecordForEditTechnology(null)
    setOpenPopupTechnology(false)
    setRecordsTech(TechnologyServices.getAllTechnoligy())
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

const onDeleteTechnology=id=>{
     setConfirmDialogBox({
    ...ConfirmDialogBox,
    isOpen:false
  })
  TechnologyServices.deleteTechnology(id);
  setRecordsTech(TechnologyServices.getAllTechnoligy())
  setNotify({
  isOpen:true,
  message:'Deleted Successfully',
  type:'error'
      })
  
}

const TblContainerTech =props=>(
   <Table className={classes.tables}>
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


//Consultant//

//Certification
const addOrEditCertificationSaveAndAdd =(consultant , restForm)=>{
  if(consultant.id==0)
  ConsultantService.insertCertification(consultant)
   else
   ConsultantService.updateCertification(consultant)
   restForm()
   setRecordForEditCertfication(null)
   setRecordsCertification(ConsultantService.getAllCertification())
   setNotify({
   isOpen:true,
   message:'Submitted Successfully',
   type:'success'
    }) }
     
const addOrEditEducationSaveAndAdd =(education , restForm)=>{
    if(education.id==0)
    ConsultantService.insertEducation(education)
    else
    ConsultantService.updateEducation(education)
    restForm()
    setRecordForEditEducation(null)
    setRecordsEducation(ConsultantService.getAllEducation())
    setNotify({
    isOpen:true,
    message:'Submitted Successfully',
    type:'success'
    }) }
    
         
 const addOrEditEducationSave =(education , restForm)=>{
    if(education.id==0)
    ConsultantService.insertEducation(education)
    else
    ConsultantService.updateEducation(education)
    restForm()
    setRecordForEditEducation(null)
    setOpenPopupEducation(false)
    setRecordsEducation(ConsultantService.getAllEducation())
    setNotify({
    isOpen:true,
    message:'Submitted Successfully',
    type:'success'
      })
   }
 

const addOrEditCertificationSave =(consultant , restForm)=>{
   if(consultant.id==0)
   ConsultantService.insertCertification(consultant)
   else
   ConsultantService.updateCertification(consultant)
   restForm()
   setRecordForEditCertfication(null)
   setOpenPopupCertification(false)
   setRecordsCertification(ConsultantService.getAllCertification())
   setNotify({
   isOpen:true,
   message:'Submitted Successfully',
   type:'success'
    })
}
 

const addOrEditEmployementSave =(employment , restForm)=>{
   if(employment.id==0)
   ConsultantService.insertEmployment(employment)
   else
   ConsultantService.updateEmployment(employment)
   restForm()
   setRecordForEditEmployement(null)
   setOpenPopupEmployment(false)
   setRecordsEmployment(ConsultantService.getAllEmployment())
   setNotify({
   isOpen:true,
   message:'Submitted Successfully',
   type:'success'
        }) }
     
       
const addOrEditEmployementSaveAndAdd =(employment , restForm)=>{
   if(employment.id==0)
   ConsultantService.insertEmployment(employment)
   else
   ConsultantService.updateEmployment(employment)
   restForm()
   setRecordForEditEmployement(null)
   setRecordsEmployment(ConsultantService.getAllEmployment())
   setNotify({
   isOpen:true,
   message:'Submitted Successfully',
   type:'success'
  })  
}


const addOrEditLanguage =(language , restForm)=>{
  if(language.id==0)
  ConsultantService.insertLanguage(language)
  else
  ConsultantService.updateLanguage(language)
  restForm()
  setRecordForEditLanguage(null)
  setOpenPopuplanguage(false)
  setRecordsLanguage(ConsultantService.getAllLanguage())
  setNotify({
  isOpen:true,
  message:'Submitted Successfully',
  type:'success'
 })}

 
const addOrEditYourIdentity =(yourIdentity , restForm)=>{
  if(yourIdentity.id==0)
  ConsultantService.insertYourIdentity(yourIdentity)
  else
  ConsultantService.updateYourIdentity(yourIdentity)
  restForm()
  setRecordForEditYourIdentity(null)
  setOpenPopupConfimIdentity(false)
  setRecordsYourIdentity(ConsultantService.getAllYourIdentity())
  setNotify({
  isOpen:true,
  message:'Submitted Successfully',
  type:'success'
 })}



const onDeleteConsultant=id=>{
    setConfirmDialogBox({
    ...ConfirmDialogBox,
    isOpen:false
  })
 ConsultantService.deleteCertification(id);
  setRecordsCertification(ConsultantService.getAllCertification())
  setNotify({
          isOpen:true,
          message:'Deleted Successfully',
          type:'error'
      })}

const onDeleteEmployment=id=>{
  setConfirmDialogBox({
    ...ConfirmDialogBox,
    isOpen:false
  })
  ConsultantService.deleteEmployment(id);
  setRecordsEmployment(ConsultantService.getAllEmployment())
  setNotify({
          isOpen:true,
          message:'Deleted Successfully',
          type:'error'
      })
}

const onDeleteEducation=id=>{
   setConfirmDialogBox({
    ...ConfirmDialogBox,
    isOpen:false
  })
  ConsultantService.deleteEducation(id);
  setRecordsEducation(ConsultantService.getAllEducation())
  setNotify({
          isOpen:true,
          message:'Deleted Successfully',
          type:'error'
      }) 
}



const openInPopupConsultantCertification= item=>{
  setRecordForEditCertfication(item)
  setOpenPopupCertification(true)
}

const openInPopupConsultantEmployment= item=>{
  setRecordForEditEmployement(item)
  setOpenPopupEmployment(true)
}

const openInPopupConsultantEducation= item=>{
  setRecordForEditEducation(item)
  setOpenPopupEducation(true)
}

const openInPopupConsultLanguages= item=>{
  setRecordForEditLanguage(item)
  setOpenPopuplanguage(true)
}
const openInPopupConsultYourIdentity= item=>{
  setRecordForEditYourIdentity(item)
  setOpenPopupConfimIdentity(true)
}

const TblConsultantCertification =props=>(
   <Table className={classes.tables} >
         {props.children}
   </Table>
)
     const TblheadConsultantCertification = props=>{ 
      return(<TableHead>
     <TableRow>
     {
     headCellsTConsultantCertifications.map(headCellsTConsultantCertifications=>
     (<TableCell key={headCellsTConsultantCertifications.id} align="center">
      {headCellsTConsultantCertifications.label}
     </TableCell>
     ))
     }
     </TableRow>
    </TableHead>)
                }


const TblConsultantEmployment =props=>(
   <Table className={classes.tables}>
         {props.children}
   </Table>
)
  
const TblheadConsultantEmployment = props=>{ 
      return(<TableHead>
     <TableRow>
     {
     headCellsTConsultantEmployment.map(headCellsTConsultantEmployment=>
     (<TableCell key={headCellsTConsultantEmployment.id} align="center">
      {headCellsTConsultantEmployment.label}
     </TableCell>
     ))
     }
     </TableRow>
     </TableHead>)
}

const TblConsultantEducation =props=>(
     <Table className={classes.tables}>
         {props.children}
     </Table>
)
    
const TblheadConsultantEducation = props=>{ 
      return(<TableHead>
     <TableRow>
     {
     headCellsTConsultantEducation.map(headCellsTConsultantEducation=>
     (<TableCell key={headCellsTConsultantEducation.id} align="center">
      {headCellsTConsultantEducation.label}
     </TableCell>
     ))
     }
     </TableRow>
    </TableHead>)
}

  const token = localStorage.FBIdToken;
  let decodedToken = null;
  if (token) {
  decodedToken = jwtDecode(token);
}
 
 return(<>

     {decodedToken.customer &&(
      

    <div className='title-container' id="CompanyInformation">
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
               <CheckCircleIcon style={{ color: lightGreen[500], fontSize: 30}}/>
               <Typography variant='h3' >
                 Company information
               </Typography>
              
               { 
               records.map(item=>(
               <EditIcon
                frontSize="small"
                onClick={()=>{openInPopup(item)}}/>
                 )) 
                } 

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
                
                 <Avatar alt="Remy Sharp" src={imageUrl} className={classes.avatar} />
               </Box>
              <Box color='white'>
                 <Box mb={2} mt={1}>
                   <Typography variant="body2">{userId}</Typography>
                   <Box mb={2}>
                 </Box>
                 {email && (<Box mb={2}>
                   <Typography variant="body2">{email}</Typography>
                  </Box>)}
                   <Typography variant="caption" className={classes.caption}>Company name ( Display Name)</Typography>
                   { (<Box mb={2}>
                   
                   <Typography variant="caption" className={classes.caption}>Company description</Typography>
                 </Box>)}
                  
        {
          records.map(item=>(
          <Typography   variant="body2"  >{item.contractorName}<br></br>
          {item.addressLine1}   ,
          {item.addressLine2}  ,
          {item.city}  ,
          {item.stateProvinceRegion}  ,
           {item.zipPostalCode}   ,
           {item.country}<br></br>
           <Grid container spacing={3}>
           <Grid item xs={10}>
           {item.phone1}/{item.phone2}
           </Grid>
            </Grid>
           </Typography> ))  
           }
              <br></br>
              </Box>
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
             <Link activeClass="active"
                to="CompanyInformation"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                delay={1000} >
              
               <ListItem button>
               <ListItemIcon>
               <BusinessIcon/>
               </ListItemIcon>

              <ListItemText 
              primary={
                <Typography variant="h5">
                <b> Company information </b>
                </Typography>
                    }/>
              </ListItem>
              
              </Link>
            
             <Link activeClass="active"
                to="A"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                delay={1000} >
              
               <ListItem button>
               <ListItemIcon>
               <CreditCardIcon/>
               </ListItemIcon>

              <ListItemText 
              primary={
                <Typography variant="h5">
                <b> Credit card details </b>
                </Typography>
                    }/>
              </ListItem>
              
              </Link>
                
                 <Link activeClass="active"
                to="BillingAddress"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                delay={1000} >
              
               <ListItem button>
               <ListItemIcon>
               <ContactMailIcon/>
               </ListItemIcon>

              <ListItemText 
              primary={
                <Typography variant="h5">
                <b> Billing address </b>
                </Typography>
                    }/>
              </ListItem>
              
              </Link>
               
                   
                <Link activeClass="active"
                to="Technologie"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                delay={1000} >
              
               <ListItem button>
               <ListItemIcon>
               <RouterIcon/>
               </ListItemIcon>

              <ListItemText 
              primary={
                <Typography variant="h5">
                <b> Technologie </b>
                </Typography>
                    }/>
              </ListItem>
              
              </Link>


                 <BillingAddressPopUp
                   openPopupBAddress={openPopupBAddress}
                   setOpenPopupBAddress={setOpenPopupBAddress}>
                     
                     <BillingAddressForm
                     recordForEditBAddress={recordForEditBAddress}
                     addOrEditBillingAddress={addOrEditBillingAddress} />
                   </BillingAddressPopUp>
                   <TechnologyPopUp
                     openPopupTechnology={openPopupTechnology}
                     setOpenPopupTechnology={setOpenPopupTechnology}>
                       
                       <TechnologyForms
                       addOrEditTechnologies={addOrEditTechnologies}
                       recordForEditTechnology={recordForEditTechnology}/>
                   </TechnologyPopUp> 
                
                    <CompanyInfaormationPopUp 
                    openPopupComInf={openPopupComInf}
                    setOpenPopupComInf={setOpenPopupComInf} >
                      
                      <CompanyInformationForm
                      recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}/>
                    </CompanyInfaormationPopUp>
                  
                   <Notifications
                   notify={notify}
                   setNotify={setNotify}
                   />
                  
                   <ConfimDialog
                   ConfirmDialogBox={ConfirmDialogBox}
                   setConfirmDialogBox={setConfirmDialogBox}
                   />
               </List>
             </Paper>
          </Box>
         </Grid>
     </Grid>
     <br></br>
    </div>
     )}

{/*Consultant*/}
{decodedToken.consultant &&(

<div className='title-container' >
   <Grid container spacing={3}>
     <Grid item xs={9}>
       <Box mt={2} display='flex' alignItems='center'>
         <Chip
           label="Pending"
           style={{ background: '	#FFA500' ,color: 'white', marginRight: 2 }}
         />
         <Typography variant='body2'>
      <b>   You are only a few steps away from receiving cases. Please complete all the mandatory information  in your profile.</b>
         </Typography>
       </Box>
       <Box mt={2}>
         <Box display='flex' alignItems='center'>
           <ErrorIcon />
           <Typography variant='h3'>
            Your identity
           </Typography>
          
          </Box>
         
         <Paper classes={{ root: classes.paperRoot }} id ="YourIdentity">
          
           <Box color='white'>
             <Box mb={2} mt={1}>
             <Button
              variant="contained"
               color=""
                startIcon={ <AddCircleOutlineIcon/>}
                onClick={()=> {setOpenPopupConfimIdentity(true)}}>
             Add proof identity
            </Button>
          </Box>
           </Box>
        </Paper>
            </Box>
         <Box mt={2}>
          <Box display='flex' alignItems='center'>
           <ErrorIcon />
           <Typography variant='h3'
           >
           Payments and Taxation
           </Typography>
         </Box>
         <Paper classes={{ root: classes.paperRoot }} id="PaymentsAndTaxation">
         <Box color='white'>
             <Box mb={2} mt={1}>
             <Grid container>
              <Grid item xs={3}>
               <Button 
               variant="contained"
                color="" 
                startIcon={ <AddCircleOutlineIcon/>}
                onClick={()=> {setOpenPopupPTSSN(true);setRecordForEdit(null);}}>
                Add SSN or TIN
                </Button>
             </Grid>
                <Grid item xs={9}>
                <Button 
                variant="contained" 
                color="" 
                startIcon={ <AddCircleOutlineIcon/>}
                onClick={()=> {setOpenPopupPPAddress(true);setRecordForEdit(null);}}>
                 Add postal address
               </Button>
              </Grid>
               </Grid>
             </Box>
           </Box>
         </Paper>
            </Box>
            <br></br>
              <br></br>
             <Box display='flex' alignItems='center'>
               <CheckCircleIcon style={{ color: lightGreen[500], fontSize: 30}}
               />
               <Typography variant='h3'
               >
                 Personal Info
               </Typography>
               <EditIcon 
                />
             </Box>
           <Paper classes={{ root: classes.paperRoot }} id="PersonalInfo">
           <Box color='white'>
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
                
                 <Avatar alt="Remy Sharp" src={imageUrl} className={classes.avatar} />
                 <Typography variant="caption" className={classes.caption}>Nick name ( Display Name)</Typography>
                </Box>
             </Box>
            </Paper>
                    <br></br>
                    <br></br>
              <Box display='flex' alignItems='center'>
               <CheckCircleIcon 
               style={{ color: lightGreen[500], fontSize: 30}}
               />
               <Typography variant='h3'
               >
                Certifications
               </Typography>
               <EditIcon 
               onClick={()=> {setOpenPopupCertification(true);setRecordForEdit(null);}} />
             </Box>
            
             <Paper classes={{ root: classes.paperRoot }} id="Certifications">
          
          <Box color='white'>
            <Box mb={2} mt={1}>
            <Button 
            variant="contained"
             color=""
              startIcon={ <AddCircleOutlineIcon/>}
              onClick={()=> {setOpenPopupCertification(true);setRecordForEdit(null);}} >
             Add Certifications
           </Button>
   
           </Box>
          </Box>

          <TableContainer component={Paper}>
         <TblConsultantCertification >
        <TblheadConsultantCertification/>
        
        {/*
        Certification Table 
        */}
         <TableBody>
       { 
         recordsCertification.map(item=>(
           <TableRow key={item.id}>
             <TableCell align="center"> {item.titleCertification} </TableCell>
             <TableCell align="center"> { moment(item.expiration).format("MMM Do YYYY")} </TableCell>
            <TableCell align="center">
              <EditOutlinedIcon
              frontSize="small"
              onClick={()=>{openInPopupConsultantCertification(item)}}
              />
              <CloseIcon 
             frontSize="small"
              onClick={()=>{setConfirmDialogBox({
              isOpen:true,
              title:'Are You Sure To Delete This Record? ',
              subTitle:"You Can't undo this Operation",
              onConfirm:()=>{onDeleteConsultant(item.id)}
             })}}
             />
           
              </TableCell>
           
          </TableRow> ))
       }
        </TableBody>
        </TblConsultantCertification>
        </TableContainer>
        </Paper>

              <br></br>
              <br></br>
            <Box display='flex' alignItems='center'>
               <CheckCircleIcon style={{ color: lightGreen[500], fontSize: 30}}
               />
               <Typography variant='h3'
               >
                 Language 
               </Typography>
               { 
               recordsLanguage.map(item=>(
               <EditIcon
                frontSize="small"
                onClick={()=>{openInPopupConsultLanguages(item)}}/>
                 )) 
                } 
             </Box>
          <Paper classes={{ root: classes.paperRoot }} id="Language">
          <Box color='white'>
            <Box mb={2} mt={1}>
            <Button 
            variant="contained" 
            color=""
             startIcon={ <AddCircleOutlineIcon/>}
             onClick={()=> {setOpenPopuplanguage(true);setRecordForEditLanguage(null);}} >
            Add Language
           </Button>
                  
           {
          recordsLanguage.map(item=>(
          <Typography   variant="body2"  > <br></br>English Proficiency:<b>{item.englishProficiency}</b> <br></br>
           If You Can Speak Another Language, It's Status: <b>{item.addOntherLanguage}/
            {item.ontherLangualgeProficiency} </b> 
            </Typography> ))  
           }


          </Box>
          </Box>
          </Paper>
              <br></br>
              <br></br>
            <Box display='flex' alignItems='center' >
               <CheckCircleIcon style={{ color: lightGreen[500], fontSize: 30}}
              id="Employment" />
               <Typography variant='h3'  
               >
               Employment 
               </Typography>
               <EditIcon 
                onClick={()=> {setOpenPopupEmployment(true);setRecordForEdit(null);}} />
             </Box>
            <Paper classes={{ root: classes.paperRoot }} >
           <Box color='white'>
            <Box mb={2} mt={1}>
            <Button 
            variant="contained" 
            color="" 
            startIcon={ <AddCircleOutlineIcon />}
            onClick={()=> {setOpenPopupEmployment(true);setRecordForEdit(null);}} 
               >
           Add Employment
           </Button>
           </Box>
          </Box>
         <TableContainer component={Paper}>
         <TblConsultantEmployment>
        <TblheadConsultantEmployment/>
          
        
        {/*
        Employment Table 
        */}
        <TableBody>
       {
         recordsEmployement.map(item=>(
           <TableRow key={item.id}>
            
             <TableCell align="center"> {item.companyTitle} | {item.company}</TableCell>
             <TableCell align="center"> { moment(item.period).format("MMM Do YYYY")} - { moment(item.through).format("MMM Do YYYY")}</TableCell>
            <TableCell align="center">
              <EditOutlinedIcon
              frontSize="small"
              onClick={()=>{openInPopupConsultantEmployment(item)}}
              />
             <CloseIcon 
             frontSize="small"
              onClick={()=>{setConfirmDialogBox({
              isOpen:true,
              title:'Are You Sure To Delete This Record? ',
              subTitle:"You Can't undo this Operation",
              onConfirm:()=>{onDeleteEmployment(item.id)}
             })}}
             />
           
              </TableCell>
           
          </TableRow> ))
       }
        </TableBody>
        </TblConsultantEmployment>
        </TableContainer>
         </Paper>
              <br></br>
              <br></br>
            <Box display='flex' alignItems='center'>
               <CheckCircleIcon style={{ color: lightGreen[500], fontSize: 30}}
               />
               <Typography variant='h3'
               >
                 Education 
               </Typography>
               <EditIcon 
                onClick={()=> {setOpenPopupEducation(true);setRecordForEdit(null);}} />
             </Box>
            <Paper classes={{ root: classes.paperRoot }} id="Education">
            <Box color='white'>
            <Box mb={2} mt={1}>
            <Button 
            variant="contained" 
            color="" 
            startIcon={ <AddCircleOutlineIcon />}
            onClick={()=> {setOpenPopupEducation(true);setRecordForEdit(null);}} >
             Add Education
           </Button>
   
           </Box>
          </Box>
          <TableContainer component={Paper}>
        <TblConsultantEducation>
        <TblheadConsultantEducation/>
          
           
        {/*
        Education Table 
        */}
        <TableBody>
     {
         recordsEducation.map(item=>(
           
           <TableRow key={item.id}>
             <TableCell align="center"> {item.institute}</TableCell>
             <TableCell align="center">  { moment(item.period).format("MMM Do YYYY")} - { moment(item.through).format("MMM Do YYYY")}</TableCell>
            <TableCell align="center">
              <EditOutlinedIcon
              frontSize="small"
              onClick={()=>{openInPopupConsultantEducation(item)}}
              />
              
              <CloseIcon 
             frontSize="small"
              onClick={()=>{setConfirmDialogBox({
              isOpen:true,
              title:'Are You Sure To Delete This Record? ',
              subTitle:"You Can't undo this Operation",
              onConfirm:()=>{onDeleteEducation(item.id)}
             })}}
             />
           
              </TableCell>
           
          </TableRow> ))
       }

        </TableBody>
        </TblConsultantEducation>
        </TableContainer>
           </Paper>
              <br></br>
              <br></br>
          
            <Box display='flex' alignItems='center'>
               <CheckCircleIcon style={{ color: lightGreen[500], fontSize: 30}}
               />
               <Typography variant='h3'
               >
                 Calendar availability 
               </Typography>
               <EditIcon 
                onClick={()=> {setOpenPopupCalenderAvailibility(true);setRecordForEdit(null);}} />
             </Box>
            
            <Paper classes={{ root: classes.paperRoot }} id="CalendarAvailability">
          
          <Box color='white'>
            <Box mb={2} mt={1}>
            <Button 
            variant="contained"
             color="" startIcon={ <CalendarTodayIcon/>}
             onClick={()=> {setOpenPopupCalenderAvailibility(true);setRecordForEdit(null);}} >
             Update availability
           </Button>
   
           </Box>
          </Box>
            </Paper>
              <br></br>
              <br></br>
            <Box display='flex' alignItems='center' >
               <CheckCircleIcon style={{ color: lightGreen[500], fontSize: 30}}
               />
               <Typography variant='h3'
               >
                Geolocation availability 
               </Typography>
               <EditIcon 
                onClick={()=> {setOpenPopupopenPopupGeolocationAvailibility(true);setRecordForEdit(null);}} />
             </Box>
             <Paper classes={{ root: classes.paperRoot }}  id="GeolocationAvailability">
          <Box color='white'>
            <Box mb={2} mt={1}>
            <Button 
            variant="contained"
             color=""
              startIcon={ <LocationOnIcon/>}
              onClick={()=> {setOpenPopupopenPopupGeolocationAvailibility(true);setRecordForEdit(null);}}>
             Update availability
           </Button>
              </Box>
          </Box>
           </Paper>
             </Grid>
            <Grid item xs={3}>
       <Box mt={2}>
         <Typography variant='h4'>
           Quick Navigation
           </Typography>
         <Paper elevation={6} style={{ marginTop: 8 }}>
           <List component="nav" aria-label="main mailbox folders">


           <Link activeClass="active"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                delay={1000} >
              
               <ListItem button>
               <ListItemIcon>
               <PermIdentityIcon/>
               </ListItemIcon>

              <ListItemText 
              primary={
                <Typography variant="h5">
                <b>Your identity  </b>
                </Typography>
                    }/>
              </ListItem>
              
              </Link>


             <Link activeClass="active"
                to="YourIdentity"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                delay={1000} >
              
               <ListItem button>
               <ListItemIcon>
               <MonetizationOnIcon/>
               </ListItemIcon>

              <ListItemText 
              primary={
                <Typography variant="h5">
                <b>Payments and Taxation  </b>
                </Typography>
                    }/>
              </ListItem>
              
              </Link>
            

           <Link activeClass="active"
                to="PaymentsAndTaxation"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                delay={1000} >
              
               <ListItem button>
               <ListItemIcon>
               <ContactPhoneIcon/>
               </ListItemIcon>

              <ListItemText 
              primary={
                <Typography variant="h5">
                <b>Personal Info </b>
                </Typography>
                    }/>
              </ListItem>
              
              </Link>
            

            <Link activeClass="active"
                to="PersonalInfo"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                delay={1000} >
              
               <ListItem button>
               <ListItemIcon>
               <CardMembershipSharpIcon/>
               </ListItemIcon>

              <ListItemText 
              primary={
                <Typography variant="h5">
                <b>Certifications </b>
                </Typography>
                    }/>
              </ListItem>
              
              </Link>
          

             <Link activeClass="active"
                to="Certifications"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                delay={1000} >
              
               <ListItem button>
               <ListItemIcon>
               <GTranslateSharpIcon/>
               </ListItemIcon>

              <ListItemText 
              primary={
                <Typography variant="h5">
                <b>Language </b>
                </Typography>
                    }/>
              </ListItem>
              
              </Link>
            
              <Link activeClass="active"
                to="Language"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                delay={1000} >
              
               <ListItem button>
               <ListItemIcon>
               <SupervisedUserCircleSharpIcon/>
               </ListItemIcon>

              <ListItemText 
              primary={
                <Typography variant="h5">
                <b>Employment </b>
                </Typography>
                    }/>
              </ListItem>
              
              </Link>

              <Link activeClass="active"
                to="Employment"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                delay={1000} >
              
               <ListItem button>
               <ListItemIcon>
               <CastForEducationSharpIcon/>
               </ListItemIcon>

              <ListItemText 
              primary={
                <Typography variant="h5">
                <b>Education </b>
                </Typography>
                    }/>
              </ListItem>
              
              </Link>

              <Link activeClass="active"
                to="CalendarAvailability"
                spy={true}
                smooth={true}
                 offset={50}
                duration={500}
                delay={1000} >
               <ListItem button>
               <ListItemIcon>
               < TodaySharpIcon/>
               </ListItemIcon>

              <ListItemText primary={
              <Typography variant="h5">
                <b>Calendar availability  </b>
                </Typography>
                                    }/>
              </ListItem>
              </Link>
            
             
               <Link activeClass="active"
                to="GeolocationAvailability"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                delay={1000} >
              
               <ListItem button>
               <ListItemIcon>
               <ExploreSharpIcon/>
               </ListItemIcon>

              <ListItemText 
              primary={
                <Typography variant="h5">
                <b>Geolocation availability </b>
                </Typography>
                    }/>
              </ListItem>
              
              </Link>
           

                <EmploymentPopUp
                openPopupEmployment={openPopupEmployment}
                 setOpenPopupEmployment={setOpenPopupEmployment}>
                 <EmploymentForm
                 recordForEditEmployment={recordForEditEmployment}
                 addOrEditEmployementSaveAndAdd={addOrEditEmployementSaveAndAdd}
                 addOrEditEmployementSave={addOrEditEmployementSave}/>
                </EmploymentPopUp>

                 
                 <CertificationPopUp 
                  openPopupCertification={openPopupCertification}
                  setOpenPopupCertification={setOpenPopupCertification} > 
                <CertificationForm
                recordForEditCertification={recordForEditCertification}
                addOrEditCertificationSaveAndAdd={addOrEditCertificationSaveAndAdd}
                addOrEditCertificationSave={ addOrEditCertificationSave}/>
               </CertificationPopUp>
             
            
            
             <EducationPopUp  
              openPopupEducation={openPopupEducation}
              setOpenPopupEducation={setOpenPopupEducation}>
                <EducationForm
                addOrEditEducationSaveAndAdd={addOrEditEducationSaveAndAdd}
                addOrEditEducationSave={addOrEditEducationSave}
                recordForEditEducation={recordForEditEducation}/>
              </EducationPopUp>

              <ConfimIdentityPopUp
              openPopupConfimIdentity={openPopupConfimIdentity}
              setOpenPopupConfimIdentity={setOpenPopupConfimIdentity}>
                <ConfirmIdentityForm
                 addOrEditYourIdentity={addOrEditYourIdentity}
                 recordForEditYourIdentity={recordForEditYourIdentity}/>
              </ConfimIdentityPopUp>

              <PaymentSSNPopUp
                openPopupPTSSN={openPopupPTSSN}
                setOpenPopupPTSSN={setOpenPopupPTSSN} >
                <PaymentTaxationSSNForm/>
              </PaymentSSNPopUp>

              <PaymentPostalAddressPopUp
                openPopupPPAddress={openPopupPPAddress}
                setOpenPopupPPAddress={setOpenPopupPPAddress}>
                <PaymentTaxationPostalAddressForm/>
              </PaymentPostalAddressPopUp>

  
                <CalenderAvailabilityPopup
                 openPopupCalenderAvailibility={openPopupCalenderAvailibility}
                 setOpenPopupCalenderAvailibility={setOpenPopupCalenderAvailibility}>
                  <CalendarAvailabilityForm/>
                </CalenderAvailabilityPopup>
              
                <GeolocationAvailabilityPopUp
                 openPopupGeolocationAvailibility={openPopupGeolocationAvailibility}
                 setOpenPopupopenPopupGeolocationAvailibility={setOpenPopupopenPopupGeolocationAvailibility}>
                <GeolocationAvailabilityForm/>
                </GeolocationAvailabilityPopUp>

                <LanguagePopUp
                 openPopupLanguage={openPopupLanguage}
                 setOpenPopuplanguage={setOpenPopuplanguage}>
                  <LanguageForm
                  addOrEditLanguage={addOrEditLanguage}
                  recordForEditLanguage={recordForEditLanguage}/>
                </LanguagePopUp>

                <PersonalInfoPopup
                 openPopupPersonalInfo={openPopupPersonalInfo}
                 setOpenPopupPersonalInfo={setOpenPopupPersonalInfo}>
                  <PersonalInfoForm/>
                </PersonalInfoPopup>

                <Notifications
                   notify={notify}
                   setNotify={setNotify}
                   />
                   <ConfimDialog
                   ConfirmDialogBox={ConfirmDialogBox}
                   setConfirmDialogBox={setConfirmDialogBox}
                   />

             
            </List>
         </Paper>
      </Box>
     </Grid>
 </Grid>
 <br></br>
   
 </div>

 )}

    {/*
        Customer Billing Address Table 
     */}

  {decodedToken.customer &&(
  <div className='title-container' id="BillingAddress">
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

        { recordsBA.map(item=>(
               <EditIcon
                frontSize="small"
                onClick={()=>{openInPopupBAddress(item)}}/>
                 )) 
         } 

      </Box>
      <br></br>
      
      <Paper classes={{ root: classes.paperRootPaper }} >
       <Box  mb={2} >
         <br></br>
         <Box mb={2} >

   { 
   recordsBA.map(item=>(
   <Typography variant="body2" >{item.contractorName}<br></br>
    {item.addressLine1}    ,
    {item.addressLine2}   ,
    {item.city}    ,
    {item.stateProvinceRegion}    ,
    {item.zipPostalCode}   ,
    {item.country}<br></br>
    <Grid container spacing={3}>
    <Grid item xs={10}>
    {item.phone1}/{item.phone2}
    </Grid>
      </Grid>
          </Typography> ))  
          
       }
       
          </Box>
          </Box>
          <br></br>
           
        </Paper>
        <br></br> 
       </Box>
    
  </Grid>
  </Grid>
 
   </div>

)}

        {/*
        Customer Technology Table 
        */}

{decodedToken.customer &&(

<div className='title-container' id="Technologie">
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
              onClick={()=>{setConfirmDialogBox({
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
)}
 </>)

}
export default Profile;
