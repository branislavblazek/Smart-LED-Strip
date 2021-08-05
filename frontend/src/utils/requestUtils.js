import { ENVIRONMENT } from '../apiLinks';
import { getAppEnv } from '../store/selectors/appSelectors';

const XAPIKEY = 'X-API-Key';

const getApiUrl = store => path => {
  const env = getAppEnv(store.getState());
  return `${env[ENVIRONMENT]}${path}`;
};

// eslint-disable-next-line complexity
async function request(apiUrl, { authToken, method, body } = {}) {
  const headers = {};

  if (authToken) headers[XAPIKEY] = authToken;

  const response = await fetch(apiUrl, {
    headers,
    body,
    method: method || 'GET',
  });

  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return responseJson;
}

const getRequest = request;

const getRequestHeader = (apiUrl, data, options) => request(apiUrl, {
  ...options,
  method: 'GET',
});

const postRequest = (apiUrl, data, options) => request(apiUrl, {
  ...options,
  method: 'POST',
  body: data ? JSON.stringify(data) : '{}',
});

const putRequest = (apiUrl, data, options) => request(apiUrl, {
  ...options,
  method: 'PUT',
  body: data ? JSON.stringify(data) : '{}',
});

const deleteRequest = (apiUrl, options) => request(apiUrl, {
  ...options,
  method: 'DELETE',
});

const requestTypesWithBody = [putRequest, postRequest, getRequestHeader];

const connectRequest = (requestFunction) => store => ({
  path, body, options,
}) => {
  const authToken = options?.authorization
    ? getAppEnv(store.getState()).API_KEY
    : options.authToken;
  const apiUrl = getApiUrl(store)(path);
  const args = (requestTypesWithBody.includes(requestFunction))
    ? [apiUrl, body, { ...options, authToken }]
    : [apiUrl, { ...options, authToken }];
  return requestFunction(...args)
    .then(response => response);
    // .catch(error => error);
    // TODO replace with handlers
};

export const connectPutRequest = connectRequest(putRequest);
export const connectPostRequest = connectRequest(postRequest);
export const connectGetRequest = connectRequest(getRequest);
export const connectgetRequestHeader = connectRequest(getRequestHeader);
export const connectDeleteRequest = connectRequest(deleteRequest);

export const extractFromQuery = (queryData, inputObject) => {
  const data = new URLSearchParams(queryData);
  const entries = Object.entries(inputObject);

  return entries.reduce(
    (acc, [key, value]) => {
      acc[key] = data.get(value);
      return acc;
    }, {},
  );
};

export async function envRequest(apiUrl) {
  const response = await fetch(apiUrl, {
    method: 'GET',
  });
  try {
    return await response.json();
  } catch (_) {
    return null;
  }
}
