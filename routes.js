'use strict'

const joi = require('@hapi/joi');
const site = require('./controllers/site');
const user = require('./controllers/user');

let routes = [

    {
        method: 'GET',
        path: '/', 
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
                    password: joi.string().required().min(6)
                }
            }
        },
        path: '/create-user', 
        handler: user.createUser
    },


    {
        method: 'GET',
        path: '/{param*}',
        handler:  {
            directory: {
                path: '.',
                index: ['index.html']
            }
        }
    },
]

module.exports = routes;
