export default class User {
    constructor(name = '', email = '', password = '') {
        this.id = newId(users.length)
        this.name = name
        this.email = email
        this.password = password
    }
}

const newId = function (val) {
    val = (val + '').split('')
    return [...('000000'.split('').slice(val.length)), ...val].join('')
}

export const adduser = function (name = '', email = '', password = '') {
    for (let i in users) {
        if (users[i].email === email)
            return {
                success: false,
                action: 'fail',
                message: 'email has been taken',
                data: 'email has been taken',
            }
    }
    const a = new User(name, email, password)
    users.push(a)
    localStorage.setItem('users', JSON.stringify(users))
    return {
        success: true,
        action: 'success',
        message: 'success',
        data: 'success',
        value: a
    }
}

export let users = []

if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'))
    console.log(users)
}
else {
    adduser('suavis', 'suave@email.dom', '12345')
    adduser('ndatinya', 'ndatinya@email.dom', '12345')
}

export function find(attr, value) {
    for (let i of users) {
        if (i[attr] === value) {
            return i
        }
    }
    return null
}