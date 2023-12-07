const { getUser } = require('../services/auth')
//TODO: add a middleware to check if the user is logged in or not by checking the cookie and session

const restrictToLoggedInUserOnly = async (req, res, next) => {
  const userId = req.cookies?.sessionUserToken;
  if (!userId) return res.redirect('/login')
  const user = getUser(userId)
  if (!user) return res.redirect('/login')
  req.user = user
  next()
}


const checkAuth = async (req, res, next) => {
  const userId = req.cookies?.sessionUserToken
  const user = getUser(userId)
  console.log("checkAuth method",user)
  req.user = user
  next()
}

module.exports = {
  __restrictToLoggedInUserOnly: restrictToLoggedInUserOnly,
  __checkAuth: checkAuth,
}
