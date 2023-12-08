const { getUser } = require('../services/auth')
//TODO: add a middleware to check if the user is logged in or not by checking the cookie and session

const restrictToLoggedInUserOnly = async (req, res, next) => {
  const userId = req.headers['authorization']
  //console.log("nsdmnsdmsndm")
  if (!userId) return res.redirect('/login')

  const token = userId.split('Bearer ')[1]
  const user = getUser(token)

  if (!user) return res.redirect('/login')
  req.user = user
  next()
}

const checkAuth = async (req, res, next) => {
  const userId = req.headers['authorization']
  if (!userId) return next()
  const token = userId.split('Bearer ')[1]
  const user = getUser(token)
  req.user = user
  next()
}

module.exports = {
  __restrictToLoggedInUserOnly: restrictToLoggedInUserOnly,
  __checkAuth: checkAuth,
}
