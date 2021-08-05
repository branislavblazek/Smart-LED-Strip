import { createSelector } from 'reselect';

export const getAppEnv = createSelector(
  state => state?.env,
  (env) => env,
);

export const getToken = createSelector(
  state => state.auth.token,
  token => token,
);
