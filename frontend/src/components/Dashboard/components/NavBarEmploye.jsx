import { FiEdit2, FiSave } from "react-icons/fi";
import { ModifierInfoEmploye, VerifierAuthentificationEmploye } from "../../Fonctions/Utilisateur/Utilisateur";
import toast from "react-hot-toast";
import { DeconnexionEmploye } from "../../Fonctions/Connexion/Authentification";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBarEmploye = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [pwd, setPwd] = useState(false);
    const [confirmPwd, setConfirmPwd] = useState(false);
    const [menu, setMenu] = useState(false);
    const [data, setData] = useState({
        nom: "",
        prenom: "",
        email: "",
        contact: "",
        motdepasse: "",
        confirmer: ''
    });
    const [openMenu, setOpenMenu] = useState(false);

    const handleType = () => {
        setPwd(!pwd);
    };

    const handleConfirmPwd = () => {
        setConfirmPwd(!confirmPwd);
    };

    const showMenu = () => {
        setMenu(!menu);
    };

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Données mises à jour:", data);
        setLoading(true)
        try {
            if (!data.motdepasse && !data.confirmer) {
                await ModifierInfoEmploye(data._id, data)
                setLoading(false)
                setMenu(false)
            } else if (data.motdepasse !== data.confirmer) {
                toast.error("Les mots de passe ne correspondent pas !")
                setLoading(false)

            } else {
                await ModifierInfoEmploye(data._id, data)
                setLoading(false)
                setMenu(false)
            }

        } catch (error) {
            console.log(error)

        }
        // Ajouter la logique de sauvegarde ici
    };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await VerifierAuthentificationEmploye()
                setData(res)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserData()
    }, [])
    const deconnect = async () => {
        try {
            await DeconnexionEmploye()
            navigate("/connexion")
        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <div className="fixed inset-0 h-20 flex items-center justify-between px-5 lg:px-20 z-50 text-white bg-linear-to-r from-orange-500 to-orange-600 shadow-lg">
            <div className="flex items-center justify-between">
                <a href="/" className="flex items-center gap-5 lg:ml-5 hover:opacity-90 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-orange-500 font-bold text-xl">M</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl md:text-2xl">Médiathèque</h1>
                        <p className="text-[10px] lg:text-[13px] opacity-90">Culture | Formation | Divertissement</p>
                    </div>
                </a>
            </div>

            <div className="relative">
                <button
                    className="text-4xl cursor-pointer hover:scale-110 transition-transform duration-200"
                    onClick={toggleMenu}
                >
                    <FaRegUserCircle />
                </button>

                <div
                    className={`
                        absolute right-0 mt-2 bg-white text-black rounded-2xl shadow-2xl 
                        transition-all duration-300 top-full z-1000 w-80 overflow-hidden 
                        ${openMenu ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
                    `}
                    style={{ transformOrigin: "top right" }}
                >
                    <div className="relative text-white gap-4 bg-linear-to-br from-orange-500 to-orange-600 flex flex-col items-center w-full py-6 px-4">
                        <div className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center rounded-full border-4 border-white shadow-xl">
                            <FaRegUserCircle className="text-5xl" />
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold">{data.nom} {data.prenom}</p>
                            <p className="text-sm opacity-90">{data.email}</p>
                        </div>
                    </div>

                    <ul className="flex flex-col gap-2 w-full p-4">
                        <li
                            onClick={showMenu}
                            className="text-lg px-4 py-3 rounded-lg cursor-pointer hover:bg-orange-50 hover:text-orange-500 transition-all duration-200 flex items-center gap-3"
                        >
                            <FiEdit2 />
                            Mon Profil
                        </li>
                        <li
                            className="text-lg px-4 py-3 rounded-lg flex gap-3 items-center font-semibold text-red-500 cursor-pointer hover:bg-red-50 transition-all duration-200"
                            onClick={deconnect}
                        >

                            <AiOutlineLogout />
                            Déconnexion
                        </li>
                    </ul>
                </div>
            </div>

            {menu && (
                <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-1000 p-4 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
                        <div className="relative w-full bg-linear-to-br from-orange-500 to-orange-600 text-white py-10 px-8">
                            <button
                                onClick={showMenu}
                                className="absolute top-4 right-4 text-4xl hover:rotate-90 transition-transform duration-300 cursor-pointer"
                            >
                                <IoCloseCircleOutline />
                            </button>
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-24 h-24 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center rounded-full border-4 border-white shadow-xl">
                                    <FaRegUserCircle className="text-6xl" />
                                </div>
                                <h1 className="text-3xl font-bold">Mes Informations</h1>
                                <p className="text-sm opacity-90">Modifiez vos informations personnelles</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full p-8 text-black">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="nom" className="text-lg font-semibold text-gray-700">
                                        Nom <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nom"
                                        onChange={handleChange}
                                        name="nom"
                                        value={data.nom}
                                        className="p-3 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-colors duration-200"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="prenom" className="text-lg font-semibold text-gray-700">
                                        Prénom <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="prenom"
                                        onChange={handleChange}
                                        name="prenom"
                                        value={data.prenom}
                                        className="p-3 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-colors duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-lg font-semibold text-gray-700">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        onChange={handleChange}
                                        name="email"
                                        value={data.email}
                                        className="p-3 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-colors duration-200"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="contact" className="text-lg font-semibold text-gray-700">
                                        Contact <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="contact"
                                        onChange={handleChange}
                                        name="contact"
                                        value={data.contact}
                                        className="p-3 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-colors duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="border-t-2 border-gray-200 pt-6 mt-2">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Changer le mot de passe</h3>
                                <p className="text-sm text-gray-500 mb-4">Laissez vide si vous ne souhaitez pas modifier votre mot de passe</p>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex flex-col gap-2 relative">
                                        <label htmlFor="motdepasse" className="text-lg font-semibold text-gray-700">
                                            Nouveau mot de passe
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={pwd ? "text" : "password"}
                                                id="motdepasse"
                                                onChange={handleChange}
                                                name="motdepasse"
                                                className="w-full p-3 pr-12 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-colors duration-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleType}
                                                className="absolute top-1/2 -translate-y-1/2 right-3 text-xl text-gray-500 hover:text-orange-500 transition-colors"
                                            >
                                                {pwd ? <IoEyeSharp /> : <FaEyeSlash />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 relative">
                                        <label htmlFor="confirmer" className="text-lg font-semibold text-gray-700">
                                            Confirmer le mot de passe
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={confirmPwd ? "text" : "password"}
                                                id="confirmer"
                                                onChange={handleChange}
                                                name="confirmer"
                                                className="w-full p-3 pr-12 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-colors duration-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleConfirmPwd}
                                                className="absolute top-1/2 -translate-y-1/2 right-3 text-xl text-gray-500 hover:text-orange-500 transition-colors"
                                            >
                                                {confirmPwd ? <IoEyeSharp /> : <FaEyeSlash />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">

                                <button
                                    type="submit"
                                    className="flex-1 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >

                                    {
                                        !loading ? (
                                            <div className="flex items-center gap-2">
                                                <FiSave />
                                                Modifier les informations
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <div className=" animate-spin p-4 border-b-3 border-white rounded-full "></div>
                                                <p>Opération en cours</p>
                                            </div>
                                        )
                                    }


                                </button>
                                <button
                                    type="button"
                                    onClick={showMenu}
                                    className="px-6 py-3 rounded-xl font-bold text-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavBarEmploye
