import { Dialog, DialogActions, DialogContent, DialogTitle,IconButton,Typography} from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';

import Button from '@material-ui/core/Button';

const useStyles =makeStyles(theme=>({
    dialog:{
        padding:theme.spacing(2),
        position:'absoult',
        top:theme.spacing(5)
    },
    dialogContent:{
        textAlign:'center'
    },

    dialogTitle:{
        textAlign:'center'
    },

    dialogAction:{
        justifyContent:'center'
    },
    titleIcon:{
    backgroundColor:theme.palette.secondary.light,
    color:theme.palette.secondary.main,
    '&:hover':{
        backgroundColor:theme.palette.secondary.light, 
        cusor:'default' 
    },
    '& .MuiSvgIcon-root':{
        fontSize:'8rem',
    }

    },
    rootButton:{
        margin:theme.spacing(0.5)
    }
}))


export default function ConfimDialog(props) {
    const classes = useStyles();
    const{  ConfirmDialogBox, setConfirmDialogBox}= props
    return (
        <Dialog open={ConfirmDialogBox.isOpen} classes={{paper:classes.dialog}}>

           
             <DialogTitle className={classes.dialogTitle}>
                 <IconButton
                  disableRipple className={classes.titleIcon}>
              <NotListedLocationIcon/>
            </IconButton>
            </DialogTitle>
           
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {ConfirmDialogBox.title}
                </Typography>
                <Typography variant="subtitle2">
                    {ConfirmDialogBox.subTitle}
                </Typography>
            </DialogContent>

            <DialogActions className={classes.dialogAction}>
                      <Button
                         className={classes.rootButton}
                         variant="contained"
                         color="primary"
                         text="No"
                         color="default"
                         onClick={()=>setConfirmDialogBox({...ConfirmDialogBox,isOpen:false})}>No
                        </Button>

                        
                        <Button
                         className={classes.rootButton}
                         variant="contained"
                         color="red"
                        text="Yes"
                        color="secondary"
                        onClick={ConfirmDialogBox.onConfirm}>Yes
                        </Button>

            </DialogActions>
        </Dialog>
    )
}
