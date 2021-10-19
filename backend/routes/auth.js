const { ERROR, SUCCESSFUL } = require('../messages');
const { checkConcreteToken } = require('../utils/tokenUtils');
const { X_API, LOG_SOURCE } = require('../constants');
const { sendRequest } = require('../utils/requestUtils');
const { writeLog } = require('../logger');


const isLoggedIn = (req, res, next) => {
    const token = req.get(X_API);
    if (!checkConcreteToken(token)) {
        logRequest(LOG_SOURCE.AUTH_CHECK, ERROR.UNAUTHORIZED, token);
        sendRequest(res, ERROR.UNAUTHORIZED);
    } else {
        writeLog(LOG_SOURCE.AUTH_CHECK, SUCCESSFUL.VALID_TOKEN, token);
        next()
    }
}

module.exports = { isLoggedIn };