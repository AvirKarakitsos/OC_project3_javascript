import {addElements, modalHome} from "../../js/utilities.js"

async function executeCode(){
    try{
        //Recuperation des donnees
        let load = await fetch("../../config.json")
        load = await load.json()
        const data = await fetch(`${load.host}api/works`)
        const result = await data.json()

        //Ajout des elements dans le DOM
        addElements(result)
    }catch(err){
        console.log(err)
    }
}

executeCode()

let modal = null

//Ouverture du modal
// document.querySelector(".link-modal").addEventListener("click",function(){
//     const target = document.querySelector(this.getAttribute("href"))
//     target.style.display = "flex"
//     modalHome()

//     //Fermeture du modal sur le conteneur uniquement
//     target.addEventListener("click",function(){
//         this.style.display = "none"
//     })
//     target.children[0].addEventListener("click",function(e){
//         e.stopPropagation()
//     })

//     modal = target

//     //Fermeture du modal sur la croix
//     document.querySelector(".modal-close").addEventListener("click",function(){
//         modal.style.display = "none"
//     })
// })


