import signoutsvg from './signoutsvg.js'

let sign = document.querySelector('header #sign')
let user = localStorage.getItem('token')
let dash = document.querySelector('header #dashboard')

if (user !== null) {
    let signOutBut = document.createElement('span')
    signOutBut.innerText = 'Sign out'
    signOutBut.addEventListener('click', e => {
        e.preventDefault()
        signOutCheck()
    })
    sign.innerHTML = ''
    sign.append(signOutBut)

    let dashboard = document.createElement('a')
    dashboard.setAttribute('href', '/dashboard/')
    dashboard.innerText = 'Dashboard'
    if (dash!== null){
      
    dash.innerText = ''

    dash.append(dashboard)  
    }
}

function signOutCheck() {
    let box = document.createElement('div')
    box.setAttribute('id', 'signout')

    let back = document.createElement('div')
    back.setAttribute('class', 'back')
    back.addEventListener('click', e => {
        document.body.style.overflow = 'auto'
        box.remove()
    })
    box.append(back)

    let front = document.createElement('div')
    front.setAttribute('class', 'front')

    let p = document.createElement('p')
    p.innerText = `Do you want to sign out?`
    front.append(p)
    front.innerHTML += signoutsvg
    let div = document.createElement('div')
    let spanY = document.createElement('span')
    spanY.setAttribute('class', 'y')
    spanY.innerText = 'sign out'
    spanY.addEventListener('click', e => {
        document.body.style.overflow = 'auto'
        signOut()
    })
    div.append(spanY)
    let spanN = document.createElement('span')
    spanN.setAttribute('class', 'n')
    spanN.innerText = 'cancel'
    spanN.addEventListener('click', e => {
        document.body.style.overflow = 'auto'
        box.remove()
    })
    div.append(spanN)
    front.append(div)

    box.append(front)
    document.body.append(box)
    document.body.style.overflow = 'hidden'
}

export function signOut() {
    localStorage.removeItem('token')
    window.location.assign('/')
}