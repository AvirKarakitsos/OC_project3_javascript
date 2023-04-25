
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
        document.querySelectorAll(".categories li").forEach((category) => addClickEvent(category,result))
        
    }catch(err){
        console.log(err)
    }
}

executeCode()


