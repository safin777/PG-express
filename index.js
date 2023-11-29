
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({ path: '.env'})
const dbConnect = require('./dbConnect')
const { __createRequsetResponseLogger } = require('./middlewares/index')
const dbUrl= process.env.MONGO_URI
const PORT = process.env.PORT;



//connect the database
dbConnect(dbUrl)

//Write all router here
const userRouter = require('./routes/user')
const urlRouter = require('./routes/url')


//logger middleware 
//TODO:  Middleware will start with __ (double underscore)

app.use(__createRequsetResponseLogger('log.txt'))



app.use(express.json())
app.use("/user", userRouter)
app.use("/url", urlRouter)



//listen the port
app.listen(PORT, (err) => {
  if (err) {
    console.log('Error starting server')
  } else {
    console.log('Node server is running on port 3000')
  }
})
