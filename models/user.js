const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.pre('save', async function(next) {
    try {
        if(!this.isModified('password')) {
            return next()
        }

        let hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword

        return next()

    } catch (error) {
        return next(error)
    }
})

userSchema.methods.comparePassword = async function(password, next) {
    try {
        let isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    } catch (error) {
        return next(error)
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User