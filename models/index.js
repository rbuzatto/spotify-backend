const keys = require('../config/keys')

const mongoose = require('mongoose')
mongoose.connect(`mongodb://${keys.dbUser}:${keys.dbPassword}@ds349175.mlab.com:49175/spotify`, {
    useNewUrlParser: true,
    useCreateIndex: true
})

module.exports.User = require('./user')