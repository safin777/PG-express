const URL = require('../models/url')
const User = require('../models/user')
const shortid = require('shortid') // nanoid generates random strings of characters
const { getUser } = require('../services/auth')
const { get } = require('mongoose')
//TODO: Implement the getIndexPage function



const getIndexPage = async (req, res) => {
  let user = getUser(req.cookies?.sessionUserToken)
  let uid = user[0]._id.toString()
  const userinfo =  await User.find({ _id: uid});
  const urls = await URL.find({ createdBy: uid});
  console.log("urls-----------------",urls)
  return res.render('../views/url/index', { urls: urls , userinfo:userinfo })
}

//TODO: Implement the generateNewShortUrl function

const generateNewShortUrl = async (req, res) => {
  let user = getUser(req.cookies?.sessionUserToken)
  let uid = user[0]._id.toString()
  const input_url = req.body.given_url
  //validation of the url
  if (!input_url) return res.status(400).json({ message: 'url is required' })
  const shortId = shortid()
  
  const url = new URL({
    shortId: shortId,
    redirectUrl: input_url,
    visitHistory: [],
    createdBy: uid,
  })
  await url.save()

  return res.redirect('/url')
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
    return res.json({
      totalClicks: totalClicks,
      analytics: result.visitHistory,
    })
  }
}

module.exports = {
  getIndexPage,
  generateNewShortUrl,
  getToRedirectOriginalUrl,
  getAnalyticsReportofClicks,
}
