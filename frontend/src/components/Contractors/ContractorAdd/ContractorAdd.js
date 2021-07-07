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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// Redux
import { connect } from 'react-redux';
import { addContractor, getContractors } from '../../../store/actions/contractors';
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

const EstimateModal = (props) => {
  const classes = useStyles();
  // Variables to control opening/closing
  const { show } = props;
  const [open, setOpen] = useState(false);
  const [contractorName, setContractorName] = useState({name: '', type: ''});
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
  const contractorNameChangeHandler = (e) => {
      setContractorName({...contractorName, name: e.target.value});
  }
  // Adding contractor to the database
  const addContractorClickHandler = () => {
    // Checking if type is chosen
    if (contractorName.type === '') {
      return props.showInfo('Выберите тип контрагента!');
    };
    props.addContractor(contractorName);
    setContractorName({...contractorName, name: ''});
    refreshContractors();
  };
  // Choosing contractor type
  const contractorTypeChangeHanlder = (cType) => {
    setContractorName({...contractorName, type: cType})
  };
  // Refreshing data from the server
  const refreshContractors = () => {
    setTimeout(() => {
        props.getContractors();
    }, 500)
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
              Добавить контрагента
            </Typography>
          </Toolbar>
        </AppBar>
            <div className={classes.root}>
            <TextField style={{width: '60%'}} label="Название контрагента" placeholder="Введите название контрагента"
            value={contractorName.name} onChange={(e) => contractorNameChangeHandler(e)}/>
            <FormControl style={{ width: '30%'}}>
            <InputLabel id="type-select-label">Тип контрагента</InputLabel>
            <Select
                labelId="type-select-label"
                id="type-select"
                onChange={(event) => contractorTypeChangeHanlder(event.target.value)}
                value={contractorName.type}>
            <MenuItem value="Поставщик" key="c1">Поставщик</MenuItem>
            <MenuItem value="Заказчик" key="c2">Заказчик</MenuItem>
            <MenuItem value="Субподрядчик" key="c3">Субподрядчик</MenuItem>
            </Select>
            </FormControl>
            </div>
            <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={() => addContractorClickHandler()}>Добавить</Button>
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

export default connect(mapStateToProps, { addContractor, getContractors, showInfo })(EstimateModal);