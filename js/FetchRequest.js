const load = await fetch("../../config.json")
const loadJson = await load.json()

let token = window.localStorage.getItem("token")

export class FetchRequest {

    static get param(){
        return loadJson
    }

    static async login(user) {
        try {
            const data = await fetch(`${this.param.host}api/users/login`,
                {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(user)
                })

            if(!data.ok) throw new Error(`Error ${data.status} : ${data.statusText}`)
            
            return data.json()

        } catch (err) {
            console.log(err.message)
        }
    }

    static async get(request) {
        try{
            const data = await fetch(`${this.param.host}api/${request}`)

            if(!data.ok) throw new Error(`Error ${data.status} : ${data.statusText}`)
            
            return data.json()

        } catch(err){
            console.log(err.message)
        }
    }

    static async post(formData) {
        try{
            const data = await fetch(`${this.param.host}api/works`,
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

    static async delete(id) {
        try{
            const data = await fetch(`${this.param.host}api/works/${id}`,
                {
                    method: "DELETE",
                    headers: {"Authorization": `Bearer ${token}`}
                })
            
            if(!data.ok) throw new Error(`Error ${data.status} : ${data.statusText}`)

            console.log(`Success ${data.status} : ${data.statusText}`)

        } catch(err){
            console.log(err.message)
        }
    }

    static async deleteAll() {
        try{
            const request = await this.get("works")
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