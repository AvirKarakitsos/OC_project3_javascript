import { isActive, login, logout } from "../../js/connectionTools.js"
import { fetchRequest } from "../../js/fetchRequest.js"
import {addElements, modalHome} from "../../js/utilities.js"

//Recuperation des donnees
const result = await fetchRequest.get("works")
let modal = document.getElementById("modal")

if(isActive()){
    //Lien de deconnection
    document.getElementById("logout").addEventListener("click",logout)

    //Ajout des elements dans le DOM
    addElements(result)

    //Ouverture du modal
    document.querySelector(".link-modal").addEventListener("click",function(){
        modal.style.display = "flex"
        
        modalHome(modal,result)

        //Fermeture du modal sur le conteneur uniquement
        modal.addEventListener("click",function(){
            this.style.display = "none"
        })
        modal.children[0].addEventListener("click",function(e){
            e.stopPropagation()
        })
    })
} else{
    login()
}

