const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('./swagger-doc')
const bodyParser = require('body-parser')
require('./database')
require('./swagger-doc')
require('dotenv').config()

//settings
const app = express()
app.set('port', process.env.PORT || 3200)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

//middlewares
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res
      .status(200)
      .send('API de la JopiPedia hecha con NODE.JS/Express. Desarrollada por Eiron Diaz.')
})
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/tema', require('./routes/tema.routes'))
app.use('/api/pregunta', require('./routes/pregunta.routes'))
app.use('/api/score', require('./routes/score.routes'))
app.use('/api/restriccion', require('./routes/restriccion.routes'))

module.exports = app