import React, { useEffect, useState } from 'react';
import axiosServer from '../../axios/axiosServer';
import InvoiceTable from '../../components/InvoiceTable/InvoiceTable';
import InvoiceTableRow from '../../components/InvoiceTable/InvoiceTableRow/InvoiceTableRow';
import { Col, Row, Container } from 'react-bootstrap';

const InvoiceContainer = (props) => {
    
    const [invoices, setInvoices] = useState();
    const [loaded, setLoaded] = useState(false);
    const [showError, setError] = useState({showError : false, errorMessage: ''});
    let invoicesDisplay = null;
    const loadingMessage = <h1>Data is loading...</h1>;

    useEffect(() => {
        axiosServer.get('/invoices/').then(
            response => {setInvoices(response.data)}).catch(
            error => {
                setError({showError: true, errorMessage: error.message});
            }
        );
    }, [invoices]);

    useEffect(() => {
        if (invoices) {
            setLoaded(true);
        }
    }, [invoices]);

    if (loaded) {
    invoicesDisplay = invoices.map(invoice => {
            return(
    <InvoiceTableRow
    key={invoice.id} 
    col1={invoice.number}
    col2={invoice.contractor}
    col3={invoice.inv_date}/>);
    });
    }

    return(
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col md={6}>
                        <InvoiceTable header1="number" header2="contractor" header3="date">
                        {invoicesDisplay}
                        </InvoiceTable>
                        {!loaded && loadingMessage}
                    </Col>
                    <Col md={6}>
                        <InvoiceTable header1="number" header2="contractor" header3="date">
                        </InvoiceTable>
                    </Col>
                </Row>
            </Container>
            
        </React.Fragment>
    );
}

export default InvoiceContainer;