const fs = require('fs');
const { TOKEN_PATH } = require('../constants');

const randomString = () => Math.random().toString(36).substr(2);

const generateToken = () => {
    return randomString() + Date.now().toString(36) + randomString();
}

const getTokens = () => {
    return fs.readFileSync(TOKEN_PATH, { encoding: 'utf8' }).trim().split(/\r?\n/);
};

const setToken = token => {
    return new Promise((resolve, reject) => {
        const time = Date.now();
        fs.appendFile(TOKEN_PATH, `${time}: ${token}\n`, err => {
            if (err) return reject(err);
            resolve();
        });
    });
};

const getTimestampByToken = token => {
    const tokens = getTokens();
    const concreteToken = tokens.find(item => {
        const tkn = item.split(': ')[1];
        return tkn === token;
    })
    if (!concreteToken) return [null, null];

    return parseInt(concreteToken.split(': ')[0]);
}

const checkConcreteToken = token => {
    const timestamp = getTimestampByToken(token);

    const now = Date.now();
    const withExp = parseInt(timestamp) + parseInt(process.env.TOKEN_EXPIRATION * 1000);
    return now <= withExp;
}

module.exports = { generateToken, setToken, getTimestampByToken, checkConcreteToken };