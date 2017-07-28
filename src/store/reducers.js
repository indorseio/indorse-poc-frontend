import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import flash from 'store/flash/reducer';
import auth from 'store/auth/reducer';
import entities from 'store/entities/reducer';

export default combineReducers({
  intl: intlReducer,
  router: routerReducer,
  form: formReducer,

  flash,
  auth,
  entities
});
