import React from 'react';
// Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
// Redux
import { connect } from 'react-redux';

const PurchaseOverviewModalRow = (props) => {
    const { row, units } = props;

    const mainRow = (
        <React.Fragment key={`fragmentrow${row.id}`}>
        <TableRow key={`r${row.id}`} hover >
            <TableCell padding="default" key={`date${row.id}`}>
            {row.date}
            </TableCell>
            <TableCell key={`contractor${row.id}`}>
            {row.contractor}                    
            </TableCell>
            <TableCell key={`name${row.id}`}>
            {row.name}
            </TableCell>
            <TableCell key={`quantity${row.id}`}>
            {row.quantity}
            </TableCell>
            <TableCell key={`units${row.id}`}>
            {units.find(u => u.id === row.units).name}
            </TableCell>
            <TableCell key={`price${row.id}`}>
            {row.price}
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
    };
};


export default connect(mapStateToProps, { })(PurchaseOverviewModalRow);