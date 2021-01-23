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

export default function PaymentSSNPopUp(props) {
    const { title,children, openPopupPTSSN, setOpenPopupPTSSN} =props;
    const classes =useStyles();
    return (
        
        <Dialog open={openPopupPTSSN} maxWidth="md" classes={{paper:classes.dialogWraper}}>
            <DialogTitle>
            <div style={{display: 'flex'}}>
            <Typography variant="h4" style={{flexGrow:1}} >Add SSN or TIn
            </Typography>
        
            <CloseIcon
            style={{ color: 'red' }}
            onClick={()=>{setOpenPopupPTSSN(false)}}/>
             </div>
            </DialogTitle>
            <DialogContent dividers>
              {children}
              </DialogContent>
              </Dialog>
    )
}
