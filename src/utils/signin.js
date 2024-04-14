document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    const emailInput =  document.getElementById("email").value;
    const passwordInput =  document.getElementById("password").value;
    if (emailInput === "" || passwordInput === "") {
        alert("Please enter both Enter and Password");
        return;
    }

    const utilisateurs = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    const foundUser = utilisateurs.find(utilisateur => utilisateur.email === emailInput && utilisateur.password === passwordInput);
    if (foundUser) {
        const expirationTime = new Date().getTime() + (30 * 60 * 1000); // 3 minutes in milliseconds
        const userWithExpiration = { user: foundUser, expirationTime: expirationTime };
        localStorage.setItem("foundUser", JSON.stringify(userWithExpiration));
        window.location.href = "./index.html";

    } else {
        // User is not found, show an error message
        alert("Invalid Enter or Password");
    }
});
