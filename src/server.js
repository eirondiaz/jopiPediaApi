const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
//const swaggerJsDoc = require('swagger-jsdoc')
//const swaggerUI = require('swagger-ui-express')

const app = express()
app.set('port', process.env.PORT || 3200)

let CONNECTION_STRING = 'mongodb+srv://Eirond:ClGYBfpCA6eDd1wX@jopipedia.u33ht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('DB Connected!'))
    .catch(error => console.log(error))

//swagger doc
const swaggerOptions = {

}

//middlewares
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.get('/', (req, res) => {
    res.send('API de la JopiPedia hecha con NODE.JS/Express. Desarrollada por Eiron Diaz.')
})

module.exports = app