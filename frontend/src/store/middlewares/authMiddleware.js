/* eslint-disable complexity */
import { authLinks } from '../../apiLinks';
import { AUTH_ACTIONS, APP_ACTIONS } from '../actions';
import { connectgetRequestHeader, connectPostRequest, envRequest } from '../../utils/requestUtils';
import { getCookie, setCookie, checkCookie } from '../../utils/cookiesUtils';

const XApi = 'X-Api';

const authMiddleware = store => next => action => {
  const getRequestHeader = connectgetRequestHeader(store);
  const postRequest = connectPostRequest(store);

  switch (action.type) {
    case AUTH_ACTIONS.LOOKUP_KEY: {
      const inCookies = checkCookie(XApi);

      if (inCookies) {
        const cookieToken = getCookie(XApi);
        store.dispatch({
          type: AUTH_ACTIONS.CHECK_KEY,
          payload: { key: cookieToken },
        });
      }
      return next(action);
    }

    case AUTH_ACTIONS.LOGIN: {
      postRequest({
        path: authLinks.login(),
        options: { authorization: true },
      })
        .then(res => {
          store.dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: { token: res.token },
          });
          setCookie(XApi, res.token);
        })
        .catch(() => {
          store.dispatch({ type: AUTH_ACTIONS.LOGIN_ERROR });
        });
      return next(action);
    }

    case AUTH_ACTIONS.CHECK_KEY: {
      getRequestHeader({
        path: authLinks.login(),
        body: {},
        options: { authToken: action.payload.key },
      })
        .then(() => {
          store.dispatch({
            type: AUTH_ACTIONS.CHECK_KEY_SUCCESS,
            payload: { token: action.payload.key },
          });
        })
        .catch(() => {
          store.dispatch({ type: AUTH_ACTIONS.CHECK_KEY_ERROR });
        });
      return next(action);
    }

    case APP_ACTIONS.LOAD_ENV: {
      envRequest(action.payload.url).then((env) => {
        store.dispatch({ type: APP_ACTIONS.SET_ENV, payload: env });
      });
      return next(action);
    }
    default:
      return next(action);
  }
};

export default authMiddleware;
