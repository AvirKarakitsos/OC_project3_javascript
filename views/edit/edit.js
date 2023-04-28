import { fetchRequest } from "../../js/fetchRequest.js"
import {addElements, modalHome, modalPost} from "../../js/utilities.js"


//Recuperation des donnees
const result = await fetchRequest.connection("works")

//Ajout des elements dans le DOM
addElements(result)
   
let modal = null

//Ouverture du modal
document.querySelector(".link-modal").addEventListener("click",function(){
    const target = document.querySelector(this.getAttribute("href"))
    target.style.display = "flex"
    modalHome()

    //Fermeture du modal sur le conteneur uniquement
    target.addEventListener("click",function(){
        this.style.display = "none"
    })
    target.children[0].addEventListener("click",function(e){
        e.stopPropagation()
    })

    modal = target

    //Fermeture du modal sur la croix
    document.querySelector(".close-icon").addEventListener("click",function(){
        modal.style.display = "none"
    })
    
    //Modal ajout d'un post
    document.getElementById("btn-home").addEventListener("click",function(){

        //Ajout des elements
        modalPost()
        
        //Retour au Modal
        document.querySelector(".fa-arrow-left").addEventListener("click",function(){
            modalHome()
        })

        //Fermeture du modal sur le conteneur uniquement
        modal.addEventListener("click",function(){
            this.style.display = "none"
        })
        modal.children[0].addEventListener("click",function(e){
            e.stopPropagation()
        })

        //Fermeture du modal sur la croix
        document.querySelector(".close-icon").addEventListener("click",function(){
            modal.style.display = "none"
        })
    })
})


