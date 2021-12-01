import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
// Custom components
import PurchasesOverviewModalTable from '../PurchasesOverviewModalTable/PurchasesOverviewModalTable';
// Redux
import { connect } from 'react-redux';
import { backDeactivate } from '../../../../store/actions/back';

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

const PurchasesOverviewModal = (props) => {
    const classes = useStyles();
    const { show, backClicked, backType, backDeactivate } = props;
    // State for opening/closing the modal
    const [open, setOpen] = useState(false);
    // Closing the modal
    const handleClose = () => {
        setOpen(false);
    };
    // Opening the modal
    useEffect(() => {
        if (show)  {
        setOpen(true);
        };
        if (backClicked && backType === 'purchase-overview-modal') {
          setOpen(true);
          backDeactivate();
        };
    }, [show, backClicked, backType, backDeactivate]);

    return(
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} fullWidth maxWidth="lg" >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Просмотр закупок по позиции
            </Typography>
          </Toolbar>
        </AppBar>
        <PurchasesOverviewModalTable />
      </Dialog>
    </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        backClicked: state.back.backClicked,
        backType: state.back.backType,
    };
};

export default connect(mapStateToProps, { backDeactivate })(PurchasesOverviewModal);