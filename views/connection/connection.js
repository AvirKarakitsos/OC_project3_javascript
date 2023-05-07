import { FetchRequest } from "../../js/FetchRequest.js"

const form = document.querySelector(".form-connection")

form.addEventListener("submit",async function(event){
    event.preventDefault()
    const resForm = {
        email: event.target.email.value.trim(),
        password: event.target.password.value
    }

    if((resForm.email !== FetchRequest.param.user.email) || (resForm.password !== FetchRequest.param.user.password)){
        document.querySelector(".msg-error").innerHTML = "Erreur dans l'identifiant ou le mot de passe"
    } else{
        document.querySelector(".msg-error").innerHTML = ""

        const result = await FetchRequest.login(resForm)
        
        window.localStorage.setItem("token",result.token)
        window.location.pathname = "/views/edit/edit.html"
            
    }
})