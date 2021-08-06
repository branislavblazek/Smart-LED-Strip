import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PinPad from '../../../components/PinPad/PinPad';
import { CHAR_TYPES } from '../../../constants';
import { AUTH_ACTIONS } from '../../../store/actions';
import './Login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const { pin, isLoading, isError } = useSelector(state => state.auth);
  const { PIN_LENGTH } = useSelector(state => state.env);

  const handleChange = useCallback(newPin => {
    if (!newPin) {
      dispatch({
        type: AUTH_ACTIONS.UPDATE_PIN,
        payload: { pin: null },
      });
      return;
    }

    if (isError) dispatch({ type: AUTH_ACTIONS.RESET_STATE });

    const value = pin ? `${pin}${newPin}` : newPin;
    if (value.length > PIN_LENGTH) return;

    dispatch({
      type: AUTH_ACTIONS.UPDATE_PIN,
      payload: { pin: value },
    });
  }, [dispatch, pin, PIN_LENGTH, isError]);

  const handleSubmit = useCallback(() => {
    dispatch({
      type: AUTH_ACTIONS.LOGIN,
      payload: { pin },
    });
  }, [dispatch, pin]);

  const handleInput = useCallback(e => {
    const change = CHAR_TYPES[e.charCode];
    if (!change) return null;

    if (change === 'Enter') return handleSubmit();
    return handleChange(change);
  }, [handleChange, handleSubmit]);

  const handleClick = useCallback(e => {
    const val = e.clicked.toString();
    if (val === 'X') return handleChange(null);
    if (val === 'E') return handleSubmit();

    return handleChange(val);
  }, [handleChange, handleSubmit]);

  const renderMessage = () => {
    if (isError) return 'It seems it doesn\'t works...';
    if (isLoading) return 'Give me a moment, please!';
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
        <PinPad onClick={handleClick} />
      </div>
    </div>
  );
};

export default React.memo(Login);
