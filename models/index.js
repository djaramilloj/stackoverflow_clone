'use strict'

const firebase = require('firebase-admin');
const serviceAccount = require('../config/firebase.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://stackoverflow-clone-8cbff.firebaseio.com/'
})

const db = firebase.database();

const Users = require('./users');
const Question = require('./questions');

module.exports = {
    users: new Users(db),
    questions: new Question(db)
}