const mongoose = require('mongoose');
const { urlPattern } = require('../utils/url-patterns');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlPattern.test(url),
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlPattern.test(url),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlPattern.test(url),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  MovieId: {
    type: String,
    required: true,
  },
  NameRU: {
    type: String,
    required: true,
  },
  NameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
