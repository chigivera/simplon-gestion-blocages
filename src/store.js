import { briefs } from "./data/briefs.js";
import { utilisateurs } from "./data/users.js";

// Check if the flag exists in localStorage
const codeExecuted = localStorage.getItem("codeExecuted");

// If the flag doesn't exist or it's false, execute the code
if (!codeExecuted) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const briefsFromLocalStorage = JSON.parse(localStorage.getItem("briefs") || "[]");

  if (JSON.stringify(utilisateurs) !== JSON.stringify(users)) {
    localStorage.setItem("users", JSON.stringify(utilisateurs));
  }

  if (JSON.stringify(briefs) !== JSON.stringify(briefsFromLocalStorage)) {
    localStorage.setItem("briefs", JSON.stringify(briefs));
  }

  // Set the flag to true to indicate that the code has been executed
  localStorage.setItem("codeExecuted", true);
}
