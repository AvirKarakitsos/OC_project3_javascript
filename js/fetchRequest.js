class fetchRequest {

    constructor(request) {
        this.request = request
    }

    static async connection() {
        try{
            //Recuperation des donnees
            let load = await fetch("../../config.json")
            load = await load.json()
            const data = await fetch(`${load.host}api/${this.request}`)
            const result = await data.json()
            return result
        }catch(err){
            console.log(err)
        }
    }
}