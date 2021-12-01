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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
// Custom components
import InfoModal from '../../UI/InfoModal/InfoModal';
// Redux
import { connect } from 'react-redux';
import { addInvoice, editInvoice } from '../../../store/actions/invoices';
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
    textField: {
      marginLeft: 10,
      marginBottom: 10,
  },
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PurchasesBillAddModal = (props) => {
    const classes = useStyles();
    const { contractorsList, contractorsLoaded, addingEnabled, editingEnabled, editData,
       addInvoice, editInvoice, showInfo } = props;
    // State for opening/closing the modal
    const [open, setOpen] = useState(false);
    // State to manage editing
    const [editing, setEditing] = useState(false);
    // State for managing modal that confirms exit without changes
    const [confirmModal, setConfirmModal] = useState(false);
    // State for displaying contractor name when we know its ID
    const [contractorName, setContractorName] = useState('');
    // State for bill details
    const [billDetails, setBillDetails] = useState({
        number: '',
        inv_date: '2020-01-01',
        contractor: 0,
    });
    // State for showing add or edit buttons
    const [buttons, setButtons] = useState({
      editing: false,
      adding: false,
    });
    // Opening the modal
    useEffect(() => {
        if (addingEnabled)  {
        setOpen(true);
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const currentDate = year + '-' + month + '-' + day
        setBillDetails({
          ...billDetails,
          number: '',
          inv_date: currentDate,
          contractor: 0,
        });
        setButtons({...buttons, adding: true, editing: false });
        };
        if (editingEnabled) {
          setOpen(true);
          setBillDetails({
            ...billDetails,
            number: editData.number,
            inv_date: editData.inv_date,
            contractor: editData.contractor,
          });
          const newContractorName = contractorsList.find(con => con.id === editData.contractor).name;
          setContractorName(newContractorName);
          setButtons({...buttons, adding: false, editing: true });
        };
    }, [addingEnabled, editingEnabled, editData, billDetails, buttons, contractorsList]);
    // Clicking close modal and checking if data was changed
    const checkClose = () => {
      if (editing) {
        setConfirmModal(true);
      } else {
        handleClose();
      }
    }; 
    // Clicking cancel button on a modal
    const cancelClose = () => {
      setConfirmModal(false);
    };
    // Closing the modal
    const handleClose = () => {
        setOpen(false);
        setEditing(false);
        setConfirmModal(false);
        setBillDetails({
          number: '',
          inv_date: '2020-01-01',
          contractor: 0,
        });
    };
    // Clicking add invoice button
    const confirmAddClickHandler = () => {
        // Check form validity
        if (billDetails.number === '' || billDetails.contractor === 0) {
            showInfo('Заполните все поля!');
            return;
        };
        addInvoice(billDetails);
        setBillDetails({...billDetails, number: '', inv_date: '2020-01-01', contractor: 0});
        setOpen(false);
    };
    // Clicking confirm edit button
    const confirmEditClickHandler = () => {
      // Check form validity
      if (billDetails.number === '' || billDetails.contractor === 0) {
        showInfo('Заполните все поля!');
        return;
      };
      editInvoice(editData.id, billDetails);
      setEditing(false);
      setOpen(false);
    };
    // List of contractors
    let conList = null;
    if (contractorsLoaded) {
        conList = (
            <FormControl key={`fc1`} style={{width: "30%"}}>
                <InputLabel>Поставщик</InputLabel>
                <Select native
                onChange={(e) => {
                const newContractorId = contractorsList.find(con => con.name === e.target.value).id;
                setBillDetails({...billDetails, contractor: newContractorId})
                setContractorName(e.target.value);
                setEditing(true);
                }}
                value={contractorName}>
                {contractorsList.map(con => {return(
                <option key={`option_con_${con.id}`}>{con.name}</option>
                )})}
                </Select>
            </FormControl>
        );
    };

    return(
    <React.Fragment>
      <InfoModal show={confirmModal} message="У вас есть не сохраненные данные! Закрыть окно?"
      clickedCancel={cancelClose} clickedOk={handleClose}/>
      <Dialog open={open} onClose={checkClose} TransitionComponent={Transition} fullWidth maxWidth="lg" >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Добавить счёт
            </Typography>
          </Toolbar>
        </AppBar>
        <Table size="small" style={{marginTop: 10}}>
        <TableBody>
        <TableRow key={`cr`}>
        <TableCell key={`tc`}>
        <TextField style={{width: '40%', marginLeft: 10, marginRight: 10 }} label="Номер платежки"
                value={billDetails.number} 
                onChange={(e) => {
                setBillDetails({...billDetails, number: e.target.value});
                setEditing(true);
                }}/>
        {conList}
        <TextField
                style={{marginLeft: 10}}
                id="date"
                label="Дата"
                type="date"
                value={billDetails.inv_date}
                onChange={(e) => {
                setBillDetails({...billDetails, inv_date: e.target.value});
                setEditing(true);
                }}
                className={classes.textField}
                InputLabelProps={{
                shrink: true,}}/>
        </TableCell>
        </TableRow>
        </TableBody>
        </Table>
        <div className={classes.root}>
        {buttons.adding &&
        <Button variant="contained" color="primary" disabled={!editing}
        style={{width: '40%', marginBottom: 10}}
        onClick={() => confirmAddClickHandler()}>Добавить счёт</Button>}
        {buttons.editing &&
        <Button variant="contained" color="primary" disabled={!editing}
        style={{width: '40%', marginBottom: 10}}
        onClick={() => confirmEditClickHandler()}>Сохранить счёт</Button>}
        </div>
      </Dialog>
    </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        contractorsList: state.contr.contractorsList,
        contractorsLoaded: state.contr.contractorsLoaded,
    };
};

export default connect(mapStateToProps, { addInvoice, editInvoice, showInfo })(PurchasesBillAddModal);