const form = document.querySelector(".form-connection")

form.addEventListener("submit",function(event){
    event.preventDefault()
    const user = {
        email: event.target.email.value,
        password: event.target.password.value
    }
    console.log(user)

    if (event.target.password.value === "") {
        event.target.password.setCustomValidity("Erreur dans l'identifiant ou le mot de passe");
    
    }else{
        event.target.password.setCustomValidity("");
        
    }
    //.setCustomValidity("Erreur dans l'identifiant ou le mot de passe")
    
    
})