const express = require('express');
const { SUCCESSFUL, ERROR } = require('../messages');
const { responseLog } = require('../logger');
const { generateToken, setToken } = require('../utils/tokenUtils');
const router = express.Router();
require('dotenv').config()

router.post('', (req, res) => {
    const pin = req.body?.pin;
    const correctPin = parseInt(process.env.USER_PIN, 10);
    if (!pin || pin !== correctPin) {
        responseLog(ERROR.WRONG_PIN);
        res.status(401).send({ message: ERROR.WRONG_PIN });
    } else {
        const token = generateToken();
        setToken(token)
            .then(() => {
                responseLog(SUCCESSFUL.LOGIN);
                res.send({
                    message: SUCCESSFUL.LOGIN,
                    token,
                    expiresIn: process.env.TOKEN_EXPIRATION,
                });
            })
            .catch(() => {
                responseLog(ERROR.WRITE_TOKEN);
                res.status(401).send({ message: ERROR.LOGIN })
            });
    }
});

module.exports = router;