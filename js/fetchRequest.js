const load = await fetch("../../config.json")
const loadJson = await load.json()

export class fetchRequest {

    static get param(){
        return loadJson
    }

    static async get(request) {
        try{
            //Recuperation des donnees
            const data = await fetch(`${this.param.host}api/${request}`)
            const result = await data.json()
            return result
        }catch(err){
            console.log(err)
        }
    }

    static async post(formData) {
        try{
            const data = await fetch(`${this.param.host}api/works`,
                {
                    method: "POST",
                    headers: {"Authorization": `Bearer ${this.param.token}`},
                    body: formData
                })
            return data
        }catch(err){
            console.log(err)
        }
    }

    static async delete(id) {
        try{
            const data = await fetch(`${this.param.host}api/works/${id}`,
                {
                    method: "DELETE",
                    headers: {"Authorization": `Bearer ${this.param.token}`}
                })
            return data
        }catch(err){
            console.log(err)
        }
    }
}