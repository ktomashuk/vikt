import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
// Redux
import { connect } from 'react-redux';
import { getJournalByObjectBySystem } from '../../../store/actions/cable';
import { cableDeleteRemoveAll, cableDeleteSelected } from '../../../store/actions/delete';
import { undoClear, undoCableJournalDataSave } from '../../../store/actions/undo';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const DeleteBar = (props) => {
  const classes = useStyles();
  const { deleteEnabled, deleteItemsNumber, deleteData, deleteType } = props;
  
  // Clicking delete button
  const deleteClickHandler = () => {
    switch(deleteType){
      case 'cable_journal':
        props.cableDeleteSelected(deleteData);
        props.undoCableJournalDataSave();
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
      default:
        break;
    }
  };

  return (
  <div className={classes.root}>
  <Snackbar
  open={deleteEnabled}
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
    </React.Fragment>
  }/>
  </div>
  );
} 

const mapStateToProps = state => {
  return {
    deleteEnabled: state.del.deleteEnabled,
    deleteData: state.del.deleteData,
    deleteType: state.del.deleteType,
    deleteItemsNumber: state.del.deleteItemsNumber,
  };
};

export default connect(mapStateToProps, 
  { cableDeleteRemoveAll, cableDeleteSelected, getJournalByObjectBySystem,
  undoClear, undoCableJournalDataSave })(DeleteBar);