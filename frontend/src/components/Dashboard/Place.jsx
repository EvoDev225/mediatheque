/* VERSION AMÉLIORÉE – Sidebar intacte */

import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBarDash from './NavBarDash'
import SideBar from './SideBar'
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaChartLine, FaUsers, FaCalendarAlt, FaBuilding, FaFilter, FaChartBar, FaChild, FaBirthdayCake, FaUserFriends } from "react-icons/fa";
import { MdOutlineTrendingUp, MdDateRange, MdOutlineFamilyRestroom } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { GiBabyFace } from "react-icons/gi";
import { TbGenderMale, TbGenderFemale } from "react-icons/tb";
import toast from 'react-hot-toast'
import { AfficherVisites } from '../../Fonctions/Espace/Visite'
import { AfficherClient } from '../../Fonctions/Utilisateur/Utilisateur';
import { VerifierAuthentification } from '../../Fonctions/Utilisateur/Utilisateur';
import { DeconnexionAdmin } from '../../Fonctions/Connexion/Authentification';
import { getAllChildrens } from '../../Fonctions/Children/Children';

const Place = () => {
    const navigate = useNavigate();
    const [liste, setListe] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingEnfants, setLoadingEnfants] = useState(true);
    const [filterDate, setFilterDate] = useState('');
    const [client, setClient] = useState([]);
    const [enfants, setEnfants] = useState([]);

    // VÉRIFICATION D'AUTHENTIFICATION
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await VerifierAuthentification();
                if (!user) {
                    window.history.replaceState({}, '', '/connexion');
                    navigate('/connexion', { replace: true });
                }
            } catch (error) {
                console.log("Erreur d'authentification:", error);
                navigate('/connexion', { replace: true });
            }
        };
        checkAuth();
    }, [navigate]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await VerifierAuthentification()
                if (!res) {
                    await DeconnexionAdmin()
                    navigate("/connexion")
                }
                if (res.service !== 'Administration') {
                    await DeconnexionAdmin()
                    navigate("/connexion")
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserData()
    }, [])

    const stats = useMemo(() => {
        if (!liste.length) return {
            parEspace: {},
            total: 0,
            topEspace: 'Aucun',
            topEspaceCount: 0,
            topEspacePercentage: 0,
            visitesAujourdhui: 0,
            moyenneParJour: '0.0'
        };

        const parEspace = {};
        liste.forEach(v => {
            const espace = v.nomEspace || 'Non spécifié';
            parEspace[espace] = (parEspace[espace] || 0) + 1;
        });

        const topEspace = Object.entries(parEspace)
            .sort(([, a], [, b]) => b - a)[0] || ['Aucun', 0];

        // CORRECTION ICI : Gestion robuste des dates
        const today = new Date();
        const todayString = today.toLocaleDateString('fr-CA'); // Format YYYY-MM-DD

        const visitesAujourdhui = liste.filter(v => {
            if (!v.date) return false;

            try {
                const dateVisite = new Date(v.date);
                // Vérifier si la date est valide
                if (isNaN(dateVisite.getTime())) return false;

                const dateVisiteString = dateVisite.toLocaleDateString('fr-CA');
                return dateVisiteString === todayString;
            } catch (error) {
                console.warn('Date invalide ignorée:', v.date);
                return false;
            }
        }).length;

        const moyenneParJour = (liste.length / 30).toFixed(1);

        // Calcul du pourcentage pour le top espace
        const topEspacePercentage = liste.length > 0 ?
            ((topEspace[1] / liste.length) * 100).toFixed(1) : 0;

        return {
            parEspace,
            total: liste.length,
            topEspace: topEspace[0],
            topEspaceCount: topEspace[1],
            topEspacePercentage,
            visitesAujourdhui,
            moyenneParJour
        };
    }, [liste]);

    // Statistiques pour les enfants
    const enfantsStats = useMemo(() => {
        return {
            total: enfants.length,
            garcons: enfants.filter(e => e.sexe === 'Masculin').length,
            filles: enfants.filter(e => e.sexe === 'Féminin').length,
            avecParent: enfants.filter(e => e.parent && (e.parent.nom || e.parent.prenom)).length,
            // Calcul de l'âge moyen
            ageMoyen: enfants.length > 0 ?
                (enfants.reduce((sum, e) => {
                    if (e.dateNaissance) {
                        const birthDate = new Date(e.dateNaissance);
                        const ageDiff = Date.now() - birthDate.getTime();
                        const ageDate = new Date(ageDiff);
                        return sum + Math.abs(ageDate.getUTCFullYear() - 1970);
                    }
                    return sum;
                }, 0) / enfants.length).toFixed(1) : 0
        };
    }, [enfants]);

    useEffect(() => {
        const fetchVisite = async () => {
            try {
                setLoading(true);
                const donnee = await AfficherVisites();
                setListe(donnee || []);
            } catch {
                toast.error("Erreur de chargement");
            } finally {
                setLoading(false);
            }
        };

        const fetchEnfants = async () => {
            try {
                setLoadingEnfants(true);
                const donnee = await getAllChildrens();
                setEnfants(donnee || []);
            } catch (error) {
                toast.error("Erreur de chargement des enfants");
                console.error(error);
            } finally {
                setLoadingEnfants(false);
            }
        };

        fetchVisite();
        fetchClient();
        fetchEnfants();
    }, []);

    const filteredListe = useMemo(() => {
        if (!filterDate) return liste;
        return liste.filter(v => {
            if (!v.date) return false;
            try {
                const dateVisite = new Date(v.date);
                if (isNaN(dateVisite.getTime())) return false;
                const dateVisiteString = dateVisite.toLocaleDateString('fr-CA');
                return dateVisiteString === filterDate;
            } catch {
                return false;
            }
        });
    }, [liste, filterDate]);

    const formatDate = (d) => {
        if (!d) return "";
        try {
            const date = new Date(d);
            if (isNaN(date.getTime())) return "Date invalide";
            return date.toLocaleDateString("fr-FR");
        } catch {
            return "Date invalide";
        }
    };

    const formatTime = (timeString) => {
        if (!timeString) return "";
        // Si l'heure est déjà formatée, la retourner telle quelle
        if (timeString.includes(':')) return timeString;
        // Sinon essayer de parser
        try {
            const [hours, minutes] = timeString.split(':');
            return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
        } catch {
            return timeString;
        }
    };

    const calculateAge = (dateNaissance) => {
        if (!dateNaissance) return "Inconnu";
        try {
            const birthDate = new Date(dateNaissance);
            if (isNaN(birthDate.getTime())) return "Date invalide";
            
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return `${age} ans`;
        } catch {
            return "Inconnu";
        }
    };

    const fetchClient = async () => {
        try {
            const data = await AfficherClient();
            setClient(data || []);
        } catch {
            toast.error("Erreur chargement clients");
        }
    };

    // Statistiques pour les clients
    const clientStats = useMemo(() => {
        return {
            total: client.length,
            withContact: client.filter(c => c.contact).length
        };
    }, [client]);

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            <NavBarDash />

            <div className="pt-16 md:pt-20">
                {/* === Sidebar : NE PAS MODIFIER === */}
                <div className="">
                    <SideBar />
                </div>

                {/* === Contenu principal === */}
                <div className="md:ml-64 p-4 sm:p-6 lg:p-16">

                    {/* HEADER avec dégradé */}
                    <div className="mb-8">
                        <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold">
                                        Tableau de bord des visites
                                    </h1>
                                    <p className="text-blue-100 mt-2 opacity-90">
                                        Suivi et analyse des visites par espace
                                    </p>
                                </div>
                                <div className="mt-4 sm:mt-0">
                                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                        <IoStatsChart className="mr-2" />
                                        <span className="font-medium">
                                            {filteredListe.length} visite(s) affichée(s)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FILTRES améliorés */}
                    <div className="mb-8">
                        <div className="bg-white rounded-xl shadow-sm  p-5">
                            <div className="flex items-center mb-4">
                                <FaFilter className="text-blue-600 mr-3 text-lg" />
                                <h3 className="text-lg font-semibold text-gray-800">Filtres</h3>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="flex-1 w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <div className="flex items-center">
                                            <MdDateRange className="mr-2 text-gray-500" />
                                            Filtrer par date
                                        </div>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={filterDate}
                                            onChange={(e) => setFilterDate(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        />
                                        {filterDate && (
                                            <button
                                                onClick={() => setFilterDate('')}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {filterDate && (
                                    <button
                                        onClick={() => setFilterDate('')}
                                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors duration-200 flex items-center"
                                    >
                                        <span className="mr-2">×</span>
                                        Effacer le filtre
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* CARTES STATISTIQUES améliorées */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                        {/* Carte total visites */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium mb-1">Total visites</p>
                                    <p className="text-4xl font-bold text-gray-900 mt-2">
                                        {loading ? (
                                            <span className="inline-block w-20 h-10 bg-gray-200 animate-pulse rounded"></span>
                                        ) : stats.total}
                                    </p>
                                    <p className="text-green-600 text-sm font-medium mt-2 flex items-center">
                                        <MdOutlineTrendingUp className="mr-1" />
                                        Toutes périodes
                                    </p>
                                </div>
                                <div className="bg-linear-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-md">
                                    <FaChartLine className="text-white text-2xl" />
                                </div>
                            </div>
                        </div>

                        {/* Carte top espace */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <p className="text-gray-500 text-sm font-medium mb-1">Espace le plus visité</p>
                                    <p className="text-xl font-bold text-gray-900 mt-2 truncate">
                                        {loading ? (
                                            <span className="inline-block w-32 h-6 bg-gray-200 animate-pulse rounded"></span>
                                        ) : stats.topEspace}
                                    </p>
                                    <div className="flex items-center justify-between mt-3">
                                        <div>
                                            <p className="text-gray-700 text-lg font-bold">
                                                {stats.topEspaceCount}
                                                <span className="text-gray-500 text-sm font-normal ml-1">visites</span>
                                            </p>
                                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                <div
                                                    className="bg-linear-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                                                    style={{ width: `${Math.min(stats.topEspacePercentage, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <span className="text-green-600 font-bold">
                                            {stats.topEspacePercentage}%
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-linear-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-md ml-3">
                                    <FaBuilding className="text-white text-2xl" />
                                </div>
                            </div>
                        </div>

                        {/* Carte visites aujourd'hui */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium mb-1">Visites aujourd'hui</p>
                                    <p className="text-4xl font-bold text-gray-900 mt-2">
                                        {loading ? (
                                            <span className="inline-block w-16 h-10 bg-gray-200 animate-pulse rounded"></span>
                                        ) : stats.visitesAujourdhui}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </p>
                                </div>
                                <div className="bg-linear-to-br from-orange-500 to-amber-600 p-4 rounded-2xl shadow-md">
                                    <FaCalendarAlt className="text-white text-2xl" />
                                </div>
                            </div>
                        </div>

                        {/* Carte moyenne journalière */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium mb-1">Moyenne journalière</p>
                                    <p className="text-4xl font-bold text-gray-900 mt-2">
                                        {loading ? (
                                            <span className="inline-block w-16 h-10 bg-gray-200 animate-pulse rounded"></span>
                                        ) : stats.moyenneParJour}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        Sur les 30 derniers jours
                                    </p>
                                </div>
                                <div className="bg-linear-to-br from-purple-500 to-violet-600 p-4 rounded-2xl shadow-md">
                                    <FaUsers className="text-white text-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NOUVELLES CARTES POUR LES ENFANTS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        
                        {/* Carte total enfants */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium mb-1">Total enfants</p>
                                    <p className="text-4xl font-bold text-gray-900 mt-2">
                                        {loadingEnfants ? (
                                            <span className="inline-block w-20 h-10 bg-gray-200 animate-pulse rounded"></span>
                                        ) : enfantsStats.total}
                                    </p>
                                    <p className="text-pink-600 text-sm font-medium mt-2 flex items-center">
                                        <MdOutlineFamilyRestroom className="mr-1" />
                                        Enregistrés
                                    </p>
                                </div>
                                <div className="bg-linear-to-br from-pink-500 to-rose-600 p-4 rounded-2xl shadow-md">
                                    <FaChild className="text-white text-2xl" />
                                </div>
                            </div>
                        </div>

                        {/* Carte garçons */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium mb-1">Garçons</p>
                                    <p className="text-4xl font-bold text-blue-900 mt-2">
                                        {loadingEnfants ? (
                                            <span className="inline-block w-16 h-10 bg-gray-200 animate-pulse rounded"></span>
                                        ) : enfantsStats.garcons}
                                    </p>
                                    <p className="text-blue-600 text-sm font-medium mt-2 flex items-center">
                                        <TbGenderMale className="mr-1" />
                                        {enfantsStats.total > 0 ? `${((enfantsStats.garcons / enfantsStats.total) * 100).toFixed(1)}%` : '0%'}
                                    </p>
                                </div>
                                <div className="bg-linear-to-br from-blue-400 to-blue-500 p-4 rounded-2xl shadow-md">
                                    <TbGenderMale className="text-white text-2xl" />
                                </div>
                            </div>
                        </div>

                        {/* Carte filles */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium mb-1">Filles</p>
                                    <p className="text-4xl font-bold text-pink-900 mt-2">
                                        {loadingEnfants ? (
                                            <span className="inline-block w-16 h-10 bg-gray-200 animate-pulse rounded"></span>
                                        ) : enfantsStats.filles}
                                    </p>
                                    <p className="text-pink-600 text-sm font-medium mt-2 flex items-center">
                                        <TbGenderFemale className="mr-1" />
                                        {enfantsStats.total > 0 ? `${((enfantsStats.filles / enfantsStats.total) * 100).toFixed(1)}%` : '0%'}
                                    </p>
                                </div>
                                <div className="bg-linear-to-br from-pink-400 to-pink-500 p-4 rounded-2xl shadow-md">
                                    <TbGenderFemale className="text-white text-2xl" />
                                </div>
                            </div>
                        </div>

                        {/* Carte âge moyen */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium mb-1">Âge moyen</p>
                                    <p className="text-4xl font-bold text-purple-900 mt-2">
                                        {loadingEnfants ? (
                                            <span className="inline-block w-16 h-10 bg-gray-200 animate-pulse rounded"></span>
                                        ) : enfantsStats.ageMoyen}
                                    </p>
                                    <p className="text-purple-600 text-sm font-medium mt-2 flex items-center">
                                        <FaBirthdayCake className="mr-1" />
                                        ans
                                    </p>
                                </div>
                                <div className="bg-linear-to-br from-purple-400 to-purple-500 p-4 rounded-2xl shadow-md">
                                    <FaBirthdayCake className="text-white text-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TABLEAUX : VISITES, CLIENTS ET ENFANTS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Carte des visites */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 bg-linear-to-r from-blue-50 to-indigo-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="bg-blue-100 p-3 rounded-xl mr-4">
                                            <FaChartBar className="text-blue-600 text-xl" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">
                                                Dernières visites
                                            </h2>
                                            <p className="text-gray-600 text-sm">
                                                {filteredListe.length} visite(s) {filterDate && `pour le ${formatDate(filterDate)}`}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                                        {filteredListe.length} total
                                    </span>
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                #
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Heure
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Espace
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredListe.length > 0 ? (
                                            filteredListe.slice(0, 5).map((v, i) => (
                                                <tr key={i} className="hover:bg-blue-50/50 transition-colors duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {i + 1}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 font-medium">
                                                            {formatDate(v.date)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                                            {formatTime(v.heure)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                                            <span className="text-sm font-medium text-gray-900">
                                                                {v.nomEspace}
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-12 text-center">
                                                    <div className="text-gray-400">
                                                        <FaChartBar className="text-4xl mx-auto mb-4 opacity-50" />
                                                        <p className="text-lg font-medium">Aucune visite</p>
                                                        <p className="text-sm mt-1">
                                                            {filterDate ? "Aucune visite pour cette date" : "Aucune visite enregistrée"}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {filteredListe.length > 5 && (
                                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                                    <div className="text-center">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200">
                                            Voir toutes les visites ({filteredListe.length})
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Carte des clients */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 bg-linear-to-r from-green-50 to-emerald-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="bg-green-100 p-3 rounded-xl mr-4">
                                            <RiUserLine className="text-green-600 text-xl" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">
                                                Clients récents
                                            </h2>
                                            <p className="text-gray-600 text-sm">
                                                {clientStats.total} client(s) enregistré(s)
                                            </p>
                                        </div>
                                    </div>
                                    <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                                        {clientStats.total} total
                                    </span>
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                #
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Nom
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Prénom
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Contact
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {client.length > 0 ? (
                                            client.slice(0, 5).map((c, i) => (
                                                <tr key={i} className="hover:bg-green-50/50 transition-colors duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {i + 1}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {c.nom}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {c.prenom}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className={`text-sm font-medium ${c.contact ? 'text-green-600' : 'text-gray-400'}`}>
                                                            {c.contact || 'Non renseigné'}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-12 text-center">
                                                    <div className="text-gray-400">
                                                        <RiUserLine className="text-4xl mx-auto mb-4 opacity-50" />
                                                        <p className="text-lg font-medium">Aucun client</p>
                                                        <p className="text-sm mt-1">Aucun client enregistré</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {client.length > 5 && (
                                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                                    <div className="text-center">
                                        <button className="text-green-600 hover:text-green-800 font-medium text-sm transition-colors duration-200">
                                            Voir tous les clients ({client.length})
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* NOUVEAU : Carte des enfants */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 bg-linear-to-r from-pink-50 to-rose-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="bg-pink-100 p-3 rounded-xl mr-4">
                                            <GiBabyFace className="text-pink-600 text-xl" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">
                                                Enfants récents
                                            </h2>
                                            <p className="text-gray-600 text-sm">
                                                {enfantsStats.total} enfant(s) enregistré(s)
                                            </p>
                                        </div>
                                    </div>
                                    <span className="bg-pink-100 text-pink-700 text-sm font-medium px-3 py-1 rounded-full">
                                        {enfantsStats.total} total
                                    </span>
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                #
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Nom
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Âge
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Sexe
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Numéro Parent
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {enfants.length > 0 ? (
                                            enfants.slice(0, 5).map((e, i) => (
                                                <tr key={i} className="hover:bg-pink-50/50 transition-colors duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {i + 1}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {e.nom}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 font-medium">
                                                            {calculateAge(e.date)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {e.sexe === 'garçon' ? (
                                                                <div className="flex items-center text-blue-600">
                                                                    <TbGenderMale className="mr-1" />
                                                                    <span className="text-sm font-medium">Garçon</span>
                                                                </div>
                                                            ) : e.sexe === 'fille' ? (
                                                                <div className="flex items-center text-pink-600">
                                                                    <TbGenderFemale className="mr-1" />
                                                                    <span className="text-sm font-medium">Fille</span>
                                                                </div>
                                                            ) : (
                                                                <span className="text-sm text-gray-400">Non spécifié</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {e.numeroParent ? 
                                                                `${e.numeroParent || ''}  `.trim() || 
                                                                'Parent enregistré' 
                                                                : 'Non renseigné'
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center">
                                                    <div className="text-gray-400">
                                                        <GiBabyFace className="text-4xl mx-auto mb-4 opacity-50" />
                                                        <p className="text-lg font-medium">Aucun enfant</p>
                                                        <p className="text-sm mt-1">Aucun enfant enregistré</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {enfants.length > 5 && (
                                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                                    <div className="text-center">
                                        <button className="text-pink-600 hover:text-pink-800 font-medium text-sm transition-colors duration-200">
                                            Voir tous les enfants ({enfants.length})
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pied de page */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-center text-gray-500 text-sm">
                            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Place