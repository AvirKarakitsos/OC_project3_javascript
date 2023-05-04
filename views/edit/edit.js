import { isActive, login, logout } from "../../js/connectionTools.js"
import { FetchRequest } from "../../js/FetchRequest.js"
import { modalHome } from "../../js/modal.js"
import {addElements, close} from "../../js/utilities.js"

//Recuperation des donnees
const result = await FetchRequest.get("works")
let modal = document.getElementById("modal")

if(isActive()){
    //Lien de deconnection
    document.getElementById("logout").addEventListener("click",logout)

    //Ajout des elements dans le DOM
    addElements(result)

    //Ouverture du modal
    document.querySelector(".link-modal").addEventListener("click",async function(){
        let newData = await FetchRequest.get("works")
        modal.style.display = "flex"
        modalHome(newData)

        //Fermeture du modal sur le conteneur uniquement
        modal.addEventListener("click",close)
        modal.children[0].addEventListener("click",function(e){
            e.stopPropagation()
        })
    })
} else{
    login()
}

