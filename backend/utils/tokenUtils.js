const fs = require('fs');

const generateToken = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const getTokens = () => {
    return fs.readFileSync('./tokens', { encoding: 'utf8' }).trim().split(/\r?\n/);
};

const setToken = token => {
    return new Promise((resolve, reject) => {
        const time = Date.now();
        fs.appendFile('./tokens', `${time}: ${token}\n`, err => {
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

    return !!validToken;
}

module.exports = { generateToken, setToken, getTimestampByToken, checkConcreteToken };