
import { useState } from "react";
import { useParams } from "react-router-dom";
import { EnvoyerMotdepasse } from "./Fonctions/Utilisateur/Utilisateur";
const NouveauMotdepasse = () => {
    const { token } = useParams();
    const [motdepasse,setMotdepasse]= useState({
        motdepasse:""
    })
    const handleSubmit = (e)=>{
        e.preventDefault()
        EnvoyerMotdepasse(token,motdepasse.motdepasse)
    }

    return (
        <div className="w-full flex items-center justify-center min-h-screen">
            <div>
                <form
                    action=""
                    className="shadow-2xl px-12 py-4   rounded-xl border-t-4 border-t-orange-500 md:w-150"
                    onSubmit={handleSubmit}
                >
                    
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-3xl font-medium text-center mb-5">
                            Nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            placeholder="Entrer le nouveau mot de passe"
                            onChange={(e)=>setMotdepasse({...motdepasse,motdepasse:e.target.value})}
                            id="motdepasse"
                            name="motdepasse"
                            className=" border rounded px-2 py-2 shadow outline-none "
                        />
                    </div>
                    <div className="flex w-full gap-2 my-6">
                        <input
                            type="submit"
                            className=" border w-full  text-white bg-orange-500 font-bold cursor-pointer duration-150 transition-all hover:scale-95  rounded px-2 py-2 shadow outline-none "
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NouveauMotdepasse
