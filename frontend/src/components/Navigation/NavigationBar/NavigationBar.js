import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../../../store/actions/auth';

const NavigationBar = props => {

let loginNav = '';

if (props.isAuthenticated) {
  loginNav = (
    <React.Fragment>
      <Nav.Link href="/login" onClick={props.logoutUser}>Выйти</Nav.Link>
    </React.Fragment>
  );
} else {
  loginNav = (
    <React.Fragment>
      <Nav.Link href="/login">Войти</Nav.Link>
    </React.Fragment>
  );
}

return(
<Navbar bg="light">
   <Navbar.Brand href="/">Домой</Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/invoices">Платежки </Nav.Link>
      <Nav.Link href="/invoice-add">Добавить платежку </Nav.Link>
    </Nav>
    <Nav className="mr-end mr-2">
      {loginNav}
    </Nav>
    </Navbar.Collapse>
</Navbar>);
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.username,
});

export default connect(mapStateToProps, {logoutUser})(NavigationBar);