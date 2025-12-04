import { useState } from "react";
import logo from "../../assets/img/logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { Deconnexion } from "../../Fonctions/Connexion/Authentification";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { VerifierAuthentification } from "../../Fonctions/Utilisateur/Utilisateur";
const NavBarDash = () => {

    const [data,setData] = useState([])
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };
    const navigate = useNavigate()
    const deconnexion  = async ()=>{
        try {
            await Deconnexion()
            navigate('/connexion')
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(()=>{
        const fetchUser  = async ()=>{
            const data = await    VerifierAuthentification()
            setData(data)
            return
        }
        fetchUser()
    },[])
    

    return (
        <div className="fixed inset-0 h-20 flex items-center  justify-between px-5 lg:px-20 z-50 text-white bg-orange-500">
            <div className="flex items-center justify-between">
                <a href="/" className="flex items-center gap-5 lg:ml-5">
                    <img src={logo} width={50} height={50} alt="" />
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl md:text-2xl">Médiathèque</h1>
                        <p className="text-[10px] lg:text-[13px]">Culture | Formation | Divertissement</p>
                    </div>
                </a>
            </div>
            <div className="relative">
                <span
                    className="text-4xl cursor-pointer"
                    onClick={toggleMenu}
                >
                    <FaRegUserCircle />
                </span>
                <div
                    className={`
                        absolute right-1 mt-2 bg-white text-black rounded-xl p-6 shadow-xl 
                        transition-all duration-300 origin-top z-[999px] w-70 
                        ${openMenu ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}
                    `}
                    style={{ transformOrigin: "top" }}
                >
                    <div className="my-2">
                        <h1 className="font-bold text-xl"></h1>
                    </div>
                    
                    <ul className="flex flex-col gap-3">
                        <li className="text-lg cursor-pointer font-bold hover:text-orange-500">{data.nom} {data.prenom}</li>
                        <li className="text-lg cursor-pointer hover:text-orange-500">Informations</li>
                        <li className="text-lg cursor-pointer hover:text-orange-500">Paramètres</li>
                        <li className="text-lg cursor-pointer hover:text-orange-500">Profil</li>
                        <li className="text-lg cursor-pointer hover:text-orange-500">Support</li>
                        <li onClick={deconnexion} className="text-3xl text-red-500 cursor-pointer hover:text-red-700">
                            <AiOutlineLogout />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBarDash;
