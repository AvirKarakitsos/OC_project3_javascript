import {addElements, addClickEvent} from "../../js/utilities.js"
import {FetchRequest} from "../../js/FetchRequest.js"
import { login } from "../../js/connectionTools.js"

const result = await FetchRequest.get("works")
const listCategories = await FetchRequest.get("categories")
const list = document.querySelector(".categories")

//Link to the connection page
document.getElementById("login").addEventListener("click",login)

//Add elements to the DOM
addElements(result)

//Add categories
for(let category of listCategories){
    let newElement = document.createElement("li")
    newElement.textContent = category.name
    newElement.dataset.id = category.id
    list.appendChild(newElement)
}

//Add a click event to the categories
for(let category of list.children){
    addClickEvent(category,result)
}
