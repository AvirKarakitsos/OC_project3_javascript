import { isActive, login, logout } from "../../js/connectionTools.js"
import { FetchRequest } from "../../js/FetchRequest.js"
import { modalHome } from "../../js/modal.js"
import {addElements, close} from "../../js/utilities.js"

//Collect the database
const result = await FetchRequest.get("works")
const modal = document.getElementById("modal")

if(isActive()){
    //Link for logout
    document.getElementById("logout").addEventListener("click",logout)

    //Add elements to the DOM
    addElements(result)

    //Open the modal
    document.querySelector(".link-modal").addEventListener("click",async function(){
        let newData = await FetchRequest.get("works")
        modal.style.display = "flex"
        modalHome(newData)

        //Close the modal using the container
        modal.addEventListener("click",close)
        modal.children[0].addEventListener("click",function(e){
            e.stopPropagation()
        })
    })
} else{
    //Link to the connection page
    login()
}

