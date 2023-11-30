const express = require('express')
const router = express.Router()
const {redirectToLoginPage,validateLoginInfo,getRegisterPage,validateRegisterInfo} = require('../controllers/user')

//TODO: register

router.get('/register',getRegisterPage)
.post('/register',validateRegisterInfo);

//TODO: login 

router.get('/login',redirectToLoginPage)
.post('/login',validateLoginInfo);




module.exports = router