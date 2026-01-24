import {
    FaBook,
    FaFilter,
    FaPlus,
    FaSearch,
    FaUsers,
    FaChartLine,
    FaCalendarAlt,
    FaTag,
    FaEdit,
    FaTrash,
    FaEye,
    FaDownload,
    FaSort,
    FaSortUp,
    FaSortDown,
    FaCheckCircle,
    FaTimesCircle,
    FaRegCalendarAlt,
    FaRegClock,
    FaRegBookmark,
    FaRegUser,
    FaRegEnvelope,
    FaRegFileAlt,
    FaRegChartBar,
    FaRegStar,
    FaRegTimesCircle,
    FaRegCheckCircle,
    FaSpinner,
    FaMonument,
    FaPhone,
    FaUserTie,
    FaUserCheck
} from 'react-icons/fa'
import {
    FaGear,
    FaX,
    FaArrowRight,
    FaArrowLeft,
    FaBookOpen,
    FaLayerGroup
} from 'react-icons/fa6'
import {
    MdOutlineDashboard,
    MdOutlinePendingActions,
    MdOutlineAdd,
    MdOutlineSearch,
    MdOutlineFilterList,
    MdOutlineSort,
    MdOutlineMoreVert,
    MdOutlineLibraryBooks,
    MdOutlineCollectionsBookmark,
    MdOutlinePersonAdd,
    MdOutlineGroups
} from "react-icons/md"
import {
    IoMdAdd,
    IoMdSearch,
    IoMdFunnel,
    IoMdStats,
    IoMdBook,
    IoMdPerson
} from "react-icons/io"
import { HiOutlineCollection, HiOutlineBookOpen, HiOutlineUserGroup } from "react-icons/hi"
import NavBarDash from './NavBarDash'
import { useEffect, useState } from 'react'
import { AfficherDemande, InsererLivre, ModifierLivre, SupprimerLivre, ToutLivre } from '../../Fonctions/Livre/Flivre'
import { InsererClient } from '../../Fonctions/Espace/Visite'
import toast from 'react-hot-toast'
import { AfficherClient } from '../../Fonctions/Utilisateur/Utilisateur'

const Bibliotheque = () => {
    const [filtre, setFiltre] = useState("Tous")
    const [allBooks, setAllBooks] = useState([])
    const [allClients, setAllClients] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [openClientDialog, setOpenClientDialog] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [clientSearchTerm, setClientSearchTerm] = useState("")
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
    const [clientSortConfig, setClientSortConfig] = useState({ key: null, direction: 'asc' })
    const [currentPage, setCurrentPage] = useState(1)
    const [clientCurrentPage, setClientCurrentPage] = useState(1)
    const [booksPerPage] = useState(10)
    const [clientsPerPage] = useState(10)
    const [selectedStatus, setSelectedStatus] = useState("Tous")
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isClientLoading, setIsClientLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [modal, setModal] = useState(false)
    const [editingBook, setEditingBook] = useState(null)
    const [isEditMode, setIsEditMode] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [bookToDelete, setBookToDelete] = useState(null)
    const [allDemand, setAllDemande] = useState([])
    const [date,setDate]=useState("")

    // État initial du livre
    const [book, setBook] = useState({
        code: "",
        numero: "",
        titre: "",
        img: "",
        auteur: "",
        lieuEdition: "",
        dateEdition: "",
        origine: "",
        quantite: "1",
        dateEnregistrement: new Date().toISOString().split('T')[0],
        status: "Disponible",
        categorie: "",
        type:'Adulte'
    })

    // État initial du client
    const [client, setClient] = useState({
        date: date,
        nom: "",
        prenom: "",
        email: "",
        contact: "",
        visite: "bibliothèque",
        profession: ""
    })

    // Charger les livres et clients
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [booksRes, clientsRes] = await Promise.all([
                    ToutLivre(),
                    AfficherClient()
                ])
                setAllBooks(booksRes)
                // Filtrer uniquement les clients de la bibliothèque
                const bibliothequeClients = (clientsRes || []).filter(client =>
                    client.visite && client.visite.toLowerCase().includes('bibliothèque')
                )
                setAllClients(bibliothequeClients)
            } catch (error) {
                toast.error("Erreur lors de la récupération des données.")
                console.error(error)
            }
        }
        fetchData()
    }, [])

    // Insérer les clients
        const formatDate = (dateIso)=>{
            const [year,month,day]=dateIso.split('-')
            return `${day}/${month}/${year}`
        }
    // Insérer les clients
        
    // Gestion des livres - Suppression
    const OpenDelete = (id) => {
        setBookToDelete(id)
        setDeleted(true)
    }

    const CloseDelete = () => {
        setDeleted(false)
        setBookToDelete(null)
    }

    const handleDelete = async () => {
        try {
            if (!bookToDelete) {
                toast.error("Aucun livre sélectionné pour la suppression")
                return
            }

            const res = await SupprimerLivre(bookToDelete)

            if (res) {
                const updatedBooks = await ToutLivre()
                setAllBooks(updatedBooks)
                CloseDelete()
                toast.success("Livre supprimé avec succès!")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message || "Erreur lors de la suppression")
        }
    }

    // Ouvrir le formulaire de modification de livre
    const selectBook = async (book) => {
        try {
            setBook({
                code: book.code || "",
                numero: book.numero || "",
                titre: book.titre || "",
                img: book.img || "",
                auteur: book.auteur || "",
                lieuEdition: book.lieuEdition || "",
                dateEdition: book.dateEdition ? book.dateEdition.split('T')[0] : "",
                origine: book.origine || "",
                quantite: book.quantite?.toString() || "1",
                dateEnregistrement: book.dateEnregistrement ? book.dateEnregistrement.split('T')[0] : new Date().toISOString().split('T')[0],
                status: book.status || "Disponible",
                categorie: book.categorie || "",
            });

            if (book.img) {
                setImagePreview(book.img);
                setImageUrl(book.img);
            }

            setEditingBook(book._id);
            setIsEditMode(true);
            setModal(true);

        } catch (error) {
            console.log(error);
            toast.error("Erreur lors du chargement du livre");
        }
    }

    const handleMode = () => {
        setModal(!modal);
        if (!modal) {
            resetForm();
        }
    }

    const handleClientMode = () => {
        setOpenClientDialog(!openClientDialog);
        if (!openClientDialog) {
            resetClientForm();
        }
    }

    // Détecter la taille de l'écran
    useEffect(() => {
        const handleDemand = async () => {
            try {
                const res = await AfficherDemande()
                if (res) {
                    setAllDemande(res)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleDemand()
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Gestion du changement d'image par fichier
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.match('image.*')) {
                toast.error('Veuillez sélectionner un fichier image valide');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                toast.error('L\'image ne doit pas dépasser 10MB');
                return;
            }

            setSelectedFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setBook(prev => ({ ...prev, img: reader.result }));
            };
            reader.readAsDataURL(file);

            setImageUrl('');
        }
    };

    // Gestion du changement d'image par URL
    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);

        if (url) {
            setSelectedFile(null);
            setImagePreview(url);
            setBook(prev => ({ ...prev, img: url }));
        }
    };

    // Gestion du changement des champs du formulaire livre
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'dateEnregistrement' || name === 'dateEdition') {
            setBook(prev => ({ ...prev, [name]: value }));
        } else {
            setBook(prev => ({ ...prev, [name]: value }));
        }
    }

    // Gestion du changement des champs du formulaire client
    const handleClientInputChange = (e) => {
        const { name, value } = e.target;
        setClient(prev => ({ ...prev, [name]: value }));
    }

    const handleOpen = () => {
        setOpenDialog(!openDialog);
        if (!openDialog) {
            resetForm();
        }
    }

    // Réinitialiser le formulaire livre
    const resetForm = () => {
        setBook({
            code: "",
            numero: "",
            titre: "",
            img: "",
            auteur: "",
            lieuEdition: "",
            dateEdition: "",
            origine: "",
            quantite: "1",
            dateEnregistrement: new Date().toISOString().split('T')[0],
            status: "Disponible",
            categorie: "",
            type:"Adulte"
        });
        setImagePreview(null);
        setImageUrl('');
        setSelectedFile(null);
        setIsEditMode(false);
        setEditingBook(null);
    }

    // Réinitialiser le formulaire client
    const resetClientForm = () => {
        setClient({
            date: "",
            nom: "",
            prenom: "",
            email: "",
            contact: "",
            visite: "bibliothèque",
            profession: ""
        })
    }

    // Fonction pour insérer ou modifier un livre
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const requiredFields = ['code', 'numero', 'titre', 'auteur', 'categorie', 'status'];
            const missingFields = requiredFields.filter(field => !book[field]);

            if (missingFields.length > 0) {
                toast.error(`Veuillez remplir les champs requis: ${missingFields.join(', ')}`);
                setIsLoading(false);
                return;
            }

            const bookData = {
                ...book,
                quantite: parseInt(book.quantite) || 1,
                img: book.img || 'https://via.placeholder.com/150x200?text=No+Image'
            };

            let res;

            if (isEditMode && editingBook) {
                res = await ModifierLivre(editingBook, bookData);
                if (res) {
                    toast.success('Livre modifié avec succès!');
                    setIsEditMode(false);
                    setEditingBook(null);
                }
            } else {
                res = await InsererLivre(bookData);
                if (res) {
                    toast.success('Livre ajouté avec succès!');
                }
            }

            if (res) {
                const updatedBooks = await ToutLivre();
                setAllBooks(updatedBooks);
                setOpenDialog(false);
                setModal(false);
                resetForm();
            }

        } catch (error) {
            console.error('Erreur:', error);
            toast.error(error.message || 'Erreur lors de l\'opération');
        } finally {
            setIsLoading(false);
        }
    };

    // Fonction pour insérer un client
    const handleClientSubmit = async (e) => {
        e.preventDefault();
        setIsClientLoading(true);

        try {
            // Validation des champs requis
            const requiredFields = ['date', 'nom', 'email', 'prenom', 'contact', 'visite', 'profession'];
            const missingFields = requiredFields.filter(field => !client[field]);

            if (missingFields.length > 0) {
                toast.error(`Veuillez remplir les champs requis: ${missingFields.join(', ')}`);
                setIsClientLoading(false);
                return;
            }

            // Préparer les données pour l'API
            const clientData = {
                nom: client.nom.trim(),
                prenom: client.prenom.trim(),
                email: client.email?.trim() || '',
                contact: client.contact.trim(),
                visite: client.visite,
                profession: client.profession.trim(),
                date: formatDate(client.date) // Date brute, pas de conversion
            };

            console.log('Données envoyées:', clientData); // Pour débogage

            const res = await InsererClient(clientData);

            if (res) {
                toast.success('Visiteur enregistré avec succès!');

                // Recharger les clients
                const updatedClients = await AfficherClient();
                // Filtrer uniquement les clients de la bibliothèque après insertion
                const bibliothequeClients = (updatedClients || []).filter(client =>
                    client.visite && client.visite.toLowerCase().includes('bibliothèque')
                )
                setAllClients(bibliothequeClients);

                // Fermer le modal
                setOpenClientDialog(false);

                // Réinitialiser le formulaire
                resetClientForm();
            }

        } catch (error) {
            console.error('Erreur détaillée:', error);
            toast.error(error.message || 'Erreur lors de l\'enregistrement du visiteur');
        } finally {
            setIsClientLoading(false);
        }
    };

    // Formater pour n'afficher que l'année
    const formatYear = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return 'N/A'
        return date.getFullYear()
    }

    // Filtrer les livres
    const filteredBooks = allBooks.filter(book => {
        const searchTermLower = searchTerm.toLowerCase();

        const matchesSearch =
            !searchTerm ||
            book.titre?.toLowerCase().includes(searchTermLower) ||
            book.auteur?.toLowerCase().includes(searchTermLower) ||
            String(book.code || '').toLowerCase().includes(searchTermLower) ||
            book.categorie?.toLowerCase().includes(searchTermLower);

        const matchesStatus =
            selectedStatus === "Tous" ||
            book.status === selectedStatus;

        const matchesFiltre =
            filtre === "Tous" ||
            book.categorie === filtre;

        return matchesSearch && matchesStatus && matchesFiltre;
    });

    // Filtrer les clients (recherche uniquement)
    const filteredClients = allClients.filter(client => {
        const searchTermLower = clientSearchTerm.toLowerCase();

        return !clientSearchTerm ||
            client.nom?.toLowerCase().includes(searchTermLower) ||
            client.prenom?.toLowerCase().includes(searchTermLower) ||
            client.email?.toLowerCase().includes(searchTermLower) ||
            client.contact?.toLowerCase().includes(searchTermLower) ||
            client.profession?.toLowerCase().includes(searchTermLower);
    });

    // Trier les livres
    const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (!sortConfig.key) return 0
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (sortConfig.key.includes('date')) {
            const aDate = new Date(aValue).getTime()
            const bDate = new Date(bValue).getTime()
            if (aDate < bDate) {
                return sortConfig.direction === 'asc' ? -1 : 1
            }
            if (aDate > bDate) {
                return sortConfig.direction === 'asc' ? 1 : -1
            }
            return 0
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortConfig.direction === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue)
        }

        if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
    })

    // Trier les clients
    const sortedClients = [...filteredClients].sort((a, b) => {
        if (!clientSortConfig.key) return 0
        const aValue = a[clientSortConfig.key]
        const bValue = b[clientSortConfig.key]

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return clientSortConfig.direction === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue)
        }

        if (aValue < bValue) {
            return clientSortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
            return clientSortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
    })

    // Pagination des livres
    const indexOfLastBook = currentPage * booksPerPage
    const indexOfFirstBook = indexOfLastBook - booksPerPage
    const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook)
    const totalBookPages = Math.ceil(sortedBooks.length / booksPerPage)

    // Pagination des clients
    const indexOfLastClient = clientCurrentPage * clientsPerPage
    const indexOfFirstClient = indexOfLastClient - clientsPerPage
    const currentClients = sortedClients.slice(indexOfFirstClient, indexOfLastClient)
    const totalClientPages = Math.ceil(sortedClients.length / clientsPerPage)

    const handleSort = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    const handleClientSort = (key) => {
        let direction = 'asc'
        if (clientSortConfig.key === key && clientSortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setClientSortConfig({ key, direction })
    }

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <MdOutlineSort className="text-gray-400 text-sm" />
        return sortConfig.direction === 'asc'
            ? <FaSortUp className="text-amber-500" />
            : <FaSortDown className="text-amber-500" />
    }

    const getClientSortIcon = (key) => {
        if (clientSortConfig.key !== key) return <MdOutlineSort className="text-gray-400 text-sm" />
        return clientSortConfig.direction === 'asc'
            ? <FaSortUp className="text-blue-500" />
            : <FaSortDown className="text-blue-500" />
    }

    // Statistiques
    const stats = {
        total: allBooks.length,
        available: allBooks.filter(b => b.status === 'Disponible' || b.status === 'disponible').length,
        borrowed: allBooks.filter(b => b.status === 'Emprunté' || b.status === 'emprunté').length,
        reserved: allBooks.filter(b => b.status === 'Réservé' || b.status === 'réservé').length,
        categories: [...new Set(allBooks.map(b => b.categorie))].length,
        clients: allClients.length
    }

    const statusColors = {
        'Disponible': 'bg-green-100 text-green-800 border border-green-200',
        'disponible': 'bg-green-100 text-green-800 border border-green-200',
        'Emprunté': 'bg-blue-100 text-blue-800 border border-blue-200',
        'emprunté': 'bg-blue-100 text-blue-800 border border-blue-200',
        'Réservé': 'bg-amber-100 text-amber-800 border border-amber-200',
        'réservé': 'bg-amber-100 text-amber-800 border border-amber-200',
        'Perdu': 'bg-red-100 text-red-800 border border-red-200',
        'En réparation': 'bg-purple-100 text-purple-800 border border-purple-200'
    }

    // Obtenir les catégories uniques
    const categories = ['Tous', ...new Set(allBooks.map(b => b.categorie).filter(Boolean))]

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBarDash />

            <div className="pt-20 px-2 sm:px-4 lg:px-6 xl:px-8 mt-10">
                {/* Formulaire de modification de livre */}
                {modal && (
                    <div className='pt-20 px-2 sm:px-4 lg:px-6 xl:px-8 fixed inset-0 h-screen backdrop-blur-xl flex items-center justify-center z-50'>
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
                            <div className="bg-white rounded-xl w-full max-w-full sm:max-w-4xl max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
                                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-amber-100 rounded-lg">
                                            <FaEdit className="text-lg sm:text-xl text-amber-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                                                {isEditMode ? 'Modifier un livre' : 'Ajouter un nouveau livre'}
                                            </h2>
                                            <p className="text-gray-600 text-xs sm:text-sm">
                                                {isEditMode ? 'Modifiez les informations du livre' : 'Remplissez les informations du livre'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleMode}
                                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <FaX className="text-lg" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Code <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="code"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                                placeholder="Ex: LIV-001"
                                                value={book.code}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Numéro <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="numero"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                                placeholder="Ex: 001"
                                                value={book.numero}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Titre <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="titre"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                                placeholder="Titre du livre"
                                                value={book.titre}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        {/* Section Image */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Image <span className="text-red-500">*</span>
                                            </label>

                                            <div className="flex flex-col gap-3 sm:gap-4">
                                                {/* Option 1 : Upload de fichier */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                        Télécharger une image :
                                                    </label>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="block w-full text-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-lg sm:file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                                                            onChange={handleFileUpload}
                                                        />
                                                    </div>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Formats supportés : JPG, PNG, GIF. Taille max : 10MB
                                                    </p>
                                                </div>

                                                {/* Séparateur OU */}
                                                <div className="relative">
                                                    <div className="absolute inset-0 flex items-center">
                                                        <div className="w-full border-t border-gray-300"></div>
                                                    </div>
                                                    <div className="relative flex justify-center text-sm">
                                                        <span className="px-2 bg-white text-gray-500 text-xs sm:text-sm">OU</span>
                                                    </div>
                                                </div>

                                                {/* Option 2 : URL */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                        Entrer une URL d'image :
                                                    </label>
                                                    <input
                                                        type="url"
                                                        name="img"
                                                        placeholder="https://exemple.com/image.jpg"
                                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                                        value={imageUrl}
                                                        onChange={handleImageUrlChange}
                                                    />
                                                </div>

                                                {/* Aperçu */}
                                                {(imagePreview || imageUrl) && (
                                                    <div className="mt-3 sm:mt-4">
                                                        <p className="text-sm font-medium text-gray-700 mb-1 sm:mb-2">Aperçu :</p>
                                                        <div className="relative inline-block">
                                                            <img
                                                                src={imagePreview || imageUrl}
                                                                alt="Aperçu"
                                                                className="h-32 sm:h-40 w-auto rounded-lg object-cover border border-gray-300"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    toast.error('Impossible de charger l\'image. Vérifiez l\'URL.');
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Auteur <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="auteur"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                                placeholder="Nom de l'auteur"
                                                value={book.auteur}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Catégorie <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="categorie"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base appearance-none"
                                                value={book.categorie}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Sélectionner une catégorie</option>
                                                {categories.filter(cat => cat !== 'Tous').map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Lieu d'édition
                                            </label>
                                            <input
                                                type="text"
                                                name="lieuEdition"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                                placeholder="Ville, Pays"
                                                value={book.lieuEdition}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Date d'édition
                                            </label>
                                            <input
                                                type="date"
                                                name="dateEdition"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                                value={book.dateEdition}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Origine
                                            </label>
                                            <input
                                                type="text"
                                                name="origine"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                                placeholder="Source du livre"
                                                value={book.origine}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Quantité <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="quantite"
                                                min="1"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                                value={book.quantite}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Date d'enregistrement <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="dateEnregistrement"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                                value={book.dateEnregistrement}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Statut <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="status"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base appearance-none"
                                                value={book.status}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="Disponible">Disponible</option>
                                                <option value="Emprunté">Emprunté</option>
                                                <option value="Réservé">Réservé</option>
                                                <option value="En réparation">En réparation</option>
                                                <option value="Perdu">Perdu</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sticky bottom-0 bg-white pt-4 sm:pt-6 border-t border-gray-200">
                                        <div className="flex flex-col sm:flex-row justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={handleMode}
                                                className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base order-2 sm:order-1"
                                                disabled={isLoading}
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <FaSpinner className="animate-spin" />
                                                        En cours...
                                                    </>
                                                ) : (
                                                    <>
                                                        <IoMdAdd />
                                                        {isEditMode ? 'Modifier le livre' : 'Enregistrer le livre'}
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Fin Formulaire de modification  */}

                {/* Supprimer un livre */}
                {deleted && (
                    <div className='pt-20 px-2 sm:px-4 lg:px-6 xl:px-8 fixed inset-0 h-screen backdrop-blur-xl flex items-center justify-center z-50'>
                        <div className='w-full max-w-md px-4 py-8 bg-white rounded-xl z-50 border-t-4 border-t-red-500 shadow-xl'>
                            <div className='flex justify-center w-full mb-6'>
                                <FaTrash className='text-4xl text-red-500' />
                            </div>
                            <h2 className='text-2xl font-bold text-center text-gray-800 mb-2'>Confirmer la suppression</h2>
                            <p className='text-gray-600 text-center mb-6'>
                                Êtes-vous sûr de vouloir supprimer ce livre ? Cette action est irréversible.
                            </p>
                            <div className='w-full flex items-center justify-center gap-4 px-2'>
                                <button
                                    onClick={CloseDelete}
                                    className='px-6 py-3 bg-gray-200 text-gray-800 duration-100 hover:bg-gray-300 rounded-lg cursor-pointer font-medium'
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className='px-6 py-3 bg-red-500 text-white duration-100 hover:bg-red-600 rounded-lg cursor-pointer font-medium'
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto">
                    {/* En-tête */}
                    <div className="mb-6 sm:mb-8 px-2">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <HiOutlineCollection className="text-xl sm:text-2xl text-amber-600" />
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                                Espace <span className="text-amber-500">Bibliothèque</span>
                            </h1>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Gérez votre collection de livres, les visiteurs de la bibliothèque et traitez les demandes des lecteurs
                        </p>
                    </div>

                    {/* Cartes de statistiques - Version responsive */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 px-2">
                        {/* Carte Livres Total */}
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Livres Total</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.total}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <FaRegChartBar className="text-green-500 text-xs" />
                                        <span className="text-xs text-green-600 font-medium">+12 ce mois</span>
                                    </div>
                                </div>
                                <div className="p-2 sm:p-3 bg-amber-50 rounded-xl">
                                    <MdOutlineLibraryBooks className="text-xl sm:text-2xl text-amber-500" />
                                </div>
                            </div>
                        </div>

                        {/* Carte Disponible */}
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Disponible</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.available}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <FaCheckCircle className="text-green-500 text-xs" />
                                        <span className="text-xs text-green-600 font-medium">Prêts à emprunter</span>
                                    </div>
                                </div>
                                <div className="p-2 sm:p-3 bg-green-50 rounded-xl">
                                    <FaCheckCircle className="text-xl sm:text-2xl text-green-500" />
                                </div>
                            </div>
                        </div>

                        {/* Carte Empruntés */}
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Empruntés</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.borrowed}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <FaRegClock className="text-blue-500 text-xs" />
                                        <span className="text-xs text-blue-600 font-medium">En cours</span>
                                    </div>
                                </div>
                                <div className="p-2 sm:p-3 bg-blue-50 rounded-xl">
                                    <FaRegClock className="text-xl sm:text-2xl text-blue-500" />
                                </div>
                            </div>
                        </div>

                        {/* Carte Catégories */}
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Catégories</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.categories}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <FaTag className="text-purple-500 text-xs" />
                                        <span className="text-xs text-gray-600">Variétés de genres</span>
                                    </div>
                                </div>
                                <div className="p-2 sm:p-3 bg-purple-50 rounded-xl">
                                    <FaTag className="text-xl sm:text-2xl text-purple-500" />
                                </div>
                            </div>
                        </div>

                        {/* Carte Visiteurs Bibliothèque */}
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Visiteurs Bibliothèque</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.clients}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <FaUsers className="text-indigo-500 text-xs" />
                                        <span className="text-xs text-indigo-600 font-medium">Visiteurs enregistrés</span>
                                    </div>
                                </div>
                                <div className="p-2 sm:p-3 bg-indigo-50 rounded-xl">
                                    <MdOutlineGroups className="text-xl sm:text-2xl text-indigo-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Clients Bibliothèque */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 sm:mb-8 overflow-hidden mx-2 sm:mx-0">
                        {/* En-tête de la table Clients */}
                        <div className="p-4 sm:p-6 border-b border-gray-200">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <MdOutlineGroups className="text-indigo-500" />
                                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Visiteurs de la bibliothèque</h2>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        {filteredClients.length} visiteur{filteredClients.length !== 1 ? 's' : ''} de bibliothèque trouvé{filteredClients.length !== 1 ? 's' : ''}
                                        {clientSearchTerm && ` pour "${clientSearchTerm}"`}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    {/* Barre de recherche Clients */}
                                    <div className="relative flex-1">
                                        <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
                                        <input
                                            type="search"
                                            placeholder="Rechercher un visiteur..."
                                            className="pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full"
                                            value={clientSearchTerm}
                                            onChange={(e) => {
                                                setClientSearchTerm(e.target.value)
                                                setClientCurrentPage(1)
                                            }}
                                        />
                                        {clientSearchTerm && (
                                            <button
                                                onClick={() => setClientSearchTerm("")}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                <FaTimesCircle />
                                            </button>
                                        )}
                                    </div>

                                    {/* Bouton Ajouter Client */}
                                    <button
                                        onClick={handleClientMode}
                                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex-1 sm:flex-none min-w-[120px]"
                                    >
                                        <MdOutlinePersonAdd />
                                        <span className="text-sm sm:text-base">Nouveau Visiteur</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tableau Clients - Version responsive */}
                        {filteredClients.length === 0 ? (
                            <div className="p-8 sm:p-12 text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 mb-4">
                                    <MdOutlineGroups className="text-xl sm:text-2xl text-gray-400" />
                                </div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                                    Aucun visiteur de bibliothèque trouvé
                                </h3>
                                <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
                                    {clientSearchTerm
                                        ? 'Aucun résultat pour les critères sélectionnés.'
                                        : 'Aucun visiteur de bibliothèque enregistré.'}
                                </p>
                                {clientSearchTerm && (
                                    <button
                                        onClick={() => {
                                            setClientSearchTerm("")
                                        }}
                                        className="mt-4 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700"
                                    >
                                        Réinitialiser la recherche
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto -mx-2 sm:mx-0">
                                    <table className="w-full min-w-[800px] sm:min-w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">
                                                    <button
                                                        onClick={() => handleClientSort('numero')}
                                                        className="flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        N° {getClientSortIcon('numero')}
                                                    </button>
                                                </th>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">
                                                    <button
                                                        onClick={() => handleClientSort('nom')}
                                                        className="flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        Nom & Prénom {getClientSortIcon('nom')}
                                                    </button>
                                                </th>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">
                                                    <button
                                                        onClick={() => handleClientSort('contact')}
                                                        className="flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        Contact {getClientSortIcon('contact')}
                                                    </button>
                                                </th>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">Email</th>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">Date de visite</th>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">Profession</th>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">Type de visite</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {currentClients.map((client, index) => (
                                                <tr
                                                    key={client._id || index}
                                                    className="hover:bg-gray-50 transition-colors duration-150"
                                                >
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-2 bg-gray-100 rounded-lg hidden xs:block">
                                                                <FaUserTie className="text-gray-600 text-xs sm:text-sm" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900 text-sm sm:text-base">#{client.numero}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                                                            {client.nom} {client.prenom}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <div className="flex items-center gap-2">
                                                            <FaPhone className="text-gray-400 text-xs sm:text-sm" />
                                                            <span className="font-medium text-gray-900 text-sm sm:text-base">{client.contact}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <span className="text-gray-900 text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
                                                            {client.email || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <FaRegCalendarAlt className="text-gray-400 hidden sm:block" />
                                                            {client.date || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                            <FaUserTie className="text-xs" />
                                                            {client.profession}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                            <FaUserCheck className="text-xs" />
                                                            {client.visite}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Clients - Version responsive */}
                                {totalClientPages > 1 && (
                                    <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="text-xs sm:text-sm text-gray-700">
                                            Affichage de {indexOfFirstClient + 1} à {Math.min(indexOfLastClient, filteredClients.length)} sur {filteredClients.length} visiteur{filteredClients.length !== 1 ? 's' : ''}
                                        </div>
                                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                                            <button
                                                onClick={() => setClientCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={clientCurrentPage === 1}
                                                className="p-1.5 sm:p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                <FaArrowLeft className="text-sm" />
                                            </button>

                                            <div className="flex gap-1">
                                                {[...Array(totalClientPages)].map((_, i) => {
                                                    const page = i + 1
                                                    if (isMobile && page !== clientCurrentPage &&
                                                        page !== 1 && page !== totalClientPages &&
                                                        page !== clientCurrentPage - 1 && page !== clientCurrentPage + 1) {
                                                        return null;
                                                    }

                                                    if (
                                                        page === 1 ||
                                                        page === totalClientPages ||
                                                        (page >= clientCurrentPage - 1 && page <= clientCurrentPage + 1)
                                                    ) {
                                                        return (
                                                            <button
                                                                key={i}
                                                                onClick={() => setClientCurrentPage(page)}
                                                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-sm ${clientCurrentPage === page
                                                                        ? 'bg-indigo-500 text-white'
                                                                        : 'border border-gray-300 hover:bg-gray-50'}`}
                                                            >
                                                                {page}
                                                            </button>
                                                        )
                                                    } else if (
                                                        (page === clientCurrentPage - 2 && clientCurrentPage > 3) ||
                                                        (page === clientCurrentPage + 2 && clientCurrentPage < totalClientPages - 2)
                                                    ) {
                                                        return <span key={i} className="px-2 hidden sm:inline">...</span>
                                                    }
                                                    return null
                                                })}
                                            </div>

                                            <button
                                                onClick={() => setClientCurrentPage(prev => Math.min(prev + 1, totalClientPages))}
                                                disabled={clientCurrentPage === totalClientPages}
                                                className="p-1.5 sm:p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                <FaArrowRight className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Section Livres */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 sm:mb-8 overflow-hidden mx-2 sm:mx-0">
                        {/* En-tête de la table */}
                        <div className="p-4 sm:p-6 border-b border-gray-200">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <HiOutlineBookOpen className="text-amber-500" />
                                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Livres de la bibliothèque</h2>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        {filteredBooks.length} livre{filteredBooks.length !== 1 ? 's' : ''} trouvé{filteredBooks.length !== 1 ? 's' : ''}
                                        {searchTerm && ` pour "${searchTerm}"`}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    {/* Barre de recherche */}
                                    <div className="relative flex-1">
                                        <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
                                        <input
                                            type="search"
                                            placeholder="Rechercher un livre..."
                                            className="pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none w-full"
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value)
                                                setCurrentPage(1)
                                            }}
                                        />
                                        {searchTerm && (
                                            <button
                                                onClick={() => setSearchTerm("")}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                <FaTimesCircle />
                                            </button>
                                        )}
                                    </div>

                                    {/* Filtres - Version responsive */}
                                    <div className="flex flex-wrap gap-2">
                                        <div className="relative flex-1 sm:flex-none">
                                            <IoMdFunnel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm" />
                                            <select
                                                className="pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none appearance-none bg-white w-full sm:w-auto"
                                                value={selectedStatus}
                                                onChange={(e) => {
                                                    setSelectedStatus(e.target.value)
                                                    setCurrentPage(1)
                                                }}
                                            >
                                                <option value="Tous">Tous les statuts</option>
                                                <option value="Disponible">Disponible</option>
                                                <option value="Emprunté">Emprunté</option>
                                                <option value="Réservé">Réservé</option>
                                            </select>
                                        </div>

                                        <div className="relative flex-1 sm:flex-none">
                                            <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                                            <select
                                                className="pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none appearance-none bg-white w-full sm:w-auto"
                                                value={filtre}
                                                onChange={(e) => {
                                                    setFiltre(e.target.value)
                                                    setCurrentPage(1)
                                                }}
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{isMobile && cat.length > 15 ? `${cat.substring(0, 12)}...` : cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <button
                                            onClick={handleOpen}
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex-1 sm:flex-none min-w-[120px]"
                                        >
                                            <IoMdAdd />
                                            <span className="text-sm sm:text-base">Ajouter</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tableau - Version responsive */}
                        {filteredBooks.length === 0 ? (
                            <div className="p-8 sm:p-12 text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 mb-4">
                                    <FaBook className="text-xl sm:text-2xl text-gray-400" />
                                </div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                                    Aucun livre trouvé
                                </h3>
                                <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
                                    {searchTerm || selectedStatus !== "Tous" || filtre !== "Tous"
                                        ? 'Aucun résultat pour les critères sélectionnés.'
                                        : 'La bibliothèque est vide.'}
                                </p>
                                {(searchTerm || selectedStatus !== "Tous" || filtre !== "Tous") && (
                                    <button
                                        onClick={() => {
                                            setSearchTerm("")
                                            setSelectedStatus("Tous")
                                            setFiltre("Tous")
                                        }}
                                        className="mt-4 px-4 py-2 text-sm text-amber-600 hover:text-amber-700"
                                    >
                                        Réinitialiser les filtres
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto -mx-2 sm:mx-0">
                                    <table className="w-full min-w-[800px] sm:min-w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">
                                                    <button
                                                        onClick={() => handleSort('code')}
                                                        className="flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        Code {getSortIcon('code')}
                                                    </button>
                                                </th>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">
                                                    <button
                                                        onClick={() => handleSort('titre')}
                                                        className="flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        Titre {getSortIcon('titre')}
                                                    </button>
                                                </th>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">
                                                    <button
                                                        onClick={() => handleSort('auteur')}
                                                        className="flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        Auteur {getSortIcon('auteur')}
                                                    </button>
                                                </th>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">Catégorie</th>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">Quantité</th>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">Année</th>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">Statut</th>
                                                <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {currentBooks.map((book, index) => (
                                                <tr
                                                    key={book.code || index}
                                                    className="hover:bg-gray-50 transition-colors duration-150"
                                                >
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-2 bg-gray-100 rounded-lg hidden xs:block">
                                                                <FaBook className="text-gray-600 text-xs sm:text-sm" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900 text-sm sm:text-base">{book.code}</div>
                                                                <div className="text-xs text-gray-500">#{book.numero}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <div className="font-medium text-gray-900 text-sm sm:text-base">{book.titre}</div>
                                                        <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[150px] sm:max-w-none">{book.lieuEdition}</div>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <div className="flex items-center gap-2">
                                                            <FaRegUser className="text-gray-400 text-xs sm:text-sm hidden sm:block" />
                                                            <span className="font-medium text-gray-900 text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">{book.auteur}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                            <FaTag className="text-xs hidden sm:block" />
                                                            {isMobile && book.categorie && book.categorie.length > 12
                                                                ? `${book.categorie.substring(0, 10)}...`
                                                                : book.categorie || 'Non catégorisé'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
                                                            {book.quantite}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <FaRegCalendarAlt className="text-gray-400 hidden sm:block" />
                                                            {formatYear(book.dateEdition)}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <span className={`inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${statusColors[book.status] || 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                                                            {book.status === 'Disponible' ? <FaRegCheckCircle className="text-xs" /> : <FaRegClock className="text-xs" />}
                                                            {isMobile && book.status && book.status.length > 10
                                                                ? `${book.status.substring(0, 8)}...`
                                                                : book.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                title="Voir les détails"
                                                            >
                                                                <FaEye className="text-sm sm:text-base" />
                                                            </button>
                                                            <button
                                                                className="p-1.5 sm:p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                                onClick={() => selectBook(book)}
                                                                title="Modifier"
                                                            >
                                                                <FaEdit className="text-sm sm:text-base" />
                                                            </button>
                                                            <button
                                                                className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Supprimer"
                                                                onClick={() => OpenDelete(book._id)}
                                                            >
                                                                <FaTrash className="text-sm sm:text-base" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination - Version responsive */}
                                {totalBookPages > 1 && (
                                    <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="text-xs sm:text-sm text-gray-700">
                                            Affichage de {indexOfFirstBook + 1} à {Math.min(indexOfLastBook, filteredBooks.length)} sur {filteredBooks.length} livre{filteredBooks.length !== 1 ? 's' : ''}
                                        </div>
                                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="p-1.5 sm:p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                <FaArrowLeft className="text-sm" />
                                            </button>

                                            <div className="flex gap-1">
                                                {[...Array(totalBookPages)].map((_, i) => {
                                                    const page = i + 1
                                                    if (isMobile && page !== currentPage &&
                                                        page !== 1 && page !== totalBookPages &&
                                                        page !== currentPage - 1 && page !== currentPage + 1) {
                                                        return null;
                                                    }

                                                    if (
                                                        page === 1 ||
                                                        page === totalBookPages ||
                                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                                    ) {
                                                        return (
                                                            <button
                                                                key={i}
                                                                onClick={() => setCurrentPage(page)}
                                                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-sm ${currentPage === page
                                                                        ? 'bg-amber-500 text-white'
                                                                        : 'border border-gray-300 hover:bg-gray-50'}`}
                                                            >
                                                                {page}
                                                            </button>
                                                        )
                                                    } else if (
                                                        (page === currentPage - 2 && currentPage > 3) ||
                                                        (page === currentPage + 2 && currentPage < totalBookPages - 2)
                                                    ) {
                                                        return <span key={i} className="px-2 hidden sm:inline">...</span>
                                                    }
                                                    return null
                                                })}
                                            </div>

                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalBookPages))}
                                                disabled={currentPage === totalBookPages}
                                                className="p-1.5 sm:p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                <FaArrowRight className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Section Demandes */}
                    <div className="bg-white rounded-xl shadow-sm border mb-12 sm:mb-20 border-gray-200 overflow-hidden mx-2 sm:mx-0">
                        <div className="p-4 sm:p-6 border-b border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <MdOutlinePendingActions className="text-lg sm:text-xl text-orange-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Demandes des lecteurs</h2>
                                        <p className="text-gray-600 text-xs sm:text-sm mt-1">
                                            {allDemand.length} demande{allDemand.length !== 1 ? 's' : ''} en attente
                                        </p>
                                    </div>
                                </div>
                                <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto">
                                    <FaDownload className="text-sm" />
                                    Exporter
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto -mx-2 sm:mx-0">
                            <table className="w-full min-w-[600px] sm:min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">Nom</th>
                                        <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">Email</th>
                                        <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">Livre demandé</th>
                                        <th className="text-left py-3 px-3 sm:px-4 lg:px-6 font-semibold text-gray-700 text-xs sm:text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {allDemand.map((demand) => (
                                        <tr key={demand.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                <div className="flex items-center gap-2">
                                                    <IoMdPerson className="text-gray-400 hidden sm:block" />
                                                    <span className="font-medium text-gray-900 text-sm sm:text-base truncate max-w-[100px] sm:max-w-none">{demand.nom}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                <div className="flex items-center gap-2">
                                                    <FaRegEnvelope className="text-gray-400 text-xs sm:text-sm hidden sm:block" />
                                                    <span className="text-gray-900 text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">{demand.email}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                <div className="flex items-center gap-2">
                                                    <FaBook className="text-gray-400 text-xs sm:text-sm hidden sm:block" />
                                                    <span className="font-medium text-gray-900 text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">{demand.titre}</span>
                                                </div>
                                                <div className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xs truncate">
                                                    {demand.message}
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 sm:px-4 lg:px-6">
                                                <div className="text-xs sm:text-sm text-gray-500 text-center mt-1 max-w-xs truncate">
                                                    <FaTrash className='text-xl text-red-500 duration-100 hover:text-red-600 cursor-pointer' />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {allDemand.length === 0 && (
                            <div className="p-6 sm:p-8 text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 mb-4">
                                    <FaRegEnvelope className="text-xl sm:text-2xl text-gray-400" />
                                </div>
                                <p className="text-gray-500 text-sm sm:text-base">Aucune demande en attente</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal d'ajout de livre */}
            {openDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="bg-white rounded-xl w-full max-w-full sm:max-w-4xl max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <IoMdAdd className="text-lg sm:text-xl text-amber-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Ajouter un nouveau livre</h2>
                                    <p className="text-gray-600 text-xs sm:text-sm">Remplissez les informations du livre</p>
                                </div>
                            </div>
                            <button
                                onClick={handleOpen}
                                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <FaX className="text-lg" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="code"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                        placeholder="Ex: LIV-001"
                                        value={book.code}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Numéro <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="numero"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                        placeholder="Ex: 001"
                                        value={book.numero}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Titre <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="titre"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                        placeholder="Titre du livre"
                                        value={book.titre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Section Image */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Image <span className="text-red-500">*</span>
                                    </label>

                                    <div className="flex flex-col gap-3 sm:gap-4">
                                        {/* Option 1 : Upload de fichier */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Télécharger une image :
                                            </label>
                                            <div className="flex items-center">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="block w-full text-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-lg sm:file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                                                    onChange={handleFileUpload}
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Formats supportés : JPG, PNG, GIF. Taille max : 10MB
                                            </p>
                                        </div>

                                        {/* Séparateur OU */}
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500 text-xs sm:text-sm">OU</span>
                                            </div>
                                        </div>

                                        {/* Option 2 : URL */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                                Entrer une URL d'image :
                                            </label>
                                            <input
                                                type="url"
                                                name="img"
                                                placeholder="https://exemple.com/image.jpg"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                                value={imageUrl}
                                                onChange={handleImageUrlChange}
                                            />
                                        </div>

                                        {/* Aperçu */}
                                        {(imagePreview || imageUrl) && (
                                            <div className="mt-3 sm:mt-4">
                                                <p className="text-sm font-medium text-gray-700 mb-1 sm:mb-2">Aperçu :</p>
                                                <div className="relative inline-block">
                                                    <img
                                                        src={imagePreview || imageUrl}
                                                        alt="Aperçu"
                                                        className="h-32 sm:h-40 w-auto rounded-lg object-cover border border-gray-300"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            toast.error('Impossible de charger l\'image. Vérifiez l\'URL.');
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Auteur <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="auteur"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                        placeholder="Nom de l'auteur"
                                        value={book.auteur}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Catégorie <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="categorie"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base appearance-none"
                                        value={book.categorie}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Sélectionner une catégorie</option>
                                        {categories.filter(cat => cat !== 'Tous').map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Lieu d'édition
                                    </label>
                                    <input
                                        type="text"
                                        name="lieuEdition"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                        placeholder="Ville, Pays"
                                        value={book.lieuEdition}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Date d'édition
                                    </label>
                                    <input
                                        type="date"
                                        name="dateEdition"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                        value={book.dateEdition}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Origine
                                    </label>
                                    <input
                                        type="text"
                                        name="origine"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                        placeholder="Source du livre"
                                        value={book.origine}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Quantité <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="quantite"
                                        min="1"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                        value={book.quantite}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Date d'enregistrement <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="dateEnregistrement"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base"
                                        value={book.dateEnregistrement}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Statut <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="status"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm sm:text-base appearance-none"
                                        value={book.status}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="Disponible">Disponible</option>
                                        <option value="Emprunté">Emprunté</option>
                                        <option value="Réservé">Réservé</option>
                                        <option value="En réparation">En réparation</option>
                                        <option value="Perdu">Perdu</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sticky bottom-0 bg-white pt-4 sm:pt-6 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={handleOpen}
                                        className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base order-2 sm:order-1"
                                        disabled={isLoading}
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                En cours...
                                            </>
                                        ) : (
                                            <>
                                                <IoMdAdd />
                                                Enregistrer le livre
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal d'ajout de client */}
            {openClientDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="bg-white rounded-xl w-full max-w-full sm:max-w-4xl max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <MdOutlinePersonAdd className="text-lg sm:text-xl text-indigo-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Nouveau Visiteur</h2>
                                    <p className="text-gray-600 text-xs sm:text-sm">Enregistrer un nouveau visiteur de la bibliothèque</p>
                                </div>
                            </div>
                            <button
                                onClick={handleClientMode}
                                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <FaX className="text-lg" />
                            </button>
                        </div>

                        <form onSubmit={handleClientSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Date de visite <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm sm:text-base"
                                        value={date}
                                        onChange={handleClientInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Nom <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nom"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm sm:text-base"
                                        placeholder="Nom de famille"
                                        value={client.nom}
                                        onChange={handleClientInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Prénom <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm sm:text-base"
                                        placeholder="Prénom"
                                        value={client.prenom}
                                        onChange={handleClientInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm sm:text-base"
                                        placeholder="email@exemple.com"
                                        value={client.email}
                                        onChange={handleClientInputChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Contact <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="contact"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm sm:text-base"
                                        placeholder="+33 1 23 45 67 89"
                                        value={client.contact}
                                        onChange={handleClientInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Type de visite <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="visite"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm sm:text-base appearance-none"
                                        value={client.visite}
                                        onChange={handleClientInputChange}
                                        required
                                    >
                                        <option value="bibliothèque">Bibliothèque</option>
                                        <option value="autre">Autre</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Profession <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="profession"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm sm:text-base"
                                        placeholder="Profession du visiteur"
                                        value={client.profession}
                                        onChange={handleClientInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sticky bottom-0 bg-white pt-4 sm:pt-6 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={handleClientMode}
                                        className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base order-2 sm:order-1"
                                        disabled={isClientLoading}
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2"
                                        disabled={isClientLoading}
                                    >
                                        {isClientLoading ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                En cours...
                                            </>
                                        ) : (
                                            <>
                                                <MdOutlinePersonAdd />
                                                Enregistrer le visiteur
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Bibliotheque;