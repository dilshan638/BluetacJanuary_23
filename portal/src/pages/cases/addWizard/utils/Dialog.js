import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";


const DialogBox = ({toggle, onClose, submit, dialogValue, setDialogValue, labelName, context, textLabel}) => {
    return (
        <Dialog open={toggle} onClose={onClose} aria-labelledby="form-dialog-title">
            <form onSubmit={submit}>
                <DialogTitle id="form-dialog-title">{labelName}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {context}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={dialogValue}
                        onChange={(event) => setDialogValue(event.target.value)}
                        label={textLabel}
                        type="text"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}


export default DialogBox;