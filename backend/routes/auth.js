const { ERROR } = require('../messages');
const { checkConcreteToken } = require('../utils/tokenUtils');
const { X_API } = require('../constants');
const { sendRequest } = require('../utils/requestUtils');


const isLoggedIn = (req, res, next) => {
    const token = req.get(X_API);
    if (!checkConcreteToken(token)) {
        sendRequest(res, ERROR.UNAUTHORIZED)
    } else {
        next()
    }
}

module.exports = { isLoggedIn };