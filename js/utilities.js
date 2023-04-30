import { fetchRequest } from "./fetchRequest.js"

//Recuperation des donnees
const result = await fetchRequest.connection("works")
const listCategories = await fetchRequest.connection("categories")

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
    }else{
        element.addEventListener("click",function(){
            document.querySelector(".gallery").innerHTML = ""
            const tableFilter = data.filter(res => res.categoryId === parseInt(this.dataset.id))
            addElements(tableFilter)
            document.querySelector(".selected").classList.remove("selected")
            this.classList.add("selected")
        })
    }
}

//Fonction Modal home
export function modalHome(target){
    document.querySelector(".modal-container").innerHTML = ""
    document.querySelector(".modal-container").innerHTML = `<p class="modal-close"><span class="close-icon">&times;</span></p>
                                                        <h3 class="modal-title">Galerie photo</h3>
                                                        <div class="modal-section modal-articles"></div>
                                                        <button id="btn-home" class="btn-submit modal-add bg-green">Ajouter une photo</button>
                                                        <p class="modal-delete">supprimer la galerie</p>`
 
    //Ajout la galerie dans le Modal
    document.querySelector(".modal-articles").innerHTML = ""
    for(let element of result){
        document.querySelector(".modal-articles").innerHTML += `<article>
                                                                    <div class="trash-icon" data-id="${element.id}">
                                                                        <i class="fa-solid fa-trash-can"></i>
                                                                    </div>
                                                                    <img src="${element.imageUrl}" alt="${element.title}">
                                                                    <p class="modal-edit">éditer</p>
                                                                </article>`
    }    

    //Ajout Modal post
    document.getElementById("btn-home").addEventListener("click",function(){
        //Ajout des elements
        modalPost(target)
    })

    //Fermeture du Modal avec la croix
    document.querySelector(".close-icon").addEventListener("click",function(){
        target.style.display = "none"
    })
}

//Fonction Modal ajout d'un post
export function modalPost(target){
    document.querySelector(".modal-container").innerHTML = ""
    document.querySelector(".modal-container").innerHTML = `<p class="modal-header"><i class="fa-solid fa-arrow-left"></i><span class="close-icon">&times;</span></p>
                                                        <h3 class="modal-title">Ajout photo</h3>
                                                        <div class="modal-section">
                                                            <form class="modal-form">
                                                                <div class="modal-load">
                                                                    <i class="fa-sharp fa-solid fa-image"></i>
                                                                    <label for="modal-form-image" class="btn-submit label-image bg-blue">+ Ajouter photo</label>
                                                                    <input type="file" id="modal-form-image">
                                                                    <p>jpg, png : 4mo max</p>
                                                                </div>
                                                            
                                                                <label for="modal-form-title" class="label-style label-title">Titre</label>
                                                                <input type="text" name="modal-form-title" id="modal-form-title" class="input-style">
                                                                <label for="modal-form-categories" class="label-style">Catégorie</label>
                                                                <select name="modal-form-categories" id="modal-form-categories" class="input-style">
                                                                    <option value=""></option>
                                                                </select>
                                                            </form>
                                                        </div>
                                                        <button class="btn-submit modal-validate bg-grey">Valider</button>`
           
    for(let category of listCategories){
        document.getElementById("modal-form-categories").innerHTML += `<option value="${category.id}">${category.name}</option>`
    }

    //Retour au Modal home
    document.querySelector(".fa-arrow-left").addEventListener("click",function(){
        modalHome(target)
    })

    //Fermeture du Modal avec la croix
    document.querySelector(".close-icon").addEventListener("click",function(){
        target.style.display = "none"
    })
}