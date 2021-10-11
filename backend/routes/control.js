const express = require('express');
const router = express.Router();
const { CONTROL } = require('../messages');
const { sendRequest } = require('../utils/requestUtils');

router.get('', (req, res) => {
    sendRequest(res, CONTROL.GET, { 'controls_status': [{ 'control1': true }] })
})

router.post('', (req, res) => {
    const body = req.body;
    console.log(body?.settings)
    sendRequest(res, CONTROL.POST, body)
});

module.exports = router;