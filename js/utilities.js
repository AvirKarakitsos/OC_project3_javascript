//Fonction pour ajouter des elements dans le DOM
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

//Fonction pour ajouter addEventListener sur les filtres
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

//Fonction pour ajouter des elements dans le Modal
function addModalElements(table){
    const modalArticles = document.querySelector(".modal-articles")
    modalArticles.innerHTML = ""
    for(let element of table){
        modalArticles.innerHTML += `<article>
                                        <div class="trash-icon">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </div>
                                        <img src="${element.imageUrl}" alt="${element.title}">
                                        <p class="modal-edit">éditer</p>
                                    </article>`
    }    
}

export function modalHome(){
    document.querySelector(".modal-contain").innerHTML = `<p class="modal-close"><span>&times;</span></p>
                                                        <h3 class="modal-title">Galerie photo</h3>
                                                        <div class="modal-section modal-articles"></div>
                                                        <button class="btn-submit modal-add">Ajouter une photo</button>
                                                        <p class="modal-delete">supprimer la galerie</p>`
    async function executeModal(){
        try{
            //Recuperation des donnees
            let load = await fetch("../../config.json")
            load = await load.json()
            const data = await fetch(`${load.host}api/works`)
            const result = await data.json()
    
            //Ajout des elements dans le Modal
            addModalElements(result)
        }catch(err){
            console.log(err)
        }
    }
    
    executeModal()

}