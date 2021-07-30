import React, { useEffect, useState } from 'react'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip'
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// Custom components
import ContractorEmployeeTable from '../ContractorEmployeeTable/ContractorEmployeeTable';
import ContractorEmployeeModal from '../ContractorEmployeeModal/ContractorEmployeeModal';
// Redux
import { connect } from 'react-redux';
import { editContractorData, deleteContractor,
    getContractors, unloadContractors } from '../../../store/actions/contractors';

const useStyles = makeStyles({
    root: {
        width: "95%",
    },
    containerTop: {
        marginLeft: 20,
        display: 'flex',
        justifyContent: 'start',
    },
    containerButton: {
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        position: 'relative',
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        marginRight: 10,
        justifySelf: 'center',
    },
    loading: {
        position: 'relative',
        left: '50%',
        top: '30%',
    },
});

const ContractorDetails = (props) => {
    const classes = useStyles();
    const { contractorData, contractorDataLoaded, contractorDataSpinner,
        editContractorData, deleteContractor,
        getContractors, unloadContractors } = props;
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [fieldsData, setFieldsData] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    // Changing tabs
    const [tab, setTab] = useState(0);
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    const _ = require('lodash');
    // Clicking save button
    const saveClickHandler = () => {
        const equality = _.isEqual(contractorData, fieldsData);
        if (!equality) {
            editContractorData(fieldsData.id, fieldsData);
        }
        setEditing(false);
    };
    // Clicking cancel button
    const cancelClickHandler = () => {
        setFieldsData(contractorData);
        setEditing(false);
        setDeleting(false);
    };
    // Clicking delete button
    const deleteClickHandler = () => {
        deleteContractor(contractorData.id);
        unloadContractors();
        refreshContractors();
        setDeleting(false);
    };
    // Refreshing data from the server
    const refreshContractors = () => {
        setTimeout(() => {
            getContractors();
        }, 500)
    };
    // Buttons when editing is disabled
    const buttonsDefault = (
    <React.Fragment>
    <Button variant="contained" color="primary" 
    className={classes.button} onClick={() => setEditing(true)}>
    Редактировать
    </Button>
    <Button variant="contained" color="secondary" 
    className={classes.button} onClick={() => setDeleting(true)}>
    Удалить
    </Button>
    </React.Fragment>);
    // Save and cancel buttons when editing is enabled
    const buttonsEditOn = (
        <React.Fragment>
        <Button variant="contained" color="primary" 
        className={classes.button} onClick={() => saveClickHandler()}>Сохранить</Button>
        <Button variant="contained" color="secondary" 
        className={classes.button} onClick={() => cancelClickHandler()}>Отменить</Button>
        </React.Fragment>
    );
    // Confirm and cancel buttons when deleting is enabled
    const buttonsDeleteOn = (
        <React.Fragment>
        <Button variant="contained" color="primary" 
        className={classes.button} onClick={() => deleteClickHandler()}>Удалить</Button>
        <Button variant="contained" color="secondary" 
        className={classes.button} onClick={() => cancelClickHandler()}>Отменить</Button>
        </React.Fragment>
    );
    // Setting state when contractor data is fetched
    useEffect(() => {
        setFieldsData(contractorData);
    }, [contractorData]);
    // Default state of the right panel
    let contractorDetails = (
    <Paper className={classes.paper}>
        <p style={{ marginLeft: '45%', marginTop: '15%' }}>Выберите контрагента</p> 
    </Paper>);
    let contractorReqs = null;
    let menu = null;
    // Showing spinner while data is loading
    if (contractorDataSpinner) {
        contractorDetails = <CircularProgress className={classes.loading} />;
    };
    // If contractor data is loaded
    if (contractorDataLoaded) { 
        // The left part with basic details and employees
        contractorDetails = (
            <React.Fragment>
                <ContractorEmployeeModal show={openModal}/>
                <Box className={classes.containerTop}>
                <TextField label="Название" value={fieldsData.name || ''}
                style={{width: '48%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, name: e.target.value}) : undefined}/>
                <TextField label="Юр.лицо" value={fieldsData.legal_name || ''}
                style={{width: '48%', marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, legal_name: e.target.value}) : undefined}/>
                </Box>
                <Box className={classes.containerTop}>
                <TextField label="Email" value={fieldsData.email || ''}
                style={{width: '48%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, email: e.target.value}) : undefined}/>
                <TextField label="Телефон" value={fieldsData.phone || ''}
                style={{width: '48%', marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, phone: e.target.value}) : undefined}/>
                </Box>
                <Divider style={{marginTop: 10}}/>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                Сотрудники 
                <Tooltip title={<h6>Добавить сотрудника</h6>} arrow>
                <PersonAddIcon style={{marginLeft: 5, cursor: 'pointer'}}
                onClick={() => {
                    setOpenModal(true);
                    setTimeout(() => setOpenModal(false), 500)}}/>
                </Tooltip>
                </div>
                <Divider />
                <Box className={classes.containerTop}>
                <ContractorEmployeeTable />
                </Box>
                </React.Fragment>);
        // The right part with reqs
        contractorReqs = (
                <React.Fragment>
                <Box className={classes.containerTop}>
                <TextField label="ИНН" value={fieldsData.INN || ''}
                style={{width: '15%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, INN: e.target.value}) : undefined}/>
                <TextField label="ОГРН/ОГРНИП" value={fieldsData.OGRN || ''}
                style={{width: '20%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, OGRN: e.target.value}) : undefined}/>
                <TextField label="КПП" value={fieldsData.KPP || ''}
                style={{width: '15%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, KPP: e.target.value}) : undefined}/>
                <TextField label="Код по ОКПО" value={fieldsData.OKPO || ''}
                style={{width: '16%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, OKPO: e.target.value}) : undefined}/>
                <TextField label="ОКВЭД" value={fieldsData.OKVED || ''}
                style={{width: '11%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, OKVED: e.target.value}) : undefined}/>
                <TextField label="ОКТМО" value={fieldsData.OKTMO || ''}
                style={{width: '11%', marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, OKTMO: e.target.value}) : undefined}/>
                </Box>
                <Box className={classes.containerTop}>
                <TextField label="Юр.адрес" value={fieldsData.address_legal || ''} multiline
                style={{width: '98%', marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, address_legal: e.target.value}) : undefined}/>
                </Box>
                <Box className={classes.containerTop}>
                <TextField label="Факт.адрес" value={fieldsData.address_fact || ''} multiline
                style={{width: '98%', marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, address_fact: e.target.value}) : undefined}/>
                </Box>
                <Box className={classes.containerTop}>
                <TextField label="Банк" value={fieldsData.bank_name || ''}
                style={{width: '44%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, bank_name: e.target.value}) : undefined}/>
                <TextField label="БИК" value={fieldsData.BIK || ''}
                style={{width: '15%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, BIK: e.target.value}) : undefined}/>
                <TextField label="Ген. директор" value={fieldsData.director || ''}
                style={{width: '35%', marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, director: e.target.value}) : undefined}/>
                </Box>
                <Box className={classes.containerTop}>
                <TextField label="Кор.счет" value={fieldsData.account_settle || ''}
                style={{width: '48%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, account_settle: e.target.value}) : undefined}/>
                <TextField label="Р/сч" value={fieldsData.account_correspondence || ''}
                style={{width: '48%', marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, account_correspondence: e.target.value}) : undefined}/>
                </Box>
                </React.Fragment> );
                menu = (
                <Box className={classes.containerButton}>
                    {!editing && !deleting ? buttonsDefault : null }
                    {editing ? buttonsEditOn : null}
                    {deleting ? buttonsDeleteOn : null}
                </Box>);
    }
    return(
        <React.Fragment>
            <Paper className={classes.paper}>
            <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={handleChange}>
                <Tab label="Данные компании" />
                <Tab label="Реквизиты" />
            </Tabs>
            {tab === 0 ? contractorDetails : null}
            {tab === 1 ? contractorReqs : null}
            {menu}
            </Paper>
        </React.Fragment>
        );
}

const mapStateToProps = state => {
    return {
        contractorData: state.contr.contractorData,
        contractorDataLoaded: state.contr.contractorDataLoaded,
        contractorDataSpinner: state.contr.contractorDataSpinner,
        representatives: state.contr.representatives,
    };
};

export default connect(mapStateToProps, 
    { editContractorData, deleteContractor, 
        getContractors, unloadContractors })(ContractorDetails);  