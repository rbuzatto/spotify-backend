require('dotenv').config()

const express = require('express')
const querystring = require('querystring')
const axios = require('axios')
const cors = require('cors')
const helmet = require('helmet')

const keys = require('./config/keys')

const body = { "grant_type": "client_credentials" }

const authorization = `Basic ${keys.SpotifyAuth}`
const contentType = "application/x-www-form-urlencoded"

const app = express()

app.use(helmet())
app.use(cors())

app.get('/', async (req, res) => {
    const response = await axios.post('https://accounts.spotify.com/api/token',
        querystring.stringify(body),
        {
        headers: {
            "Content-Type": contentType,
            "Authorization": authorization
            }
        }
    )

    if (response.status === 200) {
        res.send({ token: response.data.access_token })
    } else {
        res.status(501).send({ error: 'Could Not Authenticate User' })
    }
    
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))