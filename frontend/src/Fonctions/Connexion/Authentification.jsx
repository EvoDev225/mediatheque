
import axios from "axios"
import toast from "react-hot-toast"
axios.defaults.withCredentials = true


 const   AXIOS_URI ="http://localhost:3000"

export const DeconnexionAdmin = async ()=>{
    try {
        await axios.post(`${AXIOS_URI}/utilisateur/api/auth/deconnexion?espace=admin`)
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}

export const DeconnexionEmploye = async ()=>{
    try {
        await axios.post(`${AXIOS_URI}/utilisateur/api/auth/deconnexion?espace=employe`)
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}