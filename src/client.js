import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import { ConnectedRouter } from 'react-router-redux';

import 'ui/theme/global.scss';

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';

import createStore from './store';
import App from './ui/app';
import registerServiceWorker from './registerServiceWorker';
import './moment-config';

addLocaleData([...en]);

const history = createHistory();
const store = createStore(history);

render(
  <Provider store={store}>
    <IntlProvider>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
