import { FaRegUserCircle, FaLock, FaEnvelope, FaArrowLeft, FaKey } from "react-icons/fa";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const AXIOS_URI = "http://localhost:3000";
    
    const navigate = useNavigate();
    const [etat, setEtat] = useState(true);
    const [loading, setLoading] = useState(false);
    const [utilisateur, setUtilisateur] = useState({
        email: "",
        motdepasse: ""
    });

    const Connexion = async (e) => {
        e.preventDefault();
        if (!utilisateur.email || !utilisateur.motdepasse) {
            toast.error("Veuillez remplir tous les champs");
            return;
        }
        
        setLoading(true);
        try {
            const res = await axios.post(`${AXIOS_URI}/utilisateur/api/auth/connexion`, utilisateur);
            if (res.data.status === 'valide') {
                toast.success("Connexion réussie !");
                if (res.data.donnee.type === "administrateur") {
                    navigate("/dashboard");
                }
                if (res.data.donnee.type === "employé") {
                    navigate('/interface');
                }
            }
        } catch (error) {
            console.log(error.response?.data?.message || "Erreur de connexion");
            toast.error(error.response?.data?.message || "Identifiants incorrects");
        } finally {
            setLoading(false);
        }
    };

    const changeEtat = (e) => {
        e.preventDefault();
        setEtat(!etat);
        setUtilisateur({ ...utilisateur, motdepasse: "" });
    };

    const Motdepasse = async (e) => {
        e.preventDefault();
        if (!utilisateur.email) {
            toast.error("Veuillez entrer votre email");
            return;
        }
        
        setLoading(true);
        try {
            const reponse = await axios.post(`${AXIOS_URI}/utilisateur/api/auth/motdepasseOublier`, { email: utilisateur.email });
            if (reponse.data.status === "valide") {
                toast.success(reponse.data.message);
                navigate(`/nouveauMotdepasse/${reponse.data.donnee.reinitialisationMotdepasse}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Erreur lors de la réinitialisation");
            console.log("Erreur backend :", error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="absolute top-0 left-0 right-0 p-6">
                    <a 
                        href="/" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        Retour à l'accueil
                    </a>
                </div>

                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Connexion
                        </h1>
                        <p className="text-gray-600">
                            {etat 
                                ? "Connectez-vous à votre espace personnel" 
                                : "Réinitialisez votre mot de passe"
                            }
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        {/* En-tête colorée */}
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-6 px-8">
                            <div className="flex items-center justify-center">
                                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                                    <FaRegUserCircle className="text-white text-4xl" />
                                </div>
                            </div>
                            <h2 className="text-center text-white text-xl font-bold mt-4">
                                {etat ? "Espace Personnel" : "Mot de passe oublié"}
                            </h2>
                        </div>

                        {/* Formulaire */}
                        <div className="p-8">
                            {etat ? (
                                <form onSubmit={Connexion} className="space-y-6">
                                    {/* Champ Email */}
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Adresse Email
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaEnvelope className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                onChange={(e) => setUtilisateur({ ...utilisateur, email: e.target.value })}
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="votre@email.com"
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Champ Mot de passe */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Mot de passe
                                            </label>
                                            <button
                                                type="button"
                                                onClick={changeEtat}
                                                className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                                            >
                                                Mot de passe oublié ?
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                onChange={(e) => setUtilisateur({ ...utilisateur, motdepasse: e.target.value })}
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="••••••••"
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Bouton de connexion */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Connexion en cours...
                                            </span>
                                        ) : (
                                            "Se connecter"
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={Motdepasse} className="space-y-6">
                                    {/* Instruction */}
                                    <div className="text-center mb-6">
                                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                            <p className="text-sm text-gray-600">
                                                Entrez votre adresse email pour recevoir un lien de réinitialisation
                                            </p>
                                        </div>
                                    </div>

                                    {/* Champ Email pour réinitialisation */}
                                    <div className="space-y-2">
                                        <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
                                            Adresse Email
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaKey className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                onChange={(e) => setUtilisateur({ ...utilisateur, email: e.target.value })}
                                                type="email"
                                                id="reset-email"
                                                name="reset-email"
                                                placeholder="votre@email.com"
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Bouton de réinitialisation */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Envoi en cours...
                                            </span>
                                        ) : (
                                            "Envoyer le lien de réinitialisation"
                                        )}
                                    </button>
                                </form>
                            )}

                            {/* Lien pour basculer entre les formulaires */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <button
                                    onClick={changeEtat}
                                    className="w-full text-center text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center justify-center"
                                >
                                    {etat ? (
                                        <>
                                            <FaKey className="mr-2" />
                                            Réinitialiser le mot de passe
                                        </>
                                    ) : (
                                        <>
                                            <FaLock className="mr-2" />
                                            Retour à la connexion
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                            <p className="text-center text-sm text-gray-500">
                                © 2024 Plateforme de gestion. Tous droits réservés.
                            </p>
                        </div>
                    </div>

                    {/* Information supplémentaire */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Vous n'avez pas de compte ?{" "}
                            <a href="/contact" className="text-orange-600 hover:text-orange-700 font-medium transition-colors">
                                Contactez l'administrateur
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;