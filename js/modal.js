import { FetchRequest } from "./FetchRequest.js"
import { addElements, addElementsModal, close, msgColor, changeButtonColor } from "./utilities.js"

const listCategories = await FetchRequest.get("categories") //Recuperation des donnees
const modalContainer = document.querySelector(".modal-container")

//Fonction Modal home
export function modalHome(data){
    modalContainer.innerHTML = ""
    modalContainer.innerHTML = `<p class="modal-close"><span class="close-icon">&times;</span></p>
                                <h3 class="modal-title">Galerie photo</h3>
                                <div class="modal-section modal-articles border-grey"></div>
                                <button id="btn-home" class="btn-submit modal-add bg-green">Ajouter une photo</button>
                                <p class="modal-delete">supprimer la galerie</p>`

    addElementsModal(data) //Ajout des projets dans le modal

    //Evenement pour supprimer un projet de la galerie
    document.querySelectorAll(".trash-icon").forEach((element)=>{
        element.addEventListener("click",async function(){
            const id = parseInt(this.dataset.id)

            if(confirm("Voulez-vous supprimer ce projet ?")){
                await FetchRequest.delete(id)
                let newData = await FetchRequest.get("works")
                addElements(newData)
                addElementsModal(newData)
            }
        })
    })

    //Evenement pour supprimer toute la galerie
    document.querySelector(".modal-delete").addEventListener("click",async function() {
        if(confirm("Voulez-vous supprimer toute la galerie ?")){
            await FetchRequest.deleteAll()
            let newData = await FetchRequest.get("works")
            addElements(newData)
            addElementsModal(newData)
        }
    })

    //Ajout Modal formulaire
    document.getElementById("btn-home").addEventListener("click",function(){
        modalForm(data)
    })

    //Fermeture du Modal avec la croix
    document.querySelector(".close-icon").addEventListener("click",close)
}

//Fonction Modal formulaire
function modalForm(data){
    let newData = null //pour stocker la nouvelle bdd

    //Logique du formulaire complete
    let fileFilled = false
    let titleFilled = false
    let categoryFilled = false
    let formFilled = false

    let image = null //stocke le fichier File

    modalContainer.innerHTML = ""
    modalContainer.innerHTML = `<p class="modal-header">
                                    <i class="fa-solid fa-arrow-left"></i>
                                    <span class="close-icon">&times;</span>
                                </p>
                                <h3 class="modal-title">Ajout photo</h3>
                                <div class="modal-section modal-project">
                                    <form class="modal-form">
                                        <div class="modal-form-1">
                                            <i class="fa-sharp fa-solid fa-image"></i>
                                            <label for="modal-form-image" class="btn-submit label-image bg-blue">+ Ajouter photo</label>
                                            <input type="file" id="modal-form-image" name="image">
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

    //Event Listener sur les input des formulaires
    //Input File
    document.getElementById("modal-form-image").addEventListener("change", function(){
        image = this.files[0]
        let imageAlt = image.name.split(".")[0]

        //Afficher l'image choisie dans le formulaire
        document.querySelector(".modal-form-1").innerHTML = ""
        document.querySelector(".modal-form-1").innerHTML = `<img src="${FetchRequest.param.liveserver}assets/images/${image.name}" class="display-image" alt="${imageAlt}">` 
        
        if(image !== null){
            fileFilled = true
            titleFilled && categoryFilled ? formFilled = true : formFilled = false
            changeButtonColor(formFilled)
        }
    })
    //Input Titre
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
    //Input Categorie
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
            //Recuperation des donnees du formulaire
            const formData = new FormData()
            
            formData.append("image",image)
            formData.append("title",event.target.title.value)
            formData.append("category",parseInt(event.target.categories.value))
            
            await FetchRequest.post(formData)
            msgColor("green")
            newData = await FetchRequest.get("works")
            addElements(newData)
        } else{
            msgColor("red")
        }
    })

    //Retour au Modal home
    document.querySelector(".fa-arrow-left").addEventListener("click",function(){
        newData === null ? modalHome(data) : modalHome(newData)
    })

    //Fermeture du Modal avec la croix
    document.querySelector(".close-icon").addEventListener("click",close)
}