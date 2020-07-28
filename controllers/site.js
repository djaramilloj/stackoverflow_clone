'use strict'

const questions = require('../models/index').questions;

function register (request, h) {
    // .view is possible thanks to views and hbs
    if( request.state.user) {
        return h.redirect('/')
    }
    return h.view('register', {
        title: 'Registro',
        user: request.state.user
    })
}

function login (request, h) {
    // .view is possible thanks to views and hbs
    if( request.state.user) {
        return h.redirect('/')
    }
    return h.view('login', {
        title: 'Ingresa',
        user: request.state.user
    })
}

function notFound(request, h) {
    return h.view('404', {}, {layout: 'error-layout'}).code(404)
}


function fileNotFound(request, h) {
    const response = request.response 
    if (!request.path.startsWith('/api') && response.isBoom && response.output.statusCode === 404) {
        return h.view('404', {}, {layout: 'error-layout'}).code(404)
    }
    return h.continue;
}

async function home (request, h) {
    const data = await request.server.methods.getLast(10)
    return h.view('index', {
        title: 'home',
        user: request.state.user,
        questions: data
    })
}

function ask (request, h){
    if(!request.state.user){
        return h.redirect('/login')
    }

    return h.view('ask', {
        title: 'crear pregunta',
        user: request.state.user
    })
}

async function viewQuestion (request, h){
    let data 
    try {
        data = await questions.getOne(request.params.id)
        if (!data) {
            return notFound(request, h)
        }
    } catch(error) {
        console.error(error)
    }

    return h.view('question', {
        title: 'Detalles',
        user: request.state.user,
        question: data,
        key: request.params.id
    })
}

module.exports = {
    register,
    home,
    login,
    notFound,
    fileNotFound,
    ask,
    viewQuestion
}