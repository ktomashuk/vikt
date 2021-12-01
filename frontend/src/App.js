import './App.css';
import React from 'react';
// Custom components
import LoginPage from './components/LoginPage/LoginPage';
import Layout from './components/Layout/Layout';
import UserDashboard from './components/UserDashboard/UserDashboard';
import EstimatesContainer from './containers/EstimatesContainer/EstimatesContainer';
import InvoiceContainer from './containers/InvoiceContainer/InvoiceContainer';
import Placeholder from './components/Placeholder/Placeholder';
import ContractorsContainer from './containers/ContractorsContainer/ContractorsContainer';
import CableContainer from './containers/CableContainer/CableContainer';
import IsolationContainer from './containers/IsolationContainer/IsolationContainer';
import ObjectContainer from './containers/ObjectContainer/ObjectsContainer';
import HomeContainer from './containers/HomeContainer/HomeContainer';
import PurchaseOverviewContainer from './containers/PurchaseContainers/PurchaseOverviewContainer/PurchaseOverviewContainer';
import PurchaseRequestContainer from './containers/PurchaseContainers/PurchaseRequestContainer/PurchaseRequestContainer';
import PurchaseBillContainer from './containers/PurchaseContainers/PurchaseBillContainer/PurchaseBillContainer';
import RequestContainer from './containers/RequestContainer/RequestContainer';
// Redux
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

const App = (props) => {

  return (
      <React.Fragment>
      <Layout />
      <Route exact path="/" component={HomeContainer} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/user-dashboard" component={UserDashboard} />
      <Route exact path="/estimates" component={EstimatesContainer} />
      <Route exact path="/placeholder" component={Placeholder} />
      <Route exact path="/invoices" component={InvoiceContainer} />
      <Route exact path="/contractors" component={ContractorsContainer} />
      <Route exact path="/cable-journal" component={CableContainer} />
      <Route exact path="/isolation" component={IsolationContainer} />
      <Route exact path="/object" component={ObjectContainer} />
      <Route exact path="/purchases-overview" component={PurchaseOverviewContainer} />
      <Route exact path="/purchases-request" component={PurchaseRequestContainer}/>
      <Route exact path="/purchases-bill" component={PurchaseBillContainer} />
      <Route exact path="/requests" component={RequestContainer} />
      </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(App);
