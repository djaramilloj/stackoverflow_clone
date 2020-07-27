'use strict'
const questions = require('../models/index').questions;

async function createQuestion(request, h) {
    if(!req.state.user){
        return h.redirect('/login')
    }
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
    if(!req.state.user){
        return h.redirect('/login')
    }
    let result
    try {
        resul = await questions.answer(req.payload, req.state.user)
        console.log(`respuesta creada: ${result}`)
    }catch(error) {
        console.error(error)        
    }

    return h.redirect(`/question/${req.payload.id}`)
}


async function setAnswerRight(req, h){
    if(!req.state.user){
        return h.redirect('/login')
    }
    let result
    try {
        result = await req.server.methods.setAnswerRight(req.params.questionId, req.params.answerId, req.state.user)
        console.log(result);
    } catch(error) {
        console.error(error);
    }

    return h.redirect(`/question/${req.params.questionId}`)
}

module.exports = {
    createQuestion,
    answerQuestion,
    setAnswerRight
}