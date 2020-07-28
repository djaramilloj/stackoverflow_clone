'use strict'

const Hapi = require('hapi');
const handlebars = require('./lib/helpers');
const inert = require('inert');
const path = require('path');
const good = require('good');
const methods = require('./lib/methods');
const vision = require('vision');
const routes = require('./routes');
const site = require('./controllers/site');

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    });

    await server.register(inert);
    await server.register(vision);
    await server.register({
        plugin: good,
        options: {
            reporters: {
                console: [
                    {
                        module: 'good-console'
                    },
                    'stdout'
                ]
            }
        }
    })

    server.method('setAnswerRight', methods.setAnswerRight)
    server.method('getLast', methods.getLast, {
        cache: {
            expiresIn: 1000 * 60,
            generateTimeout: 2000
        }
    })

    // cookies
    server.state('user', {
        ttl: 1000 * 60 * 60 * 24 * 7,
        isSecure: process.env.NODE_ENV === 'prod',
        encoding: 'base64json',       
    })

    server.views({
        engines: {
            hbs: handlebars
        },
        relativeTo: __dirname,
        path: 'views',
        layout: true,
        layoutPath: 'views'
    });


    // intersectamos el ciclo de vida del servidor
    server.ext('onPreResponse', site.fileNotFound);
    server.route(routes);

    await server.start();
    server.log('info', `Server running on ${server.info.uri}`)
};

// BUENA PRACTICA
process.on('unhandledRejection', (err) => {
    server.log('unhandledRejection', err)
    process.exit(1);
});

process.on('unhandledException', (err) => {
    server.log('unhandledException', err)
    process.exit(1);
});

init();