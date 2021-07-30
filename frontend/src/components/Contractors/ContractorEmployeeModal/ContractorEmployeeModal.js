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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
// Redux
import { connect } from 'react-redux';
import { addRepresentative, getRepresentativesByContractor } from '../../../store/actions/contractors';

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

const ContractorEmployeeModal = (props) => {
  const classes = useStyles();
  // Variables to control opening/closing
  const { show, contractorData, addRepresentative, getRepresentativesByContractor } = props;
  const [open, setOpen] = useState(false);
  // Setting a row to be added
  const [employee, setEmployee] = useState({
      first_name: '',
      last_name: '',
      patron_name: '',
      position: '',
      phone: '',
      email: '',
      note: '',
      company: 0,
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
  // Clearing the fields
  const clearFields = () => {
    setEmployee({
        ...employee,
        first_name: '',
        last_name: '',
        patron_name: '',
        position: '',
        phone: '',
        email: '',
    });
  };
  // Setting company id
  useEffect(() => {
    setEmployee({...employee, company: contractorData.id});
  }, [contractorData, employee]);
  // Add row and prepare for another
  const addDeviceAndContinue = async () => {
    await addRepresentative(employee);
    clearFields();
    getRepresentativesByContractor(contractorData.id);
  };
  // Add row and close modal
  const addDeviceAndClose = async () => {
    await addRepresentative(employee);
    clearFields();
    getRepresentativesByContractor(contractorData.id);
    handleClose();
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
              Добавить сотрудника
            </Typography>
          </Toolbar>
        </AppBar>
        <Table size="small" style={{marginTop: 10}}>
            <TableBody>
            <TableRow key={`cr1`}>
            <TableCell key={`tc1`}>
            <TextField className={classes.textField} label="Фамилия" style={{width: "31%"}} value={employee.first_name}
            onChange={(e) => {setEmployee({...employee, first_name: e.target.value})}}/>
            <TextField className={classes.textField} label="Имя" style={{width: "31%"}} value={employee.last_name}
            onChange={(e) => {setEmployee({...employee, last_name: e.target.value})}}/>
            <TextField className={classes.textField} label="Отчество" style={{width: "31%"}} value={employee.patron_name}
            onChange={(e) => {setEmployee({...employee, patron_name: e.target.value})}}/>
            </TableCell>
            </TableRow>
            <TableRow key={`cr2`}>
            <TableCell key={`tc2`}>
            <TextField className={classes.textField} label="Должность" style={{width: "31%"}} value={employee.position}
            onChange={(e) => {setEmployee({...employee, position: e.target.value})}}/>
            <TextField className={classes.textField} label="Телефон" style={{width: "31%"}} value={employee.phone}
            onChange={(e) => {setEmployee({...employee, phone: e.target.value})}}/>
            <TextField className={classes.textField} label="Email" style={{width: "31%"}} value={employee.email}
            onChange={(e) => {setEmployee({...employee, email: e.target.value})}}/>
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

const mapStateToProps = state => {
  return {
    contractorData: state.contr.contractorData,
  };
};

export default connect(mapStateToProps, 
    { addRepresentative, getRepresentativesByContractor })(ContractorEmployeeModal);