import { combineReducers } from 'redux';

import users from './users/reducer';
import claims from './claims/reducer';
import votingRounds from './voting-rounds/reducer';
import votes from './votes/reducer';

export default combineReducers({
  users,
  claims,
  votingRounds,
  votes
});
