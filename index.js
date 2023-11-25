const fs = require('fs')
const express = require('express')
const app = express() // create express app



app.get('/', (req, res) => {
  res.send('Hello from express')
})

app.listen('3000', (err) => {
  if (err) {
    console.log('Error starting server')
  } else {
    console.log('Node server is running on port 3000')
  }
})


