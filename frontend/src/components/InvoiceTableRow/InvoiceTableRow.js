import React from 'react';

const InvoiceTableRow = props => {
    return(
    <tr>
      <td>{props.col1}</td>
      <td>{props.col2}</td>
      <td>{props.col3}</td>
    </tr>
    );
}

export default InvoiceTableRow;