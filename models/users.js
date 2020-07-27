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

    async validateUser(data) {
        const dataToValidate = {...data}
        const userQuery = await this.collection
            .orderByChild('email')
            .equalTo(dataToValidate.email)
            .once('value')

        const userFound = userQuery.val();
        if(userFound) {
            const userId = Object.keys(userFound)[0]
            const passwordRight = await bcrypt.compare(dataToValidate.password, userFound[userId].password);
            const result = (passwordRight) ? userFound[userId] : false;

            return result;
        }
        return false;
    }

    static async encrypt(password){
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds)
        return hashPassword
    }
}

module.exports = Users