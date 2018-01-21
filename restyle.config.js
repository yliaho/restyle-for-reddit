const dotenv = require('dotenv').config()
const path = require('path')

module.exports = {
  credentials: {
    username: process.env.R_USERNAME,
    password: process.env.R_PASSWORD,
    clientId: process.env.R_CLIENT_ID,
    clientSecret: process.env.R_CLIENT_SECRET
  },

  cssPath: path.resolve(__dirname, 'dist/index.css'),
  subreddit: 'ValleTheme'
}
