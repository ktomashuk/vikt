import React, { useEffect } from 'react';
import InvoiceTableRow from '../../components/InvoiceTable/InvoiceTableRow/InvoiceTableRow';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { showError } from '../../store/actions/errors';
import { getInvoices } from '../../store/actions/invoices';

const InvoiceContainer = (props) => {
    
    //const [invoices, setInvoices] = useState();
    //const [loaded, setLoaded] = useState(false);
    let invoicesDisplay = null;
    const loadingMessage = <Spinner />;

    useEffect(() => {
        props.getInvoices();
    }, [props]);

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