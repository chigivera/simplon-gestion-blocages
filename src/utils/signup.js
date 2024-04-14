const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];



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
    console.log(users);
})