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
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
// Redux
import { connect } from 'react-redux';
import { addDevice } from '../../../../store/actions/cable';

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

const CableModal = (props) => {
  const classes = useStyles();
  // Variables to control opening/closing
  const { show, addDevice } = props;
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(1);
  // Setting a row to be added
  const [device, setDevice] = useState({
      id: 0,
      name: '',
      cable: '',
      cable_cut: '',
      prefix: '',
      noNum: false,
      cores: '2',
  });
  const handleClose = () => {
    setOpen(false); 
    };
  // Opening the modal
  useEffect(() => {
      if (show)  {
          setOpen(true);
      }
  }, [show])
  // Add row and prepare for another
  const addDeviceAndContinue = () => {
    setDevice({...device, id: id});
    addDevice(device);
    setId(id + 1);
  };
  // Add row and close modal
  const addDeviceAndClose = () => {
    setDevice({...device, id: id});
    addDevice(device);
    setId(id + 1);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} fullWidth maxWidth="lg" >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Добавить устройство
            </Typography>
          </Toolbar>
        </AppBar>
        <Table size="small" style={{marginTop: 10}}>
            <TableBody>
              <TableRow key={`cr`}>
                <TableCell key={`tc`}>
                <TextField className={classes.textField} label="Устройство" style={{width: "30%"}} value={device.name}
                  onChange={(e) => {setDevice({...device, name: e.target.value})}}/>
                  <TextField className={classes.textField} label="Кабель" style={{width: "20%"}} value={device.cable}
                  onChange={(e) => {setDevice({...device, cable: e.target.value})}}/>
                  <TextField className={classes.textField} label="Сечение" style={{width: "15%"}} value={device.cable_cut}
                  onChange={(e) => {setDevice({...device, cable_cut: e.target.value})}}/>
                  <TextField className={classes.textField} label="Жилы" style={{width: "5%"}} value={device.cores}
                  onChange={(e) => {setDevice({...device, cores: e.target.value})}}/>
                  <TextField className={classes.textField} label="Префикс" style={{width: "15%"}} value={device.prefix}
                  onChange={(e) => {setDevice({...device, prefix: e.target.value})}}/>
                <FormControl component="fieldset" style={{marginLeft: 10}}>
                  <FormGroup>
                <FormControlLabel labelPlacement="top"
                control={<Switch checked={device.noNum} color="primary"
                onChange={() => setDevice({...device, noNum: !device.noNum})} name="nunum" />}
                label="Без номера"/>
                  </FormGroup>
                </FormControl>
                  </TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>
                  <div className={classes.root}>
                  <Button variant="contained" color="secondary" onClick={handleClose}>Отмена</Button>
                  <Button variant="contained" color="primary" 
                  onClick={() => addDeviceAndContinue()}>Сохранить и добавить ещё</Button>
                  <Button variant="contained" color="primary" 
                  onClick={() => addDeviceAndClose()}>Сохранить и выйти</Button>
                  </div>
      </Dialog>
    </div>
  );
}


export default connect(null, { addDevice })(CableModal);