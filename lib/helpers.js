'use strict'

const handlebars = require('handlebars')

function registerHelpers() {
    handlebars.registerHelper('answerNumber', (answers) => {
        const keys = Object.keys(answers)
        return keys.length
    })

    handlebars.registerHelper('ifEquals', (a, b, option) => {
        if (a === b){
            return option.fn(this)
        }
        return option.inverse(this)
    })

    return handlebars
}

module.exports = registerHelpers()
