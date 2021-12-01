import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
// Redux
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    icon: {
        cursor: 'pointer',
        marginLeft: 10,
    },
    text: {
        minWidth: 35,
        maxWidth: 1500,
        fontSize: 30,
    },
    checkbox: {
        marginBottom: 1,
    },
    progressBarUnfinished: {
        backgroundColor: 'blue', 
    },
    progressBarFinished: {
        backgroundColor: 'green',  
    },
});

const IsolationRow = (props) => {
    const classes = useStyles();
    const { row, systems, units, purchasedDoc } = props;

    const mainRow = (
        <React.Fragment key={`fragmentrow${row.id}`}>
        <TableRow key={`r${row.id}`} hover >
            <TableCell padding="default" key={`checkbox${row.id}`}>
            checkbox
            </TableCell>
            <TableCell padding="default" key={`number${row.id}`}>
            {row.system_number}.{row.ware_number}
            </TableCell>
            <TableCell key={`ware${row.id}`}>
            {row.ware}                    
            </TableCell>
            <TableCell key={`units${row.id}`}>
            {units.find(u => u.id === row.units).name}
            </TableCell>
            <TableCell key={`quantity${row.id}`}>
            {row.quantity}
            </TableCell>
            <TableCell key={`doc${row.id}`}>
            {purchasedDoc}
            </TableCell>
            <TableCell key={`system${row.id}`}>
            {systems ? systems.find(sys => sys.id === row.system).acronym : null}
            </TableCell>
            </TableRow>
        </React.Fragment>
        );
    
    return mainRow;
};

const mapStateToProps = state => {
    return {
        cableJournalLoaded: state.cable.cableJournalLoaded,
        cableJournal: state.cable.cableJournal,
        cableObject: state.cable.cableObject,
        cableSystem: state.cable.cableSystem,
        deleteItemsNumber: state.del.deleteItemsNumber,
        deleteAllEnabled: state.del.deleteAllEnabled,
    };
};


export default connect(mapStateToProps, 
    { })(IsolationRow);