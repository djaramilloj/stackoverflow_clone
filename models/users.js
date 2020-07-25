'use strict'
const bcrypt = require('bcrypt');

class Users {
    constructor(db){
        this.db = db
        this.ref = this.db.ref("/")
        this.collection = this.ref.child("users")
    }

    async createUser(data) {
        const dataToSave = {...data}
        dataToSave.password = await this.constructor.encrypt(dataToSave.password)
        const newUser = this.collection.push(dataToSave)

        return newUser.key;
    }

    static async encrypt(password){
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds)
        return hashPassword
    }
}

module.exports = Users