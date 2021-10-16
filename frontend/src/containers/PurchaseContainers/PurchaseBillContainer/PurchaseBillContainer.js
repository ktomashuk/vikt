import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// Custom components
import PurchasesBillTable from '../../../components/Purchases/PurchasesBillTable/PurchasesBillTable';
import PurchasesBill from '../../../components/Purchases/PurchasesBill/PurchasesBill';
import PurchasesBillAddModal from '../../../components/Purchases/PurchasesBillAddModal/PurchasesBillAddModal';
import PurchasesInvoiceModal from '../../../components/Purchases/PurchasesInvoice/PurchasesInvoiceModal/PurchasesInvoiceModal';
import SearchBar from '../../../components/SearchBar/SearchBar';
import AddButton from '../../../components/Buttons/AddButton/AddButton';
import RefreshButton from '../../../components/Buttons/RefreshButton/RefreshButton';
// Redux
import { connect } from 'react-redux';
//import { getObjects, getSystemsByObjectAndAddAll, getObjectById, getUnits, unloadObjectSystems } from '../../store/actions/core';
import { getInvoices, searchInvoices } from '../../../store/actions/invoices';
import { getContractors } from '../../../store/actions/contractors';
import { loadPageName } from '../../../store/actions/info';
import { getUnits, getObjects } from '../../../store/actions/core';
import { getEstimates, getNonEstimates } from '../../../store/actions/estimates';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        flex: 1,
        marginLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    paper: {
        display: 'flex',
        flex: 1,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        alignItems: 'center',
    },
}));

const PurchaseBillContainer = React.memo(props => {
    const classes = useStyles();
    const { loadPageName, getInvoices, getUnits, searchInvoices, getContractors,
         contractorsLoaded, invoicesListRefreshNeeded, getObjects, getEstimates, getNonEstimates } = props;
    // State for opening the add invoice modal
    const [openModal, setOpenModal] = useState(false);
    // State for opening the add purchase modal
    const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    // Loading base redux data needed for modules
    useEffect(() => {
        loadPageName('Счета');
        getContractors();
        getUnits();
        getObjects();
        getEstimates();
        getNonEstimates();
    }, [loadPageName, getContractors, getUnits, getObjects, getEstimates, getNonEstimates]);
    // Clicking the 'add new invoice' button
    const addClickHandler = () => {
        setOpenModal(true);
        setTimeout(() => setOpenModal(false), 500);
    };
    // Clicking the refresh invoices button
    const refreshClickHandler = () => {
        getInvoices();
    };
    // Clicking the add a new purchase to invoice button inside the table component
    const addPurchaseModalHandler = () => {
        setOpenPurchaseModal(true);
        setTimeout(() => setOpenPurchaseModal(false), 500);
    };
    // Clicking the edit a purchase button inside the row component
    const editPurchaseModalHandler = () => {
        setOpenEditModal(true);
        setTimeout(() => setOpenEditModal(false), 500);
    };
    // Refreshing invoices after editing
    useEffect(() => {
        if(invoicesListRefreshNeeded) {
            getInvoices();
        }
    },[invoicesListRefreshNeeded, getInvoices])

    return(
        <React.Fragment>
            <PurchasesBillAddModal addingEnabled={openModal}/>
            <PurchasesInvoiceModal addingEnabled={openPurchaseModal} editingEnabled={openEditModal}/>
            <Grid container spacing={0}>
                    <Grid item md={4}>
                    <Box className={classes.box}>
                    <SearchBar type="invoices" filter={searchInvoices}/>
                    <AddButton addingEnabled={true} clicked={() => addClickHandler()}
                    tooltipOn="Добавить счёт" tooltipOff="Добавление недоступно"/>
                    <RefreshButton refreshEnabled={true} clicked={() => refreshClickHandler()}
                    tooltipOn="Обновить" tooltipOff="Обновление недоступно"/>
                    </Box>
                    <PurchasesBillTable />
                    </Grid>
                    <Grid item md={8}>
                    {contractorsLoaded ?
                    <PurchasesBill clickedAdd={() => addPurchaseModalHandler()}
                    clickedEdit={() => editPurchaseModalHandler()}/> 
                    : null}
                    </Grid>
            </Grid>
        </React.Fragment>
    );
});

const mapStateToProps = state => {
    return {
        objectsLoaded: state.core.objectsLoaded,
        objectsData: state.core.objectsData,
        contractorsLoaded: state.contr.contractorsLoaded,
        contractorsList: state.contr.contractorsList,
        invoicesListRefreshNeeded: state.inv.invoicesListRefreshNeeded,
    };
};

export default connect(mapStateToProps, { 
    loadPageName, getInvoices, searchInvoices, 
    getContractors, getUnits, getObjects, getEstimates, getNonEstimates })(PurchaseBillContainer);