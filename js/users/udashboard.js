let allusers= async function(){
    let resp= await fetch('https://my-brand.onrender.com/users/',{headers:{"content-type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}})
    let user= await resp.json()
    return user
 }
 
 let list = document.querySelector(".list.blog ul") 
 //console.log(list)
 async function showusers(){
     let users= await allusers()
     users.forEach(user => {
         let item= document.createElement("li")
         let a= document.createElement("a")
         a.innerHTML= `<h2>${user.username}</h2>`
         item.append(a)
         let summ=document.createElement("div")
         summ.classList.add("flex-between")
         let span=document.createElement("span")
         span.classList.add("grey-color")
         span.innerHTML=user.email
         span.addEventListener("click", e=>{
            e.preventDefault()
            span.classList.toggle("active")
         })
         summ.append(span)
         let func=document.createElement("span")
         /*
         let del=document.createElement("span")
         del.innerHTML=` <svg width="19" height="24" viewBox="0 0 19 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <path
             d="M18.6217 2H14.1994L12.9359 0.75H6.61846L5.35497 2H0.932739V4.5H18.6217M2.19623 20.75C2.19623 21.413 2.46247 22.0489 2.93637 22.5178C3.41027 22.9866 4.05302 23.25 4.72322 23.25H14.8312C15.5014 23.25 16.1441 22.9866 16.618 22.5178C17.0919 22.0489 17.3582 21.413 17.3582 20.75V5.75H2.19623V20.75Z"
             fill="#1D1D20" />
     </svg>`
         del.addEventListener("click",async e=>{
             e.preventDefault()
             let delet= await fetch("https://my-brand.onrender.com/users/"+ user._id,{method:"DELETE",headers:{"content-type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")},})
             item.remove()
      })
         func.append(del)*/
         summ.append(func)
         item.append(summ)
         list.append(item)
 
     });
 
 }
 showusers()