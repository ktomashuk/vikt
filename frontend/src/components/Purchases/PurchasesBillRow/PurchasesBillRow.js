import React from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
// Redux
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    row: {
        cursor: 'pointer',
        fontSize: 16,
    },
});

const PurchasesBillRow = (props) => {
    const classes = useStyles();
    const { row, contractorsList, contractorsLoaded, clicked } = props;
    // Converting date yyyy-mm-dd format to dd.mm.yyyy
    const [year, month, day] = row.inv_date.split('-');
    const date = `${day}.${month}.${year}`;
    // Finding contractors name in a list
    const contractor = contractorsLoaded ?
    contractorsList.find(contractor => contractor.id === row.contractor).name : '';

    return(
        <React.Fragment key={`fr${row.id}`}>
            <TableRow key={`row${row.id}`} hover onClick={() => clicked(row.id)}>
                <TableCell key={`date${row.id}`} padding="default" 
                className={classes.row}>
                    {date}
                </TableCell>
                <TableCell key={`number${row.id}`} padding="default" 
                className={classes.row}>
                    {row.number}
                </TableCell>
                <TableCell key={`contractor${row.id}`} padding="default" 
                className={classes.row}>
                    {contractor}
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        contractorsLoaded: state.contr.contractorsLoaded,
        contractorsList: state.contr.contractorsList,
    };
};

export default connect(mapStateToProps)(PurchasesBillRow);