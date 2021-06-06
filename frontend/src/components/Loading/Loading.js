import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { hideSpinner } from '../../store/actions/info';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const Loading = (props) => {
  const classes = useStyles();
  const { active, clicked } = props;

  return (
    <div>
      <Backdrop className={classes.backdrop} open={active} onClick={clicked}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default connect(null, { hideSpinner })(Loading);