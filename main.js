import axios from "axios"
const client_id = "b6c9b6d8e425462d95b781d7576efb59"
const REDIRECT_URI = "http://localhost:5173"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

let login = document.querySelector(".login")

login.onclick = () => {
    location.assign(`${AUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-library-read`)
}
let token = location.href.split('access_token=').at(-1)
let baseURL = "https://api.spotify.com"
let getDetails = async (path) => {
    try {
        const res = await axios.get(baseURL + path, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res
    } catch (e) {
        console.log(e);
    }
}
getDetails("/v1/me")
    .then(res => {
        console.log(res);
    })

