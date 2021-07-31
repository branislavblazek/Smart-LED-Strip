const { getCurrentDate } = require("./utils/timeUtils");

const requestLog = (req, res, next) => {
    const date = getCurrentDate()
    console.log(`${date}.: ${req.method} ${req.path}`);
    if (Object.keys(req.body).length) console.log(req.body);
    next();
}

const responseLog = message => {
    const date = getCurrentDate();
    console.log(`${date}: >> ${message}`);
}

module.exports = { requestLog, responseLog };