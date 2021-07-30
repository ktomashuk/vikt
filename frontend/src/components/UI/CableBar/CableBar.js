import React, { useState } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import Typography from '@material-ui/core/Typography';
// Redux
import { connect } from 'react-redux';
import { setCableLength } from '../../../store/actions/cable';
import { cableDeleteRemoveAll } from '../../../store/actions/delete';
import { undoClear } from '../../../store/actions/undo';

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
  const { deleteData, deleteType, deleteItemsNumber, deleteEnabled, lengthSelectorEnabled, 
    cableDeleteRemoveAll, undoClear, setCableLength } = props;
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
        setCableLength(data);
        break;
      default:
        break;
    };
  };
  // Clicking cancel button
  const cancelClickHandler = () => {
    switch(deleteType){
      case 'cable_journal':
        cableDeleteRemoveAll();
        undoClear();
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
                <Tooltip title={<Typography variant='subtitle1'>Низкая вариативность</Typography>} arrow>
                    <TrendingDownIcon style={{ color: 'white'}}/>
                </Tooltip>
                : <Tooltip title={<Typography variant='subtitle1'>Высокая вариативность</Typography>} arrow>
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
  { cableDeleteRemoveAll, undoClear, setCableLength })(CableBar);