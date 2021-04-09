import React from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Container, Button } from 'react-bootstrap';

const HomePage = props => {
    
    let dashboard = '';
    if (props.isAuthenticated) {
        dashboard = (
            <Jumbotron fluid>
            <Container>
                <h1>Здравствуйте, {props.firstName} {props.lastName}!</h1>
                <p>Это тестовая версия портала.</p>
            </Container>
            </Jumbotron>
        );
    } else {
        dashboard = (
            <Jumbotron>
                <h1>Здравствуйте!</h1>
                <p>Чтобы получить доступ к функционалу портала, войдите в систему.</p>
                <p>
                    <Button variant="primary" href="/login">Войти</Button>
                </p>
            </Jumbotron>
        );
    }

    return(
        <div>
            {dashboard}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        username: state.auth.username,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
    };
};

export default connect(mapStateToProps)(HomePage);