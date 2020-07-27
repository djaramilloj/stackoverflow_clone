'use strict'

const users = require('../models/index').users;
const boom = require('boom');

async function createUser (request, h) {
    // remember that request object has lifecycle events, (just like ionic)
    let result 
    try {
        result = await users.createUser(request.payload)
        return h.view('register', {
            title: 'Registro',
            success: 'Usuario creado exitosamente'
        })
    } catch (error){
        console.error(error)
        return h.view('register', {
            title: 'Registro',
            error: 'Error creando el usuario'
        })
    }  
}

function logout(request, h) {
    return h.redirect('/login').unstate('user')
}

async function validateUser(request, h) {
    let result;
    try {
        result= await users.validateUser(request.payload)
        if (!result) {
            return h.view('login', {
                title: 'Login',
                error: 'Email o contraseña incorrectos'
            })
        }else {
            return h.redirect('/').code(200).state('user', {
                name: result.name,
                email: result.email
            })
        }
    } catch (error){
        console.error(error)
        return h.view('login', {
            title: 'Login',
            error: 'problemas al validar el usuario'
        })
    }  
}

function failValidation(request, h, error) {
    const templates = {
        '/create-user': 'register',
        '/validate-user': 'login',
        '/create-question': 'ask'
    }

    return h.view(templates[request.path], {
        title: 'error de validación',
        error: 'Por favor revisa tus credenciales'
    }).code(400).takeover()
}

module.exports = {
    createUser: createUser,
    validateUser: validateUser,
    logout: logout,
    failValidation: failValidation
}
