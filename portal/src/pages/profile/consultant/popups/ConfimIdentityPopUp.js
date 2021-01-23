import React from 'react'
import {Dialog, DialogTitle,DialogContent, Typography,makeStyles} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme=>({
    dialogWraper:{
        padding:theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5)
    }

    
}))

export default function ConfimIdentityPopUp(props) {
    const { title,children, openPopupConfimIdentity, setOpenPopupConfimIdentity} =props;
    const classes =useStyles();
    return (
        
        <Dialog open={openPopupConfimIdentity} maxWidth="md" classes={{paper:classes.dialogWraper}}>
            <DialogTitle>
            <div style={{display: 'flex'}}>
            <Typography variant="h4" style={{flexGrow:1}} >Confirm Identity
            </Typography>
        
            <CloseIcon
            style={{ color: 'red' }}
            onClick={()=>{setOpenPopupConfimIdentity(false)}}/>
             </div>
            </DialogTitle>
            <DialogContent dividers>
              {children}
              </DialogContent>
              </Dialog>
      
      

    )
}
