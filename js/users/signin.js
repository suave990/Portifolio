import User, { users, find } from "./user.js";
import validEmail from "../valid/email.js";

const SignForm = document.querySelector('form[name=signin]')

const email = SignForm.querySelector('input[name=email]')
const password = SignForm.querySelector('input[name=password]')
const submit = SignForm.querySelector('button[type=submit]')

SignForm.addEventListener('submit', async e => {
    e.preventDefault()
    if (validEmail(email.value) === null) {
        email.style.outline = '1px solid #fa0'
        const emailtimeout = setTimeout(() => {
            email.style.outline = 'none'
            clearTimeout(emailtimeout)
        }, 3000);
        email.focus()
        return
    }
    let response =  await fetch('https://my-brand.onrender.com/users/login/',{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email:email.value,password:password.value})})
    if (response.status!== 200) {
        alert('email or password is incorrect')
        email.focus()
        return
    }
    let token= (await response.json()).token

    localStorage.setItem('token',token)
    window.location.assign('/')
})