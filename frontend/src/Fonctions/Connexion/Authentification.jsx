
import axios from "axios"
import toast from "react-hot-toast"
axios.defaults.withCredentials = true


 const   AXIOS_URI ="http://localhost:3000"

export const Deconnexion = async ()=>{
    try {
        await axios.post(`${AXIOS_URI}/utilisateur/api/auth/deconnexion`)
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}