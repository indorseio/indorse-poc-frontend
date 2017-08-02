import { camelizeKeys, decamelizeKeys } from 'humps';

const API_ROOT = process.env.REACT_APP_API_ROOT;

// Fetches an API response
// This makes every API response have the same shape, regardless of how nested it was.
export const callApiRaw = ({ endpoint, method, headers, body }) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl, {
    method,
    headers,
    body
  }).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);

      return Object.assign({},
        camelizedJson
      );
    })
  );
}

export const callApiJson = ({ endpoint, method, headers, data }) => {
  const finalsHeaders = {
    ...headers,
    'Content-Type': 'application/json',
  };

  return callApiRaw({
    endpoint,
    method,
    headers: finalsHeaders,
    body: JSON.stringify(decamelizeKeys({ ...data }))
  });
}
