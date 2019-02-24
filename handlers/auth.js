const db = require('../models')
const jwt = require('jsonwebtoken')

const keys = require('../config/keys')

exports.login = async function(req, res) {

    // finding a user
    try {
        const user = await db.User.findOne({
            email: req.body.email
        })
    
        let { id, username } = user
        const isMatch = await user.comparePassword(req.body.password)

        if(isMatch) {
            let token = jwt.sign({ id, username }, keys.secretKey, { expiresIn: '1h' })
    
            return res.status(200).json({ id, username, token })
        } else {
            return res.status(400).send('Invalid Email or Password')
        }
        
    } catch (error) {
        return res.status(400).send('Invalid Email or Password')
    }

}

exports.signup = async function(req, res){
    try {
        // create user
        let user = await db.User.create(req.body)
        let { id, username } = user

        // create a token
        let token = jwt.sign({
            id, username
        }, keys.secretKey)

        return res.status(200).json({ id, username, token })

    } catch (error) {
        console.log(error)
        return res.status(400).json({error: 'username and/or email is already taken'})
    }
}