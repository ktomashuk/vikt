import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const InfoModal = props => {

    let cancelButton = null;

    if (props.clickedCancel) {
        cancelButton = (
        <Button onClick={props.clickedCancel} color="secondary" autoFocus>
            ОТМЕНА
        </Button>
        );
    }

    return(
<div>
      <Dialog
        open={props.show}
        onClose={props.clicked}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Внимание!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {cancelButton}
        <Button onClick={props.clickedOk} color="primary" autoFocus>
            ОК
        </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}

export default InfoModal;