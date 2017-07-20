import Immutable from 'seamless-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as types from './action-types';

const initialState = Immutable([]);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      const messageFromRoute = action.payload.state && action.payload.state.flash;
      if (messageFromRoute)
        return state.filter(message => message.id !== messageFromRoute.id).concat(messageFromRoute);
      else
        return Immutable([]);
    case types.ADD_MESSAGE:
      const newMessage = action.payload;
      return state.filter(message => message.id !== newMessage.id).concat(newMessage);
    case types.REMOVE_MESSAGE:
      const { id } = action.payload;
      return state.filter(message => message.id !== id);
    default:
      return state;
  }
}
