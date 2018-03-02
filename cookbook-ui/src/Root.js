import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';

const Root = ({ store }) => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
);

export default Root;
