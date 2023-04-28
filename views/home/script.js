import {addElements, addClickEvent} from "../../js/utilities.js"
import {fetchRequest} from "../../js/fetchRequest.js"

const result = await fetchRequest.connection("works")

//Ajout des elements dans le DOM
addElements(result)

//Ajout des categories dans le HTML
const list = document.querySelector(".categories")

const listCategories = await fetchRequest.connection("categories")

for(let category of listCategories){
    const newElement = document.createElement("li")
    newElement.textContent = category.name
    newElement.dataset.id = category.id
    list.appendChild(newElement)
}

//Ajout d'un click event sur les filtres
document.querySelectorAll(".categories li").forEach((category) => addClickEvent(category,result))

document.getElementById("login").addEventListener("click",function(){
    window.location.pathname = "/views/connection/connection.html"
})


