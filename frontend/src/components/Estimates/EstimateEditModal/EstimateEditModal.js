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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
// Redux
import { connect } from 'react-redux';
import { editEstimateRow } from '../../../store/actions/estimates';
import { editStop } from '../../../store/actions/edit';
import { undoDataSave } from '../../../store/actions/undo';
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

const EstimateEditModal = (props) => {
const classes = useStyles();
// Variables to control opening/closing
const { editData, editType, editEnabled, units, chosenObjectSystems,
    editEstimateRow, editStop, undoDataSave } = props;
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
    if (editEnabled && editType === 'estimate_row')  {
      setOpen(true);
      setOldData(editData);
      setNewData(editData);
      setDataLoaded(true);
    }
  }, [editData, editEnabled, editType])
  // Confirming edit
  const confirmEdit = () => {
      const equality = _.isEqual(oldData, newData);
      if (!equality){
        const data = JSON.stringify(newData);
        const id = newData.id;
        undoDataSave('estimate_row_edit', oldData, id);
        editEstimateRow(id, data);
        handleClose();
      };
    };
  // Default data for text fields
  let textFields = null;
  // Loaded data for text fields
  if (editEnabled && dataLoaded) {
    const unitsName = units.find(u => u.id === newData.units).name;
    const systemName = chosenObjectSystems.find(sys => sys.id === newData.system).acronym;
    textFields = (
      <React.Fragment>
      <TableRow key={`cr`}>
        <TableCell key={`tc`}>
          <TextField label="№ системы" style={{width: '10%', marginRight: 10}}
          onChange={(e) => setNewData({...newData, system_number: e.target.value})}
          value={newData.system_number}/>
          <TextField label="№ материала" style={{width: '10%', marginRight: 10}}
          onChange={(e) => setNewData({...newData, ware_number: e.target.value})}
          value={newData.ware_number}/>
          <FormControl key={`fc1`} style={{width: "10%"}}>
          <InputLabel>Ед.изм</InputLabel>
          <Select native style={{marginRight: 10, }}
          onChange={(e) => {
            const newUnitsId = units.find(u => u.name === e.target.value).id;
            setNewData({...newData, units: newUnitsId})
          }}
          defaultValue={unitsName}>
          {units.map(unit => {return(
          <option key={`option_unit_${unit.id}`}>{unit.name}</option>
          )})}
          </Select>
          </FormControl>
          <TextField label="Кол-во" style={{width: '10%', marginRight: 10}}
          onChange={(e) => setNewData({...newData, quantity: e.target.value})}
          value={newData.quantity}/>
          <TextField label="Цена" style={{width: '10%', marginRight: 10}}
          onChange={(e) => setNewData({...newData, price: e.target.value})}
          value={newData.price}/>
          <FormControl key={`fc2`} style={{width: "15%"}}>
          <InputLabel>Система</InputLabel>
          <Select native style={{marginRight: 10, }}
          onChange={(e) => {
            const newSystemId = chosenObjectSystems.find(s => s.acronym === e.target.value).id;
            setNewData({...newData, system: newSystemId})
          }}
          defaultValue={systemName}>
          {chosenObjectSystems.map(sys => {return(
          <option key={`option_sys_${sys.id}`}>{sys.acronym}</option>
          )})}
          </Select>
          </FormControl>
          <TextField label="Примечание" style={{width: '30%'}}
          onChange={(e) => setNewData({...newData, note: e.target.value})}
          value={newData.note}/>
        </TableCell>
      </TableRow>
      <TableRow key={`cr2`}>
        <TableCell>
          <TextField label="Наименование" style={{width: '100%'}}
          onChange={(e) => setNewData({...newData, ware: e.target.value})}
          value={newData.ware}/>
        </TableCell>
      </TableRow>
      </React.Fragment>
    );
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} fullWidth maxWidth="lg" >
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
      units: state.core.units,
      chosenObjectSystems: state.core.chosenObjectSystems,
  };
};

export default connect(mapStateToProps, { editEstimateRow, editStop, undoDataSave })(EstimateEditModal);