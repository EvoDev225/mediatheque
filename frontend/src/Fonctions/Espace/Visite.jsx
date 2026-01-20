import axios from "axios"
import toast from "react-hot-toast"
axios.defaults.withCredentials = true
    const   AXIOS_URI ="http://localhost:3000"
    
export const AfficherVisites = async ()=>{
    try {
        const res = await axios.get(`${AXIOS_URI}/visite/afficherVisite`)
        if(res.data.status==="valide"){
            return res.data.donnee
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}



export const AfficherVisiteDate = async (date)=>{
    try {
        const res = await axios.post(`${AXIOS_URI}/visite/dateAfficherVisite`,{date:date})
        if(res.data.status==="valide"){
            return res.data.donnee
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const InsererVisite= async (visite)=>{
    try {
        const res = await axios.post(`${AXIOS_URI}/visite/creation`,visite)
        if(res.data.status==="valide"){
            toast.success(res.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}



export const InsererClient = async (client)=>{
    try {
        const res = await axios.post(`${AXIOS_URI}/client/creation`,client)
        if(res.data.status==="valide"){
            toast.success(res.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}


export const SupprimerVisite = async (id)=>{
        try {
            const res = await axios.delete(`${AXIOS_URI}/visite/supprimerVisite/${id}`)
            if(res.data.status==="valide"){
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
}
export const SupprimerClient = async (id)=>{
        try {
            const res = await axios.delete(`${AXIOS_URI}/client/supprimerClient/${id}`)
            if(res.data.status==="valide"){
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
}

export const AfficherClientDate = async (date)=>{
    try {
        const res = await axios.post(`${AXIOS_URI}/client/obtenirClientParDate`,{date:date}) 
        if(res.data.status==="valide"){
            return res.data.donnee
        }   
    } catch (error) {
        console.log(error)
    }
    };