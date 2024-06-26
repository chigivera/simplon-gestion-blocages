const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : null;
const authenticatedUser = localStorage.getItem("foundUser") ? JSON.parse(localStorage.getItem("foundUser")) : null; 
if(!authenticatedUser) {
    window.location.href = "signin.html";
} 
const userBriefsLength = briefs
  .filter(brief => brief.group && brief.group.some(nom => nom === authenticatedUser.user.nom))
  .map(brief => brief.blocages.filter(blocage => blocage.etudiant === authenticatedUser.user.nom).length);

const totalBlocages = userBriefsLength.reduce((total, num) => total + num, 0);
window.addEventListener("load", () => {
    let indexDiv = Math.ceil(totalBlocages / 5);
    for (let i = 0; i <= indexDiv -1; i++) {

      document.querySelector(".pagination div").innerHTML += `<li><a href="?index=${i}">${i+1}</a></li>`;
    }
  });
const handleModifier = (cells, userBriefs) => {
    let briefInput = document.getElementById("modifier-brief").value;
    let difficulteInput = document.getElementById("modifier-difficulte").value;

    if (difficulteInput === "") {
        return alert("Tous les champs doivent être remplis.");
    }


    if (briefInput !== cells[5].innerText) {
        const briefToRemoveBlocage = userBriefs.find(brief => brief.titre === cells[5].innerText);
        briefToRemoveBlocage.blocages = briefToRemoveBlocage.blocages.filter(blocage => blocage.difficulte !== cells[6].innerText);
        const newBrief = userBriefs.find(brief => brief.titre === briefInput);
        const newDate =new Date().toISOString().slice(0,10)
        newBrief.blocages.push({
            etudiant: authenticatedUser.user.nom,
            difficulte: difficulteInput,
            valide: false,
            date: newDate,
        });
    
    }
    
    else if ( difficulteInput !== cells[6].innerText) {
        const briefToUpdateBlocage = userBriefs.find(brief => brief.titre === briefInput);
        
        
        const blocageToUpdate = briefToUpdateBlocage.blocages.find(blocage => blocage.difficulte === cells[6].innerText)
        blocageToUpdate.difficulte = difficulteInput
    }
    const filteredBriefs = briefs.filter(brief => brief.group && brief.group.every(nom => nom !== authenticatedUser.user.nom));

    const updatedBriefs = [...userBriefs,...filteredBriefs]
    localStorage.setItem("briefs", JSON.stringify(updatedBriefs));
  
    document.getElementById("modifier").style.display = "none";
    window.location.reload()
}

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
  document.querySelector(".filter-form").addEventListener("submit",(e)=>{
    e.preventDefault()
    const index = parseInt(new URLSearchParams(window.location.search).get("index")) * 5 || 0; 
    let totalBlocagesFiltered = 0
    const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : null;
    const difficulteInput = document.querySelector("#difficulte-search").value;
    const dateInput = document.querySelector("#date").value
    const valideInput = document.querySelector("#valide").checked
    const table = document.querySelector("tbody")
    table.innerHTML = "";
    const userBriefs = briefs.filter(brief => brief.group && brief.group.some(nom => nom === authenticatedUser.user.nom));
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
    return match && blocage.etudiant === authenticatedUser.user.nom;
        }
            
    
    ).slice(index,index+5).map((blocage,index) => {
    totalBlocagesFiltered++
            table.innerHTML += `
            <tr>
                  <td><input class="delete-checkbox" id=${index} type="checkbox" name="delete"/></td>
                  <td>${brief.group.join(", ")}</td>
                  <td>${brief.formatteur}</td>
                  <td><input type="checkbox" name="" id="" disabled ${blocage.valide && "checked"}></td>
                  <td>${blocage.date}</td>
                  <td>${brief.titre}</td>
                  <td>${blocage.difficulte}</td>
                  <td><i class="ri-eye-line"></i></td>
                  <td><i class="ri-file-edit-line"></i></td>
                </tr>
            `
        })
    })
   
 
    document.querySelector(".pagination div").innerHTML = ``;
    let indexDiv = Math.ceil(totalBlocagesFiltered / 5);
    for (let i = 0; i <= indexDiv -1; i++) {
      document.querySelector(".pagination div").innerHTML += `<li><a href="?index=${i}">${i+1}</a></li>`;
    }
    document.querySelectorAll(".ri-file-edit-line").forEach((btn) => {
        btn.addEventListener("click", () => {
            const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : null;
            let userBriefs = briefs.filter(brief => brief.group && brief.group.some(nom => nom === authenticatedUser.user.nom)); 
    
            document.getElementById("modifier-brief").innerHTML = "";
            userBriefs.forEach(brief => {
                document.getElementById("modifier-brief").innerHTML += `<option value="${brief.titre}">${brief.titre}</option>`;
            });
    
            const row = btn.closest("tr");
            const cells = row.querySelectorAll("td");
            document.getElementById("modifier-brief").value = cells[4].innerText;
            document.getElementById("modifier-difficulte").value = cells[6].innerText;
            document.getElementById("modifier").style.display = "flex";
    
            const modifierForm = document.querySelector("#modifier form");
            modifierForm.addEventListener("submit", (e) => {
                e.preventDefault();
                handleModifier(cells, userBriefs);
            });
        });
    });
  

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
  
      return {brief: cells[5].innerText, difficulte: cells[6].innerText};
    });
  
    const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : [];
  
    selectedBlocages.forEach(selected => {
      const userBriefs = briefs.find(brief => brief.titre === selected.brief);
      if (userBriefs) {
        userBriefs.blocages = userBriefs.blocages.filter(blocage => blocage.difficulte !== selected.difficulte && blocage.valide)
      }
    });
  
    Array.from(checkedCheckboxes).map(checkbox => {
      const row = checkbox.closest("tr").remove();
    }) 
    localStorage.setItem("briefs", JSON.stringify(briefs));
  
  });
  
})

if (briefs) {
    const table = document.querySelector("tbody")
    const userBriefs = briefs.filter(brief => brief.group && brief.group.some(nom => nom === authenticatedUser.user.nom));
    
    const index = parseInt(new URLSearchParams(window.location.search).get("index")) * 5 || 0; 

    userBriefs.map((brief) => {
        brief.blocages.filter(blocage => blocage.etudiant === authenticatedUser.user.nom).slice(index,index+5).map(blocage => {
 
            table.innerHTML += `
            <tr>
                  <td><input class="delete-checkbox" type="checkbox" name="delete" id="${index}" ${blocage.valide && "disabled"}></td>
                  <td>${brief.group.join(", ")}</td>
                  <td>${brief.formatteur}</td>
                  <td><input type="checkbox" name="" id="" disabled ${blocage.valide && "checked"}></td>
                  <td>${blocage.date}</td>
                  <td>${brief.titre}</td>
                  <td>${blocage.difficulte}</td>
                  <td><i class="ri-eye-line"></i></td>
                  <td><i class=${!blocage.valide ? "ri-file-edit-line" : "ri-spam-2-line"}></i></td>
                </tr>
            `
        })
    })

}



document.querySelector(".add").addEventListener("click",()=>{
    document.querySelector("#ajouter").style.display = "flex";
    const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : null;
    const userBriefs = briefs.filter(brief => brief.group && brief.group.some(nom => nom === authenticatedUser.user.nom));
    userBriefs.map(brief => {
        const option = document.createElement("option");
        option.textContent = brief.titre;
        document.getElementById("brief").appendChild(option);
    })
    
})

document.querySelector("#ajouter form").addEventListener("submit",(e)=>{
    e.preventDefault();
    let formatteurInput = document.getElementById("formatteur").value;
    let briefInput = document.getElementById("brief").value;
    let difficulteInput = document.getElementById("difficulte").value;
    if (difficulteInput == "" || formatteurInput == "" || briefInput == "") return alert ("Tous les champs doivent être remplis.")
    const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : null;
    const userBriefs = briefs.filter(brief => brief.group && brief.group.some(nom => nom === authenticatedUser.user.nom) && brief.titre === briefInput); 
    const newBlocage = {
        etudiant: authenticatedUser.user.nom,
        difficulte: difficulteInput,
        valide: false,
        date: new Date().toISOString().slice(0, 10).replace(/-/g, '-')
      };
      
    userBriefs[0].blocages.push(newBlocage);

    const filteredBriefs = briefs.filter(brief => brief.titre !== briefInput)
    const updatedBriefs = [...userBriefs,...filteredBriefs]
    localStorage.setItem("briefs", JSON.stringify(updatedBriefs));

    document.querySelector("#ajouter").style.display = "none";
    location.reload()

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
          document.querySelector("#afficher div ").innerHTML = `<h1>Etudiant:</h1><p> ${blocage[0].etudiant}</p><br><h1>Date:</h1><p> ${blocage[0].date}</p><br><h1>Brief:</h1><p> ${briefText.innerText}</p><br><h1>Difficulty:</h1><p> ${difficulteText.innerText}</p><br><h1>Type:</h1><p> ${modalType}</p><p>Commentary: ${commentary}</p>`;
      } else {
          document.getElementById("afficher").style.display = "flex";
          document.querySelector("#afficher div ul").innerHTML = `<h1>Etudiant:</h1><p> ${blocage[0].etudiant}</p><br><h1>Date:</h1><p> ${blocage[0].date}</p><br><h1>Brief:</h1><p> ${briefText.innerText}</p><br><h1>Difficulty:</h1><p> ${difficulteText.innerText}</p>`;

      }
    });
});




const afficher = document.getElementById("afficher")


afficher.querySelector("i").addEventListener("click", (e) => {

        afficher.style.display = "none";
});

document.querySelectorAll(".ri-file-edit-line").forEach((btn) => {
    btn.addEventListener("click", () => {
        const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : null;
        let userBriefs = briefs.filter(brief => brief.group && brief.group.some(nom => nom === authenticatedUser.user.nom)); 

        document.getElementById("modifier-brief").innerHTML = "";
        userBriefs.forEach(brief => {
            document.getElementById("modifier-brief").innerHTML += `<option value="${brief.titre}">${brief.titre}</option>`;
        });

        const row = btn.closest("tr");
        const cells = row.querySelectorAll("td");
        document.getElementById("modifier-brief").value = cells[4].innerText;
        document.getElementById("modifier-difficulte").value = cells[6].innerText;
        document.getElementById("modifier").style.display = "flex";

        const modifierForm = document.querySelector("#modifier form");
        modifierForm.addEventListener("submit", (e) => {
            e.preventDefault();
            handleModifier(cells, userBriefs);
        });
    });
});

const modifier = document.getElementById("modifier")


modifier.querySelector("i").addEventListener("click", (e) => {
    e.preventDefault();
    const confirmHide = confirm("Are you sure you want to close?");
    if (confirmHide) {
        modifier.style.display = "none";
    }
});
const ajouter = document.getElementById("ajouter")


ajouter.querySelector("i").addEventListener("click", (e) => {
        ajouter.style.display = "none";
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
  
      return {brief: cells[5].innerText, difficulte: cells[6].innerText};
    });
  
    const briefs = localStorage.getItem("briefs") ? JSON.parse(localStorage.getItem("briefs")) : [];
  
    selectedBlocages.forEach(selected => {
      const userBriefs = briefs.find(brief => brief.titre === selected.brief);
      if (userBriefs) {
        userBriefs.blocages = userBriefs.blocages.filter(blocage => blocage.difficulte !== selected.difficulte && blocage.valide)

      }
    });
  
    Array.from(checkedCheckboxes).map(checkbox => {
      const row = checkbox.closest("tr").remove();
    }) 
    localStorage.setItem("briefs", JSON.stringify(briefs));
  
  });
  