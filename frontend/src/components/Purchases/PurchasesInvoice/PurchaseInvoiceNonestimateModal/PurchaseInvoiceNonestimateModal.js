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
// Redux
import { connect } from 'react-redux';
import { addInvoice } from '../../../store/actions/invoices';
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

const PurchaseInvoiceNonestimateModal = (props) => {
    const classes = useStyles();
    const { contractorsList, contractorsLoaded, addingEnabled, addInvoice, showInfo } = props;
    // State for opening/closing the modal
    const [open, setOpen] = useState(false);
    // State for displaying contractor name when we know its ID
    const [contractorName, setContractorName] = useState('');
    // State for bill details
    const [billDetails, setBillDetails] = useState({
        number: '',
        inv_date: '2020-01-01',
        contractor: 0,
    });
    // Closing the modal
    const handleClose = () => {
        setOpen(false);
    };
    // Opening the modal
    useEffect(() => {
        if (addingEnabled)  {
        setOpen(true);
        }
    }, [addingEnabled]);
    // Clicking add invoice button
    const confirmAddClickHandler = () => {
        // Check form validity
        if (billDetails.number === '' || billDetails.contractor === 0) {
            showInfo('Заполните все поля!');
            return;
        }
        addInvoice(billDetails);
        setBillDetails({...billDetails, number: '', inv_date: '2020-01-01', contractor: 0});
        setOpen(false);
    };
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
                }}
                value={contractorName}>
                {contractorsList.map(con => {return(
                <option key={`option_con_${con.id}`}>{con.name}</option>
                )})}
                </Select>
            </FormControl>
        );
    }
    return(
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} fullWidth maxWidth="lg" >
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
                onChange={(e) => setBillDetails({...billDetails, number: e.target.value})}/>
        {conList}
        <TextField
                style={{marginLeft: 10}}
                id="date"
                label="Дата"
                type="date"
                value={billDetails.inv_date}
                onChange={(e) => setBillDetails({...billDetails, inv_date: e.target.value})}
                className={classes.textField}
                InputLabelProps={{
                shrink: true,}}/>
        </TableCell>
        </TableRow>
        </TableBody>
        </Table>
        <div className={classes.root}>
        <Button variant="contained" color="secondary" onClick={handleClose}>Отмена</Button>
        <Button variant="contained" color="primary" 
        onClick={() => confirmAddClickHandler()}>Добавить счёт</Button>
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

export default connect(mapStateToProps, { addInvoice, showInfo })(PurchaseInvoiceNonestimateModal);