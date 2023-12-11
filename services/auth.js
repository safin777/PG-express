
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET_KEY


const setUser = (user) => {
 return jwt.sign({
  _id : user._id,
  email: user.email,
  role: user.role
 },SECRET_KEY);
}

const getUser = (token) => {
  if (!token) return null;
  return jwt.verify(token,SECRET_KEY);
}

module.exports = {
  setUser,
  getUser,
}
