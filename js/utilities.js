//Fonction pour ajouter des elements dans le DOM
export function addElements(table){
    const gallery = document.getElementById("gallery")

    gallery.innerHTML = ""
    for(let element of table){
        gallery.innerHTML += `<figure>
                                <img src="${element.imageUrl}" alt="${element.title}">
                                <figcaption>${element.title}</figcaption>
                            </figure>`
    }    
}

//Fonction pour ajouter addEventListener sur les filtres categories
export function addClickEvent(element,data){
    if(parseInt(element.dataset.id) === 0){
        element.addEventListener("click",function(){
            addElements(data)
            document.querySelector(".selected").classList.remove("selected")
            this.classList.add("selected")
        })
    } else{
        element.addEventListener("click",function(){
            const tableFilter = data.filter(res => res.categoryId === parseInt(this.dataset.id))

            addElements(tableFilter)
            document.querySelector(".selected").classList.remove("selected")
            this.classList.add("selected")
        })
    }
}

//Fermeture du Modal
export function close(){
    document.getElementById("modal").style.display = "none"
}

//Fonction qui ajoute la galerie dans le Modal
export function addElementsModal(table){
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

//Fonction pour le message d'erreur ou de validation
export function msgColor(value){
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

//Fonction qui change la couleur du bouton de validation
export function changeButtonColor(input){
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
