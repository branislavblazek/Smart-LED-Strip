import React from 'react';
import PinPad from '../../../components/PinPad/PinPad';
import './Login.scss';

const Login = () => {
    return (
        <div className="Login">
            <div className="LoginWindow">
                <PinPad />
            </div>
        </div>
    );
};

export default React.memo(Login);