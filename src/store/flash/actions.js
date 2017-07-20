import * as types from './action-types';

import { defineAction } from 'store/common/action-helpers';

import { buildMessage } from './builder';

export const addMessage = ({ id, kind, content, dismissable }) => defineAction(types.ADD_MESSAGE,
  buildMessage({
    id, kind, content, dismissable
  })
);

export const removeMessage = (id) => defineAction(types.REMOVE_MESSAGE, { id });
