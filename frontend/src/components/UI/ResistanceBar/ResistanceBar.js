import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
// Redux
import { connect } from 'react-redux';
import { getJournalByObjectBySystem, setCableResistance } from '../../../store/actions/cable';
import { cableDeleteRemoveAll } from '../../../store/actions/delete';
import { undoClear } from '../../../store/actions/undo';
import { showInfo } from '../../../store/actions/info';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  text: {
    color: 'white',
    textDecorationColor: 'white',
  },
  snack: {
      color: 'white',
      backgroundColor: 'purple',
  }
}));

const ResistanceBar = (props) => {
  const classes = useStyles();
  const { deleteData, deleteType, deleteItemsNumber, deleteEnabled, resistanceSelectorEnabled } = props;
  const [resistance, setResistance] = useState({ low: 0, high: 0});
  const [error, setError] = useState(false);
  // Clicking delete button
  const changeClickHandler = () => {
    switch(deleteType){
      case 'cable_journal':
        // Check if values are float now
        checkValidity();
        // Show error if values are not numbers
        if (error) {
            return props.showInfo('Введенные значения должны быть числами!')};
        // Show error if low is bigger than high
        if (Number(resistance.low) > Number(resistance.high)) {
            return props.showInfo('Верхний порог должен быть не меньше нижнего!')};
        const data = {
            low: resistance.low,
            high: resistance.high,
            cables: deleteData,
        };
        // If no errors are found
        props.setCableResistance(data);
        break;
      default:
        break;
    };
  };
  // Clicking cancel button
  const cancelClickHandler = () => {
    switch(deleteType){
      case 'cable_journal':
        props.cableDeleteRemoveAll();
        props.undoClear();
        return setResistance({...resistance, low: 0, high: 0});
      default:
        break;
    }
  };
  // If the ',' is used instead of '.' in a float change it to '.'
  const floatChangeHandler = (float) => {
    const index_of_comma = String(float).indexOf(',');
    const before_comma = String(float).substring(0, index_of_comma);
    const after_comma = String(float).substring(index_of_comma+1);
    const replacement = before_comma + '.' + after_comma;
    return replacement;
  };
  // Check if values have commas and if they have change them to dots
  const floatCheckHandler = () => {
      if (String(resistance.low).includes(',')) {
        setResistance({
            ...resistance, 
            low: floatChangeHandler(resistance.low),
        }); 
    };
    if (String(resistance.high).includes(',')) {
        setResistance({
            ...resistance, 
            high: floatChangeHandler(resistance.high),
        }); 
    };
  };
  // Checking if entered values are numbers
  useEffect(() => {
    floatCheckHandler();
    checkValidity();
  }, [resistance]);
  // Checking if entered values are numbers manually
  const checkValidity = () => {
    const test = Number(resistance.low) + Number(resistance.high)
    if (isNaN(test)) {
        setError(true);
    } else {
        setError(false);
    };
  };
  // Default snack
  let cableSnack = null;
  // Snack if it is enabled
  if (resistanceSelectorEnabled) {
    cableSnack = (
    <div className={classes.root}>
    <Snackbar
    open={deleteEnabled}>
        <SnackbarContent className={classes.snack}
        message={`Сопротивление для ${deleteItemsNumber} кабелей`}
        action={
        <React.Fragment>
            <TextField value={resistance.low} onChange={(e) => {setResistance({...resistance, low: e.target.value})}}
            label="От"
            inputProps={{ className: classes.text }}
            InputLabelProps={{ className: classes.text }}
            style={{ width: 50, marginRight: 10 }}/>
            <TextField value={resistance.high} onChange={(e) => setResistance({...resistance, high: e.target.value})}
            label="До"
            inputProps={{ className: classes.text }}
            InputLabelProps={{ className: classes.text }}
            style={{ width: 50 }}/>
            <IconButton onClick={() => changeClickHandler()}>
              <CheckIcon style={{ color: 'white'}}/>
            </IconButton>
            <IconButton onClick={() => cancelClickHandler()}>
              <ClearIcon style={{ color: 'white'}}/>
            </IconButton>
          </React.Fragment>}>
        </SnackbarContent>
    </Snackbar>
    </div>
    );
  };
  return cableSnack;
} 

const mapStateToProps = state => {
  return {
    deleteEnabled: state.del.deleteEnabled,
    deleteData: state.del.deleteData,
    deleteType: state.del.deleteType,
    deleteItemsNumber: state.del.deleteItemsNumber,
    resistanceSelectorEnabled: state.sel.resistanceSelectorEnabled,
  };
};

export default connect(mapStateToProps, 
  { cableDeleteRemoveAll, getJournalByObjectBySystem, setCableResistance,
  undoClear, showInfo })(ResistanceBar);