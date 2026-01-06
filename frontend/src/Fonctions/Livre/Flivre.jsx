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
            console.log(error.response.data.message)
        }
    }

export const InsererLivre = async ( books)=>{
    try {
        const res = await axios.post(`${AXIOS_URI}/livre/creation`,books)
        if(res.data.status==="valide"){
            toast.success(res.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
    }
}
export const ModifierLivre = async (id,books)=>{
    try {
        const res = await axios.put(`${AXIOS_URI}/livre/modifierLivre/${id}`,books)
        if(res.data.status==="valide"){
            toast.success(res.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
    }
}
export const SupprimerLivre = async (id)=>{
    try {
        const res = await axios.delete(`${AXIOS_URI}/livre/supprimerLivre/${id}`)
        if(res.data.status==="valide"){
            return res.data.message
        }
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
    }
}

export const AfficherDemande=async ()=>{
    try {
        const res = await axios.get(`${AXIOS_URI}/demandes`)
        if(res.data.status==="valide"){
            return res.data.donnee
        }
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
    }
}

export const CreerDemande=async (demandes)=>{
    try {
        const res = await axios.post(`${AXIOS_URI}/demandes`,demandes)
        if(res.data.status==="valide"){
            return res.data.message
        }
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
    }
}
export const SupprimerDemande=async (id)=>{
    try {
        const res = await axios.delete(`${AXIOS_URI}/demandes/${id}`)
        if(res.data.status==="valide"){
            return res.data.message
        }
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
    }
}

