import axios from "axios"
import toast from "react-hot-toast"
axios.defaults.withCredentials = true
    const   AXIOS_URI ="http://localhost:3000"

export const ToutUtilisateur=async ()=>{
    try {
        const res = await axios.get(`${AXIOS_URI}/utilisateur/api/auth/toutUtilisateur`)
        if(res.data.status==="valide"){
        return res.data.donnee
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const ChangerNiveau = async (id,niveau)=>{
    const   AXIOS_URI ="http://localhost:3000"
    try {
        const res = await axios.patch(`${AXIOS_URI}/utilisateur/api/auth/changerNiveau/${id}`,{niveau:niveau})
        if(res.data.status==="valide"){
            toast.success(res.data.message)
        return res.data.donnee
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export const DesactiverUtilisateur = async (id)=>{
    try {
        const res = await axios.patch(`${AXIOS_URI}/utilisateur/api/auth/desactiverUtilisateur/${id}`)
        if(res.data.status==="valide"){
            toast.success(res.data.message)
            
        return res.data.donnee
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export const ReactiverUtilisateur = async (id)=>{
    const   AXIOS_URI ="http://localhost:3000"
    try {
        const res = await axios.patch(`${AXIOS_URI}/utilisateur/api/auth/reactiverUtilisateur/${id}`)
        if(res.data.status==="valide"){
            console.log(res.data.status)
            toast.success(res.data.message)
            
        return res.data.donnee
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const NouveauUtilisateur = async (utilisateur)=>{
    try {
        const res = await axios.post(`${AXIOS_URI}/utilisateur/api/auth/inscription`,utilisateur)
        if(res.data.status==="valide"){
            toast.success(res.data.message)
        
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const EnvoyerMotdepasse =async (token,motdepasse)=>{
    try {
        const res = await axios.patch(`${AXIOS_URI}/utilisateur/api/auth/motdepasseReinitialiser/${token}`,{motdepasse:motdepasse})
        if(res.data.status==="valide"){
            toast.success(res.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
    }
}

export const EnvoyerCode = async (code)=>{
    try {
        const res = await axios.post(`${AXIOS_URI}/utilisateur/api/auth/verifierEmail`,code)
        if(res.data.status==="valide"){
            toast.success(res.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const NouveauMotDePasse = async (token,motdepasse)=>{
    try {
        const res = await axios.post(`${AXIOS_URI}/utilisateur/api/auth/motdepasseReinitialiser/${token}`,{motdepasse:motdepasse})
        if(res.data.status==="valide"){
            toast.success(res.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export const VerifierAuthentification = async ()=>{
    try {
        const res = await axios.get(`${AXIOS_URI}/utilisateur/api/auth/verification`)
        if(res.data.status==="valide"){
            return res.data.donnee
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}


export const  AfficherClient = async ()=>{
    try {
        const res = await axios.get(`${AXIOS_URI}/client/obtenirClient`)
        if(res.data.status==="valide"){
            return res.data.donnee
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}