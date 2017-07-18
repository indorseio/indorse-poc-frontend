const REQUEST = 'REQUEST';
const START = 'START';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function defineApiActionTypes(base) {
  return {
    REQUEST: `${base}_${REQUEST}`,
    START: `${base}_${START}`,
    SUCCESS: `${base}_${SUCCESS}`,
    FAILURE: `${base}_${FAILURE}`,
  }
}

export function defineAction(type, payload = {}, meta = {}) {
  if (!type || type.length === 0 || type.trim().length === 0)
    throw new Error('Action should have a type');

  return {
    type,
    payload,
    meta
  };
}
