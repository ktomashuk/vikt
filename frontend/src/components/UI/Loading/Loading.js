import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { hideSpinner } from '../../../store/actions/info';

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
  const { clicked, loadingSpinner } = props;

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loadingSpinner} onClick={clicked}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loadingSpinner: state.info.loadingSpinner,
  };
};

export default connect(mapStateToProps, { hideSpinner })(Loading);