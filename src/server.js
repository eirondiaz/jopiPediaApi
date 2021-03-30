const express = require('express')
const cors = require('cors')
require('./database')
//const swaggerJsDoc = require('swagger-jsdoc')
//const swaggerUI = require('swagger-ui-express')

const app = express()
app.set('port', process.env.PORT || 3200)

//swagger doc
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'JopiPedia API',
            description: 'Esta es la api para la JopiPedia',
            contact: {
                name: 'Eiron Diaz'
            },
            servers: ['http://localhost:3200']
        }
    },
    apis: ['index.js']
}

//const swaggerDocs = swaggerJsDoc(swaggerOptions)
//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

//middlewares
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/tema', require('./routes/tema.routes'))
app.get('/', (req, res) => {
    res.send('API de la JopiPedia hecha con NODE.JS/Express. Desarrollada por Eiron Diaz.')
})

module.exports = app