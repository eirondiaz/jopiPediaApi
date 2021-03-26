const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.set('port', process.env.PORT || 3200)

let CONNECTION_STRING = 'mongodb+srv://Eirond:ClGYBfpCA6eDd1wX@jopipedia.u33ht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('DB Connected!'))
    .catch(error => console.log(error))

//middlewares
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//routes
app.use('/api/auth', require('./routes/auth.routes'))

module.exports = app