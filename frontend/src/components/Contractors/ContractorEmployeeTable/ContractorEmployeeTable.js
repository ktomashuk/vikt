import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ContractorEmployeeRow from '../ContractorEmployeeRow/ContractorEmployeeRow';
import CircularProgress from '@material-ui/core/CircularProgress';
// Custom components
// Redux
import { connect } from 'react-redux';
import { getRepresentativesByContractor } from '../../../store/actions/contractors';


const useStyles = makeStyles({
    root: {
        width: '97%',
    },
    container: {
        height: 350,
        maxHeight: 350,
        width: '100%',
    },
    icon: {
        cursor: 'pointer',
    },
    text: {
        minWidth: 35,
        maxWidth: 150,
        fontSize: 30,
    },
    loading: {
        position: 'relative',
        left: '45%',
    },
    loadingText: {
        position: 'relative',
        left: '30%',
    },
});


const ContractorEmployeeTable = (props) => {
    const classes = useStyles();
    const { representatives, contractorData, contractorDataLoaded } = props;
    // Fetching employees from server
    useEffect(() => {
        if (contractorDataLoaded) {
            props.getRepresentativesByContractor(contractorData.id);
        }
    }, [contractorData])
    // Default table
    let rows = <TableRow><TableCell>
        <CircularProgress className={classes.loading} />
        </TableCell></TableRow>
    // Loaded table
    if (contractorDataLoaded) {
        rows = representatives.map((row) => {
            return(
                <ContractorEmployeeRow row={row} key={`cr${row.id}`}/>
            );
        })
    };
    return(
        <Paper key="papertable" className={classes.root}>
            <TableContainer key="tablecontainer" className={classes.container}>
                <Table key="tablemain" stickyHeader aria-label="table1" size="medium">
                    <TableHead key="tablehead">
                        <TableRow key="header">
                            <TableCell key="c1">
                            ФИО
                            </TableCell>
                            <TableCell key="c2">
                            Должность
                            </TableCell>
                            <TableCell key="c3">
                            Телефон
                            </TableCell>
                            <TableCell key="c4">
                            Email
                            </TableCell>
                            <TableCell key="c5">
                            Действия
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody key="tablebody">
                       {rows}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

const mapStateToProps = state => {
    return {
        contractorDataLoaded: state.contr.contractorDataLoaded,
        contractorData: state.contr.contractorData,
        representatives: state.contr.representatives,
    };
};

export default connect(mapStateToProps, { getRepresentativesByContractor })(ContractorEmployeeTable);