const fs = require('fs');

const generateToken = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const setToken = token => {
    return new Promise((resolve, reject) => {
        const time = Date.now();
        fs.appendFile('./tokens', `${time}: ${token}\n`, err => {
            if (err) return reject(err);
            resolve();
        });
    });
};

module.exports = { generateToken, setToken };