import React, { useEffect, useState } from 'react';
import NavBarDash from "../../NavBarDash";
import toast from 'react-hot-toast';
import { AfficherVisiteDate, AfficherVisites, InsererClient, InsererVisite, SupprimerVisite } from '../../../../Fonctions/Espace/Visite';
import { CiTrash, CiEdit, CiCalendar, CiClock2, CiUser } from "react-icons/ci";
import { AfficherClient, VerifierAuthentification } from '../../../../Fonctions/Utilisateur/Utilisateur';
import { FaRegCircleXmark, FaUsers, FaChartLine, FaFilter, FaPlus, FaBuilding, FaChair, FaCalendarCheck, FaCalendarDay } from "react-icons/fa6";
import { MdOutlineDashboard, MdDateRange, MdOutlineEmail, MdPhone, MdMeetingRoom } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoStatsChartOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Convivialite = () => {
    const navigate=useNavigate()
    // États pour les réservations
    const [showForm, setShowForm] = useState(false);
    const [typeReservation, setTypeReservation] = useState("");
    const [utilisateur, setUtilisateur] = useState(null);
    const [heure, setHeure] = useState(new Date());
    const [reservations, setReservations] = useState([]);
    const [dateFilter, setDateFilter] = useState("");
    const [heureReservation, setHeureReservation] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [reservationASupprimer, setReservationASupprimer] = useState(null);
    const [clients, setClients] = useState([]);
    const [activeTab, setActiveTab] = useState('reservations');
    const [searchTerm, setSearchTerm] = useState('');
    const [auth,setAuth]=useState([])
    const [salle, setSalle] = useState("");
    
    // États pour le formulaire
    const [client, setClient] = useState({
        nom: '',
        prenom: '',
        email: "",
        contact: ""
    });

    const handleMenu = (reservationId = null) => {
        setShowMenu(!showMenu);
        setReservationASupprimer(reservationId);
    };

    const ouvrirFormulaire = () => setShowForm(true);

    const fermerFormulaire = () => {
        setShowForm(false);
        setTypeReservation("");
        setHeureReservation("");
        setSalle("");
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
        fetchReservations();
        fetchClientsReservation();
        

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

    const fetchReservations = async () => {
        try {
            const data = await AfficherVisites();
            // Filtrer pour n'avoir que les réservations de convivialité
            const reservationsConvivialite = data.filter(v => 
                v.nomEspace === "Salle Convivialité" || 
                v.nomEspace === "Salle de Réunion" ||
                v.type === "mariage" || // Pour la compatibilité
                v.type === "réservation"
            );
            setReservations(reservationsConvivialite || []);
        } catch (error) {
            toast.error("Erreur lors du chargement des réservations");
            console.error(error);
        }
    };

    // NOUVELLE FONCTION : Récupérer uniquement les clients avec des réservations
    const fetchClientsReservation = async () => {
        try {
            const data = await AfficherClient();
            // Filtrer uniquement les clients avec des visites de type Réservation/Mariage
            const clientsReservation = data.filter(c => 
                c.visite && 
                (c.visite.toLowerCase().includes('réservation') || 
                 c.visite.toLowerCase().includes('mariage') ||
                 c.visite.toLowerCase().includes('réunion') ||
                 c.visite.toLowerCase().includes('événement'))
            );
            setClients(clientsReservation || []);
        } catch {
            toast.error("Erreur chargement clients");
        }
    };

    const afficherDateReservation = async (dates) => {
        setDateFilter(dates);

        if (!dates || dates === "") {
            fetchReservations();
            return;
        }

        try {
            const data = await AfficherVisiteDate(dates);
            const reservationsFiltrees = data.filter(v => 
                v.nomEspace === "Salle Convivialité" || 
                v.nomEspace === "Salle de Réunion" ||
                v.type === "mariage" ||
                v.type === "réservation"
            );
            setReservations(reservationsFiltrees || []);
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors du filtrage par date");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!typeReservation) {
            toast.error("Veuillez sélectionner un type de réservation");
            return;
        }

        if (!heureReservation) {
            toast.error("Veuillez sélectionner une heure");
            return;
        }

        if (!salle) {
            toast.error("Veuillez sélectionner une salle");
            return;
        }

        // Tous les types de réservation nécessitent les informations client
        if (!client.nom || !client.prenom || !client.email || !client.contact) {
            toast.error("Veuillez remplir tous les champs du client");
            return;
        }

        const donneeReservation = {
            type: typeReservation.toLowerCase(),
            date: new Date().toISOString(),
            heure: heureReservation,
            nomUtilisateur: utilisateur?.nom || "Inconnu",
            nomEspace: salle,
            nomClient: `${client.nom} ${client.prenom}`,
            emailClient: client.email,
            contactClient: client.contact
        };

        try {
            // Toujours insérer le client pour les réservations
            await InsererClient({
                ...client,
                visite: typeReservation // Type de réservation comme type de visite
            });
            toast.success("Client enregistré avec succès");

            await InsererVisite(donneeReservation);
            toast.success("Réservation enregistrée avec succès");

            await fetchReservations();
            await fetchClientsReservation(); // Rafraîchir la liste des clients
            fermerFormulaire();

        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    const handleSupprimer = async () => {
        if (!reservationASupprimer) {
            toast.error("Aucune réservation sélectionnée");
            return;
        }

        try {
            await SupprimerVisite(reservationASupprimer);
            toast.success("Réservation supprimée avec succès");
            await fetchReservations();
            setShowMenu(false);
            setReservationASupprimer(null);
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la suppression");
        }
    };

    // Statistiques
    const nombreTotalReservations = reservations.length;

    const aujourdhui = new Date().toLocaleDateString('fr-FR');
    const reservationsAujourdhui = reservations.filter(v =>
        new Date(v.date).toLocaleDateString('fr-FR') === aujourdhui
    ).length;

    const datesUniques = [...new Set(reservations.map(v =>
        new Date(v.date).toLocaleDateString('fr-FR')
    ))];
    const nombreJoursAvecReservations = datesUniques.length;
    const moyenneParJour = nombreJoursAvecReservations > 0
        ? (nombreTotalReservations / nombreJoursAvecReservations).toFixed(1)
        : 0;

    // Filtrer les clients en fonction du terme de recherche
    const filteredClients = clients.filter(c =>
        c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const reservationsPourAujourdhui = reservations.filter(v =>
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
                                    Espace Convivialité
                                    <span className="block text-lg md:text-xl font-semibold text-amber-600 mt-2">
                                        <FaBuilding className="inline mr-2" />
                                        Gestion des réservations de salles
                                    </span>
                                </h1>
                                <p className='text-gray-600 max-w-2xl'>
                                    Gérez et suivez toutes les réservations de salles dans votre espace convivialité.
                                    Visualisez les statistiques et consultez les données en temps réel.
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Bonjour,</p>
                                    <p className="font-semibold text-gray-800">{utilisateur?.nom || "Utilisateur"}</p>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
                                    {utilisateur?.nom?.charAt(0) || "U"}
                                </div>
                            </div>
                        </div>

                        {/* Statistiques Cards */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                            <div className='bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-xl transform transition-transform hover:-translate-y-1'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <p className='text-amber-100 text-sm font-medium mb-2'>Total des réservations</p>
                                        <p className='text-4xl font-bold'>{nombreTotalReservations}</p>
                                        <div className='flex items-center mt-3'>
                                            <CiCalendar className='mr-2' />
                                            <span className='text-sm'>Toutes périodes</span>
                                        </div>
                                    </div>
                                    <div className='bg-white/20 p-3 rounded-xl'>
                                        <FaCalendarCheck className='text-2xl' />
                                    </div>
                                </div>
                            </div>

                            <div className='bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl transform transition-transform hover:-translate-y-1'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <p className='text-orange-100 text-sm font-medium mb-2'>Réservations aujourd'hui</p>
                                        <p className='text-4xl font-bold'>{reservationsAujourdhui}</p>
                                        <div className='flex items-center mt-3'>
                                            <CiClock2 className='mr-2' />
                                            <span className='text-sm'>{aujourdhui}</span>
                                        </div>
                                    </div>
                                    <div className='bg-white/20 p-3 rounded-xl'>
                                        <FaCalendarDay className='text-2xl' />
                                    </div>
                                </div>
                            </div>

                            <div className='bg-gradient-to-r from-amber-700 to-amber-800 rounded-2xl p-6 text-white shadow-xl transform transition-transform hover:-translate-y-1'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <p className='text-amber-100 text-sm font-medium mb-2'>Moyenne par jour</p>
                                        <p className='text-4xl font-bold'>{moyenneParJour}</p>
                                        <div className='flex items-center mt-3'>
                                            <HiOutlineUserGroup className='mr-2' />
                                            <span className='text-sm'>
                                                Sur {nombreJoursAvecReservations} jour{nombreJoursAvecReservations > 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='bg-white/20 p-3 rounded-xl'>
                                        <IoStatsChartOutline className='text-2xl' />
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
                                            onClick={() => setActiveTab('reservations')}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'reservations'
                                                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                }`}
                                        >
                                            <CiCalendar className="inline mr-2" />
                                            Réservations ({reservations.length})
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('clients')}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'clients'
                                                    ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                }`}
                                        >
                                            <CiUser className="inline mr-2" />
                                            Clients Réservation ({clients.length})
                                        </button>
                                    </div>

                                    <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                onChange={e => afficherDateReservation(e.target.value)}
                                                value={dateFilter}
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                            />
                                            <MdDateRange className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        <button
                                            onClick={ouvrirFormulaire}
                                            className='bg-linear-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-700 hover:to-amber-800 transition-all flex items-center gap-2'
                                        >
                                            <FaPlus />
                                            Nouvelle réservation
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className='p-6'>
                                {activeTab === 'reservations' ? (
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
                                                            Client
                                                        </th>
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            Date
                                                        </th>
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            Heure
                                                        </th>
                                                    
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className='divide-y divide-gray-200'>
                                                    {reservations.length > 0 ? (
                                                        reservations.map((item, index) => (
                                                            <tr key={item._id} className='hover:bg-gray-50 transition-colors'>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <div className="flex items-center">
                                                                        <div className={`h-3 w-3 rounded-full mr-3 ${item.type === 'mariage' ? 'bg-pink-500' : 'bg-amber-500'}`}></div>
                                                                        <span className="font-medium">{index + 1}</span>
                                                                    </div>
                                                                </td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.type === 'mariage'
                                                                            ? 'bg-pink-100 text-pink-800'
                                                                            : 'bg-amber-100 text-amber-800'
                                                                        }`}>
                                                                        {item.type === 'mariage' ? 'Mariage' : 
                                                                        item.type === 'réunion' ? 'Réunion' :
                                                                        item.type === 'événement' ? 'Événement' : 
                                                                        item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                                                    </span>
                                                                </td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <div className="flex items-center">
                                                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                                                            <CiUser />
                                                                        </div>
                                                                        <div>
                                                                            <span className="font-medium block">{item.nomClient || item.nomUtilisateur}</span>
                                                                            <span className="text-xs text-gray-500">{item.emailClient || ""}</span>
                                                                        </div>
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
                                                            <td colSpan="7" className='px-6 py-12 text-center'>
                                                                <div className="text-gray-400">
                                                                    <FaChair className="text-4xl mx-auto mb-4" />
                                                                    <p className="text-lg font-medium">Aucune réservation trouvée</p>
                                                                    <p className="text-sm mt-1">
                                                                        {dateFilter ? "Aucune réservation pour cette date" : "Commencez par ajouter une réservation"}
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
                                            {reservations.length > 0 ? (
                                                reservations.slice(0, 5).map((item, index) => (
                                                    <div key={item._id} className='border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow'>
                                                        <div className='flex justify-between items-start mb-3'>
                                                            <div className="flex items-center gap-3">
                                                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${item.type === 'mariage' ? 'bg-pink-100 text-pink-600' : 'bg-amber-100 text-amber-600'}`}>
                                                                    {item.type === 'mariage' ? 'M' : 'R'}
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-900">{item.nomClient || item.nomUtilisateur}</h3>
                                                                    <span className={`text-xs px-2 py-1 rounded-full ${item.type === 'mariage' ? 'bg-pink-50 text-pink-700' : 'bg-amber-50 text-amber-700'}`}>
                                                                        {item.type === 'mariage' ? 'Mariage' : 
                                                                        item.type === 'réunion' ? 'Réunion' :
                                                                        item.type === 'événement' ? 'Événement' : 
                                                                        item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className='flex gap-2'>
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
                                                            <div className="flex items-center col-span-2">
                                                                <MdMeetingRoom className="mr-2 text-amber-600" />
                                                                {item.nomEspace || "Salle Convivialité"}
                                                            </div>
                                                            {item.emailClient && (
                                                                <div className="flex items-center col-span-2 text-xs text-gray-500">
                                                                    <MdOutlineEmail className="mr-2" />
                                                                    {item.emailClient}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className='p-8 text-center text-gray-500'>
                                                    <FaChair className="text-4xl mx-auto mb-4" />
                                                    <p className="text-lg font-medium">Aucune réservation</p>
                                                    <p className="text-sm mt-1">
                                                        {dateFilter ? "Aucune réservation pour cette date" : "Ajoutez votre première réservation"}
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
                                                    placeholder="Rechercher un client (réservation)..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                />
                                                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>

                                        {/* Clients Table - UNIQUEMENT CLIENTS RÉSERVATION */}
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
                                                            Type de réservation
                                                        </th>
                                                        <th className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                                                            Date d'inscription
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className='divide-y divide-gray-200'>
                                                    {filteredClients.length > 0 ? (
                                                        filteredClients.map((item, index) => (
                                                            <tr key={item._id} className='hover:bg-gray-50 transition-colors'>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <div className="flex items-center">
                                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold mr-3">
                                                                            {item.nom?.charAt(0) || ''}{item.prenom?.charAt(0) || ''}
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
                                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                        item.visite?.toLowerCase().includes('mariage') ? 'bg-pink-100 text-pink-800' :
                                                                        item.visite?.toLowerCase().includes('réunion') ? 'bg-blue-100 text-blue-800' :
                                                                        item.visite?.toLowerCase().includes('événement') ? 'bg-purple-100 text-purple-800' :
                                                                        'bg-orange-100 text-orange-800'
                                                                    }`}>
                                                                        {item.visite || 'Réservation'}
                                                                    </span>
                                                                </td>
                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                    <div className="flex items-center text-gray-500 text-sm">
                                                                        <CiCalendar className="mr-2" />
                                                                        {item.dateInscription ? new Date(item.dateInscription).toLocaleDateString('fr-FR') : 'N/A'}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="5" className='px-6 py-12 text-center'>
                                                                <div className="text-gray-400">
                                                                    <CiUser className="text-4xl mx-auto mb-4" />
                                                                    <p className="text-lg font-medium">Aucun client de réservation trouvé</p>
                                                                    <p className="text-sm mt-1">
                                                                        {searchTerm ? "Aucun résultat pour votre recherche" : "Aucun client avec réservation enregistré"}
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

                {/* Today's Reservations Summary */}
                {reservationsPourAujourdhui.length > 0 && (
                    <div className="max-w-7xl mx-auto mb-8">
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="bg-amber-100 p-3 rounded-xl mr-4">
                                        <CiClock2 className="text-amber-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Réservations d'aujourd'hui</h3>
                                        <p className="text-sm text-gray-600">{aujourdhui}</p>
                                    </div>
                                </div>
                                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {reservationsPourAujourdhui.length} réservation(s)
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {reservationsPourAujourdhui.slice(0, 3).map((v, index) => (
                                    <div key={v._id} className="bg-white rounded-lg p-4 border border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className={`h-3 w-3 rounded-full mr-3 ${v.type === 'mariage' ? 'bg-pink-500' : 'bg-amber-500'}`}></div>
                                                <span className="font-medium">{v.nomClient || v.nomUtilisateur}</span>
                                            </div>
                                            <span className="text-sm text-amber-600 font-medium">{v.heure}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className={`text-sm ${
                                                v.type === 'mariage' ? 'text-pink-600' :
                                                v.type === 'réunion' ? 'text-blue-600' :
                                                v.type === 'événement' ? 'text-purple-600' :
                                                'text-gray-600'
                                            }`}>
                                                {v.type === 'mariage' ? 'Mariage' : 
                                                 v.type === 'réunion' ? 'Réunion' :
                                                 v.type === 'événement' ? 'Événement' : 
                                                 v.type.charAt(0).toUpperCase() + v.type.slice(1)}
                                            </span>
                                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                {v.nomEspace || "Salle Convivialité"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal d'ajout de réservation */}
                {showForm && (
                    <>
                        {/* Overlay avec z-index plus bas */}
                        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" 
                             onClick={fermerFormulaire} />
                        
                        {/* Modal avec z-index plus élevé */}
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                       w-[95%] max-w-lg bg-white rounded-2xl shadow-2xl z-50
                                       max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-orange-700 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-white">
                                        <FaPlus className="inline mr-2" />
                                        Nouvelle réservation
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
                                            Type de réservation *
                                        </label>
                                        <select
                                            value={typeReservation}
                                            onChange={(e) => setTypeReservation(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                            required
                                        >
                                            <option value="">Sélectionner...</option>
                                            <option value="Réunion">Réunion</option>
                                            <option value="Événement">Événement</option>
                                            <option value="Mariage">Mariage</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Salle *
                                        </label>
                                        <select
                                            value={salle}
                                            onChange={(e) => setSalle(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                            required
                                        >
                                            <option value="">Sélectionner une salle...</option>
                                            <option value="Salle Convivialité">Salle Convivialité (20 personnes)</option>
                                            <option value="Salle de Réunion A">Salle de Réunion A (10 personnes)</option>
                                            <option value="Salle de Réunion B">Salle de Réunion B (8 personnes)</option>
                                            <option value="Salle Polyvalente">Salle Polyvalente (50 personnes)</option>
                                            <option value="Salle Mariage">Salle Mariage (100 personnes)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date de réservation *
                                        </label>
                                        <input
                                            type="date"
                                            value={dateFilter || new Date().toISOString().split('T')[0]}
                                            onChange={(e) => setDateFilter(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Heure *
                                        </label>
                                        <input
                                            type="time"
                                            value={heureReservation}
                                            onChange={(e) => setHeureReservation(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Informations du client - TOUJOURS VISIBLES */}
                                <div className="space-y-6 border-t pt-6">
                                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <CiUser className="mr-2" />
                                        Informations du client *
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                                placeholder="Prénom du client"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                value={client.email}
                                                onChange={e => setClient({ ...client, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                                placeholder="+225 XX XX XX XX XX"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 px-4 rounded-lg font-medium hover:from-amber-700 hover:to-amber-800 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        Enregistrer la réservation
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
                                        Voulez-vous vraiment supprimer cette réservation ?
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

export default Convivialite;