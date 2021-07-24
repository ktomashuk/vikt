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
import TextField from '@material-ui/core/TextField';
// Redux
import { connect } from 'react-redux';
import { addObject } from '../../../store/actions/core';

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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ObjectAddModal = (props) => {
  const classes = useStyles();
  // Variables to control opening/closing
  const { show } = props;
  const [open, setOpen] = useState(false);
  const [object, setObject] = useState(
      {
          name: '',
          city: '',
          address: '',
          full_name: '',
          contractors: [],
        }
    );
    // Closing the modal
  const handleClose = () => {
    setOpen(false); 
    };
  // Opening the modal
  useEffect(() => {
      if (show)  {
          setOpen(true);
      }
  }, [show])
  // Changing contractor name
  const objectChangeHandler = (e) => {
      setObject({...object, name: e.target.value});
  }
  // Adding contractor to the database
  const addObjectClickHandler = () => {    
    props.addObject(object);
    setObject({...object, name: ''});
  };
  
  return (
    <div>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} fullWidth maxWidth="md" >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Добавить объект
            </Typography>
          </Toolbar>
        </AppBar>
            <div className={classes.root}>
            <TextField style={{width: '60%'}} label="Название объекта" placeholder="Введите название объекта"
            value={object.name} onChange={(e) => objectChangeHandler(e)}/>
            </div>
            <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={() => addObjectClickHandler()}>Добавить</Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>Отменить</Button>
            </div>

      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      estimatesObject: state.est.estimatesObject,
  };
};

export default connect(mapStateToProps, { addObject })(ObjectAddModal);