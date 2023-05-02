export class fetchRequest {

    static async get(request) {
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

    static async post(formData) {
        try{
            const load = await fetch("../../config.json")
            const loadJson = await load.json()
            const data = await fetch(`${loadJson.host}api/works`,
                {
                    method: "POST",
                    headers: {"Authorization": `Bearer ${loadJson.token}`},
                    body: formData
                })
            return data
        }catch(err){
            console.log(err)
        }
    }

    static async delete(id) {
        try{
            const load = await fetch("../../config.json")
            const loadJson = await load.json()
            const data = await fetch(`${loadJson.host}api/works/${id}`,
                {
                    method: "DELETE",
                    headers: {"Authorization": `Bearer ${loadJson.token}`}
                })
            return data
        }catch(err){
            console.log(err)
        }
    }
}