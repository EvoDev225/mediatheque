import axios from "axios"
import {toast} from "react-hot-toast"
axios.defaults.withCredentials = true
    const   AXIOS_URI ="http://localhost:3000"

    export const ToutLivre = async ()=>{
        try {
            const res = await axios.get(`${AXIOS_URI}/livre/obtenir`)
            if(res.data.status==="valide"){
            return res.data.donnee
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
