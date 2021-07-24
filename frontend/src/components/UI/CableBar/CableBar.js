import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import { makeStyles } from '@material-ui/core/styles';
// Redux
import { connect } from 'react-redux';
import { getJournalByObjectBySystem, setCableLength } from '../../../store/actions/cable';
import { cableDeleteRemoveAll, cableDeleteSelected } from '../../../store/actions/delete';
import { undoClear, undoCableJournalDataSave } from '../../../store/actions/undo';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  lengthText: {
    color: 'white',
  },
  snack: {
      color: 'white',
      backgroundColor: 'green',
  }
}));

const CableBar = (props) => {
  const classes = useStyles();
  const { deleteData, deleteType, deleteItemsNumber, deleteEnabled, lengthSelectorEnabled } = props;
  const [totalLength, setTotalLength] = useState(0);
  const [varianceType, setVarianceType] = useState('low');
  // Clicking delete button
  const changeClickHandler = () => {
    switch(deleteType){
      case 'cable_journal':
        const data = {
            length: totalLength,
            variance: varianceType,
            cables: deleteData,
        };
        props.setCableLength(data);
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
  let cableSnack = null;
  if (lengthSelectorEnabled) {
    cableSnack = (
    <div className={classes.root}>
    <Snackbar
    open={deleteEnabled}>
        <SnackbarContent className={classes.snack}
        message={`Суммарная длина для ${deleteItemsNumber} кабелей`}
        action={
        <React.Fragment>
            <TextField value={totalLength} onChange={(e) => setTotalLength(e.target.value)}
            inputProps={{
                className: classes.lengthText,
            }} style={{ width: 70 }}/>
            <IconButton onClick={varianceType === 'low' ? () => setVarianceType('high') : () => setVarianceType('low')}>
                {varianceType === "low" ? 
                <Tooltip title={<h6>Низкая вариативность</h6>} arrow>
                    <TrendingDownIcon style={{ color: 'white'}}/>
                </Tooltip>
                : <Tooltip title={<h6>Высокая вариативность</h6>} arrow>
                    <TrendingUpIcon style={{ color: 'white'}}/>
                </Tooltip> }
            </IconButton>
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
    lengthSelectorEnabled: state.sel.lengthSelectorEnabled,
  };
};

export default connect(mapStateToProps, 
  { cableDeleteRemoveAll, cableDeleteSelected, getJournalByObjectBySystem,
  undoClear, undoCableJournalDataSave, setCableLength })(CableBar);