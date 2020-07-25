'use strict'

const users = require('../models/index').users;

async function createUser (request, h) {
    // remember that request object has lifecycle events, (just like ionic)
    let result 
    try {
        result = await users.createUser(request.payload)
        return h.response(`Usuario creado ID: ${result}`)
    } catch (error){
        console.error(error)
        return h.response('problemas al crear el usuario').code(500)
    }  
}

module.exports = {
    createUser: createUser
}
