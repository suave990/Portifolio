import User, { adduser, users } from "./user.js";
import validEmail from "../valid/email.js";

const USERFORM = document.querySelector('form[name=createAccount]')

const name = USERFORM.querySelector('input[name=name]')
const email = USERFORM.querySelector('input[name=email]')
const password = USERFORM.querySelector('input[name=password]')
const rePassword = USERFORM.querySelector('input[name=repeatepassword]')
const submit = USERFORM.querySelector('button[type=submit]')

USERFORM.addEventListener('submit', async e => {
    e.preventDefault()

    if (name.value === '') {
        name.style.outline = '1px solid #fa0'
        const nametimeout = setTimeout(() => {
            name.style.outline = 'none'
            clearTimeout(nametimeout)
        }, 3000);
        name.focus()
    }
    else if (validEmail(email.value) === null) {
        email.style.outline = '1px solid #fa0'
        const emailtimeout = setTimeout(() => {
            email.style.outline = 'none'
            clearTimeout(emailtimeout)
        }, 3000);
        email.focus()
    }
    else if (password.value === '') {
        password.style.outline = '1px solid #fa0'
        const passwordtimeout = setTimeout(() => {
            password.style.outline = 'none'
            clearTimeout(passwordtimeout)
        }, 3000);
        password.focus()
    }
    else if (rePassword.value === '' || password.value !== rePassword.value) {
        rePassword.style.outline = '1px solid #fa0'
        const rePasswordtimeout = setTimeout(() => {
            rePassword.style.outline = 'none'
            clearTimeout(rePasswordtimeout)
        }, 3000);
        rePassword.focus()
    }
    else {
        //let info = adduser(name.value, email.value, password.value)
       let response=  await fetch('https://my-brand.onrender.com/users/signup',{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({username:name.value,email:email.value,password:password.value})})
        if (response.status == 200) {
            let {token}= await response.json()
            localStorage.setItem('token', (token))
            window.location.assign('/')
        }
        else {
            email.style.outline = '1px solid #fa0'
            const emailtimeout = setTimeout(() => {
                email.style.outline = 'none'
                clearTimeout(emailtimeout)
            }, 3000);
            email.value = ''
            email.focus()
            
        }
    }
})

console.log(submit)