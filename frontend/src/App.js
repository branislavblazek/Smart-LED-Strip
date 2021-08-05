import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getAppEnv, getToken } from './store/selectors/appSelectors';
import { ENVIRONMENT } from './apiLinks';
import { APP_ACTIONS, AUTH_ACTIONS } from './store/actions';
import { ENV_FILE_NAME } from './constants';
import Login from './containers/Test/Login/Login';
import Test from './containers/Test/Test';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const env = useSelector(getAppEnv)[ENVIRONMENT];

  useEffect(() => {
    const url = `${window.location.origin}/${ENV_FILE_NAME}`;
    dispatch({ type: APP_ACTIONS.LOAD_ENV, payload: { url } });
  }, [dispatch]);

  useEffect(() => {
  if (!env || token) return null;

  dispatch({ type: AUTH_ACTIONS.LOOKUP_KEY });

    return null;
  }, [dispatch, env, token]);

  const renderLogin = () => (
    <Switch>
      <Route path="/login/" component={Login} />
      <Redirect to="/login/" />
    </Switch>
  );

  const renderApp = () => (
    <Switch>
      <Route path="/dashboard/" component={Test} />
      <Redirect to="/dashbord/" />
    </Switch>
  );

  return (
    <div className="App">
      {token ? renderApp() : renderLogin()}
    </div>
  );
};

export default React.memo(App);
