import './App.css';
import React from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import Layout from './components/Layout/Layout';
import UserDashboard from './components/UserDashboard/UserDashboard';
import EstimatesContainer from './containers/EstimatesContainer/EstimatesContainer';
import InvoiceContainer from './containers/InvoiceContainer/InvoiceContainer';
import Placeholder from './components/Placeholder/Placeholder';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

const App = props => {

  return (
      <React.Fragment>
      <Layout />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/user-dashboard" component={UserDashboard} />
      <Route exact path="/estimates" component={EstimatesContainer} />
      <Route exact path="/placeholder" component={Placeholder} />
      <Route exact path="/invoices" component={InvoiceContainer} />
      </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(App);
