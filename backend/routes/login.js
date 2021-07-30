const express = require('express');
const router = express.Router();

router.post('', (req, res) => {
    const pin = req.body?.pin;
    console.log(pin);
});

module.exports = router;