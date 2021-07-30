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
import TextField from '@material-ui/core/TextField';
// Redux
import { connect } from 'react-redux';
import { editCableRow } from '../../../../store/actions/cable';
import { editStop } from '../../../../store/actions/edit';
import { undoDataSave } from '../../../../store/actions/undo';
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

const CableEditModal = (props) => {
const classes = useStyles();
// Variables to control opening/closing
const { editData, editType, editEnabled, editCableRow, editStop, undoDataSave} = props;
const [open, setOpen] = useState(false);
// State of data being edited before editing
const [oldData, setOldData] = useState(null);
const [newData, setNewData] = useState(null);
const [dataLoaded, setDataLoaded] = useState(false);
// Closing the modal
const handleClose = () => {
    setOpen(false);
    editStop();
    setOldData(null);
    setNewData(null);
    setDataLoaded(false);
};
// Opening the modal
useEffect(() => {
    if (editEnabled && editType === 'cable_journal_row')  {
      setOpen(true);
      setOldData(editData);
      setNewData(editData);
      setDataLoaded(true);
    }
  }, [editEnabled, editType, editData])
  // Confirming edit
  const confirmEdit = () => {
      const equality = _.isEqual(oldData, newData);
      if (!equality){
        const data = JSON.stringify(newData);
        const id = newData.id;
        undoDataSave('cable_journal_edit', oldData, id);
        editCableRow(id, data);
        handleClose();
      };
    };
  // Default data for text fields
  let textFields = null;
  // Loaded data for text fields
  if (editEnabled && dataLoaded) {
    textFields = (
      <React.Fragment>
      <TableRow key={`cr1`}>
      <TableCell key={`tc1`}>
      <TextField className={classes.textField} label="№ П/П" style={{width: "5%"}} value={newData.index}
      onChange={(e) => {setNewData({...newData, index: e.target.value})}}/>
      <TextField className={classes.textField} label="Название" style={{width: "15%"}} value={newData.name}
      onChange={(e) => {setNewData({...newData, name: e.target.value})}}/>
      <TextField className={classes.textField} label="Кабель" style={{width: "30%"}} value={newData.cable}
      onChange={(e) => {setNewData({...newData, cable: e.target.value})}}/>
      <TextField className={classes.textField} label="Сечение" style={{width: "25%"}} value={newData.cable_cut}
      onChange={(e) => {setNewData({...newData, cable_cut: e.target.value})}}/>
      <TextField className={classes.textField} label="Длина" style={{width: "16%"}} value={newData.length}
      onChange={(e) => {setNewData({...newData, length: e.target.value})}}/>
      </TableCell>
      </TableRow>
      <TableRow key={`cr2`}>
      <TableCell key={`tc2`}>
      <TextField className={classes.textField} label="Начало" style={{width: "47%"}} value={newData.start}
      onChange={(e) => {setNewData({...newData, start: e.target.value})}}/>
      <TextField className={classes.textField} label="Конец" style={{width: "47%"}} value={newData.end}
      onChange={(e) => {setNewData({...newData, end: e.target.value})}}/>
      </TableCell>
      </TableRow>
      </React.Fragment>
    );
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} fullWidth maxWidth="md" >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Редактировать запись
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
            onClick={() => confirmEdit()}>Сохранить изменения</Button>
            </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      editEnabled: state.edit.editEnabled,
      editData: state.edit.editData,
      editType: state.edit.editType,
  };
};

export default connect(mapStateToProps, { editCableRow, editStop, undoDataSave })(CableEditModal);