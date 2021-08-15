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
import Chip from '@material-ui/core/Chip';
// Redux
import { connect } from 'react-redux';
import { editDevice } from '../../../../store/actions/cable';

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
  chip: {
    marginLeft: 5,
    marginBottom: 5,
},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CableDeviceEditModal = (props) => {
  const classes = useStyles();
  // Variables to control opening/closing
  const { show, editDevice, deviceList } = props;
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(99);
  // Setting a row to be added
  const [device, setDevice] = useState({
      id: 0,
      name: '',
      cable: '',
      cable_cut: '',
      prefix: '',
      noNum: false,
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
  const editDeviceAndContinue = () => {
    editDevice(id, device);
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
              Редактировать устройства
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{marginTop: 10, marginBottom: 10, marginLeft: 10}}>
        {deviceList ? deviceList.map((item) => {
                return(
                <Chip
                    className={classes.chip}
                    key={item.id}
                    color={id ===  item.id ? "secondary" : "primary"}
                    label={item.name + ' (' + item.prefix + 'X) ' + item.cable}
                    onClick={() => {
                        setId(item.id);
                        setDevice(item);
                    }} />
                );
                }) : null}
        </div>
        <Table size="small" style={{marginTop: 10}}>
            <TableBody>
              <TableRow key={`cr`}>
                <TableCell key={`tc`}>
                  <TextField className={classes.textField} label="Устройство" style={{width: "35%"}} value={device.name}
                  onChange={(e) => {setDevice({...device, name: e.target.value})}}/>
                  <TextField className={classes.textField} label="Кабель" style={{width: "20%"}} value={device.cable}
                  onChange={(e) => {setDevice({...device, cable: e.target.value})}}/>
                  <TextField className={classes.textField} label="Сечение" style={{width: "15%"}} value={device.cable_cut}
                  onChange={(e) => {setDevice({...device, cable_cut: e.target.value})}}/>
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
                  onClick={() => editDeviceAndContinue()}>Сохранить</Button>
                  </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        deviceList: state.cable.deviceList,
    };
};

export default connect(mapStateToProps, { editDevice })(CableDeviceEditModal);