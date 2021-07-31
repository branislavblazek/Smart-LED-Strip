const express = require('express');
const { SUCCESSFUL, ERROR } = require('../messages');
const { generateToken, setToken, checkToken } = require('../utils/tokenUtils');
const { X_API } = require('../constants');
const { sendRequest } = require('../utils/requestUtils');
const router = express.Router();
require('dotenv').config()

router.post('', (req, res) => {
    const pin = req.body?.pin;
    const correctPin = parseInt(process.env.USER_PIN, 10);
    if (!pin || pin !== correctPin) {
        sendRequest(res.status(401), ERROR.WRONG_PIN);
    } else {
        const token = generateToken();
        setToken(token)
            .then(() => {
                sendRequest(res, SUCCESSFUL.LOGIN, {
                    token,
                    expiresIn: process.env.TOKEN_EXPIRATION,
                });
            })
            .catch(() => sendRequest(res.status(401), ERROR.WRITE_TOKEN, null, ERROR.LOGIN));
    }
});

router.get('', (req, res) => {
    const token = req.get(X_API);
    checkToken(token)
        ? sendRequest(res, SUCCESSFUL.VALID_TOKEN)
        : sendRequest(res.status(401), ERROR.INVALID_TOKEN);
});

module.exports = router;