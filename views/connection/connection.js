const form = document.querySelector(".form-connection")

form.addEventListener("submit",function(event){
    event.preventDefault()
    const emailResponse = event.target.email
    const passwordResponse = event.target.password

    if((emailResponse.value !== "sophie.bluel@test.tld") || (passwordResponse.value !== "S0phie")){
        document.querySelector(".msg-error").innerHTML = "Erreur dans l'identifiant ou le mot de passe"
    }else{
        document.querySelector(".msg-error").innerHTML = ""
        window.location.pathname = "/views/edit/edit.html"
    }
})