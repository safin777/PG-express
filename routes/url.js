const express = require('express')
const router = express.Router()
const {
  getIndexPage,
  generateNewShortUrl,
  getToRedirectOriginalUrl,
  getAnalyticsReportofClicks,
} = require('../controllers/url')

router.get('/', getIndexPage).post('/', generateNewShortUrl) // post a url into the database
router.get('/:shortId', getToRedirectOriginalUrl) // get the original url from the database & redirect to it
router.get('/analytics/:shortId', getAnalyticsReportofClicks) // get the analytics report of clicks

module.exports = router
