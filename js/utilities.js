import { FetchRequest } from "./FetchRequest.js"

//Add elements to the DOM
export function addElements(table){
    let gallery = document.getElementById("gallery")

    gallery.innerHTML = ""

    if(table.length === 0){
        gallery.style.display = "block"
        gallery.innerHTML = `<p class="empty-gallery font-20-text-center">La galerie est vide</p>`
    } else{
        for(let element of table){
            gallery.style.display = "grid"
            gallery.innerHTML += `<figure>
                                    <img src="${element.imageUrl}" alt="${element.title}">
                                    <figcaption>${element.title}</figcaption>
                                </figure>`
        }
    }
}

//AddEventListener for categories
export function addClickEvent(element,data){
    element.addEventListener("click", function(){
        
        if(parseInt(element.dataset.id) === 0){
            addElements(data)
        } else{
            let tableFilter = data.filter(res => res.categoryId === parseInt(this.dataset.id))
            addElements(tableFilter)
        }

        document.querySelector(".selected").classList.remove("selected")
        this.classList.add("selected")
    })
}

//Close the modal
export function close(){
    document.getElementById("modal").style.display = "none"
}

//Add the gallery inside the modal
export function addElementsModal(table){
    let galleryModal = document.querySelector(".modal-articles")
    
    galleryModal.innerHTML = ""

    if (table.length === 0) {
        galleryModal.style.display = "block"
        galleryModal.innerHTML = `<p class="empty-gallery">La galerie est vide</p>`
    } else {
        for(let element of table){
            galleryModal.innerHTML += `<article>
                                        <div class="trash-icon" data-id="${element.id}">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </div>
                                        <img src="${element.imageUrl}" alt="${element.title}">
                                        <p class="modal-edit">éditer</p>
                                    </article>`
        }

        //Event deleting one project
        document.querySelectorAll(".trash-icon").forEach((element)=>{
            element.addEventListener("click",async function(){
                let id = parseInt(this.dataset.id)

                if(confirm("Voulez-vous supprimer ce projet ?")){
                    await FetchRequest.delete(id)
                    let newData = await FetchRequest.get("works")
                    addElements(newData)
                    addElementsModal(newData)
                    msgValidation("remove")
                }
            })
        })
    }
}

//Message for uncompleted form
export function formCompleted(value){
    let msg = document.querySelector(".modal-form-2 .msg")

    switch(value){
        case "empty": 
            msg.innerHTML = ""
            break
        case "red":
            msg.innerHTML = "Veuillez completer le formulaire"
            break
    }
}

//Message for adding or removing project
export function msgValidation(value){
    let msg = document.querySelector(".msg-success")
  
    switch(value){
        case "add":
            msg.style.width = "100px"
            msg.classList.add("bg-green")
            msg.classList.remove("bg-red")
            msg.innerHTML = "Projet ajouté"
            break
        case "remove":
            msg.style.width = "125px"
            msg.classList.add("bg-red")
            msg.classList.remove("bg-green")
            msg.innerHTML = "Projet supprimé"
            break
    }
    msg.style.display = "block"
    setTimeout(()=>{
        msg.style.display = "none"
    },3000)
}

//Change color validation button
export function changeButtonColor(input){
    let changeColor = document.getElementById("btn-form")

    if(input){
        changeColor.classList.remove("bg-grey")
        changeColor.classList.add("bg-green")
        formCompleted("empty")
    } else {
        changeColor.classList.remove("bg-green")
        changeColor.classList.add("bg-grey")
    }
}

//Check validity of an image
export function imageValidity(file){
    let msg = document.querySelector(".msg-image")
    let formats = ["image/jpeg", "image/png"];

    if (!formats.includes(file["type"])) {
        msg.innerHTML ="type de format incorrect"
        return false
    } else if(file["size"] >= 4096000) {
        msg.innerHTML ="la taille de l'image est supérieure à 4mo"
        return false
    } else{
        msg.innerHTML = ""
        return true
    }
}