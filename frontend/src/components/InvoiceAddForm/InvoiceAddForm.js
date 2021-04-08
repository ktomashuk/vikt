import React, { useState } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import axiosInstance from '../../axios/axiosServer';

const InvoiceAddForm = props => {

    const [invNumber, setInvNumber] = useState('');
    const [invContractor, setInvContractor] = useState('');
    const [invDate, setInvDate] = useState('');

    const addInvoiceHandler = event => {
        event.preventDefault();
        axiosInstance.post('/invoices/', {
            "number": invNumber,
            "contractor": invContractor,
            "inv_date": invDate,
        }).then(response => {console.log(response)}).catch(error => {console.log(error)});  
    };

    return(
        <div>
            <Container>
                <Row className="justify-content-center">
                    <Col md="8">
                    <Form>
                                <Form.Group controlId="invNumber">
                                    <Form.Label>Number</Form.Label>
                                    <Form.Control type="text" placeholder="Invoice number" onChange={e => setInvNumber(e.target.value)} value={invNumber}/>
                                </Form.Group>
                                <Form.Group controlId="invContractor">
                                    <Form.Label>Contractor</Form.Label>
                                    <Form.Control type="text" placeholder="Invoice contractor" onChange={e => setInvContractor(e.target.value)} value={invContractor}/>
                                </Form.Group>
                                <Form.Group controlId="invDate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" placeholder="Invoice date" onChange={e => setInvDate(e.target.value)} value={invDate} />
                                    <Button className="mt-3" variant="primary" type="submit" onClick={addInvoiceHandler}>Add invoice</Button>
                                </Form.Group>
                            </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default InvoiceAddForm;