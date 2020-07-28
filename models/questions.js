'use strict'

class Question{
    constructor(db){
        this.db = db
        this.ref = this.db.ref('/')
        this.collection = this.ref.child('questions')
    }

    async create (info, user, filename) {
        const data = {
            description: info.description,
            title: info.title,
            owner: user
        }

        if(filename) {
            data.filename = filename
        }

        const question = this.collection.push(data)
        return question.key
    }

    async getLast(amount) {
        const query = await this.collection.limitToLast(amount).once('value')
        const data = query.val()
        return data
    }


    async getOne(id) {
        const query = await this.collection.child(id).once('value')
        const data = query.val()
        return data
    }


    async answer(data, user) {
        const dataToSave = {... data}
        const answer = await this.collection.child(dataToSave.id).child('answers').push()
        answer.set({text: dataToSave.answer, user: user})
        
        return answer
    }

    async setAnswerRight(questionId, answerId, user) {
        const query = await this.collection.child(questionId).once('value')
        const question = query.val()
        const answers = question.answers

        if(!user.email === question.owner.email){
            return false
        }

        for(let key in answers) {
            answers[key].correct = (key === answerId)
        }

        const update = await this.collection.child(questionId).child('answers').update(answers)
        return update
    }
}


module.exports = Question;