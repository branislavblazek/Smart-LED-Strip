import { setStateValue } from '../../utils/utils';
import { AUTH_ACTIONS } from '../actions';

const initialState = {
  token: null,
  pin: null,
};

const reducer = (state = initialState, action) => {
  const setValue = setStateValue(state);

  switch (action.type) {
    case AUTH_ACTIONS.UPDATE_PIN:
      return setValue(['pin'])(action.payload.pin);

    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.CHECK_KEY_SUCCESS:
      return setValue(['token'])(action.payload.token);

    default:
      return state;
  }
};

export default reducer;
