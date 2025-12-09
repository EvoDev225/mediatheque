import React, { useEffect, useState } from 'react';
import NavBarDash from '../../NavBarDash';
import toast from 'react-hot-toast';
import { AfficherVisiteDate, AfficherVisites, InsererClient, InsererVisite, SupprimerVisite } from '../../../../Fonctions/Espace/Visite';
import { CiTrash, CiEdit, CiCalendar, CiClock2, CiUser } from "react-icons/ci";
import { AfficherClient, VerifierAuthentification } from '../../../../Fonctions/Utilisateur/Utilisateur';
import { FaRegCircleXmark, FaUsers, FaChartLine, FaFilter, FaPlus, FaBuilding } from "react-icons/fa6";
import { MdOutlineDashboard, MdDateRange, MdOutlineEmail, MdPhone } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";

const Multimedia = () => {
    const [showForm, setShowForm] = useState(false);
    const [typeVisite, setTypeVisite] = useState("");
    const [utilisateur, setUtilisateur] = useState(null);
    const [heure, setHeure] = useState(new Date());
    const [visite, setVisite] = useState([]);
    const [dateFilter, setDateFilter] = useState("");
    const [heureVisite, setHeureVisite] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [visiteASupprimer, setVisiteASupprimer] = useState(null);
    const [clients, setClients] = useState([]);
    const [activeTab, setActiveTab] = useState('visites');
    const [searchTerm, setSearchTerm] = useState('');

    const [client, setClient] = useState({
        nom: '',
        prenom: '',
        email: "",
        contact: ""
    });

    const handleMenu = (visiteId = null) => {
        setShowMenu(!showMenu);
        setVisiteASupprimer(visiteId);
    };

    const ouvrirFormulaire = () => setShowForm(true);

    const fermerFormulaire = () => {
        setShowForm(false);
        setTypeVisite("");
        setHeureVisite("");
        setClient({
            nom: '',
            prenom: '',
            email: "",
            contact: ""
        });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setHeure(new Date());
        }, 1000);

        fetchUser();
        fetchVisite();
        fetchClient();

        return () => clearInterval(timer);
    }, []);

    const fetchUser = async () => {
        try {
            const res = await VerifierAuthentification();
            setUtilisateur(res || null);
        } catch (error) {
            toast.error("Erreur lors de la récupération de l'utilisateur");
            console.error(error);
        }
    };

    const fetchVisite = async () => {
        try {
            const data = await AfficherVisites();
            setVisite(data || []);
        } catch (error) {
            toast.error("Erreur lors du chargement des visites");
            console.error(error);
        }
    };

    const afficherDateVisite = async (dates) => {
        setDateFilter(dates);

        if (!dates || dates === "") {
            fetchVisite();
            return;
        }

        try {
            const data = await AfficherVisiteDate(dates);
            setVisite(data || []);
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors du filtrage par date");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!typeVisite) {
            toast.error("Veuillez sélectionner un type de visite");
            return;
        }

        if (!heureVisite) {
            toast.error("Veuillez sélectionner une heure");
            return;
        }

        const donneeVisite = {
            type: typeVisite.toLowerCase(),
            date: new Date().toISOString(),
            heure: heureVisite,
            nomUtilisateur: utilisateur?.nom || "Inconnu",
            nomEspace: "Salle Multimédia"
        };

        try {
            if (typeVisite === "Formation") {
                if (!client.nom || !client.prenom || !client.email || !client.contact) {
                    toast.error("Veuillez remplir tous les champs du client");
                    return;
                }

                await InsererClient({
                    ...client,
                    visite: typeVisite
                });
                toast.success("Client enregistré avec succès");
            }

            await InsererVisite(donneeVisite);
            toast.success("Visite enregistrée avec succès");

            await fetchVisite();
            fermerFormulaire();

        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    const handleSupprimer = async () => {
        if (!visiteASupprimer) {
            toast.error("Aucune visite sélectionnée");
            return;
        }

        try {
            await SupprimerVisite(visiteASupprimer);
            toast.success("Visite supprimée avec succès");
            await fetchVisite();
            setShowMenu(false);
            setVisiteASupprimer(null);
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la suppression");
        }
    };

    const visitesFiltered = visite.filter(v => v.nomEspace === "Salle Multimédia");

    const nombreTotalVisites = visitesFiltered.length;

    const aujourdhui = new Date().toLocaleDateString('fr-FR');
    const visitesAujourdhui = visitesFiltered.filter(v =>
        new Date(v.date).toLocaleDateString('fr-FR') === aujourdhui
    ).length;

    const datesUniques = [...new Set(visitesFiltered.map(v =>
        new Date(v.date).toLocaleDateString('fr-FR')
    ))];
    const nombreJoursAvecVisites = datesUniques.length;
    const moyenneParJour = nombreJoursAvecVisites > 0
        ? (nombreTotalVisites / nombreJoursAvecVisites).toFixed(1)
        : 0;

    const fetchClient = async () => {
        try {
            const data = await AfficherClient();
            setClients(data || []);
        } catch {
            toast.error("Erreur chargement clients");
        }
    };

    // Filtrer les clients en fonction du terme de recherche
    const filteredClients = clients.filter(c =>
        c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const visitesPourAujourdhui = visitesFiltered.filter(v =>
        new Date(v.date).toLocaleDateString('fr-FR') === aujourdhui
    );

    return (
        <>
            <NavBarDash />

            <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 px-4 sm:px-6 lg:px-8 pb-10'>
                {/* Header Section */}
                <div className='max-w-7xl mx-auto'>
                    <div className='mb-8 pt-6'>
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                            <div>
                                <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
                                    Salle Multimédia
                                    <span className="block text-lg md:text-xl font-semibold text-blue-600 mt-2">
                                        <FaBuilding className="inline mr-2" />
                                        Espace de visite et formation
                                    </span>
                                </h1>
                                <p className='text-gray-600 max-w-2xl'>
                                    Gérez et suivez toutes les visites et formations dans votre salle multimédia.
                                    Visualisez les statistiques et consultez les données en temps réel.
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Bonjour,</p>
                                    <p className="font-semibold text-gray-800">{utilisateur?.nom || "Utilisateur"}</p>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                    {utilisateur?.nom?.charAt(0) || "U"}
                                </div>
                            </div>
                        </div>

                        {/* Statistiques Cards */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                            <div className='bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl transform transition-transform hover:-translate-y-1'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <p className='text-blue-100 text-sm font-medium mb-2'>Total des visites</p>
                                        <p className='text-4xl font-bold'>{nombreTotalVisites}</p>
                                        <div className='flex items-center mt-3'>
                                            <CiCalendar className='mr-2' />
                                            <span className='text-sm'>Toutes périodes</span>
                                        </div>
                                    </div>
                                    <div className='bg-white/20 p-3 rounded-xl'>
                                        <FaChartLine className='text-2xl text-white' />
                                    </div>
                                </div>
                            </div>

                            <div className='bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-xl transform transition-transform hover:-translate-y-1'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <p className='text-emerald-100 text-sm font-medium mb-2'>Visites aujourd'hui</p>
                                        <p className='text-4xl font-bold'>{visitesAujourdhui}</p>
                                        <div className='flex items-center mt-3'>
                                            <CiClock2 className='mr-2' />
                                            <span className='text-sm'>{aujourdhui}</span>
                                        </div>
                                    </div>
                                    <div className='bg-white/20 p-3 rounded-xl'>
                                        <MdOutlineDashboard className='text-2xl text-white' />
                                    </div>
                                </div>
                            </div>

                            <div className='bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl transform transition-transform hover:-translate-y-1'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <p className='text-purple-100 text-sm font-medium mb-2'>Moyenne par jour</p>
                                        <p className='text-4xl font-bold'>{moyenneParJour}</p>
                                        <div className='flex items-center mt-3'>
                                            <HiOutlineUserGroup className='mr-2' />
                                            <span className='text-sm'>
                                                Sur {nombreJoursAvecVisites} jour{nombreJoursAvecVisites > 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='bg-white/20 p-3 rounded-xl'>
                                        <FaUsers className='text-2xl text-white' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Section */}
                        <div className='bg-white rounded-2xl shadow-xl overflow-hidden mb-8'>
                            {/* Header with Tabs */}
                            <div className='border-b border-gray-200'>
                                <div className='px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setActiveTab('visites')}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'visites'
                                                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                }`}
                                        >
                                            <CiCalendar className="inline mr-2" />
                                            Visites ({visitesFiltered.length})
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('clients')}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'clients'
                                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                }`}
                                        >
                                            <CiUser className="inline mr-2" />
                                            Clients ({clients.length})
                                        </button>
                                    </div>

                                    <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                onChange={e => afficherDateVisite(e.target.value)}
                                                value={dateFilter}
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <MdDateRange className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        <button
                                            onClick={ouvrirFormulaire}
                                            className='bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2'
                                        >
                                            <FaPlus />
                                            Ajouter une visite
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className='p-6'>
                                {activeTab === 'visites' ? (
                                    <>
                                        {/* Desktop Table */}
                                        <div className='hidden lg:block overflow-x-auto'>
                                            <table className='w-full min-w-full'>
                                                <thead className='bg-gray-50'>
                                                    <tr>
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            #
                                                        </th>
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            Type
                                                        </th>
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            Utilisateur
                                                        </th>
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            Date
                                                        </th>
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            Heure
                                                        </th>
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className='divide-y divide-gray-200'>
                                                    {visitesFiltered.length > 0 ? (
                                                        visitesFiltered.map((item, index) => (
                                                            <tr key={item._id} className='hover:bg-gray-50 transition-colors'>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <div className="flex items-center">
                                                                        <div className={`h-3 w-3 rounded-full mr-3 ${item.type === 'formation' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                                                        <span className="font-medium">{index + 1}</span>
                                                                    </div>
                                                                </td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.type === 'formation'
                                                                            ? 'bg-green-100 text-green-800'
                                                                            : 'bg-blue-100 text-blue-800'
                                                                        }`}>
                                                                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                                                    </span>
                                                                </td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <div className="flex items-center">
                                                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                                                            <CiUser />
                                                                        </div>
                                                                        <span className="font-medium">{item.nomUtilisateur}</span>
                                                                    </div>
                                                                </td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <div className="flex items-center text-gray-700">
                                                                        <CiCalendar className="mr-2" />
                                                                        {new Date(item.date).toLocaleDateString('fr-FR')}
                                                                    </div>
                                                                </td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <div className="flex items-center text-gray-700">
                                                                        <CiClock2 className="mr-2" />
                                                                        {item.heure}
                                                                    </div>
                                                                </td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <div className='flex items-center gap-2'>
                                                                        <button
                                                                            onClick={() => handleMenu(item._id)}
                                                                            className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                                                                        >
                                                                            <CiTrash className="text-xl" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="6" className='px-6 py-12 text-center'>
                                                                <div className="text-gray-400">
                                                                    <CiCalendar className="text-4xl mx-auto mb-4" />
                                                                    <p className="text-lg font-medium">Aucune visite trouvée</p>
                                                                    <p className="text-sm mt-1">
                                                                        {dateFilter ? "Aucune visite pour cette date" : "Commencez par ajouter une visite"}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Mobile Cards */}
                                        <div className='lg:hidden space-y-4'>
                                            {visitesFiltered.length > 0 ? (
                                                visitesFiltered.slice(0, 5).map((item, index) => (
                                                    <div key={item._id} className='border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow'>
                                                        <div className='flex justify-between items-start mb-3'>
                                                            <div className="flex items-center gap-3">
                                                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${item.type === 'formation' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                                                    {item.type === 'formation' ? 'F' : 'V'}
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-900">{item.nomUtilisateur}</h3>
                                                                    <span className={`text-xs px-2 py-1 rounded-full ${item.type === 'formation' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                                                                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className='flex gap-2'>
                                                                <button className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg'>
                                                                    <CiEdit />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleMenu(item._id)}
                                                                    className='p-2 text-red-600 hover:bg-red-50 rounded-lg'
                                                                >
                                                                    <CiTrash />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className='grid grid-cols-2 gap-3 text-sm text-gray-600'>
                                                            <div className="flex items-center">
                                                                <CiCalendar className="mr-2" />
                                                                {new Date(item.date).toLocaleDateString('fr-FR')}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <CiClock2 className="mr-2" />
                                                                {item.heure}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className='p-8 text-center text-gray-500'>
                                                    <CiCalendar className="text-4xl mx-auto mb-4" />
                                                    <p className="text-lg font-medium">Aucune visite</p>
                                                    <p className="text-sm mt-1">
                                                        {dateFilter ? "Aucune visite pour cette date" : "Ajoutez votre première visite"}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Search for Clients */}
                                        <div className="mb-6">
                                            <div className="relative max-w-md">
                                                <input
                                                    type="text"
                                                    placeholder="Rechercher un client..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>

                                        {/* Clients Table */}
                                        <div className='overflow-x-auto'>
                                            <table className='w-full min-w-full'>
                                                <thead className='bg-gray-50'>
                                                    <tr>
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            #
                                                        </th>
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            Client
                                                        </th>
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            Contact
                                                        </th>
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            Type de visite
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className='divide-y divide-gray-200'>
                                                    {filteredClients.length > 0 ? (
                                                        filteredClients.map((item, index) => (
                                                            <tr key={item._id} className='hover:bg-gray-50 transition-colors'>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <div className="flex items-center">
                                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold mr-3">
                                                                            {item.nom.charAt(0)}{item.prenom.charAt(0)}
                                                                        </div>
                                                                        <span className="font-medium">{index + 1}</span>
                                                                    </div>
                                                                </td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <div>
                                                                        <p className="font-semibold text-gray-900">{item.nom} {item.prenom}</p>
                                                                        <p className="text-sm text-gray-500 flex items-center">
                                                                            <MdOutlineEmail className="mr-1" />
                                                                            {item.email}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <div className="flex items-center text-gray-700">
                                                                        <MdPhone className="mr-2" />
                                                                        {item.contact}
                                                                    </div>
                                                                </td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                                        {item.visite}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="4" className='px-6 py-12 text-center'>
                                                                <div className="text-gray-400">
                                                                    <CiUser className="text-4xl mx-auto mb-4" />
                                                                    <p className="text-lg font-medium">Aucun client trouvé</p>
                                                                    <p className="text-sm mt-1">
                                                                        {searchTerm ? "Aucun résultat pour votre recherche" : "Aucun client enregistré"}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Today's Visites Summary */}
                {visitesPourAujourdhui.length > 0 && (
                    <div className="max-w-7xl mx-auto mb-8">
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                                        <CiClock2 className="text-indigo-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Visites d'aujourd'hui</h3>
                                        <p className="text-sm text-gray-600">{aujourdhui}</p>
                                    </div>
                                </div>
                                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {visitesPourAujourdhui.length} visite(s)
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {visitesPourAujourdhui.slice(0, 3).map((v, index) => (
                                    <div key={v._id} className="bg-white rounded-lg p-4 border border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className={`h-3 w-3 rounded-full mr-3 ${v.type === 'formation' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                                <span className="font-medium">{v.nomUtilisateur}</span>
                                            </div>
                                            <span className="text-sm text-gray-500">{v.heure}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">{v.type.charAt(0).toUpperCase() + v.type.slice(1)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal d'ajout de visite */}
                {showForm && (
                    <>
                        {/* Overlay avec z-index plus bas */}
                        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" 
                            onClick={fermerFormulaire} />
                        
                        {/* Modal avec z-index plus élevé */}
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                    w-[95%] max-w-lg bg-white rounded-2xl shadow-2xl z-50
                                    max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-white">
                                        <FaPlus className="inline mr-2" />
                                        Nouvelle visite
                                    </h3>
                                    <button
                                        onClick={fermerFormulaire}
                                        className="text-white hover:text-gray-200 transition-colors text-xl"
                                    >
                                        <FaRegCircleXmark />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Type de visite *
                                        </label>
                                        <select
                                            value={typeVisite}
                                            onChange={(e) => setTypeVisite(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            required
                                        >
                                            <option value="">Sélectionner...</option>
                                            <option value="Visite">Visite simple</option>
                                            <option value="Formation">Formation</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date
                                        </label>
                                        <input
                                            type="text"
                                            value={heure.toLocaleDateString('fr-FR')}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Heure *
                                        </label>
                                        <input
                                            type="time"
                                            value={heureVisite}
                                            onChange={(e) => setHeureVisite(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Responsable
                                        </label>
                                        <input
                                            type="text"
                                            value={utilisateur?.nom || "Chargement..."}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                {typeVisite === "Formation" && (
                                    <div className="space-y-6 border-t pt-6">
                                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                                            <CiUser className="mr-2" />
                                            Informations du client
                                        </h4>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nom *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={client.nom}
                                                    onChange={e => setClient({ ...client, nom: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                                    placeholder="Nom du client"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Prénom *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={client.prenom}
                                                    onChange={e => setClient({ ...client, prenom: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                                    placeholder="Prénom du client"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                value={client.email}
                                                onChange={e => setClient({ ...client, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                                placeholder="client@email.com"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Contact *
                                            </label>
                                            <input
                                                type="text"
                                                value={client.contact}
                                                onChange={e => setClient({ ...client, contact: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                                placeholder="+225 XX XX XX XX XX"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 border-t">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        Enregistrer la visite
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}

                {/* Modal de confirmation de suppression */}
                {showMenu && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Overlay léger */}
                        <div 
                            className="absolute inset-0 bg-black/40"
                            onClick={() => handleMenu()}
                        />
                        
                        {/* Modal centré */}
                        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full z-10">
                            <div className="p-6">
                                {/* En-tête */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="bg-red-100 p-2 rounded-lg mr-3">
                                            <CiTrash className="text-red-600 text-xl" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Confirmer la suppression
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => handleMenu()}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <FaRegCircleXmark className="text-xl" />
                                    </button>
                                </div>

                                {/* Message */}
                                <div className="mb-6">
                                    <p className="text-gray-600 mb-2">
                                        Voulez-vous vraiment supprimer cette visite ?
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Cette action ne peut pas être annulée.
                                    </p>
                                </div>

                                {/* Boutons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleMenu()}
                                        className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleSupprimer}
                                        className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Multimedia;