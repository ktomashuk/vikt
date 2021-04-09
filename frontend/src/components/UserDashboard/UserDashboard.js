import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { getUserProfile, updateUserProfile } from '../../store/actions/auth';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';

const UserDashboard = props => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        // Getting current user id from token
        const token = localStorage.getItem('refresh_token');
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.user_id;
        setId(userId);
        // Sending a request
        props.getUserProfile(userId);
        
    }, []);

    useEffect(() => {
        // Filling forms
        if (props.firstName) {
        setFirstName(props.firstName);
        setLastName(props.lastName);
        setEmail(props.email);
        }
    }, [props]);

    const updateProfileHandler = event => {
        event.preventDefault();
        props.updateUserProfile(id, firstName, lastName, email);
    };

    return(
        <div>
            <Container>
                <Row className="justify-content-center">
                    <Col md="10">
                    <Form>
                                <Form.Group controlId="firstName">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control type="text" placeholder="Имя" onChange={e => setFirstName(e.target.value)} value={firstName}/>
                                </Form.Group>
                                <Form.Group controlId="lastName">
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control type="text" placeholder="Фамилия" onChange={e => setLastName(e.target.value)} value={lastName}/>
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                                    <Button className="mt-3" variant="primary" type="submit" onClick={updateProfileHandler}>Сохранить</Button>
                                </Form.Group>
                            </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        email: state.auth.email,
    };
};

export default connect(mapStateToProps, { getUserProfile, updateUserProfile })(UserDashboard);