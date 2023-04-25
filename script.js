// console.log("Start")

// const data = fetch("http://localhost:5678/api/works")
//             .then(res => res.json())
//             .then(res =>console.log(res))
//             .catch(e => console.log(e))

// console.log("End")

//Fonction pour ajouter des elements dans le DOM
function addElements(table){
    for(element of table){
        const gallery = document.querySelector(".gallery")
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
function addClickEvent(element,data){
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
async function executeCode(){
    try{
        //Recuperation des donnees
        const data = await fetch("http://localhost:5678/api/works")
        const result = await data.json()

        //Ajout des elements dans le DOM
        addElements(result)

        //Ajout des categories dans le HTML
        const list = document.querySelector(".categories")
        const dataCategories = await fetch("http://localhost:5678/api/categories")
        const listCategories = await dataCategories.json()

        for(category of listCategories){
            const newElement = document.createElement("li")
            newElement.textContent = category.name
            newElement.dataset.id = category.id
            list.appendChild(newElement)
        }

        //Ajout d'un click event sur les filtres
        const allFilters = document.querySelectorAll(".categories li")
        
        for(let i=0; i<allFilters.length;i++){
            addClickEvent(allFilters[i],result)
        }
    }catch(err){
        console.log(err)
    }
}

executeCode()


