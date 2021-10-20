const express = require('express');
const { ERROR } = require('./messages');
const { logRequest } = require('./logger');
const { sendRequest } = require('./utils/requestUtils');
const { isLoggedIn } = require('./routes/auth');
const cors = require("cors")
require('dotenv').config()

const app = express();

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json({
    strict: true,
    type: 'application/json'
}));
app.use(cors())

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        sendRequest(res.status(400), ERROR.INVALID_BODY);
    } else next();
});

app.use(logRequest);
app.use('/api/login', require('./routes/login'));
app.use('/api/control', isLoggedIn, require('./routes/control'));

app.use((req, res) => sendRequest(res.status(404), ERROR.NOT_FOUND));