import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const store = configureStore();
const rootEl = document.getElementById('root');

render(<Root store={store}/>, rootEl);

registerServiceWorker();

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root').default;

    render(<NextRoot store={store}></NextRoot>, rootEl);
  });
}