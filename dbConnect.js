const mongoose = require('mongoose')
const dbConnect = async(url) => {
  try {
    await mongoose.connect(url,{
      dbName: process.env.DB_NAME,
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }
}

module.exports = dbConnect
