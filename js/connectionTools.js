export function login(){
    window.location.pathname = "/views/connection/connection.html"
}

export function logout(){
    window.localStorage.removeItem("token")
    window.location.pathname = "views/home"
}

export function isActive(){
    let token = window.localStorage.getItem("token")

    return token !== null ? true : false
}