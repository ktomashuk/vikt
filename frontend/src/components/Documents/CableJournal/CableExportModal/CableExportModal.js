import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
// Redux
import { connect } from 'react-redux';
import { exportStop } from '../../../../store/actions/export';
// Comparing objects
const _ = require('lodash');

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
  textField: {
    marginLeft: 10,
    marginBottom: 10,
},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CableExportModal = (props) => {
const classes = useStyles();
// Variables to control opening/closing
const { exportType, exportData, exportEnabled, exportStop } = props;
const [open, setOpen] = useState(false);
// State of data being edited before editing
const [dataLoaded, setDataLoaded] = useState(false);
// Closing the modal
const handleClose = () => {
    setOpen(false);
    exportStop();
};
// Opening the modal
useEffect(() => {
    if (exportEnabled && exportType === 'cable_journal')  {
      setOpen(true);
      setDataLoaded(true);
    }
  }, [exportEnabled, exportType])
  // Default data for text fields
  let textFields = null;
  // Loaded data for text fields
  if (exportEnabled && dataLoaded) {
    textFields = (
      <React.Fragment>
      <TableRow key={`cr1`}>
      <TableCell key={`tc1`}>
        Hello!
      </TableCell>
      </TableRow>
      </React.Fragment>
    );
  }

  return (
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
        <Table size="small" style={{marginTop: 10}}>
            <TableBody>
              {textFields}               
            </TableBody>
            </Table>
            <div className={classes.root}>
            <Button variant="contained" color="secondary" onClick={handleClose}>Отмена</Button>
            <Button variant="contained" color="primary" 
            onClick={() => console.log('CLICKED')}>Сохранить изменения</Button>
            </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      exportEnabled: state.exp.exportEnabled,
      exportData: state.exp.exportData,
      exportType: state.exp.exportType,
  };
};

export default connect(mapStateToProps, { exportStop })(CableExportModal);