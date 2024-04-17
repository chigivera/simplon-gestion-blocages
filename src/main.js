

const logoutBtn = document.getElementById("logout");
const profileDropdown = document.querySelector(".profile-dropdown")
window.addEventListener("load", () => {
    const authenticatedUser = localStorage.getItem("foundUser") ? JSON.parse(localStorage.getItem("foundUser")) : null;
        profileDropdown.querySelector("p").innerText = authenticatedUser.user.nom;
       if (authenticatedUser){ if (authenticatedUser.user.isAdmin) {
            document.getElementById("dashboard").href = "./admin-dashboard.html?index=0";
        } else {
            document.getElementById("dashboard").href = "./student-dashboard.html?index=0";
        }
        if (authenticatedUser.expirationTime < new Date().getTime()) {
                localStorage.removeItem("foundUser");
            
        } else if (authenticatedUser && authenticatedUser.user.isAdmin && (window.location.href === "http://127.0.0.1:5500/src/student-dashboard.html?index=0" )) {
            window.location.href = "./admin-dashboard.html?index=0"
        } else if (authenticatedUser && !authenticatedUser.user.isAdmin && window.location.href === "http://127.0.0.1:5500/src/admin-dashboard.html?index=0") {
            window.location.href = "./student-dashboard.html?index=0"
        }}

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

