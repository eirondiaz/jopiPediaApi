const swaggerJsDoc = require('swagger-jsdoc')
const swaggerDocument = require('./swagger.json')

//swagger doc
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'JopiPedia API',
            description: 'Esta es la api para la JopiPedia',
            contact: {
                name: 'Eiron Diaz'
            },
            servers: ['http://localhost:3200', 'https://jopipedia.herokuapp.com']
        }
    },
    apis: ['src/swagger-doc.js']
}

const swaggerDocs = swaggerJsDoc(swaggerDocument)

module.exports = swaggerDocs