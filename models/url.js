const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },

  redirectUrl: {
    type: String,
    required: true,
  },

  visitHistory : [{ timestamp : {
    type : Number,
  }}]


}, { timestamps: true })


const URL = mongoose.model('urls', urlSchema); //urls is the collection name & URL is the model name

module.exports = URL;