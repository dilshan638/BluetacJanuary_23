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
export default function CalenderAvailabilityPopup(props) {
    const { title,children, openPopupCalenderAvailibility, setOpenPopupCalenderAvailibility} =props;
    const classes =useStyles();
    return (
        
        <Dialog open={openPopupCalenderAvailibility} maxWidth="md" classes={{paper:classes.dialogWraper}}>
            <DialogTitle>
            <div style={{display: 'flex'}}>
            <Typography variant="h4" style={{flexGrow:1}} >Calender Availability
            </Typography>
        
            <CloseIcon
            style={{ color: 'red' }}
            onClick={()=>{setOpenPopupCalenderAvailibility(false)}}/>
             </div>
            </DialogTitle>
            <DialogContent dividers>
              {children}
              </DialogContent>
              </Dialog>
      
      

    )
}
