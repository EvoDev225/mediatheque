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
  FaSpinner
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
  MdOutlineCollectionsBookmark
} from "react-icons/md"
import { 
  IoMdAdd,
  IoMdSearch,
  IoMdFunnel,
  IoMdStats,
  IoMdBook,
  IoMdPerson
} from "react-icons/io"
import { 
  HiOutlineCollection,
  HiOutlineBookOpen,
  HiOutlineUserGroup
} from "react-icons/hi"
import NavBarDash from './NavBarDash'
import { useEffect, useState } from 'react'
import { InsererLivre, ToutLivre } from '../../Fonctions/Livre/Flivre'
import toast from 'react-hot-toast'

const Bibliotheque = () => {
    const [filtre, setFiltre] = useState("Tous")
    const [allBooks, setAllBooks] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
    const [currentPage, setCurrentPage] = useState(1)
    const [booksPerPage] = useState(10)
    const [selectedStatus, setSelectedStatus] = useState("Tous")
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
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
        dateEnregistrement: new Date().toISOString().split('T')[0], // Date du jour par défaut
        status: "Disponible",
        categorie: "",
    })

    // Gestion du changement d'image par fichier
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Vérifier le type de fichier
            if (!file.type.match('image.*')) {
                toast.error('Veuillez sélectionner un fichier image valide');
                return;
            }

            // Vérifier la taille (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                toast.error('L\'image ne doit pas dépasser 10MB');
                return;
            }

            setSelectedFile(file);
            
            // Créer un aperçu
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                // Stocker l'image en base64 dans l'état du livre
                setBook(prev => ({ ...prev, img: reader.result }));
            };
            reader.readAsDataURL(file);
            
            // Réinitialiser l'URL si un fichier est sélectionné
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

    // Gestion du changement des champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Si c'est la date d'enregistrement, formater pour la base de données
        if (name === 'dateEnregistrement' || name === 'dateEdition') {
            // Convertir au format YYYY-MM-DD si nécessaire
            setBook(prev => ({ ...prev, [name]: value }));
        } else {
            setBook(prev => ({ ...prev, [name]: value }));
        }
    }

    const handleOpen = () => {
        setOpenDialog(!openDialog)
        // Réinitialiser le formulaire quand on ouvre/ferme
        if (!openDialog) {
            resetForm();
        }
    }

    // Réinitialiser le formulaire
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
        });
        setImagePreview(null);
        setImageUrl('');
        setSelectedFile(null);
    }

    // Charger les livres
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await ToutLivre()
                setAllBooks(res)
            } catch (error) {
                toast.error("Erreur lors de la récupération des livres.")
                console.error(error)
            }
        }
        fetchBooks()
    }, [])

    // Formater la date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return 'Date invalide'
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

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

    // Trier les livres
    const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (!sortConfig.key) return 0

        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        // Gestion spéciale pour les dates
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

        // Trier les chaînes de caractères
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortConfig.direction === 'asc' 
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue)
        }

        // Trier les nombres
        if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
    })

    // Pagination
    const indexOfLastBook = currentPage * booksPerPage
    const indexOfFirstBook = indexOfLastBook - booksPerPage
    const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook)
    const totalPages = Math.ceil(sortedBooks.length / booksPerPage)

    const handleSort = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <MdOutlineSort className="text-gray-400 text-sm" />
        return sortConfig.direction === 'asc' 
            ? <FaSortUp className="text-amber-500" />
            : <FaSortDown className="text-amber-500" />
    }

    // Statistiques
    const stats = {
        total: allBooks.length,
        available: allBooks.filter(b => b.status === 'Disponible' || b.status === 'disponible').length,
        borrowed: allBooks.filter(b => b.status === 'Emprunté' || b.status === 'emprunté').length,
        reserved: allBooks.filter(b => b.status === 'Réservé' || b.status === 'réservé').length,
        categories: [...new Set(allBooks.map(b => b.categorie))].length
    }

    // Démandes simulées
    const demands = [
        { id: 1, nom: "Jean Dupont", email: "jean@exemple.com", titre: "Le Petit Prince", message: "Très intéressé par ce livre", date: "2024-01-15" },
        { id: 2, nom: "Marie Curie", email: "marie@exemple.com", titre: "La Physique Quantique", message: "Pour mes recherches universitaires", date: "2024-01-14" },
        { id: 3, nom: "Pierre Martin", email: "pierre@exemple.com", titre: "L'Art de la Guerre", message: "Recommandé par un ami", date: "2024-01-13" },
    ]

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

    // Fonction pour insérer un livre
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validation des champs requis
            const requiredFields = ['code', 'numero', 'titre', 'auteur', 'categorie', 'status'];
            const missingFields = requiredFields.filter(field => !book[field]);
            
            if (missingFields.length > 0) {
                toast.error(`Veuillez remplir les champs requis: ${missingFields.join(', ')}`);
                setIsLoading(false);
                return;
            }

            // Préparer les données pour l'insertion
            const bookData = {
                ...book,
                // S'assurer que la quantité est un nombre
                quantite: parseInt(book.quantite) || 1,
                // Si pas d'image, utiliser une image par défaut
                img: book.img || 'https://via.placeholder.com/150x200?text=No+Image'
            };

            console.log('Données à envoyer:', bookData);

            // Appeler la fonction d'insertion
            const res = await InsererLivre(bookData);
            
            if (res) {
                toast.success('Livre ajouté avec succès!');
                
                // Recharger la liste des livres
                const updatedBooks = await ToutLivre();
                setAllBooks(updatedBooks);
                
                // Fermer le modal et réinitialiser le formulaire
                setOpenDialog(false);
                resetForm();
            } else {
                toast.error('Erreur lors de l\'insertion du livre');
            }
        } catch (error) {
            console.error('Erreur:', error);
            toast.error(error.message || 'Erreur lors de l\'insertion du livre');
        } finally {
            setIsLoading(false);
        }
    };
    console.log(book)
    return (
        <div className="min-h-screen bg-gray-50">
            <NavBarDash />
            
            <div className="pt-20 mt-20 px-4 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* En-tête */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <HiOutlineCollection className="text-2xl text-amber-600" />
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
                                Espace <span className="text-amber-500">Bibliothèque</span>
                            </h1>
                        </div>
                        <p className="text-gray-600">
                            Gérez votre collection de livres, suivez les emprunts et traitez les demandes des lecteurs
                        </p>
                    </div>

                    {/* Cartes de statistiques */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Carte Livres Total */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium mb-1">Livres Total</p>
                                    <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <FaRegChartBar className="text-green-500 text-xs" />
                                        <span className="text-xs text-green-600 font-medium">+12 ce mois</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-amber-50 rounded-xl">
                                    <MdOutlineLibraryBooks className="text-2xl text-amber-500" />
                                </div>
                            </div>
                        </div>
                        {/* Carte Catégories */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium mb-1">Catégories</p>
                                    <p className="text-3xl font-bold text-gray-800">{stats.categories}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <FaTag className="text-purple-500 text-xs" />
                                        <span className="text-xs text-gray-600">Variétés de genres</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-xl">
                                    <FaTag className="text-2xl text-purple-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Livres */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
                        {/* En-tête de la table */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <HiOutlineBookOpen className="text-amber-500" />
                                        <h2 className="text-xl font-bold text-gray-800">Livres de la bibliothèque</h2>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        {filteredBooks.length} livre{filteredBooks.length !== 1 ? 's' : ''} trouvé{filteredBooks.length !== 1 ? 's' : ''}
                                        {searchTerm && ` pour "${searchTerm}"`}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    {/* Barre de recherche */}
                                    <div className="relative">
                                        <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                                        <input
                                            type="search"
                                            placeholder="Rechercher un livre..."
                                            className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none w-full sm:w-64"
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

                                    {/* Filtres */}
                                    <div className="flex gap-2">
                                        <div className="relative">
                                            <IoMdFunnel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                            <select
                                                className="pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none appearance-none bg-white"
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

                                        <div className="relative">
                                            <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                                            <select
                                                className="pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none appearance-none bg-white"
                                                value={filtre}
                                                onChange={(e) => {
                                                    setFiltre(e.target.value)
                                                    setCurrentPage(1)
                                                }}
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <button
                                            onClick={handleOpen}
                                            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                                        >
                                            <IoMdAdd />
                                            <span className="hidden sm:inline">Ajouter</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tableau */}
                        {filteredBooks.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <FaBook className="text-2xl text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Aucun livre trouvé
                                </h3>
                                <p className="text-gray-500 max-w-md mx-auto">
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
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">
                                                    <button 
                                                        onClick={() => handleSort('code')} 
                                                        className="flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        Code {getSortIcon('code')}
                                                    </button>
                                                </th>
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">
                                                    <button 
                                                        onClick={() => handleSort('titre')} 
                                                        className="flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        Titre {getSortIcon('titre')}
                                                    </button>
                                                </th>
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">
                                                    <button 
                                                        onClick={() => handleSort('auteur')} 
                                                        className="flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        Auteur {getSortIcon('auteur')}
                                                    </button>
                                                </th>
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Catégorie</th>
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Année</th>
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Statut</th>
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {currentBooks.map((book, index) => (
                                                <tr 
                                                    key={book.code || index} 
                                                    className="hover:bg-gray-50 transition-colors duration-150"
                                                >
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-2 bg-gray-100 rounded-lg">
                                                                <FaBook className="text-gray-600 text-sm" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900">{book.code}</div>
                                                                <div className="text-xs text-gray-500">#{book.numero}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="font-medium text-gray-900">{book.titre}</div>
                                                        <div className="text-sm text-gray-500">{book.lieuEdition}</div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-2">
                                                            <FaRegUser className="text-gray-400 text-sm" />
                                                            <span className="font-medium text-gray-900">{book.auteur}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                            <FaTag className="text-xs" />
                                                            {book.categorie || 'Non catégorisé'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <FaRegCalendarAlt className="text-gray-400" />
                                                            {formatYear(book.dateEdition)}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColors[book.status] || 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                                                            {book.status === 'Disponible' ? <FaRegCheckCircle /> : <FaRegClock />}
                                                            {book.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-1">
                                                            <button 
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                title="Voir les détails"
                                                            >
                                                                <FaEye />
                                                            </button>
                                                            <button 
                                                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                                title="Modifier"
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                            <button 
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Supprimer"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="text-sm text-gray-700">
                                            Affichage de {indexOfFirstBook + 1} à {Math.min(indexOfLastBook, filteredBooks.length)} sur {filteredBooks.length} livre{filteredBooks.length !== 1 ? 's' : ''}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                <FaArrowLeft />
                                            </button>
                                            
                                            <div className="flex gap-1">
                                                {[...Array(totalPages)].map((_, i) => {
                                                    const page = i + 1
                                                    // Afficher seulement les pages autour de la page courante
                                                    if (
                                                        page === 1 ||
                                                        page === totalPages ||
                                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                                    ) {
                                                        return (
                                                            <button
                                                                key={i}
                                                                onClick={() => setCurrentPage(page)}
                                                                className={`w-10 h-10 rounded-lg ${currentPage === page 
                                                                    ? 'bg-amber-500 text-white' 
                                                                    : 'border border-gray-300 hover:bg-gray-50'}`}
                                                            >
                                                                {page}
                                                            </button>
                                                        )
                                                    } else if (
                                                        (page === currentPage - 2 && currentPage > 3) ||
                                                        (page === currentPage + 2 && currentPage < totalPages - 2)
                                                    ) {
                                                        return <span key={i} className="px-2">...</span>
                                                    }
                                                    return null
                                                })}
                                            </div>

                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                <FaArrowRight />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Section Demandes */}
                    <div className="bg-white rounded-xl shadow-sm border mb-20 border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <MdOutlinePendingActions className="text-xl text-orange-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">Demandes des lecteurs</h2>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {demands.length} demande{demands.length !== 1 ? 's' : ''} en attente
                                        </p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <FaDownload />
                                    Exporter
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Nom</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Email</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Livre demandé</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {demands.map((demand) => (
                                        <tr key={demand.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <IoMdPerson className="text-gray-400" />
                                                    <span className="font-medium text-gray-900">{demand.nom}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <FaRegEnvelope className="text-gray-400 text-sm" />
                                                    <span className="text-gray-900">{demand.email}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <FaBook className="text-gray-400 text-sm" />
                                                    <span className="font-medium text-gray-900">{demand.titre}</span>
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1 max-w-xs truncate">
                                                    {demand.message}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {demands.length === 0 && (
                            <div className="p-8 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <FaRegEnvelope className="text-2xl text-gray-400" />
                                </div>
                                <p className="text-gray-500">Aucune demande en attente</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal d'ajout de livre */}
            {openDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <IoMdAdd className="text-xl text-amber-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Ajouter un nouveau livre</h2>
                                    <p className="text-gray-600 text-sm">Remplissez les informations du livre</p>
                                </div>
                            </div>
                            <button
                                onClick={handleOpen}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <FaX />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="code"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        placeholder="Ex: LIV-001"
                                        value={book.code}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Numéro <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="numero"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        placeholder="Ex: 001"
                                        value={book.numero}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Titre <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="titre"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        placeholder="Titre du livre"
                                        value={book.titre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                
                                {/* Section Image */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Image <span className="text-red-500">*</span>
                                    </label>
                                    
                                    <div className="flex flex-col gap-4">
                                        {/* Option 1 : Upload de fichier */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Télécharger une image :
                                            </label>
                                            <div className="flex items-center">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
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
                                                <span className="px-2 bg-white text-gray-500">OU</span>
                                            </div>
                                        </div>

                                        {/* Option 2 : URL */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Entrer une URL d'image :
                                            </label>
                                            <input
                                                type="url"
                                                name="img"
                                                placeholder="https://exemple.com/image.jpg"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                                value={imageUrl}
                                                onChange={handleImageUrlChange}
                                            />
                                        </div>

                                        {/* Aperçu */}
                                        {(imagePreview || imageUrl) && (
                                            <div className="mt-4">
                                                <p className="text-sm font-medium text-gray-700 mb-2">Aperçu :</p>
                                                <div className="relative inline-block">
                                                    <img 
                                                        src={imagePreview || imageUrl} 
                                                        alt="Aperçu" 
                                                        className="h-40 w-auto rounded-lg object-cover border border-gray-300"
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Auteur <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="auteur"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        placeholder="Nom de l'auteur"
                                        value={book.auteur}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Catégorie <span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                        name="categorie"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lieu d'édition
                                    </label>
                                    <input
                                        type="text"
                                        name="lieuEdition"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        placeholder="Ville, Pays"
                                        value={book.lieuEdition}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date d'édition
                                    </label>
                                    <input
                                        type="date"
                                        name="dateEdition"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        value={book.dateEdition}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Origine
                                    </label>
                                    <input
                                        type="text"
                                        name="origine"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        placeholder="Source du livre"
                                        value={book.origine}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Quantité <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="quantite"
                                        min="1"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        value={book.quantite}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date d'enregistrement <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="dateEnregistrement"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        value={book.dateEnregistrement}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Statut <span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                        name="status"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        value={book.status}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="Disponible">Actif</option>
                                        <option value="Disponible">Disponible</option>
                                        <option value="Emprunté">Emprunté</option>
                                        <option value="Réservé">Réservé</option>
                                        <option value="En réparation">En réparation</option>
                                        <option value="Perdu">Perdu</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sticky bottom-0 bg-white pt-6 border-t border-gray-200">
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={handleOpen}
                                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        disabled={isLoading}
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>
    )
}

export default Bibliotheque