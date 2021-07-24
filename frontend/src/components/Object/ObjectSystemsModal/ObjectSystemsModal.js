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
import { addSystem, getSystemsByObject } from '../../../store/actions/core';
import { showInfo } from '../../../store/actions/info';

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

const ObjectSystemsModal = (props) => {
  const classes = useStyles();
  // Variables to control opening/closing
  const { show, chosenObjectId } = props;
  const [open, setOpen] = useState(false);
  const [system, setSystem] = useState(
      {
          acronym: '',
          full_name: '',
          project_name: '',
          object: 0,
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
  // Adding contractor to the database
  const addSystemClickHandler = () => {    
    // Check if acronym is empty
    if (system.acronym === '') {
        return props.showInfo('Поле "Аббревиатура" должно быть заполнено!');
    };
    props.addSystem(system);
    setSystem({...system, acronym: ''});
    setTimeout(() => {
        props.getSystemsByObject(chosenObjectId);
    }, 500);
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
              Добавить систему
            </Typography>
          </Toolbar>
        </AppBar>
            <div className={classes.root}>
            <TextField style={{width: '30%'}} label="Аббревиатура" placeholder="Введите краткое название системы"
            value={system.acronym}
            onChange={(e) => setSystem({...system, acronym: e.target.value, object: chosenObjectId })}/>
            <TextField style={{width: '60%'}} label="Код проекта" placeholder="Введите код проекта"
            value={system.project_name}
            onChange={(e) => setSystem({...system, project_name: e.target.value, object: chosenObjectId })}/>
            </div>
            <div className={classes.root}>
            <TextField style={{width: '92%'}} label="Полное название системы" placeholder="Введите полное название системы"
            value={system.full_name}
            onChange={(e) => setSystem({...system, full_name: e.target.value, object: chosenObjectId })}/>
            </div>
            <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={() => addSystemClickHandler()}>Добавить</Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>Отменить</Button>
            </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      chosenObjectId: state.core.chosenObjectId,
  };
};

export default connect(mapStateToProps, { addSystem, showInfo, getSystemsByObject })(ObjectSystemsModal);