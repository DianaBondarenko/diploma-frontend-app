import React, { useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import InitComponent from './containers/InitComponent';
import {
  getFromLocalStorage,
  setToLocalStorage,
} from './global/helpers/localStorageHelper';

const App = () => {
  const ru = require('./global/translations/ua.json');

  useEffect(() => {
    if (!getFromLocalStorage('lang')) {
      setToLocalStorage('lang', 'ua');
    }
  }, []);

  i18n.use(initReactI18next).init({
    resources: {
      ru,
    },
    lng: getFromLocalStorage('lang'),
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  return (
    <Router>
      <Switch>
        <InitComponent />
      </Switch>
    </Router>
  );
};

export default App;
