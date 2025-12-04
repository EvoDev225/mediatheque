import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { NouveauMotDePasse } from '../Utilisateur/Utilisateur'
import toast from 'react-hot-toast'
const NouveauMdp = () => {
const navigate = useNavigate()

    const {token} = useParams()
    const [motdepasse,setMotdepasse] = useState({
        motdepasse:"",
        confirmer:""
    })
    const handleSubmit = (e)=>{
        e.preventDefault()
        try {
            if(!motdepasse.motdepasse || !motdepasse.confirmer){
                return toast.error("Veuillez renseigner les champs !")
            }
            if(motdepasse.motdepasse !== motdepasse.confirmer){
                return toast.error("Les mots de passe ne correspondent pas !")
            }
            NouveauMotDePasse(token,motdepasse.confirmer)
            navigate("/connexion")
        } catch (error) {
            return toast.error(error)
        }
    }
    console.log(motdepasse)
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
                        <form onSubmit={handleSubmit}action="" className="shadow-2xl px-12 py-4   rounded-xl border-t-4 border-t-orange-500 md:w-250">
                            <div className="w-full p-5 flex items-center justify-center text-5xl ">
                                Entrez votre nouveau mot de passe
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-2xl font-medium">Mot de passe</label>
                                <input onChange={e=>setMotdepasse({...motdepasse,motdepasse:e.target.value})} type="password" id="email" name="name" className=" border rounded px-2 py-2 shadow outline-none " />
                            </div>
                            <div className="flex flex-col gap-2 my-6">
                                <label htmlFor="password" className="text-2xl font-medium">Confirmer le mot de passe</label>
                                <input onChange={e=>setMotdepasse({...motdepasse,confirmer:e.target.value})} type="password" id="password" name="name" className=" border rounded px-2 py-2 shadow outline-none " />
                            </div>
                            <div className="flex w-full gap-2 my-6">
                                <input type="submit" value={"Confirmer"}  className="  border w-full  text-white bg-orange-500 font-bold cursor-pointer duration-150 transition-all hover:scale-95  rounded px-2 py-2 shadow outline-none " />
                            </div>
                            <div className=" flex items-center justify-between">
                                <a href="/"  className="text-lg  hover:underline hover:text-blue-500">Retour !</a>
                                <a href="/connexion" className="text-lg  hover:underline hover:text-blue-500">Se connecter !</a>
                            </div>
                        </form>
                    </div>
  )
}

export default NouveauMdp
