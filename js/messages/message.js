export default class Message {
    constructor(name = '', email = '', body = '') {
        this.id = newId(messages.length)
        this.name = name;
        this.email = email;
        this.body = body;
        this.date = new Date();
    }
    toJson() {
        return JSON.stringify(this)
    }
}

const newId = function (val) {
    val = (val + '').split('')
    return [...('000000'.split('').slice(val.length)), ...val].join('')
}

export const messages = []

export const addMessage = function (name = '', email = '', body = '') {
    let m = new Message(name, email, body)
    messages.push(m)
    return m
}