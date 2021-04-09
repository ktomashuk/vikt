import React, { useEffect, useCallback } from 'react';
import InvoiceTable from '../../components/InvoiceTable/InvoiceTable';
import InvoiceTableRow from '../../components/InvoiceTable/InvoiceTableRow/InvoiceTableRow';
import Spinner from '../../components/UI/Spinner/Spinner';
import InvoiceAddForm from '../../components/InvoiceAddForm/InvoiceAddForm';
import { Col, Row, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showError } from '../../store/actions/errors';
import { getInvoices } from '../../store/actions/invoices';

const InvoiceContainer = (props) => {
    
    //const [invoices, setInvoices] = useState();
    //const [loaded, setLoaded] = useState(false);
    let invoicesDisplay = null;
    const loadingMessage = <Spinner />;

    const protectedInvoices = useCallback(props.getInvoices, [props.data]);

    useEffect(() => {
        protectedInvoices();
    }, []);

    if (props.isLoaded) {
    invoicesDisplay = props.data.map(invoice => {
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
                        {!props.isLoaded && loadingMessage}
                    </Col>
                    <Col md={6}>
                    <InvoiceAddForm />
                    </Col>
                </Row>
            </Container>
            
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isLoaded: state.inv.isLoaded,
        data: state.inv.data,
    };
};

export default connect(mapStateToProps, { getInvoices, showError })(InvoiceContainer);