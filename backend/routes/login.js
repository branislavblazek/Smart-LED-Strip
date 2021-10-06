const express = require('express');
const { SUCCESSFUL, ERROR, INFO } = require('../messages');
const { generateToken, setToken, checkConcreteToken, getTimestampByToken } = require('../utils/tokenUtils');
const { X_API } = require('../constants');
const { sendRequest } = require('../utils/requestUtils');
const { getDateFromTimestamp } = require('../utils/timeUtils');
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
    checkConcreteToken(token)
        ? sendRequest(res, SUCCESSFUL.VALID_TOKEN)
        : sendRequest(res.status(401), ERROR.INVALID_TOKEN);
});

router.get('/expiration', (req, res) => {
    const token = req.get(X_API);
    const timestampStart = getTimestampByToken(token);
    const timestamp = parseInt(timestampStart) + parseInt(process.env.TOKEN_EXPIRATION * 1000);
    sendRequest(res, INFO.EXPIRATION, {
        expirationTimestamp: timestamp,
        expirationDate: getDateFromTimestamp(timestamp),
    })
})

module.exports = router;