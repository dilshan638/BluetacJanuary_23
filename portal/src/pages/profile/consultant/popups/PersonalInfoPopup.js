import React from 'react'
import {Dialog, DialogTitle,DialogContent, Typography,makeStyles} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme=>({
    dialogWraper:{
        padding:theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5)
    }

    
}))

export default function PersonalInfoPopup(props) {
    const { title,children, openPopupPersonalInfo, setOpenPopupPersonalInfo} =props;
   
    const classes =useStyles();
    return (
        <Dialog open={openPopupPersonalInfo} maxWidth="md" classes={{paper:classes.dialogWraper}}>
        <DialogTitle>
        <div style={{display: 'flex'}}>
        <Typography variant="h4" style={{flexGrow:1}} >Personal Info
        </Typography>
      
        <CloseIcon
       style={{ color: 'red' }}
        onClick={()=>{setOpenPopupPersonalInfo(false)}}/>
         </div>
        </DialogTitle>
        <DialogContent dividers>
          {children}
          </DialogContent>
          </Dialog>
  
    )
}
