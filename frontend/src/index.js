import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 992,
      lg: 1510,
      xl: 1990,
    },
  },
});

ReactDOM.render(
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
    </Provider>,
  document.getElementById('root')
);
