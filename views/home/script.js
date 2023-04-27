import {addElements, addClickEvent} from "../../js/utilities.js"

async function executeCode(){
    try{
        //Recuperation des donnees
        let load = await fetch("../../config.json")
        load = await load.json()
        const data = await fetch(`${load.host}api/works`)
        const result = await data.json()

        //Ajout des elements dans le DOM
        addElements(result)

        //Ajout des categories dans le HTML
        const list = document.querySelector(".categories")
        const dataCategories = await fetch(`${load.host}api/categories`)
        const listCategories = await dataCategories.json()

        for(let category of listCategories){
            const newElement = document.createElement("li")
            newElement.textContent = category.name
            newElement.dataset.id = category.id
            list.appendChild(newElement)
        }

        //Ajout d'un click event sur les filtres
        document.querySelectorAll(".categories li").forEach((category) => addClickEvent(category,result))
        
    }catch(err){
        console.log(err)
    }
}

executeCode()

document.getElementById("login").addEventListener("click",function(){
    window.location.pathname = "/views/connection/connection.html"
})


