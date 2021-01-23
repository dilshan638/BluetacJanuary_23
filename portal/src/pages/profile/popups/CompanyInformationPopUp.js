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


export default function CompanyInformationPopUp(props) {
    const { title,children, openPopupComInf, setOpenPopupComInf} =props;
    const classes =useStyles();
    return (
      
        <Dialog open={openPopupComInf} maxWidth="md" classes={{paper:classes.dialogWraper}}>
            <DialogTitle>
            <div style={{display: 'flex'}}>
            <Typography variant="h6" style={{flexGrow:1}} >Company Information
            </Typography>
          
            <CloseIcon
           style={{ color: 'red' }}
            onClick={()=>{setOpenPopupComInf(false)}}/>
             </div>
            </DialogTitle>
            <DialogContent dividers>
              {children}
              </DialogContent>
              </Dialog>
      

    )
}
