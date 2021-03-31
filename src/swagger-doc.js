const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const express = require('express')
const app = require('./server')

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

const swaggerDocs = swaggerJsDoc(swaggerOptions)
//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

/**
 * @swagger
 * /api/pregunta/getbytemaid/{id}:
 *  get:
 *   summary: obtener preguntas filtrado por tema
 *   tags: 
 *    - pregunta
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *    - in: header
 *      name: Authorization
 *      schema:
 *        type: string
 *      required: true
 *   responses:
 *    '200':
 *      description: dsdsadad
 */

module.exports = swaggerDocs