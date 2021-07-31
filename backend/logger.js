const getCurrentDate = () => {
    const JSdate = new Date();
    const date = `${JSdate.getDate()}.${JSdate.getMonth() + 1}.${JSdate.getFullYear()}`;
    const time = `${JSdate.getHours()}:${JSdate.getMinutes()}:${JSdate.getSeconds()}`;
    return `${date} ${time}`;
};

const requestLog = (req, res, next) => {
    const date = getCurrentDate()
    console.log(`${date}: ${req.method} ${req.path}`);
    if (Object.keys(req.body).length) console.log(req.body);
    next();
}

const responseLog = message => {
    const date = getCurrentDate();
    console.log(`${date}: >> ${message}`);
}

module.exports = { requestLog, responseLog };