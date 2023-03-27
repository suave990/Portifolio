import { createRich, getRich } from "../richtext/richtext.js";
import { addBlog } from './blogs.js'

let user = localStorage.getItem('token')

if (user !== null) {

    createRich('richtext')

    let form = document.querySelector(".form-image-1")
    form.addEventListener('submit', async e => {
        e.preventDefault()
        let body = getRich('richtext')

        let title = form.querySelector('input[name=title]')
        let image = form.querySelector('input[name=image]')

        addBlog(title.value, {
            name: user.name,
            email: user.email
        }, body);
        const options ={
            method:"POST",headers:{"content-type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")},
body:JSON.stringify({title:title.value,content:body,image:image.value}) 
        }
        await fetch('https://my-brand.onrender.com/blogs/',options).then(function(res){
            if (res.status ==200){
                alert("blog created")
                window.location.assign('/blogs.html')
            }
        })
    })
}