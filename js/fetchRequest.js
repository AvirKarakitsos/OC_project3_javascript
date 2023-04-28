export class fetchRequest {

    static async connection(request) {
        try{
            //Recuperation des donnees
            let load = await fetch("../../config.json")
            load = await load.json()
            const data = await fetch(`${load.host}api/${request}`)
            const result = await data.json()
            return result
        }catch(err){
            console.log(err)
        }
    }
}