import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBarDash from "./NavBarDash"
import {motion} from "framer-motion"
import SideBar from "./SideBar"
import { 
  FaRegUserCircle, 
  FaUsers, 
  FaChartLine, 
  FaBuilding,
  FaUserCheck,
  FaUserTimes,
  FaExpeditedssl,
  FaTrash,
  FaEye,
  FaEyeDropper,
  FaEyeSlash
} from "react-icons/fa"
import { 
  IoMdAddCircleOutline, 
  IoIosCloseCircleOutline,
  IoMdAnalytics
} from "react-icons/io"
import { CiLock, CiUnlock } from "react-icons/ci"
import { HiOutlineUserGroup } from "react-icons/hi"
import toast from "react-hot-toast"
import { 
    AfficherClient,
  ChangerNiveau, 
  DesactiverUtilisateur, 
  NouveauUtilisateur, 
  ReactiverUtilisateur, 
  SupprimerUtilisateur, 
  ToutUtilisateur, 
  VerifierAuthentification 
} from "../../Fonctions/Utilisateur/Utilisateur"

const Dashboard = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [deleteUser, setDeleteUser] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [utilisateur, setUtilisateur] = useState({
        nom: "",
        prenom: "",
        email: "",
        motdepasse: "",
        contact: "",
        type: "",
        niveau: "",
        service: ""
    })

    // Changer le type du password
    const [type,setType]=useState("password")
    const [eye,setEye]=useState(false)
    const handleType=()=>{
        if(type==="password"){
            setType("text")
            setEye(true)
        } 
        if(type==="text"){
            setType("password")
            setEye(false)
        }
        
    }
    
    // Changer le type du password

    // Suppression d'un utilisateur

    const confirmDeleteUser = (id)=>{
        setDeleteUser(id)
        setShowDeleteModal(true)
        
    }
    const cancelDelete = ()=>{
        setShowDeleteModal(false)
        setDeleteUser(null)
    }

    const handleDeleteUser = async ()=>{
        try {
            const res = await SupprimerUtilisateur(deleteUser)
            toast.success(res)
                setShowDeleteModal(false)
                setDeleteUser(null)
                window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }


    // Suppression d'un utilisateur


    // console.log(utilisateur)
    const [niveau, setNiveau] = useState({
        id: "",
        niveau: ""
    })
    const [stateNiveau, setStateNiveau] = useState(false)
    const [state, setState] = useState(false)
    const [employe, setEmploye] = useState([])

    // Calcul des statistiques
    const stats = useMemo(() => {
        const total = employe.length
        const actifs = employe.filter(emp => emp.actif === true).length
        const inactifs = total - actifs
        
        // Distribution par service
        const parService = employe.reduce((acc, emp) => {
            const service = emp.service || 'Non spécifié'
            acc[service] = (acc[service] || 0) + 1
            return acc
        }, {})
        
        // Service le plus peuplé
        const topService = Object.entries(parService).sort(([,a], [,b]) => b - a)[0] || ['Aucun', 0]
        
        return {
            total,
            actifs,
            inactifs,
            tauxActivation: total > 0 ? ((actifs / total) * 100).toFixed(1) : 0,
            topService: topService[0],
            topServiceCount: topService[1]
        }
    }, [employe])

    useEffect(() => {
        const ToutEmploye = async () => {
            try {
                setLoading(true)
                const authentification = await VerifierAuthentification()
                if(!authentification){
                    toast.error("La session a expiré ! Veuillez vous reconnecter")
                    navigate("/connexion")
                    return
                }
                const reponse = await ToutUtilisateur()
                setEmploye(reponse || [])
            } catch (error) {
                console.error('Erreur:', error)
                toast.error(error.response?.data?.message || "Erreur de chargement")
            } finally {
                setLoading(false)
            }
        }
        ToutEmploye()
    }, [navigate])

    const handleNiveau = () => {
        setStateNiveau(!stateNiveau)
    }

    const handleState = () => {
        setState(!state)
    }

const changerNiveau = async (e) => {
    e.preventDefault();
    
    // Vérifier si un niveau est sélectionné
    if (!niveau.niveau) {
        toast.error("Veuillez sélectionner un niveau");
        return;
    }
    
    // Convertir en chaîne de caractères pour être sûr
    const nouveauNiveau = niveau.niveau.toString();
    
    // Vérifier que le niveau est valide
    if (!["1", "2", "3"].includes(nouveauNiveau)) {
        toast.error("Niveau invalide. Doit être 1, 2 ou 3.");
        return;
    }
    
    try {
        // Définir le mapping niveau -> service
        const niveauServiceMap = {
            "1": "Salle Multimedia",
            "2": "Bibliothèque Adulte", 
            "3": "Salle Convivialite"
        };
        
        const nouveauService = niveauServiceMap[nouveauNiveau];
        
        if (!nouveauService) {
            throw new Error("Impossible de déterminer le service pour ce niveau");
        }
        
        // Afficher un toast de chargement
        const loadingToast = toast.loading("Mise à jour en cours...");
        
        // Appeler l'API
        await ChangerNiveau(niveau.id, nouveauNiveau);
        
        // Mise à jour optimiste
        setEmploye(prev => prev.map(emp => 
            emp._id === niveau.id ? { 
                ...emp, 
                niveau: nouveauNiveau,
                service: nouveauService 
            } : emp
        ));
        
        // Fermer le modal
        setStateNiveau(false);
        
        // Mettre à jour le toast
        toast.dismiss(loadingToast);
        toast.success(`Niveau ${nouveauNiveau} (${nouveauService}) appliqué avec succès`);
        
        // Réinitialiser l'état du niveau
        setNiveau({
            id: "",
            niveau: ""
        });
        
    } catch (error) {
        console.error("Erreur lors du changement de niveau:", error);
        toast.error(error.message || "Erreur lors du changement de niveau");
    }
};

    const desactiver = async (id) => {
        try {
            await DesactiverUtilisateur(id)
            // Mise à jour optimiste
            setEmploye(prev => prev.map(emp => 
                emp._id === id ? { ...emp, actif: false } : emp
            ))
            toast.success("Utilisateur désactivé")
            window.location.reload()
        } catch (error) {
            console.log(error)
            toast.error("Erreur lors de la désactivation")
        }
    }

   const nouvelEmploye = async (e) => {
  e.preventDefault()
  try {
    // S'assurer que le service correspond au niveau
    const utilisateurFinal = { ...utilisateur };
    
    // Si pour une raison quelconque le service n'est pas défini, le définir
    if (utilisateurFinal.niveau && !utilisateurFinal.service) {
      switch(utilisateurFinal.niveau) {
        case "1":
          utilisateurFinal.service = "Salle Multimédia";
          break;
        case "2":
          utilisateurFinal.service = "Bibliothèque Adulte";
          break;
        case "3":
          utilisateurFinal.service = "Salle Convivialité";
          break;
      }
    }
    
    // Ajouter le type par défaut s'il n'est pas défini
    if (!utilisateurFinal.type) {
      utilisateurFinal.type = "employé";
    }
    
    // Envoyer les données
    await NouveauUtilisateur(utilisateurFinal);
    
    // Redirection et réinitialisation
    setUtilisateur({
      nom: "",
      prenom: "",
      email: "",
      motdepasse: "",
      contact: "",
      type: "employé",
      niveau: "",
      service: ""
    });
    setState(false);
    window.location.reload();
  } catch (error) {
    toast.error(error.message || "Erreur lors de la création");
  }
}

    const activer = async (id) => {
        try {
            await ReactiverUtilisateur(id)
            // Mise à jour optimiste
            setEmploye(prev => prev.map(emp => 
                emp._id === id ? { ...emp, actif: true } : emp
            ))
            toast.success("Utilisateur réactivé")
            window.location.reload()
        } catch (error) {
            toast.error("Erreur lors de la réactivation")
            console.log(error)
        }
    }


    return (
        <div className="min-h-screen bg-gray-50">
            {/* NavBar fixe en haut */}
            <NavBarDash />

            {/* Container principal */}
            <div className="pt-16 md:pt-20">
                {/* Sidebar Desktop */}
                <div className="">
                    <SideBar />
                </div>

                {/* Contenu principal */}
                <div className="md:ml-64 p-4 sm:p-6 lg:p-16">
                    {/* Header */}
                    <div className="mb-6 lg:mb-8">
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                            Gestion des Employés
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Administration du personnel et suivi des activités
                        </p>
                    </div>

                    {/* Statistiques */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
                        {/* Total employés */}
                        <div className="bg-white rounded-xl shadow-sm p-5 lg:p-6 border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm lg:text-base font-medium text-gray-600">
                                        Total employés
                                    </p>
                                    <p className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
                                        {loading ? '...' : stats.total}
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-full">
                                    <FaUsers className="text-xl text-blue-600" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <button 
                                    onClick={handleState} 
                                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <IoMdAddCircleOutline className="text-lg" />
                                    <span>Nouvel employé</span>
                                </button>
                            </div>
                        </div>

                        {/* Employés actifs */}
                        <div className="bg-white rounded-xl shadow-sm p-5 lg:p-6 border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm lg:text-base font-medium text-gray-600">
                                        Employés actifs
                                    </p>
                                    <p className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
                                        {loading ? '...' : stats.actifs}
                                    </p>
                                    <p className="text-sm text-green-600 mt-1">
                                        {stats.tauxActivation}% d'activation
                                    </p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-full">
                                    <FaUserCheck className="text-xl text-green-600" />
                                </div>
                            </div>
                        </div>

                        {/* Employés inactifs */}
                        <div className="bg-white rounded-xl shadow-sm p-5 lg:p-6 border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm lg:text-base font-medium text-gray-600">
                                        Employés inactifs
                                    </p>
                                    <p className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
                                        {loading ? '...' : stats.inactifs}
                                    </p>
                                </div>
                                <div className="bg-red-50 p-3 rounded-full">
                                    <FaUserTimes className="text-xl text-red-600" />
                                </div>
                            </div>
                        </div>

                        {/* Service le plus peuplé */}
                        <div className="bg-white rounded-xl shadow-sm p-5 lg:p-6 border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm lg:text-base font-medium text-gray-600">
                                        Service principal
                                    </p>
                                    <p className="text-lg lg:text-xl font-bold text-gray-800 mt-2 truncate">
                                        {loading ? '...' : stats.topService}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {loading ? '...' : `${stats.topServiceCount} employés`}
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-full">
                                    <FaBuilding className="text-xl text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tableau des employés */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Liste des employés
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {loading ? 'Chargement...' : `${stats.total} employés au total`}
                                    </p>
                                </div>
                                <button
                                    onClick={handleState}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                                >
                                    <IoMdAddCircleOutline className="text-lg" />
                                    <span>Nouvel employé</span>
                                </button>
                            </div>
                        </div>

                        {/* Loading state */}
                        {loading ? (
                            <div className="p-8 text-center">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <p className="mt-2 text-gray-600">
                                    Chargement des employés...
                                </p>
                            </div>
                        ) : employe.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-gray-500">Aucun employé trouvé</p>
                            </div>
                        ) : (
                            <>
                                {/* Version desktop */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    #
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nom & Prénom
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Contact
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Niveau
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Service
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    État
                                                </th>
                                                <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {employe.map((emp, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <p className="font-medium text-gray-900">
                                                                {emp.nom} {emp.prenom}
                                                            </p>
                                                            <p className="text-sm text-gray-500">{emp.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {emp.contact}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            Niveau {emp.niveau}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {emp.service}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                                emp.actif
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-red-100 text-red-800"
                                                            }`}
                                                        >
                                                            {emp.actif ? "Actif" : "Inactif"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                                        <div className="flex justify-center space-x-2">
                                                            <button
                                                                onClick={() => {
                                                                    setNiveau({ id: emp._id, niveau: "" })
                                                                    setStateNiveau(true)
                                                                }}
                                                                className="text-orange-500 hover:text-orange-700 transition-colors p-1"
                                                                title="Changer niveau"
                                                            >
                                                                <FaExpeditedssl className="text-2xl" />
                                                            </button>
                                                            {emp.actif ? (
                                                                <button
                                                                    onClick={() => desactiver(emp._id)}
                                                                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                                                                    title="Désactiver"
                                                                >
                                                                    <CiLock className="text-2xl" />
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => activer(emp._id)}
                                                                    className="text-green-500 hover:text-green-700 transition-colors p-1"
                                                                    title="Réactiver"
                                                                >
                                                                    <CiUnlock className="text-2xl" />
                                                                </button>
                                                            )}
                                                            <button 
                                                            onClick={()=>confirmDeleteUser(emp._id)}
                                                            className="text-red-500 hover:text-red-700 transition-colors p-1" >
                                                            <FaTrash className='text-2xl'/>

                                                            </button>
                                                        
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Version mobile */}
                                <div className="md:hidden">
                                    <div className="divide-y divide-gray-200">
                                        {employe.map((emp, index) => (
                                            <div
                                                key={index}
                                                className="p-4 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <p className="font-bold text-gray-900">
                                                            {emp.nom} {emp.prenom}
                                                        </p>
                                                        <p className="text-sm text-gray-500">{emp.email}</p>
                                                    </div>
                                                    <span
                                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                            emp.actif
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {emp.actif ? "Actif" : "Inactif"}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3 mb-3">
                                                    <div>
                                                        <p className="text-xs text-gray-500">Contact</p>
                                                        <p className="text-sm font-medium">{emp.contact}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Niveau</p>
                                                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                                            Niveau {emp.niveau}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Service</p>
                                                        <p className="text-sm font-medium">{emp.service}</p>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end space-x-3 pt-3 border-t">
                                                    <button
                                                        onClick={() => {
                                                            setNiveau({ id: emp._id, niveau: "" })
                                                            setStateNiveau(true)
                                                        }}
                                                        className="text-orange-500 hover:text-orange-700 p-2"
                                                    >
                                                        <FaExpeditedssl />
                                                    </button>
                                                    {emp.actif ? (
                                                        <button
                                                            onClick={() => desactiver(emp._id)}
                                                            className="text-red-500 hover:text-red-700 p-2"
                                                        >
                                                            <CiLock />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => activer(emp._id)}
                                                            className="text-green-500 hover:text-green-700 p-2"
                                                        >
                                                            <CiUnlock />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {
                showDeleteModal && (
                    <div className='fixed  bg-black/50 inset-0 w-full flex items-center justify-center min-h-screen'>
                <div className='z-50 bg-white p-8 rounded-2xl'>
                    <div className='flex items-center justify-center'>
                        <FaTrash className='text-xl text-red-500 '/>
                        <h1 className='font-bold text-lg ml-2 text-black/50'>Supprimer un utilisateur</h1>
                    </div>
                    <div className='my-4 w-100 text-center'>
                        <p>
                            Cette action est irréversible. Êtes-vous sûr de vouloir supprimer cet utilisateur ?
                        </p>
                    </div>
                    <div className='flex items-center justify-center gap-4'>
                        <button
                        onClick={()=>cancelDelete()}
                        
                        className='px-4 py-2 bg-gray-200 text-black/75 cursor-pointer duration-500 transition-all rounded-xl '>
                        Annuler
                        </button>
                        <button
                        onClick={()=>handleDeleteUser()}
                        className='px-4 py-2 bg-red-500 text-white cursor-pointer duration-500 transition-all rounded-xl '>
                        Confirmer
                        </button>
                    </div>
                </div>
            </div>
                )
            }

            {/* Modal Nouvel employé */}
            {state && (
                <>
                    <div 
                        onClick={handleState}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />
                    
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div className={`
                                w-full max-w-4xl
                                bg-white border-t-4 border-blue-500 rounded-2xl shadow-2xl 
                                p-4 sm:p-6 md:p-8
                                transform transition-all duration-300 ease-out
                                ${state ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                            `}>
                                <div 
                                    onClick={handleState} 
                                    className="flex w-full justify-end text-3xl sm:text-4xl text-gray-400 hover:text-gray-600 cursor-pointer mb-4 transition-colors"
                                >
                                    <IoIosCloseCircleOutline />
                                </div>

                                <form className="w-full" onSubmit={nouvelEmploye}>
  <div className="mb-6">
    <h1 className="text-center font-bold text-xl sm:text-2xl md:text-3xl text-gray-800">
      Nouvel employé
    </h1>
    <p className="text-center text-gray-600 mt-2">
      Remplissez les informations de l'employé
    </p>
  </div>
  
  <div className="w-full p-3 sm:p-5 flex items-center justify-center text-4xl sm:text-5xl text-blue-500">
    <FaRegUserCircle />
  </div>

  {/* Nom et Prénom */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div className="space-y-2">
      <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
        Nom <span className="text-red-500">*</span>
      </label>
      <input 
        type="text" 
        id="nom" 
        name="nom" 
        value={utilisateur.nom}
        onChange={e => setUtilisateur({...utilisateur, nom: e.target.value})}
        placeholder="Entrez le nom"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
        required
      />
    </div>
    
    <div className="space-y-2">
      <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
        Prénom <span className="text-red-500">*</span>
      </label>
      <input 
        type="text" 
        id="prenom" 
        name="prenom" 
        value={utilisateur.prenom}
        onChange={e => setUtilisateur({...utilisateur, prenom: e.target.value})}
        placeholder="Entrez le prénom"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
        required
      />
    </div>
  </div>

  {/* Email et Contact */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div className="space-y-2">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email <span className="text-red-500">*</span>
      </label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        value={utilisateur.email}
        onChange={e => setUtilisateur({...utilisateur, email: e.target.value})}
        placeholder="exemple@email.com"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
        required
      />
    </div>
    
    <div className="space-y-2">
      <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
        Contact <span className="text-red-500">*</span>
      </label>
      <input 
        type="tel" 
        id="contact" 
        name="contact" 
        value={utilisateur.contact}
        onChange={e => setUtilisateur({...utilisateur, contact: e.target.value})}
        placeholder="+225 XX XX XX XX XX"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
        required
      />
    </div>
  </div>

  {/* Niveau et Service */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <div className="space-y-2">
      <label htmlFor="niveau" className="block text-sm font-medium text-gray-700">
        Niveau <span className="text-red-500">*</span>
      </label>
      <select 
        id="niveau" 
        name="niveau"
        value={utilisateur.niveau}
        onChange={(e) => {
          const selectedNiveau = e.target.value;
          setUtilisateur(prev => {
            // Définir le service automatiquement en fonction du niveau
            let service = "";
            if (selectedNiveau === "1") service = "Salle Multimédia";
            else if (selectedNiveau === "2") service = "Bibliothèque Adulte";
            else if (selectedNiveau === "3") service = "Salle Convivialité";
            
            return {
              ...prev,
              niveau: selectedNiveau,
              service: service
            };
          });
        }}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        required
      >
        <option value="">Sélectionnez un niveau</option>
        <option value="1">Niveau 1 - Salle Multimédia</option>
        <option value="2">Niveau 2 - Bibliothèque Adulte</option>
        <option value="3">Niveau 3 - Salle Convivialité</option>
      </select>
    </div>
    
    <div className="space-y-2">
      <label htmlFor="service" className="block text-sm font-medium text-gray-700">
        Service <span className="text-red-500">*</span>
      </label>
      <input 
        type="text" 
        id="service" 
        name="service" 
        value={utilisateur.service}
        readOnly
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 cursor-not-allowed"
        placeholder="Sélectionnez d'abord le niveau"
      />
      <p className="text-xs text-gray-500 mt-1">
        Service défini automatiquement selon le niveau
      </p>
    </div>
  </div>

  {/* Type (toujours Employé) */}
  <div className="mb-6">
    <div className="space-y-2">
      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
        Type <span className="text-red-500">*</span>
      </label>
      <select 
        id="type" 
        name="type"
        value={utilisateur.type}
        onChange={e => setUtilisateur({...utilisateur, type: e.target.value})}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        required
      >
        <option value="">Sélectionnez</option>
        <option value="employé">Employé</option>
      </select>
    </div>
  </div>

  {/* Mot de passe */}
  <div className="space-y-2 mb-6 relative">
    <label htmlFor="motdepasse" className="block text-sm font-medium text-gray-700">
      Mot de passe <span className="text-red-500">*</span>
    </label>
    <input 
      type={type} 
      id="motdepasse" 
      name="motdepasse" 
      value={utilisateur.motdepasse}
      onChange={e => setUtilisateur({...utilisateur, motdepasse: e.target.value})}
      minLength={8}
      placeholder="Entrez le mot de passe"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
      required
    />
    <p className="text-sm text-gray-500 mt-1">
      Le mot de passe doit contenir au moins 8 caractères
    </p>
    <div className='absolute z-50  top-10 right-15  rounded-full'>
{
    eye ? (
        <button
        onClick={()=>handleType()}
        >
            <FaEyeSlash className='text-2xl text-gray-500'/>
        </button>
    ):(
        <button
        onClick={()=>handleType()}
        >
            <FaEye className='text-2xl text-gray-500'/>
        </button>
    )
}

        
        
    </div>
  </div>

  {/* Boutons */}
  <div className="flex flex-col sm:flex-row gap-3">
    <button 
      type="submit" 
      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all hover:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={!utilisateur.niveau || !utilisateur.service}
    >
      Enregistrer l'employé
    </button>
    <button 
      type="button"
      onClick={handleState}
      className="flex-1 sm:flex-none bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all"
    >
      Annuler
    </button>
  </div>
</form>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Modal Changement de niveau */}
            {stateNiveau && (
                <>
                    <div 
                        onClick={handleNiveau}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />
                    
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className={`
                            w-full max-w-md
                            bg-white border-t-4 border-blue-500 rounded-2xl shadow-2xl
                            p-6 sm:p-8
                            transform transition-all duration-300 ease-out
                            ${stateNiveau ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                        `}>
                            <form onSubmit={changerNiveau} className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-xl font-bold text-gray-800">
                                        Changer le niveau
                                    </h1>
                                    <button
                                        type="button"
                                        onClick={handleNiveau}
                                        className="text-2xl text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <IoIosCloseCircleOutline />
                                    </button>
                                </div>

                                <div className="text-center">
                                    <FaExpeditedssl className="text-4xl text-blue-500 mx-auto mb-4" />
                                    <p className="text-gray-600">Sélectionnez le nouveau niveau (1-3)</p>
                                </div>

                                <div className="flex justify-center space-x-4">
                                    {[1, 2, 3].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setNiveau({ ...niveau, niveau: num.toString() })}
                                            className={`w-16 h-16 rounded-full text-2xl font-bold transition-all ${
                                                niveau.niveau === num.toString()
                                                    ? "bg-blue-500 text-white scale-110"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
                                        disabled={!niveau.niveau}
                                    >
                                        Confirmer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNiveau}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-lg transition-all"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Dashboard