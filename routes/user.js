const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    await res.send('Hello from pg_express')
})


module.exports = router