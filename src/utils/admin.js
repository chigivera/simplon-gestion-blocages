const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : null;
const authenticatedUser = localStorage.getItem("foundUser") ? JSON.parse(localStorage.getItem("foundUser")) : null;
const radioButton = document.getElementById("resolution1");
const textarea = document.getElementById("resolutionTextarea");
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
if(!authenticatedUser) {
    window.location.href = "signin.html";
} else if (briefs) {
    const table = document.querySelector("tbody")
    const userBriefs = briefs.filter(brief => brief.formatteur === authenticatedUser.user.nom);
    userBriefs.map((brief,index) => {
        brief.blocages.map(blocage => {
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
            console.log(blocage)
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
    console.log(match)
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
      document.querySelectorAll(".ri-eye-line").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const difficulteText = e.target.parentElement.previousElementSibling.innerText;
          document.getElementById("afficher").style.display = "flex";
          document.querySelector("#afficher div p").textContent = difficulteText
        });
      });
    
})

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


  
const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", () => {
    const checkedCheckboxes = document.querySelectorAll(".delete-checkbox:checked");
  
    if (checkedCheckboxes.length === 0) {
      alert("Veuillez selectionner au moins un blocage.");
      return;
    }
  
    const confirmed = confirm("Etes-vous sur de vouloir supprimer ces blocages ?");
  
    if (!confirmed) {
      return;
    }
  
    const selectedBlocages = Array.from(checkedCheckboxes).map(checkbox => {
      const row = checkbox.closest("tr");
      const cells = row.querySelectorAll("td");
  
      return {brief: cells[4].innerText, difficulte: cells[5].innerText};
    });
  
    const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : [];
  
    selectedBlocages.forEach(selected => {
      const userBriefs = briefs.find(brief => brief.titre === selected.brief);
      if (userBriefs) {
        userBriefs.blocages = userBriefs.blocages.filter(blocage => blocage.difficulte !== selected.difficulte);
      }
    });
  
    Array.from(checkedCheckboxes).map(checkbox => {
      const row = checkbox.closest("tr").remove();
    })
  
    localStorage.setItem("briefs", JSON.stringify(briefs));
  
    console.log("briefs", briefs);
  });
  