'use strict'
const questions = require('../models/index').questions;
const { writeFile } = require('fs');
const { promisify } = require('util');
const { join } = require('path');
const uuid = require('uuid');

const write  = promisify(writeFile);

async function createQuestion(request, h) {
    if(!request.state.user){
        return h.redirect('/login')
    }
    let result, filename
    try {
        const buffer = Buffer.from(request.payload.image)
        if(Buffer.isBuffer(buffer)) {
            // check this
            filename = `${uuid.v1()}.png`
            await write(join(__dirname, '..', 'public', 'uploads', filename), request.payload.image)
        }

        result = await questions.create(request.payload, request.state.user, filename)
        request.log('info', 'pregunta creada con el id: ' + result)
    } catch (error) {
        request.log('error', 'ocurrio un error: '+ error)
        return h.view('ask', {
            title: 'crear pregunta',
            error: 'error registrando la pregunta'
        }).code(500).takeover()
    }

    return h.redirect(`/question/${result}`)
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