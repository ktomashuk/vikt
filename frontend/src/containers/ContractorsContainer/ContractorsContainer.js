import React, { useEffect, useState } from 'react'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// Custom components
import ContractorList from '../../components/ContractorList/ContractorList';
import ContractorDetails from '../../components/ContractorDetails/ContractorDetails';
import ContractorAdd from '../../components/ContractorAdd/ContractorAdd';
// Redux
import { connect } from 'react-redux';
import { loadPageName } from '../../store/actions/info';
import { getContractors } from '../../store/actions/contractors';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        display: 'flex',
        flex: 1,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        alignItems: 'center',
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
    },
}));

const ContractorsContainer = (props) => {
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    // Setting page name
    useEffect(() => {
        props.loadPageName('Реестр контрагентов');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Getting a list of contractors
    useEffect(() => {
        props.getContractors();
    }, [props])
    // Opening the modal
    const addClickHandler = () => {
        setOpenModal(true);
        setTimeout(() => setOpenModal(false), 500)
    };

    return(
        <div>
            <ContractorAdd show={openModal}/>
            <Grid container spacing={1}>
                    <Grid item xs={4}>
                    <Paper>
                    <Button variant="contained" color="primary"
                    className={classes.button}
                    onClick={() => addClickHandler()}
                    startIcon={<PersonAddIcon />}>Добавить контрагента</Button>
                    <ContractorList />
                    </Paper>
                    </Grid>
                    <Grid item xs={8}>
                    <ContractorDetails />
                    </Grid>
                </Grid>
        </div>
    );
}

export default connect(null, { loadPageName, getContractors })(ContractorsContainer);