import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
// Redux
import { connect } from 'react-redux';
import { getJournalByObjectBySystem } from '../../../store/actions/cable';
import { cableDeleteRemoveAll, cableDeleteSelected, 
  estimateDeleteRemoveAll, estimateDeleteSelected } from '../../../store/actions/delete';
import { undoClear, undoCableJournalDataSave, undoEstimateDataSave } from '../../../store/actions/undo';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  snack: {
    color: 'white',
    backgroundColor: 'red',
  },
}));

const DeleteBar = (props) => {
  const classes = useStyles();
  const { deleteEnabled, deleteItemsNumber, deleteData, deleteType, deleteSelectorEnabled } = props;
  
  // Clicking delete button
  const deleteClickHandler = () => {
    switch(deleteType){
      case 'cable_journal':
        props.cableDeleteSelected(deleteData);
        props.undoCableJournalDataSave();
        break;
      case 'estimates':
        props.estimateDeleteSelected(deleteData);
        props.undoEstimateDataSave();
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
        break;
      case 'estimates':
        props.estimateDeleteRemoveAll();
        props.undoClear();
        break;
      default:
        break;
    }
  };
  let deleteSnack = null;
  if (deleteSelectorEnabled) {
    deleteSnack = (
      <div className={classes.root}>
    <Snackbar open={deleteEnabled}>
    <SnackbarContent className={classes.snack}
    message={`Удалить выбранные элементы? (${deleteItemsNumber} шт.)`}
    key="delsnack"
    action={
    <React.Fragment>
      <IconButton onClick={() => deleteClickHandler()}>
        <CheckIcon style={{ color: 'white'}}/>
      </IconButton>
      <IconButton onClick={() => cancelClickHandler()}>
        <ClearIcon style={{ color: 'white'}}/>
      </IconButton>
    </React.Fragment> }/>
  </Snackbar>
  </div>
    );
  };

  return deleteSnack;
};

const mapStateToProps = state => {
  return {
    deleteEnabled: state.del.deleteEnabled,
    deleteData: state.del.deleteData,
    deleteType: state.del.deleteType,
    deleteItemsNumber: state.del.deleteItemsNumber,
    deleteSelectorEnabled: state.sel.deleteSelectorEnabled,
  };
};

export default connect(mapStateToProps, 
  { cableDeleteRemoveAll, cableDeleteSelected, getJournalByObjectBySystem,
    estimateDeleteRemoveAll, estimateDeleteSelected,
  undoClear, undoCableJournalDataSave, undoEstimateDataSave })(DeleteBar);