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
// Custom components
import PurchasesInvoiceTable from '../PurchasesInvoice/PurchasesInvoiceTable/PurchasesInvoiceTable';
// Redux
import { connect } from 'react-redux';
import { editInvoice } from '../../../store/actions/invoices';
import { showInfo } from '../../../store/actions/info';
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
    const clickable = true;
    const { invoicesChosenId, invoicesChosenData, invoicesChosenLoaded,
         editInvoice, contractorsList, showInfo } = props;
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
    // State for loading contractor data
    const [dataLoaded, setDataLoaded] = useState(false);
    // State for displaying contractor name when we know its ID
    const [contractorName, setContractorName] = useState('');
    // State for saving original data when editing
    const [billTemp, setBillTemp] = useState(null);
    // State for editing bill details
    const [editing, setEditing] = useState(false);
    // Getting data from redux after invoice is chosen
    useEffect(() => {
        if(invoicesChosenLoaded) {
            setBillDetails({
                ...billDetails,
                number: invoicesChosenData.number,
                inv_date: invoicesChosenData.inv_date,
                contractor: invoicesChosenData.contractor,
            });
            const conName = contractorsList.find(con => con.id === invoicesChosenData.contractor).name;
            setContractorName(conName);
            setDataLoaded(true);
        }
    },[invoicesChosenData, invoicesChosenLoaded]);
    // Clicking edit button
    const editClickHandler = () => {
        // Saving original data to temp state
        setBillTemp({...billDetails});
        // Enabling editing
        setEditing(true);
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
            {editing ? buttonsEditOn : buttonsDefault}
            <Button vatiant="outlined" onClick={() => {
                console.log(billDetails);
            }}>Click me</Button>
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
        Данные счёта
        </AccordionSummary>
        <AccordionDetails>
        <Paper className={classes.paperBottom}>
            {!dataLoaded ? "Выберите счёт" : null}
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
    Позиции в счёте
    </AccordionSummary>
    <AccordionDetails>
    <Paper className={classes.paperBottom}>
    <PurchasesInvoiceTable />
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
    { editInvoice, showInfo })(PurchasesBill);