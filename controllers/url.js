const URL = require('../models/url')
const shortid = require('shortid') // nanoid generates random strings of characters

//TODO: Implement the generateNewShortUrl function

const generateNewShortUrl = async (req, res) => {
  const body = req.body
  //validation of the url
  if (!body.url) return res.status(400).json({ message: 'url is required' })
  const shortId = shortid()

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  })
  return res.json({ id: shortId })
}

//TODO: Implement the getToRedirectOriginalUrl function

const getToRedirectOriginalUrl = async (req, res) => {
  const shortid = req.params.shortId

  const entry = await URL.findOneAndUpdate(
    { shortId: shortid },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true },
  )

  if (!entry) {
    return res.status(404).json({ message: 'Not found' })
  } else {
    return res.redirect(entry.redirectUrl)
  }
}

//TODO: Implement the getAnalyticsReportofClicks function to track how many visits in the link

const getAnalyticsReportofClicks = async (req, res) => {
  const shortid = req.params.shortId
  const result = await URL.findOne({ shortId: shortid })
  if (!result) {
    return res.status(404).json({ message: 'Not found' })
  } else {
    let totalClicks = result.visitHistory.length
    return res.json({ totalClicks: totalClicks , analytics: result.visitHistory })
  }
}

module.exports = {
  generateNewShortUrl,
  getToRedirectOriginalUrl,
  getAnalyticsReportofClicks,
}
