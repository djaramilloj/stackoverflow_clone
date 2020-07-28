'use strict'

const joi = require('@hapi/joi');
const site = require('./controllers/site');
const user = require('./controllers/user');
const question = require('./controllers/question');

let routes = [

    {
        method: 'GET',
        path: '/', 
        options: {
            cache: {
                expiresIn: 1000 * 30,
                privacy: 'private'
            }
        },
        handler: site.home
    },

    {
        method: 'GET',
        path: '/register', 
        handler: site.register
    },

    {
        method: 'POST',
        options: {
            validate: {
                payload: {
                    name: joi.string().required().min(3),
                    email: joi.string().email().required(),
                    password: joi.string().required().min(6),
                },
                failAction : user.failValidation
            }
        },
        path: '/create-user', 
        handler: user.createUser
    },
    {
        method: 'GET',
        path: '/login', 
        handler: site.login
    },

    {
        method: 'GET',
        path: '/question/{id}', 
        handler: site.viewQuestion
    },

    {
        method: 'GET',
        path: '/logout', 
        handler: user.logout
    },

    {
        method: 'GET',
        path: '/ask', 
        handler: site.ask
    },

    {
        method: 'POST',
        options: {
            validate: {
                payload: {
                    email: joi.string().email().required(),
                    password: joi.string().required().min(6)
                },
                failAction : user.failValidation
            }
        },
        path: '/validate-user', 
        handler: user.validateUser
    },

    {
        method: 'POST',
        options: {
            validate: {
                payload: {
                    title: joi.string().required(),
                    description: joi.string().required(),
                    image: joi.any().optional()
                },
                failAction : user.failValidation
            }
        },
        path: '/create-question', 
        handler: question.createQuestion
    },

    {
        method: 'POST',
        options: {
            validate: {
                payload: {
                    answer: joi.string().required(),
                    id: joi.string().required()
                },
                failAction : user.failValidation
            }
        },
        path: '/answer-question', 
        handler: question.answerQuestion
    },
    {
        method: 'GET',
        path: '/answer/{questionId}/{answerId}', 
        handler: question.setAnswerRight
    },

    {
        method: 'GET',
        path: '/assets/{param*}',
        handler:  {
            directory: {
                path: '.',
                index: ['index.html']
            }
        }
    },
    {
        method: ['GET', 'POST'],
        path: '/{any*}',
        handler: site.notFound   
    }
]

module.exports = routes;
