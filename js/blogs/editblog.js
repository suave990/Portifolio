import { createRich, getRich,setContent } from "../richtext/richtext.js";
let singleblog= async function(_id){
    let resp= await fetch('https://my-brand.onrender.com/blogs/'+_id)
    let blog = await resp.json()
    return blog.blog
 }
 const options ={
    headers:{"content-type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}
} 
 let user= await fetch('https://my-brand.onrender.com/users/user',options).then(async res=>{
    return await res.json()
 })

if (user.email) {
    await createRich('richtext')
    const urlParams = new URLSearchParams(location.search);

    if (urlParams.get('id') === null) {
        window.location.assign('/blogs.html')
    }
    
    let blog = await singleblog(urlParams.get('id'))
    let form = document.querySelector(".form-image-1")
    

    let title = form.querySelector('input[name=title]')
    let image = form.querySelector('input[name=image]')
    let img = form.querySelector('img')
    title.value=blog.title    
    image.value=blog.image
    img.src=blog.image
    setContent(blog.content);
    form.addEventListener('submit', async e => {
        e.preventDefault()
        let body = getRich('richtext')  
        const options ={
            method:"PUT",headers:{"content-type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")},
body:JSON.stringify({title:title.value,content:body,image:image.value}) 
        }
        await fetch('https://my-brand.onrender.com/blogs/'+blog._id+'/',options).then(async function(res){
            if (res.status ==200){
                 window.location.assign('/blog.html?id='+blog._id+'/')

             }
         })
    })
}
