const express = require('express')
const router = express.Router()
const {
  redirectToLoginPage,
  validateLoginInfo,
  getRegisterPage,
  validateRegisterInfo,
} = require('../controllers/user')
const { getUser } = require('../services/auth')

router.get('/', (req, res) => {
  let user = getUser(req.cookies?.sessionUserToken)
  console.log('static.js file', user)
  if (user) {
    return res.redirect('/url')
  }
  return res.render('index')
})

//TODO: register

router.get('/register', getRegisterPage).post('/register', validateRegisterInfo)

//TODO: login

router.get('/login', redirectToLoginPage).post('/login', validateLoginInfo)

module.exports = router
