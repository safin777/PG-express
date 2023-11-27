const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

//logger middleware

app.use((req, res, next) => {
  if (res.path == '/favicon.ico') {
    res.end()
  } else {
    fs.appendFile(
      'log.txt',
      `${Date.now()} : ${req.method}: ${req.path} \n`,
      (err, data) => {
        if (err) {
          console.log(err)
        } else {
          next()
        }
      },
    )
  }
})

app.get('/', (req, res) => {
  res.send('Hello from express')
})

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error starting server')
  } else {
    console.log('Node server is running on port 3000')
  }
})
