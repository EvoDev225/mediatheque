import { useState } from "react"
import NavBarDash from "./NavBarDash"
import { Espace } from "./components/Espaces"
import { VerifierAuthentification } from "../../Fonctions/Utilisateur/Utilisateur"
import { useEffect } from "react"
import { FaLock } from "react-icons/fa";    
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
const Interface = () => {
    const navigate=useNavigate()
        const [data,setData] = useState([])
        useEffect(()=>{
                const fetchUser  = async ()=>{
                    const data = await    VerifierAuthentification()
                    setData(data)
                    if(!data){
                        toast.error("La session a expirée !")
                        navigate("/connexion")
                    }
                }
                fetchUser()
            },[])
            const handleMessage=()=>{
                toast.error("Vous n'êtes pas autorisé !")
            }
            if(!data.actif){
                toast.error("Votre compte est vérrouillé !")
            }
return (
        <div className="relative z-0">
            <NavBarDash />
        <div className="pt-20 w-full min-h-screen flex items-center justify-center px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">

        {Espace.map((esp, index) => (
            <div
                key={index}
                className="hover:-translate-y-2 duration-300 cursor-pointer px-6 py-6 flex flex-col gap-6 shadow-2xl rounded-xl bg-white"
            >
                {/* Image responsive */}
                <img
                    src={esp.img}
                    alt={esp.titre}
                    className="w-full h-56 object-cover rounded-lg"
                />

                <div className="flex flex-col gap-4 items-center justify-center text-center">
                    <h1 className="font-bold text-xl md:text-2xl">
                        {esp.titre}
                    </h1>

                    {data.actif && data.niveau === esp.niveau ? (
                        <a
                            href={`/${esp.lien}`}
                            className="font-medium hover:bg-orange-400 duration-100 
                                text-center text-lg md:text-xl px-4 py-2 
                                bg-orange-500 text-white rounded-xl w-40"
                        >
                            Accéder
                        </a>
                    ) : (
                        <span className="text-3xl text-red-500">
                            <FaLock onClick={handleMessage} />
                        </span>
                    )}
                </div>
            </div>
        ))}

    </div>
</div>

        </div>


    )
}

export default Interface
