import { controlLinks } from '../../apiLinks';
import { connectGetRequest } from '../../utils/requestUtils';
import { CONTROL_ACTIONS } from '../actions';

const controlMiddleware = store => next => action => {
    const getRequest = connectGetRequest(store);

    switch (action.type) {
        case CONTROL_ACTIONS.GET_CONTROL: {
            getRequest({
                path: controlLinks.control(),
            })
            .then(res => {
                store.dispatch({
                    type: CONTROL_ACTIONS.GET_CONTROL_SUCCESS,
                    payload: res,
                });
            })
            .catch(() => {
                store.dispatch({
                    type: CONTROL_ACTIONS.GET_CONTROL_ERROR,
                });
            });
            return next(action);
        }

        default:
            return next(action);
    }
};

export default controlMiddleware;
