import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { intlReducer } from 'react-intl-redux';

import enMessages from 'resources/translations/locales/en.json';

export default function creator(history) {
  const initialState = {
    intl: {
      locale: 'en',
      messages: enMessages
    }
  }

  const reducer = combineReducers({
    ...[],
    router: routerReducer,
    intl: intlReducer
  });

  const router = routerMiddleware(history);

  const enhancer = applyMiddleware(router);

  const store = createStore(reducer, initialState, enhancer);
  return store;
};
