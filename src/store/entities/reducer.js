import { combineReducers } from 'redux';

import users from './users/reducer';
import claims from './claims/reducer';

export default combineReducers({
  users,
  claims
});
