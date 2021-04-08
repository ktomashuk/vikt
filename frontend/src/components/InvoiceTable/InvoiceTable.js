import React from 'react';
import { Table } from 'react-bootstrap';

const InvoiceTable = props => {
    return(
        <Table striped bordered hover>
            <thead>
            <tr>
            <th>{props.header1}</th>
            <th>{props.header2}</th>
            <th>{props.header3}</th>
            </tr>
            </thead>
            <tbody>
            {props.children}
            </tbody>
        </Table>
    );
};

export default InvoiceTable;