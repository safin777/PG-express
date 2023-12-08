const User = require('../models/user')
const { setUser } = require('../services/auth')


//TODO: Login part here

const redirectToLoginPage = (req, res) => {
  res.render('../views/auth/login')
}

const validateLoginInfo = async (req, res) => {
  const { email, password } = req.body
  try {
    const result = await User.exists({ email: email })
    if (!result) {
      return res.status(400).json({ message: 'User not found' })
    } else {
      const user = await User.findOne({ email: email })
      if (user.password == password) {
        const token = setUser(user) //set session
        //res.cookie('sessionUserToken', token) //set cookie
        
        return res.json({ token })
      } else {
        return res.status(400).json({ message: 'Password is incorrect' })
      }
    }
  } catch (err) {
    console.log(err)
  }
}

//TODO: Register part here

const getRegisterPage = (req, res) => {
  res.render('../views/auth/register')
}

const validateRegisterInfo = async (req, res) => {
  const { first_name, last_name, user_email, user_password } = req.body
  try {
    if (!first_name || !last_name || !user_email || !user_password) {
      return res.status(400).json({ message: 'All fields are required' })
    } else {
      const emailAlreadyExits = User.exists({ email: user_email })
      if (emailAlreadyExits == true) {
        return res.status(400).json({ message: 'Email already exists' })
      } else {
        const user = new User({
          firstName: first_name,
          lastName: last_name,
          email: user_email,
          password: user_password,
        })
        await user.save()
        return res.redirect('/user/login')
      }
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  redirectToLoginPage,
  validateLoginInfo,
  getRegisterPage,
  validateRegisterInfo,
}
