const keys = require('../config/keys')

const mongoose = require('mongoose')

const url = keys.env === 'development' 
    ? 'mongodb://localhost:27017/spotify'
    : `mongodb://${keys.dbUser}:${keys.dbPassword}@ds349175.mlab.com:49175/spotify`
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
})

module.exports.User = require('./user')