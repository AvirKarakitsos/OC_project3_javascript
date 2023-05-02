import { fetchRequest } from "../../js/fetchRequest.js"

const form = document.querySelector(".form-connection")

form.addEventListener("submit",async function(event){
    event.preventDefault()
    const resForm = {
        "email": event.target.email.value,
        "password": event.target.password.value
    }

    if((resForm.email !== fetchRequest.param.user.email) || (resForm.password !== fetchRequest.param.user.password)){
        document.querySelector(".msg-error").innerHTML = "Erreur dans l'identifiant ou le mot de passe"
    }else{
        document.querySelector(".msg-error").innerHTML = ""
        const response = await fetch(`${fetchRequest.param.host}api/users/login`,
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(resForm)
            })
        
            if(response.ok){
                const result = await response.json()
                window.localStorage.setItem("token",result.token)
                window.location.pathname = "/views/edit/edit.html"
            }
    }
})