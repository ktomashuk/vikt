import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

const ErrorModal = props => {

    //const [show, setShow] = useState(false);
    //const handleClose = () => {props.show = false};
    //const handleShow = () => setShow(true);
    
    return(
        <React.Fragment>
            <Modal show={props.show} onHide={props.clicked}
            >
            <Modal.Header closeButton>
            <Modal.Title>Ошибка!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.message}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.clicked}>
                Закрыть
            </Button>
            </Modal.Footer>
        </Modal>
        </React.Fragment>
    );
}

export default ErrorModal;