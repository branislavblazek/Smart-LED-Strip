const fs = require('fs');
const { LOG_SOURCE, LOG_PATH } = require('./constants');
const { getCurrentDateTime, getDateForLogFile } = require("./utils/timeUtils");

const writeLog = (source, heading, description) => {
    const logFilename = LOG_PATH.replace('.txt', `${getDateForLogFile()}.txt`);
    const date = getCurrentDateTime();
    fs.appendFileSync(logFilename, `${date}: ${source} - ${heading}\n`)
    if (description) fs.appendFileSync(logFilename, `\t${description}\n`);
}

const logRequest = (req, _, next) => {
    writeLog(LOG_SOURCE.REQUEST, `${req.method} ${req.path}`, req.method !== 'GET' ? JSON.stringify(req.body) : null)
    next();
}

const responseLog = message => writeLog(LOG_SOURCE.RESPONSE, message);

module.exports = { logRequest, writeLog, responseLog };