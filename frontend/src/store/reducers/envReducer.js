import { setStateValue } from '../../utils/utils';
import { APP_ACTIONS } from '../actions';
import { API_ENVIRONMENT_URL, ENVIRONMENT } from '../../apiLinks';

const initialState = {};

const reducer = (state = initialState, action) => {
  const setValue = setStateValue(state);

  switch (action.type) {
    case APP_ACTIONS.SET_ENV: {
      const relevantEnv = action.payload
        ? action.payload
        : { [ENVIRONMENT]: API_ENVIRONMENT_URL[ENVIRONMENT] };
      return setValue([])(relevantEnv);
    }
    default:
      return state;
  }
};

export default reducer;
