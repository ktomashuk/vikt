import './App.css';
import AuthorisationContainer from './containers/AuthorisationContainer/AuthorisationContainer';
import InvoiceContainer from './containers/InvoiceContainer/InvoiceContainer';
import HomePage from './components/HomePage/HomePage';
import Layout from './components/Layout/Layout';
import InvoiceAddForm from './components/InvoiceAddForm/InvoiceAddForm';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={AuthorisationContainer} />
        <Route path="/invoices" component={InvoiceContainer} />
        <Route path="/invoice-add" component={InvoiceAddForm} />
      </Layout>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
