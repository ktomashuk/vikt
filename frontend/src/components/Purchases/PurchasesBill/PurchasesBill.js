import React, { useState, useEffect } from 'react'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
// Custom components
import PurchasesInvoiceTable from '../PurchasesInvoice/PurchasesInvoiceTable/PurchasesInvoiceTable';
// Redux
import { connect } from 'react-redux';
import { editInvoice, deleteInvoice } from '../../../store/actions/invoices';
import { showInfo } from '../../../store/actions/info';
import { deletePurchasesByInvoice } from '../../../store/actions/purchases';
// Comparing objects
const _ = require('lodash');

const useStyles = makeStyles((theme) => ({
    box: {
        marginLeft: 10,
        marginBottom: 10,
        paddingTop: 10,
        display: 'flex',
        justifyContent: 'start',
    },
    paperBottom: {
        width: '100%',
        height: '100%',
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        marginRight: 10,
        justifySelf: 'center',
    },
  }));

const PurchasesBill = (props) => {
    const classes = useStyles();
    const [clickable, setClickable] = useState(false);
    const { invoicesChosenId, invoicesChosenData, invoicesChosenLoaded,
         editInvoice, contractorsList, showInfo, clickedEdit, clickedAdd, 
         deletePurchasesByInvoice, deleteInvoice } = props;
    // State for controlling accordion
    const [accordion, setAccordion] = useState({
        details: true,
        items: false,
    });
    // State for bill details
    const [billDetails, setBillDetails] = useState({
        number: '',
        inv_date: '2020-01-01',
        contractor: 0,
    });
    // State for bill id
    const [billId, setBillId] = useState(0);
    // State for loading contractor data
    const [dataLoaded, setDataLoaded] = useState(false);
    // State for displaying contractor name when we know its ID
    const [contractorName, setContractorName] = useState('');
    // State for saving original data when editing
    const [billTemp, setBillTemp] = useState(null);
    // State for editing and deleting bill details
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    // Getting data from redux after invoice is chosen
    useEffect(() => {
        if(invoicesChosenLoaded && billId !== invoicesChosenData.id) {
            setBillDetails({
                ...billDetails,
                number: invoicesChosenData.number,
                inv_date: invoicesChosenData.inv_date,
                contractor: invoicesChosenData.contractor,
            });
            setBillId(invoicesChosenId);
            const conName = contractorsList.find(con => con.id === invoicesChosenData.contractor).name;
            setContractorName(conName);
            setDataLoaded(true);
            setClickable(true);
            setAccordion({...accordion, details: true, items: false});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[invoicesChosenData, invoicesChosenLoaded]);
    // Clicking edit button
    const editClickHandler = () => {
        // Saving original data to temp state
        setBillTemp({...billDetails});
        // Enabling editing
        setEditing(true);
    };
    // Clicking delete finish button 
    const deleteConfirmClickHandler = async () => {
        await deletePurchasesByInvoice(invoicesChosenId);
        await deleteInvoice(invoicesChosenId);
        setDataLoaded(false);
        setClickable(false);
    };
    // Saving editing of bill details
    const saveClickHandler = () => {
    // Check fields for validity
    if (billDetails.inv_date === '' || billDetails.number === '') {
        showInfo('Заполните все поля!');
        return;
    }
    const equality = _.isEqual(billDetails, billTemp);
        if (!equality) {
            const data = JSON.stringify(billDetails);
            const id = invoicesChosenId;
            editInvoice(id, data);
        } else {
            setBillDetails({...billTemp});
        };
        setEditing(false);
        };
    // Cancelling editing bill details
    const cancelClickHandler = () => {
        // Returning values to original from temp
        setBillDetails({...billTemp});
        const conName = contractorsList.find(con => con.id === billTemp.contractor).name;
        setContractorName(conName);
        // Disabling editing
        setEditing(false);
    };
    // Buttons when editing is disabled
    const buttonsDefault = (
        <React.Fragment>
        <Button variant="contained" color="primary" 
        className={classes.button} onClick={() => editClickHandler()}>
        Редактировать
        </Button>
        <Button variant="outlined" color="secondary" 
        className={classes.button} onClick={() => setDeleting(true)}>
        Удалить
        </Button>
        </React.Fragment>
        );
    // Save and cancel buttons when editing is enabled
    const buttonsEditOn = (
        <React.Fragment>
        <Button variant="contained" color="primary" 
        className={classes.button} onClick={() => saveClickHandler()}>Сохранить</Button>
        <Button variant="contained" color="secondary" 
        className={classes.button} onClick={() => cancelClickHandler()}>Отменить</Button>
        </React.Fragment>
        );  
    // Delete and cancel buttons when deleting is enabled
    const buttonsDeleteOn = (
        <React.Fragment>
        <Button variant="contained" color="primary" 
        className={classes.button} onClick={() => deleteConfirmClickHandler()}>Удалить</Button>
        <Button variant="contained" color="secondary" 
        className={classes.button} onClick={() => setDeleting(false)}>Отменить</Button>
        </React.Fragment>
        );  
    // Default contractor list
    let conList = null;
    // Contractor list loaded
    if (dataLoaded) {
        conList = (
            <React.Fragment>
            <Box className={classes.box}>
            <TextField style={{width: '30%', marginLeft: 10, marginRight: 10 }} label="Номер платежки"
                value={billDetails.number} 
                onChange={editing ?
                (e) => setBillDetails({...billDetails, number: e.target.value}) : undefined }/>
            <FormControl key={`fc1`} style={{width: "30%"}}>
                <InputLabel>Поставщик</InputLabel>
                <Select native
                onChange={editing ? (e) => {
                const newContractorId = contractorsList.find(con => con.name === e.target.value).id;
                setBillDetails({...billDetails, contractor: newContractorId})
                setContractorName(e.target.value);
                } : undefined }
                value={contractorName}>
                {contractorsList.map(con => {return(
                <option key={`option_con_${con.id}`}>{con.name}</option>
                )})}
                </Select>
            </FormControl>
                <TextField
                style={{marginLeft: 10}}
                id="date"
                label="Дата"
                type="date"
                value={billDetails.inv_date}
                onChange={editing ?
                (e) => setBillDetails({...billDetails, inv_date: e.target.value}) : undefined }
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }} />
            </Box>    
            <Box className={classes.box}>
            {!editing && !deleting ? buttonsDefault : null}
            {editing ? buttonsEditOn : null}
            {deleting ? buttonsDeleteOn : null}
            </Box>
            </React.Fragment>
        );
    }

    return (
    <React.Fragment>
    <Paper>
        <Accordion expanded={accordion.details} TransitionProps={{ unmountOnExit: true }}
        onChange={clickable ? () => setAccordion({...accordion, details: !accordion.details, items: !accordion.items}) : undefined}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
        <Typography>
        Данные счёта {accordion.items ? '№' + billDetails.number : null}
        </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Paper className={classes.paperBottom}>
            {!dataLoaded ? <Typography variant="h3">Выберите счёт</Typography> : null}
            {conList}
        </Paper>
    </AccordionDetails>
    </Accordion>
    <Accordion expanded={accordion.items} TransitionProps={{ unmountOnExit: true }}
    onChange={clickable ? () => setAccordion({...accordion, items: !accordion.items, details: !accordion.details}) : undefined}>
    <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1bh-content"
    id="panel1bh-header">
        <Typography style={{marginRight: 5}}>
        Позиции в счёте 
        </Typography>
    </AccordionSummary>
    <AccordionDetails>
    <Paper className={classes.paperBottom}>
    <PurchasesInvoiceTable clickedEdit={clickedEdit} clickedAdd={clickedAdd}/>
    </Paper>
    </AccordionDetails>
    </Accordion>
    </Paper>
    </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        invoicesChosenId: state.inv.invoicesChosenId,
        invoicesChosenData: state.inv.invoicesChosenData,
        contractorsList: state.contr.contractorsList,
        contractorsLoaded: state.contr.contractorsLoaded,
        invoicesChosenLoaded: state.inv.invoicesChosenLoaded,
    };
};

export default connect(mapStateToProps, 
    { editInvoice, showInfo, deletePurchasesByInvoice, deleteInvoice })(PurchasesBill);