import React from 'react';
// Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { chooseInvoice } from '../../../../store/actions/invoices';
import { getPurchasesByInvoice } from '../../../../store/actions/purchases';
import { backActivate } from '../../../../store/actions/back';

const PurchasesOverviewModalRow = (props) => {
    const { row, history, chooseInvoice, getPurchasesByInvoice, backActivate } = props;
    const [year, month, day] = row.inv_date.split('-');
    const date = `${day}.${month}.${year}`;
    const mainRow = (
        <React.Fragment key={`fragmentrow${row.id}`}>
        <TableRow key={`r${row.id}`} hover >
            <TableCell padding="default" key={`date${row.purchase_id}`}>
            {date}
            </TableCell>
            <TableCell key={`contractor${row.purchase_id}`}>
            {row.contractor_name}                    
            </TableCell>
            <TableCell key={`name${row.purchase_id}`}>
            {row.name}
            </TableCell>
            <TableCell key={`quantity${row.purchase_id}`}>
            {row.purchased_doc}
            </TableCell>
            <TableCell key={`units${row.purchase_id}`}>
            {row.units}
            </TableCell>
            <TableCell key={`price${row.purchase_id}`}>
            {row.price}
            </TableCell>
            <TableCell key={`actions${row.purchase_id}`}>
            <Tooltip title={
                <Typography>
                Перейти к счёту
                </Typography>}>
            <ArrowForwardIcon 
            style={{color: 'green', cursor: 'pointer', position: 'relative', left: '15%'}}
            onClick={async () => {
                await chooseInvoice(row.invoice_id);
                await getPurchasesByInvoice(row.invoice_id);
                backActivate('purchase-overview-modal');
                history.push(`/purchases-bill`);
                }}/>
            </Tooltip>
            </TableCell>
        </TableRow>
        </React.Fragment>
        );
    
    return mainRow;
};


export default connect(null, 
    { chooseInvoice, getPurchasesByInvoice, backActivate })(withRouter(PurchasesOverviewModalRow));