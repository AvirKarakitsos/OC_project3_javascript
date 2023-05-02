import { fetchRequest } from "./fetchRequest.js"

//Recuperation des donnees
const listCategories = await fetchRequest.get("categories")

let fetchConfig = await fetch("../../config.json") //le script edit.js est dans views -> edit
fetchConfig = await fetchConfig.json()

//Fonction pour ajouter des elements dans le DOM pour la page Home
export function addElements(table){
    const gallery = document.querySelector(".gallery")
    for(let element of table){
        const figure = document.createElement("figure")
        const image = document.createElement("img")
        const title = document.createElement("figcaption")

        image.src = element.imageUrl
        image.alt = element.title
        title.textContent = element.title

        figure.appendChild(image)
        figure.appendChild(title)
        
        gallery.appendChild(figure)
    }    
}

//Fonction pour ajouter addEventListener sur les filtres sur la page Home
export function addClickEvent(element,data){
    if(parseInt(element.dataset.id) === 0){
        element.addEventListener("click",function(){
            document.querySelector(".gallery").innerHTML = ""
            addElements(data)
            document.querySelector(".selected").classList.remove("selected")
            this.classList.add("selected")
        })
    } else{
        element.addEventListener("click",function(){
            document.querySelector(".gallery").innerHTML = ""
            const tableFilter = data.filter(res => res.categoryId === parseInt(this.dataset.id))
            addElements(tableFilter)
            document.querySelector(".selected").classList.remove("selected")
            this.classList.add("selected")
        })
    }
}

//Fonction qui ajoute la galerie dans le Modal
function addElementsModal(table){
    document.querySelector(".modal-articles").innerHTML = ""
    for(let element of table){
        document.querySelector(".modal-articles").innerHTML += `<article>
                                                                    <div class="trash-icon" data-id="${element.id}">
                                                                        <i class="fa-solid fa-trash-can"></i>
                                                                    </div>
                                                                    <img src="${element.imageUrl}" alt="${element.title}">
                                                                    <p class="modal-edit">éditer</p>
                                                                </article>`
    }
}

//Fonction Modal home
export function modalHome(target,data){
    document.querySelector(".modal-container").innerHTML = ""
    document.querySelector(".modal-container").innerHTML = `<p class="modal-close"><span class="close-icon">&times;</span></p>
                                                        <h3 class="modal-title">Galerie photo</h3>
                                                        <div class="modal-section modal-articles border-grey"></div>
                                                        <button id="btn-home" class="btn-submit modal-add bg-green">Ajouter une photo</button>
                                                        <p class="modal-delete">supprimer la galerie</p>`

    //Ajout des projets dans le modal
    addElementsModal(data)

    //Evenement pour supprimer un projet de la galerie
    document.querySelectorAll(".trash-icon").forEach((element)=>{
        element.addEventListener("click",async function(){
            const id = parseInt(this.dataset.id)
            if(confirm("Voulez-vous supprimer ce projet ?")){
                const deleteproject = await fetchRequest.delete(id)
                if(deleteproject.ok){
                    let newData = await fetchRequest.get("works")
                    addElements(newData)
                    addElementsModal(newData)
                }
            }
            
        })
    })

    //Evenement pour supprimer toute la galerie
    document.querySelector(".modal-delete").addEventListener("click",async function() {
        const lengthTable = data.length
        if(confirm("Voulez-vous supprimer toute la galerie ?")){
            // for (let i=0; i<lengthTable; i++){
            //     await fetch(`http://localhost:5678/api/works/${i}`,{"method": "DELETE"})
            // }
        }
    })

    //Ajout Modal projet
    document.getElementById("btn-home").addEventListener("click",function(){
        //Ajout des elements
        modalproject(target,data)
    })

    //Fermeture du Modal avec la croix
    document.querySelector(".close-icon").addEventListener("click",function(){
        target.style.display = "none"
    })
}

function msgColor(value){
    const msg = document.querySelector(".msg")
    switch(value){
        case "empty": 
            msg.innerHTML = ""
            break
        case "green":
            msg.classList.add("color-green")
            msg.classList.remove("color-red")
            msg.innerHTML = "Projet ajouté avec succès"
            break
        case "red":
            msg.classList.add("color-red")
            msg.classList.remove("color-green")
            msg.innerHTML = "Veuillez completer le formulaire"
            break
    }
}

//Fonction qui change le bouton de validation
function changeButtonColor(input){
    const changeColor = document.getElementById("btn-form")
    if(input){
        changeColor.classList.remove("bg-grey")
        changeColor.classList.add("bg-green")
        msgColor("empty")
    } else {
        changeColor.classList.remove("bg-green")
        changeColor.classList.add("bg-grey")
    }
}

//Fonction modal projet
export function modalproject(target,data){
    let newData = null

    document.querySelector(".modal-container").innerHTML = ""
    document.querySelector(".modal-container").innerHTML = `<p class="modal-header"><i class="fa-solid fa-arrow-left"></i><span class="close-icon">&times;</span></p>
                                                        <h3 class="modal-title">Ajout photo</h3>
                                                        <div class="modal-section modal-project">
                                                            <form class="modal-form">
                                                                <div class="modal-form-1">
                                                                    <i class="fa-sharp fa-solid fa-image"></i>
                                                                    <label for="modal-form-image" class="btn-submit label-image bg-blue">+ Ajouter photo</label>
                                                                    <input type="file" accept=".png" id="modal-form-image" name="image">
                                                                    <p>jpg, png : 4mo max</p>
                                                                </div>
                                                                <div class="modal-form-2 border-grey">
                                                                    <label for="modal-form-title" class="label-style label-title">Titre</label>
                                                                    <input type="text" name="title" id="modal-form-title" class="input-style">
                                                                    <label for="modal-form-categories" class="label-style">Catégorie</label>
                                                                    <select name="categories" id="modal-form-categories" class="input-style">
                                                                        <option value=""></option>
                                                                    </select>
                                                                    <p class="msg"></p>
                                                                </div>
                                                                <button class="btn-submit modal-validate bg-grey" id="btn-form">Valider</button>
                                                            </form>
                                                        </div>`
    
    //Ajout des differentes categories dans les options       
    for(let category of listCategories){
        document.getElementById("modal-form-categories").innerHTML += `<option value="${category.id}">${category.name}</option>`
    }

    //Logique du formulaire complete
    let fileFilled = false
    let titleFilled = false
    let categoryFilled = false
    let formFilled = false

    let image = null //stocke le fichier File
    
    //Afficher le choix de l'image
    document.getElementById("modal-form-image").addEventListener("change",function(){
        image = this.files[0]
        let imageAlt = image.name.split(".")[0]

        document.querySelector(".modal-form-1").innerHTML = ""
        document.querySelector(".modal-form-1").innerHTML = `<img src="${fetchConfig.liveserver}assets/images/${image.name}" class="display-image" alt="${imageAlt}">` 
        
        if(image !==null){
            fileFilled = true
            titleFilled && categoryFilled ? formFilled = true : formFilled = false
            changeButtonColor(formFilled)
        }
    })
    document.getElementById("modal-form-title").addEventListener("input",function(){
        if(this.value.length > 2){
            titleFilled = true
            fileFilled && categoryFilled ? formFilled = true : formFilled = false
            changeButtonColor(formFilled)
          } else{
            titleFilled = false
            formFilled = false
            changeButtonColor(formFilled)
          }
    })
    document.getElementById("modal-form-categories").addEventListener("change",function(){
        if(this.value !== ""){
            categoryFilled = true
            fileFilled && titleFilled ? formFilled = true : formFilled = false
            changeButtonColor(formFilled)
          } else{
            categoryFilled = false
            formFilled = false
            changeButtonColor(formFilled)
          }
    })
    //Validation du formulaire
    document.querySelector(".modal-form").addEventListener("submit",async function(event){
        event.preventDefault()
        if(formFilled){
            
            //Requete
            const formData = new FormData()
            formData.append("image",image)
            formData.append("title",event.target.title.value)
            formData.append("category",parseInt(event.target.categories.value))
            
            try{
            const project = await fetch("http://localhost:5678/api/works",
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${fetchConfig.token}`
                        },
                        body: formData
                    })
            if(project.ok){
                msgColor("green")
                newData = await fetchRequest.get("works")
                addElements(newData)
            }
                } catch(e){
                    console.log(e)
                }
               
        } else {
            msgColor("red")
        }
    })

    //Retour au Modal home
    document.querySelector(".fa-arrow-left").addEventListener("click",function(){
        newData === null ? modalHome(target,data) : modalHome(target,newData)
    })

    //Fermeture du Modal avec la croix
    document.querySelector(".close-icon").addEventListener("click",function(){
        target.style.display = "none"
    })
}