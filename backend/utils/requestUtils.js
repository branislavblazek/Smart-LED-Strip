const { responseLog } = require('../logger');

const sendRequest = (response, message = '', body = null, logMessage = null) => {
    responseLog(logMessage || message);
    response.send({
        message,
        ...body,
    })
};

module.exports = { sendRequest };