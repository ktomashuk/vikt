import React, { useEffect, useState } from 'react'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// Custom components
import ContractorList from '../../components/Contractors/ContractorList/ContractorList';
import ContractorDetails from '../../components/Contractors/ContractorDetails/ContractorDetails';
import ContractorAdd from '../../components/Contractors/ContractorAdd/ContractorAdd';
import AddButton from '../../components/Buttons/AddButton/AddButton';
import RefreshButton from '../../components/Buttons/RefreshButton/RefreshButton';
import SearchBar from '../../components/SearchBar/SearchBar';
// Redux
import { connect } from 'react-redux';
import { loadPageName } from '../../store/actions/info';
import { getContractors, searchContractors } from '../../store/actions/contractors';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        flex: 1,
        marginLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    leftPanel: {
        height: 650,
    },
    rightPanel: {
        height: 650,
    },
}));

const ContractorsContainer = (props) => {
    const { loadPageName, getContractors, searchContractors } = props;
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    // Setting page name
    useEffect(() => {
        loadPageName('Реестр контрагентов');
        getContractors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Opening the modal
    const addClickHandler = () => {
        setOpenModal(true);
        setTimeout(() => setOpenModal(false), 500)
    };
    // Refreshing the lists
    const refreshClickHandler = () => {
        // If the list was already loaded
            getContractors();
    };

    return(
        <div>
            <ContractorAdd show={openModal}/>
            <Grid container spacing={1}>
                    <Grid item xs={4} className={classes.leftPanel}>
                    <Paper>
                    <Box className={classes.box}>
                    <SearchBar type="contractors" filter={searchContractors}/>
                    <AddButton addingEnabled={true} clicked={() => addClickHandler()}
                    tooltipOn="Добавить контрагента" tooltipOff="Выберите тип"/>
                    <RefreshButton refreshEnabled={true} clicked={() => refreshClickHandler()}
                    tooltipOn="Обновить" tooltipOff="Обновление недоступно"/>
                    </Box>
                    <ContractorList/>
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
    { loadPageName, getContractors, searchContractors })(ContractorsContainer);