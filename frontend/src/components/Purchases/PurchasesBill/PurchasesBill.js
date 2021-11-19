import React, { useState, useEffect } from 'react'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// Custom components
import PurchasesInvoiceTable from '../PurchasesInvoice/PurchasesInvoiceTable/PurchasesInvoiceTable';
import PurchasesDeleteModal from '../PurchasesInvoice/PurchasesDeleteModal/PurchasesDeleteModal';
// Redux
import { connect } from 'react-redux';
import { recountInvoice } from '../../../store/actions/invoices';
import { showInfo } from '../../../store/actions/info';
import { deletePurchasesByInvoice, deletePurchase } from '../../../store/actions/purchases';

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
    const { invoicesChosenId, invoicesChosenData, invoicesChosenLoaded,
        clickedEdit, clickedAdd, deletePurchase, recountInvoice } = props;
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
    // State for opeining delete modal and name of item being deleted
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteData, setDeleteData] = useState({id: 0, name: ''});
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
            setDataLoaded(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[invoicesChosenData, invoicesChosenLoaded]);
    // Clicking a confirm delete purchase button in the modal
    const deletePurchaseConfirmClickHandler = async () => {
        await deletePurchase(deleteData.id);
        setDeleteModal(false);
        await recountInvoice(invoicesChosenId);
    };
    // Clicking a cancel delete button in the modal
    const deletePurchaseCancelClickHandler = () => {
        setDeleteData({...deleteData, name: '', id: 0});
        setDeleteModal(false);
    };
    // Clicking a delete button to open a modal
    const openDeleteModal = (name, id) => {
        setDeleteModal(true);
        setDeleteData({...deleteData, name: name, id: id});
    };
    // Default empty date for bill
    let date = null;
    // Contractor list loaded
    if (dataLoaded) {
        const [year, month, day] = invoicesChosenData.inv_date.split('-');
        date = `${day}.${month}.${year}`;
    }

    return (
    <React.Fragment>
    <PurchasesDeleteModal show={deleteModal} 
    clickedCancel={deletePurchaseCancelClickHandler}
    clickedOk={deletePurchaseConfirmClickHandler}
    message={"Вы действительно хотите удалить позицию \"" + deleteData.name + "\"?"}/>
    {!dataLoaded ? 
        <Typography variant="h3" style={{marginLeft: '30%', marginTop: '10%'}}>Выберите счёт</Typography>
        : null}
        {dataLoaded ?
        <React.Fragment>
        <Typography variant="h6" style={{marginLeft: 15, marginBottom: 5, marginTop: 10}}>
            Счёт №{invoicesChosenData.number} от {date}
        </Typography>
        <PurchasesInvoiceTable clickedEdit={clickedEdit} clickedAdd={clickedAdd} clickedDelete={openDeleteModal}/>
        </React.Fragment>
        : null}
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
    { showInfo, recountInvoice, 
        deletePurchasesByInvoice, deletePurchase })(PurchasesBill);