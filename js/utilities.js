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
        element.addEventListener("click",()=>{
            document.querySelector(".gallery").innerHTML = ""
            addElements(data)
            document.querySelector(".selected").classList.remove("selected")
            element.classList.add("selected")
        })
    }else{
        element.addEventListener("click",()=>{
            document.querySelector(".gallery").innerHTML = ""
            const tableFilter = data.filter(res => res.categoryId === parseInt(element.dataset.id))
            addElements(tableFilter)
            document.querySelector(".selected").classList.remove("selected")
            element.classList.add("selected")
        })
    }
}
