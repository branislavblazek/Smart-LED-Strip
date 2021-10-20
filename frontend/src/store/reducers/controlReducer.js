import { setStateValues } from '../../utils/utils';
import { CONTROL_ACTIONS } from '../actions';

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
};

const reducer = (state = initialState, action) => {
    const setValues = setStateValues(state);

    switch (action.type) {
        case CONTROL_ACTIONS.GET_CONTROL: {
            const change = {
                data: [],
                isLoading: true,
                isError: false,
            };
            return setValues([])(change);
        }

        case CONTROL_ACTIONS.GET_CONTROL_SUCCESS: {
            const change = {
                data: action.payload,
                isLoading: false,
                isError: false,
            };
            return setValues([])(change);
        }

        case CONTROL_ACTIONS.GET_CONTROL_ERROR: {
            const change = {
                data: [],
                isLoading: false,
                isError: true,
            };
            return setValues([])(change);
        }

        default:
            return state;
    }
};

export default reducer;
