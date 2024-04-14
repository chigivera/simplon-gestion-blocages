import { briefs } from "./data/briefs.js";
import { utilisateurs } from "./data/users.js";
// localStorage.setItem("users", JSON.stringify(utilisateurs));
// localStorage.setItem("briefs",JSON.stringify(briefs))

const logoutBtn = document.getElementById("logout");
const profileDropdown = document.querySelector(".profile-dropdown")
window.addEventListener("load", () => {
    const authenticatedUser = localStorage.getItem("foundUser") ? JSON.parse(localStorage.getItem("foundUser")) : null;
        profileDropdown.querySelector("p").innerText = authenticatedUser.user.nom;
        if (authenticatedUser && authenticatedUser.expirationTime < new Date().getTime()) {
                // localStorage.removeItem("foundUser");
            
            } 

});

logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("foundUser");
    alert("You have been Logged out")
    window.location.href = './signin.html';
})

profileDropdown.addEventListener("click",()=>{
    if (document.querySelector(".user-options").style.display === "none") {
        document.querySelector(".user-options").style.display = "block";
      } else {
        document.querySelector(".user-options").style.display = "none";
      }
})