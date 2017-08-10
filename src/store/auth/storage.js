import { eventChannel } from 'redux-saga';

const TOKEN_KEY = 'token';

const storage = window.localStorage;

export function getToken() {
  return storage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  return storage.setItem(TOKEN_KEY, token);
}

export function deleteToken() {
  return storage.removeItem(TOKEN_KEY);
}

export function createTokenChangeChannel() {
  return eventChannel(emmitter => {
    const handler = function (e) {
      if (e.key === TOKEN_KEY) {
        emmitter({ oldValue: e.oldValue, newValue: e.newValue });
      }
    };

    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('storage', handler);
    };
  });
}
