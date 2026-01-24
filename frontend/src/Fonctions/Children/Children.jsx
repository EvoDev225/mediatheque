import axios from "axios"
import toast from "react-hot-toast"
axios.defaults.withCredentials = true
const   AXIOS_URI ="http://localhost:3000"



export const getAllChildrens = async ()=>{
    try {
        const response = await axios.get(`${AXIOS_URI}/children/getAllchildren`)
        if(response.data.status==="valide"){
            return response.data.donnee
        }
    } catch (error) {
        console.log(error.response.data.message)
    }
}

export const newChildren = async(childrenData)=>{
    try {
        const response = await axios.post(`${AXIOS_URI}/children/newChildren`,childrenData)
        if(response.data.status==="valide"){
            return response.data.message
        }else{
            return response.data.message
        }
    } catch (error) {
        console.log(error.response.data.message)
    }
}

export const editChildren = async (id,childrenEdit)=>{
    try {
        const response = await axios.put(`${AXIOS_URI}/children/editChildren/${id}`,childrenEdit)
        if(response.data.status==="valide"){
            return response.data.message
        }
    } catch (error) {
        console.log(error.response.data.message)
    }
}
export const deleteChildren = async (id)=>{
    try {
        const response = await axios.delete(`${AXIOS_URI}/children/deleteChildren/${id}`)
        if(response.data.status==="valide"){
            return  response.data.message
        }
    } catch (error) {
        console.log(error.response.data.message)
    }
}
