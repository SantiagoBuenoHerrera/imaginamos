const express = require('express');
const router = express.Router();

router.get('/', (res) => { // No es buena practica poner variables que no se usa, CIRCLECI no las acepta por linter
    res.status(200).send('Hello world!');
});

module.exports = router;