import { fetchRequest } from "../../js/fetchRequest.js"
import {addElements, modalHome} from "../../js/utilities.js"


//Recuperation des donnees
const result = await fetchRequest.connection("works")

//Ajout des elements dans le DOM
addElements(result)
   
let modal = document.getElementById("modal")

//Ouverture du modal
document.querySelector(".link-modal").addEventListener("click",function(){
    modal.style.display = "flex"
    
    modalHome(modal)

    //Fermeture du modal sur le conteneur uniquement
    modal.addEventListener("click",function(){
        this.style.display = "none"
    })
    modal.children[0].addEventListener("click",function(e){
        e.stopPropagation()
    })
 
    
})


