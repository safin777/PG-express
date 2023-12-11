const { getUser } = require('../services/auth')
//TODO: add a middleware to check if the user is logged in or not by checking the cookie and session

const checkForAuthentication = async (req, res, next) => {
  const authorizationToken = await req.cookies?.sessionUserToken;
  req.user = null;
  if (!authorizationToken) return next();
  const user = await getUser(authorizationToken);
  if (!user) return next();
  req.user = user;
  return next();
  
}

const restricToRoles = (roles=[]) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.end("unauthorized")
    }
    if (!req.user) {
      return res.redirect('/login');
    }
    return next();
  }
}



module.exports = {
  __checkForAuthentication: checkForAuthentication,
  __restricToRoles: restricToRoles,
}
