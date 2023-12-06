const { getUser } = require('../services/auth')
//TODO: add a middleware to check if the user is logged in or not by checking the cookie and session

const restrictToLoggedInUserOnly = async (req, res, next) => {
  const userId = req.cookies?.sessionUserToken;
  if (!userId) return res.redirect('/login')
  const user = getUser(userId)
  //console.log("user-----------------",user)
  if (!user) return res.redirect('/login')
  req.user = user
  //console.log("req.user-----------------",req.user)
  next()
}


const checkAuth = async (req, res, next) => {
  const userId = req.cookies?.sessionUserToken
  const user = getUser(userId)
  req.user = user
  next()
}

module.exports = {
  __restrictToLoggedInUserOnly: restrictToLoggedInUserOnly,
  __checkAuth: checkAuth,
}
