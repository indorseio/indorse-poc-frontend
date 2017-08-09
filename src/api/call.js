import { camelizeKeys, decamelizeKeys } from 'humps';

const API_ROOT = process.env.REACT_APP_API_ROOT;

const unconventional = {
  ownerid: 'ownerId',
  votinground: 'votingRound',
  votingrounds: 'votingRounds',
  ethaddress: 'ethereumAddress'
};

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
        const error = { ...json, response };
        return Promise.reject(error);
      }

      const camelizedJson = camelizeKeys(json, (key, convert) => unconventional[key] || convert(key));

      return Object.assign({},
        camelizedJson
      );
    })
  );
}

export const callApiJson = ({ endpoint, method, headers, data }) => {
  const finalMethod = (method || 'GET').toUpperCase();

  const finalsHeaders = {
    ...headers,
    'Content-Type': 'application/json',
  };

  return callApiRaw({
    endpoint,
    method: finalMethod,
    headers: finalsHeaders,
    body: finalMethod !== 'GET' ? JSON.stringify(decamelizeKeys({ ...data })) : undefined
  });
}
