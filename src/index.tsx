import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './index.scss';

store()
  .then((s) => {
    ReactDOM.render(
      <Provider store={s}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  })
  .catch((err) => {
    // eslint-disable-next-line
    console.error(err.message);
  });
