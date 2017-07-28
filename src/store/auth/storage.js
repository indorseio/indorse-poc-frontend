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
