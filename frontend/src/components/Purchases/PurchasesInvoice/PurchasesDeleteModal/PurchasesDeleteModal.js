import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PurchasesDeleteModal = props => {
    const { clickedCancel, clicked, show, message, clickedOk} = props;
    const  cancelButton = (
      <Button onClick={clickedCancel} color="secondary" autoFocus>
          НЕТ
      </Button>
      );

  return(
    <div>
      <Dialog
        open={show}
        onClose={clicked}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Внимание!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {clickedCancel ? cancelButton : null}
        <Button onClick={clickedOk} color="primary" autoFocus>
            ДА
        </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}

export default PurchasesDeleteModal;