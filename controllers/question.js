'use strict'
const questions = require('../models/index').questions;

async function createQuestion(request, h) {
    let result
    try {
        result = await questions.create(request.payload, request.state.user)
        console.log('pregunta creada con el id: ' + result)
    } catch (error) {
        console.error('ocurrio un error: '+ error)
        return h.view('ask', {
            title: 'crear pregunta',
            error: 'error registrando la pregunta'
        }).code(500).takeover()
    }

    return h.response('pregunta creada con el id: ' + result)
}

async function answerQuestion(req, h) {
    let result
    try {
        resul = await questions.answer(req.payload, req.state.user)
        console.log(`respuesta creada: ${result}`)
    }catch(error) {
        console.error(error)        
    }

    return h.redirect(`/question/${req.payload.id}`)
}

module.exports = {
    createQuestion,
    answerQuestion
}