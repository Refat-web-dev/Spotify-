export let token = JSON.parse(localStorage.getItem("token"))

if (!token) {

    location.assign(`${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&scope=user-library-read%20user-read-recently-played`)

}
localStorage.setItem("token", JSON.stringify(location.href.split('access_token=').at(-1)))
