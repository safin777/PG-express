
const express = require('express')
const app = express()
const PORT = process.env.PORT;
const dbConnect = require('./dbConnect')
const { __createRequsetResponseLogger } = require('./middlewares/index')
const dbUrl = process.env.MONGO_URI 


//connect the database
console.log(dbUrl)
dbConnect(dbUrl)

//Write all router here
const userRouter = require('./routes/user')
const { db } = require('./models/user')

//logger middleware
app.use(__createRequsetResponseLogger('log.txt'))


app.use(express.json())
app.use("/user", userRouter)



//listen the port
app.listen(PORT, (err) => {
  if (err) {
    console.log('Error starting server')
  } else {
    console.log('Node server is running on port 3000')
  }
})
