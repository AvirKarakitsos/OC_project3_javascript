import { FetchRequest } from "./FetchRequest.js"
import { addElements, addElementsModal, close, formCompleted, changeButtonColor, msgValidation, imageValidity } from "./utilities.js"

const listCategories = await FetchRequest.get("categories") //Collect categories database
const modalContainer = document.querySelector(".modal-container")

//Fonction modal
export function modalHome(data){
    modalContainer.innerHTML = ""
    modalContainer.innerHTML = `<p class="modal-close"><span class="close-icon">&times;</span></p>
                                <h3 class="modal-title">Galerie photo</h3>
                                <div class="modal-section modal-articles border-grey"></div>
                                <button id="btn-home" class="btn-submit modal-add bg-green">Ajouter une photo</button>
                                <p class="modal-delete">supprimer la galerie</p>`

    addElementsModal(data) //Add projects to the modal

    //Event deleting all projects
    document.querySelector(".modal-delete").addEventListener("click",async function() {
        if(confirm("Voulez-vous supprimer toute la galerie ?")){
            await FetchRequest.deleteAll()
            let newData = await FetchRequest.get("works")
            addElements(newData)
            addElementsModal(newData)
        }
    })

    //Add modal form
    document.getElementById("btn-home").addEventListener("click",function(){
        modalForm(data)
    })

    //Close the modal with the cross
    document.querySelector(".close-icon").addEventListener("click",close)
}

//Fonction modal form
function modalForm(data){
    let newData = null //To stock the new database

    //Logic for completed form
    let fileFilled = false
    let titleFilled = false
    let categoryFilled = false
    let formFilled = false

    let image = null //To stock file image
    let arrImages = []

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
                                            <input type="file" id="modal-form-image" name="image" required>
                                            <p>jpg, png : 4mo max</p>
                                        </div>
                                        <p class="msg msg-image"></p>
                                        <div class="modal-form-2 border-grey">
                                            <label for="modal-form-title" class="label-style label-title">Titre</label>
                                            <input type="text" name="title" id="modal-form-title" class="input-style" required>
                                            <label for="modal-form-categories" class="label-style">Catégorie</label>
                                            <select name="categories" id="modal-form-categories" class="input-style">
                                                <option value=""></option>
                                            </select>
                                            <p class="msg"></p>
                                        </div>
                                        <button class="btn-submit modal-validate bg-grey" id="btn-form">Valider</button>
                                    </form>
                                </div>`

    //Add options categories       
    for(let category of listCategories){
        document.getElementById("modal-form-categories").innerHTML += `<option value="${category.id}">${category.name}</option>`
    }

    //Event Listener for inputs
    //Input File
    document.getElementById("modal-form-image").addEventListener("change", function(){
        let imageAlt

        image = this.files[0]
        if(image === undefined){ //case when you click cancel button
            image = arrImages[0]
        } else{
            image = this.files[0]
            arrImages[0] = this.files[0]
        }
        console.log(image)
        fileFilled = imageValidity(image)
        imageAlt = image.name.split(".")[0]

        //Display the image
        document.querySelector(".modal-form-1 .fa-image").style.display = "none"
        document.querySelector(".modal-form-1 p").innerHTML = ""

        document.querySelector(".modal-form-1 label").classList.remove("btn-submit", "label-image", "bg-blue")
        //document.querySelector(".modal-form-1 label").style.display = "block"
        document.querySelector(".modal-form-1 label").innerHTML = ""
        document.querySelector(".modal-form-1 label").innerHTML = `<img src="${FetchRequest.param.liveserver}assets/images/${image.name}" class="display-image" alt="${imageAlt}">` 
         
        titleFilled && categoryFilled ? formFilled = true : formFilled = false
        changeButtonColor(formFilled)
        
    })
    //Input Title
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
    //Input Category
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

    //Form validation
    document.querySelector(".modal-form").addEventListener("submit",async function(event){
        event.preventDefault()

        if(formFilled){
            //Collect form responses
            let formData = new FormData()
            
            formData.append("image",image)
            formData.append("title",event.target.title.value.trim())
            formData.append("category",parseInt(event.target.categories.value))
            
            await FetchRequest.post(formData)
            
            //Restore the fields
            document.getElementById("modal-form-title").innerHTML = ""
            document.getElementById("modal-form-categories").value = ""
            
            close()
            msgValidation("add")

            //Load the new database
            newData = await FetchRequest.get("works")
            addElements(newData)
        } else{
            formCompleted("red")
        }
    })

    //To go back to the modal
    document.querySelector(".fa-arrow-left").addEventListener("click",function(){
        newData === null ? modalHome(data) : modalHome(newData)
    })

    //Close modal with the cross
    document.querySelector(".close-icon").addEventListener("click",close)
}