'use strict'

function register (request, h) {
    // .view is possible thanks to views and hbs
    return h.view('register', {
        title: 'Registro'
    })
}

function home (request, h) {
    // .file is possible thanks to inert
    return h.view('index', {
        title: 'home'
    })
}

module.exports = {
    register,
    home
}