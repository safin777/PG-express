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
  const userId = req.headers['authorization']
  console.log('dnsdjnsdjsn')
  const token = userId.split('Bearer ')[1]
  const user = getUser(token)
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
