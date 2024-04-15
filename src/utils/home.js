const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : null;
const authenticatedUser = localStorage.getItem("foundUser") ? JSON.parse(localStorage.getItem("foundUser")) : null;

const briefList = document.querySelector(".brief ul");

if (briefs && !authenticatedUser.user.isAdmin) {
  briefs.filter((brief) => brief.group && brief.group.some((nom) => nom === authenticatedUser.user.nom)).map(brief => {
      const li = document.createElement("li");
      li.textContent = brief.titre;
      briefList.appendChild(li);
    
  })
    
} else if ( briefs && authenticatedUser.user.isAdmin) {
    briefs.filter((brief) => brief.formatteur === authenticatedUser.user.nom).map(brief => {
        const li = document.createElement("li");
        li.textContent = `${brief.titre} jusqu'a ${brief.dateDeRendment}`;
        briefList.appendChild(li);
      
    })
}
