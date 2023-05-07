const load = await fetch("../../config.json")
const loadJson = await load.json()

const token = window.localStorage.getItem("token")

export class FetchRequest {

    static get param(){
        return loadJson
    }

    //Post email and password
    static async login(user) {
        try {
            let data = await fetch(`${this.param.host}api/users/login`,
                {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(user)
                })

            if(!data.ok) throw new Error(`Error ${data.status} : ${data.statusText}`)
            
            let result = await data.json()

            return result
        } catch (err) {
            console.log(err.message)
        }
    }

    //Get api/works or api/categories depending on request parameter
    static async get(request) {
        try{
            let data = await fetch(`${this.param.host}api/${request}`)

            if(!data.ok) throw new Error(`Error ${data.status} : ${data.statusText}`)
            
            let result = await data.json()
            
            return result
        } catch(err){
            console.log(err.message)
        }
    }

    //Post new project
    static async post(formData) {
        try{
            let data = await fetch(`${this.param.host}api/works`,
                {
                    method: "POST",
                    headers: {"Authorization": `Bearer ${token}`},
                    body: formData
                })
            
            if(!data.ok) throw new Error(`Error ${data.status} : ${data.statusText}`)

            console.log(`Success ${data.status} : ${data.statusText}`)
        
        } catch(err){
            console.log(err.message)
        }
    }

    //Delete api/works/{id}
    static async delete(id) {
        try{
            let data = await fetch(`${this.param.host}api/works/${id}`,
                {
                    method: "DELETE",
                    headers: {"Authorization": `Bearer ${token}`}
                })
            
            if(!data.ok) throw new Error(`Error ${data.status} : ${data.statusText}`)
            //let msg = JSON.parse(data.body)

            console.log(`Success ${data.status} : ${data.statusText}`)
            //console.log(msg.message)

        } catch(err){
            console.log(err.message)
        }
    }

    //Delete all projects of the gallery
    static async deleteAll() {
        try{
            let request = await this.get("works")
            for (let i=0; i<request.length; i++){
                 await fetch(`http://localhost:5678/api/works/${request[i].id}`,
                    {
                        method : "DELETE",
                        headers: {"Authorization": `Bearer ${token}`}
                    })
            }
        } catch(err){
            console.log(err)
        }
    }
}