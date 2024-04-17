const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : [];


document.querySelector(".form").addEventListener("submit",(e)=>{
    e.preventDefault()
    const nameInput = document.getElementById("name").value
    const emailInput = document.getElementById("email").value
    const passwordInput = document.getElementById("password").value
    const bootcampInput = document.getElementById("bootcamp").value
    if( nameInput === "" || passwordInput === "" || emailInput === "" ) {
        alert("Please fill out all fields.")
        return
    }
    users.push({
        id:users.length +1,
        nom: nameInput,
        email: emailInput,
        password: passwordInput,
        bootcamp: bootcampInput,
        isAdmin:false
    })  
    briefs.filter(brief => brief.bootcamp === bootcampInput).map(brief => {
        brief.group.push(nameInput)
    })
    localStorage.setItem("briefs",JSON.stringify(briefs))
    localStorage.setItem("users",JSON.stringify(users))
    window.location.href ="./signin.html"
    
})