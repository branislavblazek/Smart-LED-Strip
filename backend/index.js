const express = require('express');
require('dotenv').config()
const { ERROR } = require('./messages');
const { requestLog } = require('./logger');

const app = express();

const port = process.env.APP_PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json({
    strict: true,
    type: 'application/json',
    verify: (req, res, buf) => {
        try {
            JSON.parse(buf)
        } catch (e) {
            res.status(404).send({ message: ERROR.INVALID_PARAM });
        }
    }
}));

app.use(requestLog);

app.use('/api/login', require('./routes/login'));

app.use((req, res) => {
    res.status(404).send({
        error: 'Not found',
    });
});