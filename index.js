'use strict'

const Hapi = require('hapi');
const handlebars = require('handlebars');
const inert = require('inert');
const path = require('path');
const vision = require('vision');
const routes = require('./routes');

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

    server.views({
        engines: {
            hbs: handlebars
        },
        relativeTo: __dirname,
        path: 'views',
        layout: true,
        layoutPath: 'views'
    });

    server.route(routes);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();