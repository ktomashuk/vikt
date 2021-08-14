import React, { useEffect, useState } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
// Custom components
import ExportCableJournal from '../ExportCableJournal/ExportCableJournal';
// Redux
import { connect } from 'react-redux';
import { exportStop } from '../../../store/actions/export';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CableExportModal = (props) => {
const classes = useStyles();
// Variables to control opening/closing
const { exportType, exportData, exportEnabled, exportStop, exportSigners } = props;
const [open, setOpen] = useState(false);
// State of data being edited before editing
const [dataLoaded, setDataLoaded] = useState(false);
// Opening the modal
useEffect(() => {
    if (exportEnabled)  {
      setOpen(true);
      setDataLoaded(true);
    };
  }, [exportEnabled, exportType]);
// Closing the modal
const handleClose = () => {
    setOpen(false);
    setDataLoaded(false);
    exportStop();
};
// Default data for text fields
let textFields = null;
// Switching data for different export types
switch(exportType) {
    case 'cable_journal':
        textFields = <ExportCableJournal data={exportData} 
        signers={exportSigners} closeClick={handleClose}/>;
        break;
    default:
        break;
  };
// Dialog window to render
let dialogWindow = null;
if (dataLoaded) { 
    dialogWindow = (
        <div>
          <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} fullScreen >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Экспорт в Word
                </Typography>
              </Toolbar>
            </AppBar>
            {textFields}
          </Dialog>
        </div>
      );
};
  return dialogWindow;
}

const mapStateToProps = state => {
  return {
      exportEnabled: state.exp.exportEnabled,
      exportData: state.exp.exportData,
      exportType: state.exp.exportType,
      exportSigners: state.exp.exportSigners,
  };
};

export default connect(mapStateToProps, { exportStop })(CableExportModal);