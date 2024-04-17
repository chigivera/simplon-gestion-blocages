const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : null;
const authenticatedUser = localStorage.getItem("foundUser") ? JSON.parse(localStorage.getItem("foundUser")) : null;
if(!authenticatedUser) {
  window.location.href = "signin.html";
} 
const radioButton = document.getElementById("resolution1");
const textarea = document.getElementById("resolutionTextarea");
const userBriefsLength = briefs
  .filter(brief => brief.formatteur === authenticatedUser.user.nom)
  .map(brief => brief.blocages.length);

const totalBlocages = userBriefsLength.reduce((total, num) => total + num, 0);
window.addEventListener("load", () => {
    let indexDiv = Math.ceil(totalBlocages / 5);
    for (let i = 0; i <= indexDiv -1; i++) {

      document.querySelector(".pagination div").innerHTML += `<li><a href="?index=${i}">${i+1}</a></li>`;
    }
  });
const handleModal = (e, btn, cells) => {
    e.preventDefault();
    const radioButtons = document.querySelectorAll('input[name="resolution"]');
    let selectedResolution = '';
    radioButtons.forEach((radio) => {
      if (radio.checked) selectedResolution = radio.value;
    });
  
    const commentaireInput = document.getElementById("resolutionTextarea").value;
  
    let blocageResolu = briefs.find(brief => brief.formatteur === authenticatedUser.user.nom && brief.titre === cells[4].innerText)
      .blocages.find(blocage => blocage.difficulte === cells[5].innerText); 
  
    blocageResolu = { ...blocageResolu, valide: true, modal: { description: selectedResolution, commentaire: commentaireInput } };
  
    const updatedBriefs = briefs.map(brief => {
      if (brief.formatteur === authenticatedUser.user.nom && brief.titre === cells[4].innerText) {
        return { ...brief, blocages: [...brief.blocages.filter(blocage => blocage.difficulte !== cells[5].innerText), blocageResolu] };
      } else {
        return brief;
      }
    });
    localStorage.setItem("briefs", JSON.stringify(updatedBriefs));
    document.querySelector("#modal").style.display = "none";
  }
radioButton.addEventListener("change", () => {
  if (radioButton.checked) {
    textarea.disabled = false;
  } else {
    textarea.disabled = true;
  }
}); 
 if (briefs) {
    const table = document.querySelector("tbody")
    const index = parseInt(new URLSearchParams(window.location.search).get("index")) * 5 || 0; 

    const userBriefs = briefs.filter(brief => brief.formatteur === authenticatedUser.user.nom);
    userBriefs.map((brief) => {
        brief.blocages.slice(index,index+5).map(blocage => {
                table.innerHTML += `
                <tr>
                <td><input class="delete-checkbox" type="checkbox" name="" id=""></td>
                <td>${blocage.etudiant}</td>
                <td><input type="checkbox" name="" id="" disabled ${blocage.valide && "checked"}></td>
                <td>${blocage.date}</td>
                <td>${brief.titre}</td>
                <td id="difficulte">${blocage.difficulte}</td>
                <td ><i  class="ri-eye-line"></i></td>
                <td><i class="ri-question-answer-fill"></i></td>
              </tr>
                `

            
        })
    })

}

document.querySelector(".filter-form").addEventListener("submit",(e)=>{
    e.preventDefault()
    const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : null;
    const difficulteInput = document.querySelector("#difficulte-search").value;
    const dateInput = document.querySelector("#date").value
    const valideInput = document.querySelector("#valide").checked
    const table = document.querySelector("tbody")
    table.innerHTML = "";
    const userBriefs = briefs.filter(brief => brief.formatteur === authenticatedUser.user.nom);
    userBriefs.map(brief => {
        brief.blocages.filter(blocage => {
  
            let match = true;
    if (difficulteInput !== "") {
        match = match && blocage.difficulte.toLowerCase().includes(difficulteInput.toLowerCase());
    }
    if (dateInput !== "") {
        match = match && blocage.date === dateInput;
    }
    if (valideInput !== undefined) {
        match = match && blocage.valide === valideInput;
    }
    return match && brief.formatteur === authenticatedUser.user.nom;
        }).map((blocage,index) => {
            table.innerHTML += `
                <tr>
                <td><input class="delete-checkbox" type="checkbox" name="" id=""></td>
                <td>${blocage.etudiant}</td>
                <td><input type="checkbox" name="" id="" disabled ${blocage.valide && "checked"}></td>
                <td>${blocage.date}</td>
                <td>${brief.titre}</td>
                <td id="difficulte">${blocage.difficulte}</td>
                <td ><i  class="ri-eye-line"></i></td>
                <td><i class="ri-question-answer-fill"></i></td>
              </tr>
                `
        })
    })
    document.querySelectorAll(".ri-question-answer-fill").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          document.querySelector("#modal").style.display = "flex";
          const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : null;
      
          const resolutionForm = document.getElementById("resolutionForm");
          resolutionForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const row = btn.closest("tr");
            const cells = row.querySelectorAll("td");
            handleModal(e, btn, cells);
          });
        });
      });
 
    
})
document.querySelectorAll(".ri-eye-line").forEach((btn) => {
  btn.addEventListener("click", (e) => {
      const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : null;
      const difficulteText = e.target.parentElement.previousElementSibling;
      const briefText = difficulteText.previousElementSibling
      const blocage = briefs.filter(brief =>  brief.titre === briefText.innerText).map(brief=>brief.blocages.find(blocage => blocage && blocage.difficulte===difficulteText.innerText))
      if (blocage[0].modal) {
        const modalType = blocage[0].modal.description;
        const commentary = blocage[0].modal.commentaire;
        document.getElementById("afficher").style.display = "flex";
        document.querySelector("#afficher div ul").innerHTML = `<h1>Etudiant:</h1><p> ${blocage[0].etudiant}</p><br><h1>Date:</h1><p> ${blocage[0].date}</p><br><h1>Brief:</h1><p> ${briefText.innerText}</p><br><h1>Difficulty:</h1><p> ${difficulteText.innerText}</p><br><h1>Type:</h1><p> ${modalType}</p><p>Commentary: ${commentary}</p>`;
    } else {
        document.getElementById("afficher").style.display = "flex";
        document.querySelector("#afficher div ul").innerHTML = `<h1>Etudiant:</h1><p> ${blocage[0].etudiant}</p><br><h1>Date:</h1><p> ${blocage[0].date}</p><br><h1>Brief:</h1><p> ${briefText.innerText}</p><br><h1>Difficulty:</h1><p> ${difficulteText.innerText}</p>`;

    }
  });
});

document.querySelector(".ri-arrow-left-line").addEventListener("click",()=>{
  const index = parseInt(new URLSearchParams(window.location.search).get("index")) || 0;
if (index === 0) return;

const newIndex = index - 1;
const urlParams = new URLSearchParams(window.location.search);
urlParams.set("index", newIndex);
window.history.pushState({}, "", `?${urlParams.toString()}`);


})
document.querySelector(".ri-arrow-right-line").addEventListener("click", () => {
  const index = parseInt(new URLSearchParams(window.location.search).get("index")) || 0;
  const totalPages = Math.ceil(totalBlocages / 5);
  const newIndex = index + 1;

  if (newIndex >= totalPages) return;

  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("index", newIndex);
  window.history.pushState({}, "", `?${urlParams.toString()}`);

 

});
document.querySelectorAll(".ri-eye-line").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const difficulteText = e.target.parentElement.previousElementSibling.innerText;
      document.getElementById("afficher").style.display = "flex";
      document.querySelector("#afficher div p").textContent = difficulteText
    });
  });

  const afficher = document.getElementById("afficher")


  afficher.querySelector("i").addEventListener("click", (e) => {
  
          afficher.style.display = "none";
  });
  

  

  
 

  document.querySelectorAll(".ri-question-answer-fill").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelector("#modal").style.display = "flex";
      const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : null;
  
      const resolutionForm = document.getElementById("resolutionForm");
      resolutionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const row = btn.closest("tr");
        const cells = row.querySelectorAll("td");
        handleModal(e, btn, cells);
      });
    });
  });
const modal = document.getElementById("modal")


  modal.querySelector("i").addEventListener("click", (e) => {
  
          modal.style.display = "none";
  });

