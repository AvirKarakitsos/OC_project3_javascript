import { FetchRequest } from "./FetchRequest.js"

//Add one element to the DOM
export function addOneElement(element){
    let gallery = document.getElementById("gallery")

    let figure = document.createElement("figure")
    let img = document.createElement("img")
    let figcaption = document.createElement("figcaption")
    
    img.src = element.imageUrl
    img.alt = element.title
    figcaption.textContent = element.title
    figcaption.dataset.id = element.id
    
    figure.appendChild(img)
    figure.appendChild(figcaption)
    gallery.appendChild(figure)
}

//Add elements to the DOM
export function addElements(table){
    let gallery = document.getElementById("gallery")

    gallery.innerHTML = ""

    if(table.length === 0){
        gallery.style.display = "block"
        gallery.innerHTML = `<p class="empty-gallery font-20-text-center">La galerie est vide</p>`
    } else{
        gallery.style.display = "grid"
        for(let element of table){
            addOneElement(element)
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

//Add the gallery inside the modal
export function addElementsModal(table){
    let galleryModal = document.querySelector(".modal-articles")
    
    galleryModal.innerHTML = ""

    if (table.length === 0) {
        galleryModal.style.display = "block"
        galleryModal.innerHTML = `<p class="empty-gallery">La galerie est vide</p>`
    } else {
        for(let element of table){
            let article = document.createElement("article")
            let div = document.createElement("div")
            let icone = document.createElement("i")
            let img = document.createElement("img")
            let para = document.createElement("p")

            div.classList.add("trash-icon")
            div.dataset.id = element.id
            icone.classList.add("fa-solid","fa-trash-can")
            img.src = element.imageUrl
            img.alt = element.title
            para.classList.add("modal-edit")

            div.appendChild(icone)
            article.appendChild(div)
            article.appendChild(img)
            article.appendChild(para)
            galleryModal.appendChild(article)
        }

        //Event deleting one project
        document.querySelectorAll(".trash-icon").forEach((element)=>{
            element.addEventListener("click",async function(){
                let id = parseInt(this.dataset.id)

                if(confirm("Voulez-vous supprimer ce projet ?")){
                    await FetchRequest.delete(id)
                    document.querySelectorAll(`[data-id="${id}"]`).forEach((child)=>{
                        child.parentElement.remove()
                    })
                    notification("remove")
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
export function notification(value){
    let msg = document.querySelector(".msg-success")
  
    switch(value){
        case "add":
            msg.classList.add("bg-green")
            msg.classList.remove("bg-red")
            msg.innerHTML = "Projet ajouté"
            break
        case "remove":
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
    } else if(file["size"] >= 4194304) {
        msg.innerHTML ="la taille de l'image est supérieure à 4mo"
        return false
    } else{
        msg.innerHTML = ""
        return true
    }
}