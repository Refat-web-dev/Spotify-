import axios from "axios"
import { token } from "./token"

let baseURL = import.meta.env.VITE_API


export let getDetails = async (path) => {
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
export let getUser = async (path) => {
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
