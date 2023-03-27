let allblogs= async function(){
    let resp= await fetch('https://my-brand.onrender.com/blogs/')
    let blogs = await resp.json()
    return blogs.blogs
 }
    let blogs= await allblogs()
Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('/');
};


function display(blog) {
    let a = document.createElement('a')
    a.setAttribute('href', `/blog.html?id=${blog._id}`)

    let box = document.createElement('div')
    box.setAttribute('class', 'card card1')

    let div = document.createElement('div')
    div.setAttribute('class', 'content')

    let head = document.createElement('h6')
    head.innerText = blog.title
    div.append(head)

    let body = document.createElement('p')
    body.innerHTML = blog.content
    div.append(body)
    box.append(div)

    let bac = document.createElement('div')
    bac.setAttribute('class', 'background')
    let img =document.createElement('img')
    img.alt= blog.title
    img.src= blog.image
    bac.append(img)
    box.append(bac)

   // let more = document.createElement('u')
    //more.innerText = 'Read More'
   // div.append(more)
    a.append(box)
    return a
}


let list = document.querySelector('.blogList')

for (let one of blogs) {
    list.append(display(one))
}