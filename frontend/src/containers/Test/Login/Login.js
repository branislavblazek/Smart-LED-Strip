import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PinPad from '../../../components/PinPad/PinPad';
import { CHAR_TYPES } from '../../../constants';
import { AUTH_ACTIONS } from '../../../store/actions';
import './Login.scss';

const Login = () => {
    const dispatch = useDispatch();
    const { pin } = useSelector(state => state.auth);
    const { PIN_LENGTH } = useSelector(state => state.env);

    const handleChange = useCallback(newPin => {
        const value = pin ? `${pin}${newPin}` : newPin;
        if (value.length > PIN_LENGTH) return;

        dispatch({
            type: AUTH_ACTIONS.UPDATE_PIN,
            payload: { pin: value },
        });
    }, [dispatch, pin, PIN_LENGTH]);

    const handleInput = useCallback(e => {
        const change = CHAR_TYPES[e.charCode];
        if (!change) return;

        handleChange(change);
    }, [handleChange]);

    const renderMessage = () => {
        if (pin?.length >= PIN_LENGTH) return 'Hit Enter to Login!';
        return 'Enter your secret PIN:';
    };

    const renderDots = () => {
        const len = pin?.length || 0;
        return [...Array(len)].map(() => (<span key={Date.now() + Math.random()}> </span>));
    };

    return (
      <div
        className="Login"
        onKeyPress={handleInput}
        onClick={() => {}}
        role="button"
        tabIndex={0}
      >
        <div className="LoginWindow">
          <p className="Message">{renderMessage()}</p>
          <p className="Dots">{renderDots()}</p>
          <PinPad />
        </div>
      </div>
    );
};

export default React.memo(Login);
