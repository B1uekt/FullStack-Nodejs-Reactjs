const express = require('express');
const { getHomePage } = require('../controller/HomeController');
const router = express.Router()

router.get('/', getHomePage)
module.exports = router