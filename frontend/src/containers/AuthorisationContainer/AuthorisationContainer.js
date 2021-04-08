import React, { useState } from 'react';
import { Card, Container, Col, Row, Form, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/auth';

const AuthorisationContainer = props => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const loginChangeHandler = event => {
        setLogin(event.target.value);
    };

    const passwordChangeHandler = event => {
        setPassword(event.target.value);  
    };

    const submitLoginHandler = (event) => {
        event.preventDefault();
        props.loginUser(login, password);

    };

    return (
        <div>
            <Container fluid>
                <Row className="justify-content-center mt-3">
                    <Col md="8">
                    <Card>
                        <Card.Header as="h5">Авторизация</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="authLogin">
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your login" onChange={loginChangeHandler} value={login}/>
                                </Form.Group>
                                <Form.Group controlId="authPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="password" placeholder="Enter your password" onChange={passwordChangeHandler} value={password}/>
                                    <Button className="mt-3" variant="primary" type="submit" onClick={submitLoginHandler}>Войти</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        username: state.auth.username,
    };
};


export default connect(mapStateToProps,{loginUser})(AuthorisationContainer);