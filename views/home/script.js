import {addElements, addClickEvent} from "../../js/utilities.js"
import {fetchRequest} from "../../js/fetchRequest.js"
import { login } from "../../js/connectionTools.js"

const result = await fetchRequest.get("works")
const list = document.querySelector(".categories")
const listCategories = await fetchRequest.get("categories")

//Lien vers la page connection
document.getElementById("login").addEventListener("click",login)

//Ajout des elements dans le DOM
addElements(result)

//Ajout des categories dans le HTML
for(let category of listCategories){
    const newElement = document.createElement("li")
    newElement.textContent = category.name
    newElement.dataset.id = category.id
    list.appendChild(newElement)
}

//Ajout d'un click event sur les filtres
document.querySelectorAll(".categories li").forEach((category) => addClickEvent(category,result))
