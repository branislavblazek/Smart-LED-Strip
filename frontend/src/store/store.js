import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// REDUCERS
import authReducer from './reducers/authReducer';
import controlReducer from './reducers/controlReducer';
import envReducer from './reducers/envReducer';

// MIDDLEWARES
import authMiddleware from './middlewares/authMiddleware';
import controlMiddleware from './middlewares/controlMiddleware';

const rootReducer = combineReducers({
    env: envReducer,
    auth: authReducer,
    control: controlReducer,
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancers(
    applyMiddleware(
        authMiddleware,
        controlMiddleware,
    ),
));
