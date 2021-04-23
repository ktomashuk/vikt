import React, { useState, useEffect } from 'react';
import { Card, Container, Col, Row, Form, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/auth';
import { loadPageName } from '../../store/actions/info';
import { Redirect, withRouter } from 'react-router-dom';

const LoginPage = props => {

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

    let redirectToMain = null;
    if (props.isAuthenticated) {
        redirectToMain = <Redirect to="/" />;
    }

    useEffect(() => {
    props.loadPageName('Войти');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                                    <Form.Control type="text" placeholder="Введите логин" onChange={loginChangeHandler} value={login}/>
                                </Form.Group>
                                <Form.Group controlId="authPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="password" placeholder="Введите пароль" onChange={passwordChangeHandler} value={password}/>
                                    <Button className="mt-3" variant="primary" type="submit" onClick={submitLoginHandler}>Войти</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
            {redirectToMain}
        </div>
    );
};


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        username: state.auth.username,
    };
};


export default connect(mapStateToProps,{ loginUser, loadPageName })(withRouter(LoginPage));