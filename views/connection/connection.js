import { FetchRequest } from "../../js/FetchRequest.js"

const form = document.querySelector(".form-connection")

form.addEventListener("submit",async function(event){
    event.preventDefault()
    const resForm = {
        "email": event.target.email.value,
        "password": event.target.password.value
    }

    if((resForm.email !== FetchRequest.param.user.email) || (resForm.password !== FetchRequest.param.user.password)){
        document.querySelector(".msg-error").innerHTML = "Erreur dans l'identifiant ou le mot de passe"
    } else{
        document.querySelector(".msg-error").innerHTML = ""
        const response = await FetchRequest.login(resForm)
        
            if(response.ok){
                const result = await response.json()
                window.localStorage.setItem("token",result.token)
                window.location.pathname = "/views/edit/edit.html"
            }
    }
})