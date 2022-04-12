const router = require('express').Router()
const authControl = require("../controllers/authControl");

router.post('/register', authControl.register)

router.post('/login', authControl.login)

router.post('/logout', authControl.logout)

router.post('/rf_token', authControl.generateAccessToken)


module.exports = router