
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({ path: '.env'})
const path = require('path')
const dbConnect = require('./dbConnect')
const { __createRequsetResponseLogger } = require('./middlewares/index')
const dbUrl= process.env.MONGO_URI
const PORT = process.env.PORT;

//connect the database
dbConnect(dbUrl)

//Write all router here
const staticRouter = require('./routes/static')
const userRouter = require('./routes/user')
const urlRouter = require('./routes/url')

//set view engine
app.set('view engine', 'ejs') //to set the view engine
app.set('views', path.resolve("./views")) //to set the views directory
app.use(express.json()) //to support json encoded bodies
app.use(express.static(path.resolve("./public"))) //to serve static files
app.use(express.urlencoded({ extended: false })) //to support form  data


//logger middleware 
//TODO:  Middleware will start with __ (double underscore)

app.use(__createRequsetResponseLogger('log.txt'))


//using the routes 
app.use("/", staticRouter)
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
