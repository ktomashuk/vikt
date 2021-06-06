import React, { useEffect, useState } from 'react'
// Material UI
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
// Redux
import { connect } from 'react-redux';
import { editContractorData, deleteContractor, getContractors, unloadContractors } from '../../store/actions/contractors';

const useStyles = makeStyles({
    root: {
        width: "100%",
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
        height: "100%",
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        marginRight: 10,
        justifySelf: 'center',
    },
});

const ContractorDetails = (props) => {
    const classes = useStyles();
    const { contractorData, contractorDataLoaded } = props;
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [fieldsData, setFieldsData] = useState(null);
    const _ = require('lodash');
    // Clicking save button
    const saveClickHandler = () => {
        const equality = _.isEqual(contractorData, fieldsData);
        if (!equality) {
            props.editContractorData(fieldsData.id, fieldsData);
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
        props.deleteContractor(contractorData.id);
        props.unloadContractors();
        refreshContractors();
        setDeleting(false);
    };
    // Refreshing data from the server
    const refreshContractors = () => {
        setTimeout(() => {
            props.getContractors();
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
    let contractorDetails = <p style={{position: 'relative', left: '45%', top: '45%'}}>Выберите контрагента</p>;
    // If contractor data is loaded
    if (contractorDataLoaded) { 
        contractorDetails = (
            <React.Fragment>
            <p style={{display: 'flex', justifyContent: 'center'}}>Данные компании</p>
                <Divider />
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
                <p style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>Менеджер</p>
                <Divider />
                <Box className={classes.containerTop}>
                <TextField label="Имя" value={fieldsData.manager_name || ''}
                style={{width: '48%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, manager_name: e.target.value}) : undefined}/>
                <TextField label="Телефон" value={fieldsData.manager_phone || ''}
                style={{width: '23%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, manager_phone: e.target.value}) : undefined}/>
                <TextField label="Email" value={fieldsData.manager_email || ''}
                style={{width: '23%', marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, manager_email: e.target.value}) : undefined}/>
                </Box>
                <Divider style={{marginTop: 10}}/>
                <p style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>Реквизиты</p>
                <Divider />
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
                style={{width: '48%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, address_legal: e.target.value}) : undefined}/>
                <TextField label="Факт.адрес" value={fieldsData.address_fact || ''} multiline
                style={{width: '48%', marginTop: 10}}
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
                <Box className={classes.containerButton}>
                    {!editing && !deleting ? buttonsDefault : null }
                    {editing ? buttonsEditOn : null}
                    {deleting ? buttonsDeleteOn : null}
                </Box>
            </React.Fragment>
        );
    }
    return(
        <React.Fragment>
            <Paper className={classes.paper}>
            {contractorDetails}
            </Paper>
        </React.Fragment>
        );
}

const mapStateToProps = state => {
    return {
        contractorData: state.contr.contractorData,
        contractorDataLoaded: state.contr.contractorDataLoaded,
    };
};

export default connect(mapStateToProps, 
    { editContractorData, deleteContractor, getContractors, unloadContractors })(ContractorDetails);  