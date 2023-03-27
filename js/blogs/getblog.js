const options ={
    headers:{"content-type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}
} 
 let user= await fetch('https://my-brand.onrender.com/users/user',options).then(async res=>{
    return await res.json()
 })
let singleblog= async function(_id){
    let resp= await fetch('https://my-brand.onrender.com/blogs/'+_id)
    let blog = await resp.json()
    return blog.blog
 }
Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; 
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('/');
};

const urlParams = new URLSearchParams(location.search);

if (urlParams.get('id') === null) {
    window.location.assign('/blogs.html')
}

let blog = await singleblog(urlParams.get('id'))
blogTitle.innerText = blog.title
blogimage.src= blog.image
blogBody.innerHTML = blog.content

//blogDate.innerText = (new Date(blog.date)).yyyymmdd()

blogLikes.innerText = blog.likes.likesNumber
blogLikes.parentNode.addEventListener("click",async function (e){
    e.preventDefault()
    const options ={
        method:"POST",headers:{"content-type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}
    } 
    await fetch('https://my-brand.onrender.com/blogs/'+blog._id+'/like/',options).then(async function(res){
        if (res.status ==200){
            let b=await res.json()
           blogLikes.innerText =b.likedBlog.likes.likesNumber
           checkLike(b.likedBlog)
         }})
})
blogComments.innerText = blog.comments.length
//blogShares.innerText = blog.shares.length
function checkLike(b){
    if (b.likes.user.includes(user.email)){
        blogLikes.parentNode.classList.add("active")
    }
    else{
        blogLikes.parentNode.classList.remove("active")
    }

}
checkLike(blog)
let comments= document.querySelector(".comments")
    fetch('https://my-brand.onrender.com/blogs/'+blog._id+'/comments/')
    .then(res=>res.json())
    .then(data=>{
        console.log(data.comments)
        function checkComment(i){  
        const comment= document.createElement("div")
        comment.className="comment"
        comment.innerHTML=`
        <p width="20" height="10">${data.comments[i].email}</p>
        <p width="20" height="12" fill="input your comment">${data.comments[i].message}</p>`

        return comment
        }
       for (let i=0;i<data.comments.length;i++){
            let comment=checkComment(i)
            comments.append(comment)
       } 
    })
let cForm=document.querySelector(".addcomment")
let comm= cForm.querySelector("textarea")
cForm.addEventListener("submit", async e=>{
    e.preventDefault()
    await fetch('https://my-brand.onrender.com/blogs/'+blog._id+'/comments/',{method:"POST",headers:{"content-type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")},body:JSON.stringify({message:comm.value})})
            .then(res=>res.json())
            .then(commentmsg=>{
                const comment= document.createElement("div")
                comment.className="comment"
                comment.innerHTML=`
                <p width="20" height="10">${commentmsg.comment.email}</p>
                <p width="20" height="12" fill="input your comment">${commentmsg.comment.message}</p>`
                comments.prepend(comment)
                comm.value= ""
            })
})       