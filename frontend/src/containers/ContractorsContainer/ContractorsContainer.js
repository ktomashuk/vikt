import React, { useEffect, useState } from 'react'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// Custom components
import ContractorList from '../../components/Contractors/ContractorList/ContractorList';
import ContractorDetails from '../../components/Contractors/ContractorDetails/ContractorDetails';
import ContractorAdd from '../../components/Contractors/ContractorAdd/ContractorAdd';
import AddButton from '../../components/Buttons/AddButton/AddButton';
import RefreshButton from '../../components/Buttons/RefreshButton/RefreshButton';
// Redux
import { connect } from 'react-redux';
import { loadPageName } from '../../store/actions/info';
import { getContractors, getContractorTypes, getContractorsByType } from '../../store/actions/contractors';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        mindWidth: 300,
        width: 300,
    },
    leftPanel: {
        height: 650,
    },
    rightPanel: {
        height: 650,
    },
}));

const ContractorsContainer = (props) => {
    const { contractorTypes, loadPageName, getContractors, getContractorTypes, getContractorsByType } = props;
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const [type, setType] = useState('');
    // Setting page name
    useEffect(() => {
        loadPageName('Реестр контрагентов');
        getContractorTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Choosing the contractor type:
    const contractorClickHanlder = (type) => {
        setType(type);
        switch(type) {
            case 'Все':
                return getContractors();
            default:
                return getContractorsByType(type);
        }
    };
    // Opening the modal
    const addClickHandler = () => {
        setOpenModal(true);
        setTimeout(() => setOpenModal(false), 500)
    };
    // Refreshing the lists
    const refreshClickHandler = () => {
        // If the list was already loaded
        if (type !== '') {
            switch(type) {
                case 'Все':
                    return getContractors();
                default:
                    return getContractorsByType(type);
            }
        };
        // Refreshing the types
        getContractorTypes();
    };
    // Contractor types list
    let contractorTypesList = <MenuItem>Загрузка</MenuItem>;
    if (contractorTypes[0]) {
        contractorTypesList = contractorTypes.map(item => {
            return(
                <MenuItem value={item.type} key={item.type}>
                    {item.type}
                </MenuItem>
            );
        });
    };

    return(
        <div>
            <ContractorAdd show={openModal}/>
            <Grid container spacing={1}>
                    <Grid item xs={4} className={classes.leftPanel}>
                    <Paper>
                    <FormControl className={classes.formControl}>
                            <InputLabel id="type-select-label">Тип контрагента</InputLabel>
                            <Select
                            labelId="type-select-label"
                            id="type-select"
                            onChange={(event) => contractorClickHanlder(event.target.value)}
                            value={type}>
                            {contractorTypesList}
                            </Select>
                    </FormControl>
                    <AddButton addingEnabled={true} clicked={() => addClickHandler()}
                    tooltipOn="Добавить контрагента" tooltipOff="Выберите тип"/>
                    <RefreshButton refreshEnabled={type !== ''} clicked={() => refreshClickHandler()}
                    tooltipOn="Обновить" tooltipOff="Обновление недоступно"/>
                    <ContractorList searchType={type} />
                    </Paper>
                    </Grid>
                    <Grid item xs={8} className={classes.rightPanel}>
                    <ContractorDetails />
                    </Grid>
                </Grid>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        contractorTypes: state.contr.contractorTypes,
    };
  };

  export default connect(mapStateToProps, 
    { loadPageName, getContractors, getContractorTypes, getContractorsByType })(ContractorsContainer);