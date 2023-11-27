const fs = require('fs')

const createRequsetResponseLogger = (fileName) => {
  return (req, res, next) => {
    if (res.path == '/favicon.ico') {
      res.end()
    } else {
      fs.appendFile(
        fileName,
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
  }
}

module.exports ={
    __createRequsetResponseLogger : createRequsetResponseLogger
} 
