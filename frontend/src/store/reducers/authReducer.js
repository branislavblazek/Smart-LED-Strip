/* eslint-disable complexity */
import { setStateValue } from '../../utils/utils';
import { AUTH_ACTIONS } from '../actions';

const initialState = {
  token: null,
  pin: null,
  isLoading: false,
  isError: false,
};

const reducer = (state = initialState, action) => {
  const setValue = setStateValue(state);

  switch (action.type) {
    case AUTH_ACTIONS.UPDATE_PIN:
      return setValue(['pin'])(action.payload.pin);

    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        token: null,
        isLoading: true,
        isError: false,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
        isError: false,
      };

    case AUTH_ACTIONS.LOGIN_ERROR:
      return {
        ...state,
        token: null,
        isLoading: false,
        isError: true,
      };

    case AUTH_ACTIONS.RESET_STATE:
      return {
        ...state,
        pin: null,
        token: null,
        isLoading: false,
        isError: false,
      };

    case AUTH_ACTIONS.CHECK_KEY_SUCCESS:
      return setValue(['token'])(action.payload.token);

    default:
      return state;
  }
};

export default reducer;
