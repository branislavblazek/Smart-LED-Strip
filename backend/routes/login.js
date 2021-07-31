const express = require('express');
const { SUCCESSFUL } = require('../messages');
const router = express.Router();

router.post('', (req, res) => {
    const pin = req.body?.pin;
    console.log(req.body);
    res.send({ message: SUCCESSFUL.LOGIN });
});

module.exports = router;