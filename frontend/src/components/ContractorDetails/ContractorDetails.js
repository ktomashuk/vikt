import React, { useEffect, useState } from 'react'
// Material UI
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
// Custom components
import ContractorReqs from '../ContractorReqs/ContractorReqs';
// Redux
import { connect } from 'react-redux';
import { isUndefined } from 'lodash-es';

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
        justifySelf: 'center',
    },
});

const ContractorDetails = (props) => {
    const classes = useStyles();
    const { contractorData, contractorDataLoaded } = props;
    const [editing, setEditing] = useState(true);
    const [fieldsData, setFieldsData] = useState(null);
    useEffect(() => {
        setFieldsData(contractorData);
    }, [contractorData]);

    let contractorDetails = <React.Fragment>Выберите контрагента</React.Fragment>;
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
                <TextField label="Имя" value={fieldsData.manager_name}
                style={{width: '48%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, manager_name: e.target.value}) : undefined}/>
                <TextField label="Телефон" value={fieldsData.manager_phone}
                style={{width: '23%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, manager_phone: e.target.value}) : undefined}/>
                <TextField label="Email" value={fieldsData.manager_email}
                style={{width: '23%', marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, manager_email: e.target.value}) : undefined}/>
                </Box>
                <Divider style={{marginTop: 10}}/>
                <p style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>Реквизиты</p>
                <Divider />
                <Box className={classes.containerTop}>
                <TextField label="ИНН" value={fieldsData.INN}
                style={{width: '15%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, INN: e.target.value}) : undefined}/>
                <TextField label="ОГРН/ОГРНИП" value={fieldsData.OGRN}
                style={{width: '20%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, OGRN: e.target.value}) : undefined}/>
                <TextField label="КПП" value={fieldsData.KPP}
                style={{width: '15%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, KPP: e.target.value}) : undefined}/>
                <TextField label="Код по ОКПО" value={fieldsData.OKPO}
                style={{width: '16%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, OKPO: e.target.value}) : undefined}/>
                <TextField label="ОКВЭД" value={fieldsData.OKVED}
                style={{width: '11%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, OKVED: e.target.value}) : undefined}/>
                <TextField label="ОКТМО" value={fieldsData.OKTMO}
                style={{width: '11%', marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, OKTMO: e.target.value}) : undefined}/>
                </Box>
                <Box className={classes.containerTop}>
                <TextField label="Юр.адрес" value={fieldsData.address_legal}
                style={{width: '48%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, address_legal: e.target.value}) : undefined}/>
                <TextField label="Факт.адрес" value={fieldsData.address_fact}
                style={{width: '48%', marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, address_fact: e.target.value}) : undefined}/>
                </Box>
                <Box className={classes.containerTop}>
                <TextField label="Банк" value={fieldsData.bank_name}
                style={{width: '44%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, bank_name: e.target.value}) : undefined}/>
                <TextField label="БИК" value={fieldsData.BIK}
                style={{width: '15%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, BIK: e.target.value}) : undefined}/>
                <TextField label="Ген. директор" value={fieldsData.director}
                style={{width: '35%', marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, director: e.target.value}) : undefined}/>
                </Box>
                <Box className={classes.containerTop}>
                <TextField label="Кор.счет" value={fieldsData.account_settle}
                style={{width: '48%', marginRight: 20, marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, account_settle: e.target.value}) : undefined}/>
                <TextField label="Р/сч" value={fieldsData.account_correspondence}
                style={{width: '48%', marginTop: 10}}
                onChange={editing ? (e) => setFieldsData({...fieldsData, account_correspondence: e.target.value}) : undefined}/>
                </Box>
                <Box className={classes.containerButton}>
                    <Button variant="contained" color="primary" className={classes.button}>Edit</Button>
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

export default connect(mapStateToProps)(ContractorDetails);