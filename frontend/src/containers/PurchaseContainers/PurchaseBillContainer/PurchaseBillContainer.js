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
import InfoModal from '../../../components/UI/InfoModal/InfoModal';
// Redux
import { connect } from 'react-redux';
import { getInvoices, searchInvoices, deleteInvoice } from '../../../store/actions/invoices';
import { getContractors } from '../../../store/actions/contractors';
import { loadPageName } from '../../../store/actions/info';
import { getUnits, getObjects } from '../../../store/actions/core';
import { deletePurchasesByInvoice, unloadPurchases } from '../../../store/actions/purchases';

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
         contractorsLoaded, invoicesListRefreshNeeded, getObjects,
         deletePurchasesByInvoice, deleteInvoice, unloadPurchases } = props;
    // State for opening the add invoice modal
    const [openModal, setOpenModal] = useState(false);
    // State for deleting a bill
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteData, setDeleteData] = useState({
        id: 0,
        number: 0,
        });
    // State to unload data from PurchasesBill component after deleting a bill
    const [refreshPurchasesBill, setRefreshPurchasesBill] = useState(false);
    // State for editing a bill
    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState({
        number: '',
        inv_date: '2020-01-01',
        contractor: 0,
    });
    // State for copying the purchase
    const [openCopyModal, setOpenCopyModal] = useState(false);
    // State for opening the add purchase modal
    const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    // Loading base redux data needed for modules
    useEffect(() => {
        loadPageName('Счета');
        getContractors();
        getUnits();
        getObjects();
    }, [loadPageName, getContractors, getUnits, getObjects]);
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
    // Clicking the copy purchase button inside the row component
    const copyPurchaseModalHandler = () => {
        setOpenCopyModal(true);
        setTimeout(() => setOpenCopyModal(false), 500);
    };
    // Clicking the edit bill buton in the bills table
    const editBillModalHandler = (id, data) => {
        setEditData({...editData, ...data, id: id});
        setEditModal(true);
        setTimeout(() => setEditModal(false), 500);
    }
    // Clicking a confirm delete purchase button in the modal
    const deleteBillConfirmClickHandler = async () => {
        await deletePurchasesByInvoice(deleteData.id);
        await deleteInvoice(deleteData.id);
        setDeleteData({...deleteData, id: 0});
        setRefreshPurchasesBill(true);
        setTimeout(() => setRefreshPurchasesBill(false), 500);
        unloadPurchases();
        setDeleteModal(false);
    };
    // Clicking a cancel delete button in the modal
    const deleteBillCancelClickHandler = () => {
        setDeleteData({...deleteData, id: 0});
        setDeleteModal(false);
    };
    // Clicking a delete button to open a modal
    const openDeleteModal = (number, id) => {
        setDeleteModal(true);
        setDeleteData({...deleteData, id: id, number: number});
    };
    // Refreshing invoices after editing
    useEffect(() => {
        if(invoicesListRefreshNeeded) {
            getInvoices();
        }
    },[invoicesListRefreshNeeded, getInvoices])

    return(
        <React.Fragment>
            <PurchasesBillAddModal addingEnabled={openModal} 
            editingEnabled={editModal} editData={editData}/>
            <PurchasesInvoiceModal addingEnabled={openPurchaseModal} 
            editingEnabled={openEditModal} copyEnabled={openCopyModal}/>
            <InfoModal show={deleteModal}
            clickedCancel={deleteBillCancelClickHandler}
            clickedOk={deleteBillConfirmClickHandler}
            message={"Вы действительно хотите удалить счёт №" + deleteData.number + "?"}/>
            <Grid container spacing={0}>
                    <Grid item lg={4} md={5}>
                    <Box className={classes.box}>
                    <SearchBar type="invoices" filter={searchInvoices}/>
                    <AddButton addingEnabled={true} clicked={() => addClickHandler()}
                    tooltipOn="Добавить счёт" tooltipOff="Добавление недоступно"/>
                    <RefreshButton refreshEnabled={true} clicked={() => refreshClickHandler()}
                    tooltipOn="Обновить" tooltipOff="Обновление недоступно"/>
                    </Box>
                    <PurchasesBillTable clickedDelete={openDeleteModal} clickedEdit={editBillModalHandler}/>
                    </Grid>
                    <Grid item lg={8} md={7}>
                    {contractorsLoaded ?
                    <PurchasesBill clickedAdd={() => addPurchaseModalHandler()}
                    clickedEdit={() => editPurchaseModalHandler()}
                    clickedCopy={() => copyPurchaseModalHandler()}
                    refresh={refreshPurchasesBill}/> 
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
    loadPageName, getInvoices, searchInvoices, deleteInvoice, deletePurchasesByInvoice, 
    getContractors, getUnits, getObjects, unloadPurchases })(PurchaseBillContainer);