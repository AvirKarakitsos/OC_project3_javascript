//Go to the connection page
export function login(){
    window.location.pathname = "/views/connection/connection.html"
}

//Logout  and go to the home page
export function logout(){
    window.localStorage.removeItem("token")
    window.location.pathname = "views/home"
}

//Test if the token exists or not
export function isActive(){
    let token = window.localStorage.getItem("token")

    return token !== null ? true : false
}