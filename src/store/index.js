import { compose, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import enMessages from 'resources/translations/locales/en.json';
import analyticsMiddleware from './analytics/middleware';
import rootReducer from './reducers';
import rootSaga from './sagas';

export default function creator(history) {
  const initialState = {
    intl: {
      locale: 'en',
      messages: enMessages
    }
  };

  const router = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(router, sagaMiddleware, analyticsMiddleware);

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
    middleware
  );

  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);

  return store;
};
