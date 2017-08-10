import { compose, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createRavenMiddleware from './raven';

import enMessages from 'resources/translations/locales/en.json';
import analyticsMiddleware from './analytics/middleware';
import rootReducer from './reducers';
import rootSaga from './sagas';

export default function creator(raven, history) {
  if (history && history.location && history.location.state && history.location.state.flash)
    delete history.location.state.flash;

  const initialState = {
    intl: {
      locale: 'en',
      messages: enMessages
    }
  };

  const ravenMiddleware = createRavenMiddleware(raven);
  const router = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware({
    onError: (ex) => raven.captureException(ex)
  });
  const middleware = applyMiddleware(ravenMiddleware, router, sagaMiddleware, analyticsMiddleware);

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
    middleware
  );

  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga, raven);

  return store;
};
