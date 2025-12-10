import { 
  FaBook, 
  FaSearch, 
  FaUsers, 
  FaChartLine, 
  FaCalendarAlt, 
  FaTag,
  FaEye,
  FaDownload,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaRegUser,
  FaRegCalendarAlt,
  FaRegClock,
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa'
import { 
  MdOutlineLibraryBooks,
  MdOutlineCollectionsBookmark,
  MdOutlineSort
} from "react-icons/md"
import { 
  IoMdSearch,
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
import SideBar from './SideBar'
import { useEffect, useState } from 'react'
import { ToutLivre } from '../../Fonctions/Livre/Flivre'
import toast from 'react-hot-toast'

const Books = () => {
    const [allBooks, setAllBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
    const [currentPage, setCurrentPage] = useState(1)
    const [booksPerPage] = useState(10)
    const [selectedStatus, setSelectedStatus] = useState("Tous")
    const [selectedCategory, setSelectedCategory] = useState("Tous")
    const [loading, setLoading] = useState(true)
    
    // Charger les livres
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true)
                const res = await ToutLivre()
                console.log('Livres récupérés:', res)
                if (Array.isArray(res)) {
                    setAllBooks(res)
                } else {
                    console.error('La réponse n\'est pas un tableau:', res)
                    setAllBooks([])
                    toast.error("Format de données invalide")
                }
            } catch (error) {
                toast.error("Erreur lors de la récupération des livres.")
                console.error('Erreur fetchBooks:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchBooks()
    }, [])

    // Formater la date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        try {
            const date = new Date(dateString)
            if (isNaN(date.getTime())) return 'Date invalide'
            return date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        } catch (error) {
            console.error('Erreur formatDate:', error)
            return 'N/A'
        }
    }

    // Formater pour n'afficher que l'année
    const formatYear = (dateString) => {
        if (!dateString) return 'N/A'
        try {
            const date = new Date(dateString)
            if (isNaN(date.getTime())) return 'N/A'
            return date.getFullYear()
        } catch (error) {
            console.error('Erreur formatYear:', error)
            return 'N/A'
        }
    }

    // Obtenir les catégories uniques
    const categories = ['Tous', ...new Set(allBooks
        .map(b => b?.categorie)
        .filter(Boolean)
        .filter((value, index, self) => self.indexOf(value) === index)
    )]

    // Filtrer les livres
    const filteredBooks = allBooks.filter(book => {
        if (!book) return false
        
        const searchTermLower = searchTerm.toLowerCase();
        
        const matchesSearch = 
            !searchTerm ||
            (book.titre && book.titre.toLowerCase().includes(searchTermLower)) ||
            (book.auteur && book.auteur.toLowerCase().includes(searchTermLower)) ||
            (book.code && String(book.code).toLowerCase().includes(searchTermLower)) ||
            (book.categorie && book.categorie.toLowerCase().includes(searchTermLower));

        const matchesStatus = 
            selectedStatus === "Tous" || 
            book.status === selectedStatus;

        const matchesCategory = 
            selectedCategory === "Tous" || 
            book.categorie === selectedCategory;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    // Trier les livres
    const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (!sortConfig.key) return 0

        const aValue = a?.[sortConfig.key]
        const bValue = b?.[sortConfig.key]

        // Gestion des valeurs nulles
        if (aValue === null || aValue === undefined) return 1
        if (bValue === null || bValue === undefined) return -1

        // Gestion spéciale pour les dates
        if (sortConfig.key.includes('date')) {
            try {
                const aDate = new Date(aValue).getTime()
                const bDate = new Date(bValue).getTime()
                if (isNaN(aDate)) return 1
                if (isNaN(bDate)) return -1
                
                if (aDate < bDate) {
                    return sortConfig.direction === 'asc' ? -1 : 1
                }
                if (aDate > bDate) {
                    return sortConfig.direction === 'asc' ? 1 : -1
                }
                return 0
            } catch (error) {
                console.error('Erreur tri date:', error)
                return 0
            }
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
            ? <FaSortUp className="text-blue-500" />
            : <FaSortDown className="text-blue-500" />
    }

    // Statistiques
    const stats = {
        total: allBooks.length,
        available: allBooks.filter(b => b && (b.status === 'Disponible' || b.status === 'disponible')).length,
        borrowed: allBooks.filter(b => b && (b.status === 'Emprunté' || b.status === 'emprunté')).length,
        reserved: allBooks.filter(b => b && (b.status === 'Réservé' || b.status === 'réservé')).length,
        categories: [...new Set(allBooks.filter(b => b?.categorie).map(b => b.categorie))].length,
        totalReaders: allBooks.reduce((acc, book) => acc + (parseInt(book?.quantite) || 1), 0)
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

    // Fonction pour exporter les données
    const handleExport = () => {
        try {
            const dataStr = JSON.stringify(filteredBooks, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = `livres_${new Date().toISOString().split('T')[0]}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            
            toast.success('Données exportées avec succès!');
        } catch (error) {
            console.error('Erreur export:', error)
            toast.error('Erreur lors de l\'exportation')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
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
                            Gestion des Livres
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Administration de la bibliothèque et suivi des livres
                        </p>
                    </div>

                    {/* Statistiques */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
                        {/* Total livres */}
                        <div className="bg-white rounded-xl shadow-sm p-5 lg:p-6 border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm lg:text-base font-medium text-gray-600">
                                        Total des livres
                                    </p>
                                    <p className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
                                        {loading ? '...' : stats.total}
                                    </p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <FaBook className="text-blue-500 text-xs" />
                                        <span className="text-xs text-gray-600">Collection totale</span>
                                    </div>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-full">
                                    <MdOutlineLibraryBooks className="text-xl text-blue-600" />
                                </div>
                            </div>
                        </div>

                        {/* Livres disponibles */}
                        <div className="bg-white rounded-xl shadow-sm p-5 lg:p-6 border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm lg:text-base font-medium text-gray-600">
                                        Disponibles
                                    </p>
                                    <p className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
                                        {loading ? '...' : stats.available}
                                    </p>
                                    <p className="text-sm text-green-600 mt-1">
                                        {stats.total > 0 ? `${Math.round((stats.available / stats.total) * 100)}%` : '0%'} du total
                                    </p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-full">
                                    <FaRegCheckCircle className="text-xl text-green-600" />
                                </div>
                            </div>
                        </div>

                        {/* Livres empruntés */}
                        <div className="bg-white rounded-xl shadow-sm p-5 lg:p-6 border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm lg:text-base font-medium text-gray-600">
                                        Empruntés
                                    </p>
                                    <p className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
                                        {loading ? '...' : stats.borrowed}
                                    </p>
                                    <p className="text-sm text-blue-600 mt-1">
                                        {stats.total > 0 ? `${Math.round((stats.borrowed / stats.total) * 100)}%` : '0%'} du total
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-full">
                                    <FaRegClock className="text-xl text-blue-600" />
                                </div>
                            </div>
                        </div>

                        {/* Catégories */}
                        <div className="bg-white rounded-xl shadow-sm p-5 lg:p-6 border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm lg:text-base font-medium text-gray-600">
                                        Catégories
                                    </p>
                                    <p className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
                                        {loading ? '...' : stats.categories}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Variétés de genres
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-full">
                                    <FaTag className="text-xl text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tableau des livres */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Inventaire des Livres
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {loading ? 'Chargement...' : `${filteredBooks.length} livre${filteredBooks.length !== 1 ? 's' : ''} trouvé${filteredBooks.length !== 1 ? 's' : ''}`}
                                        {searchTerm && ` pour "${searchTerm}"`}
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    {/* Barre de recherche */}
                                    <div className="relative">
                                        <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                                        <input
                                            type="search"
                                            placeholder="Rechercher un livre..."
                                            className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-56 lg:w-64"
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
                                                <FaRegTimesCircle />
                                            </button>
                                        )}
                                    </div>

                                    {/* Filtres */}
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <div className="relative">
                                            <FaRegClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                            <select
                                                className="pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white w-full"
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
                                                <option value="En réparation">En réparation</option>
                                                <option value="Perdu">Perdu</option>
                                            </select>
                                        </div>

                                        <div className="relative">
                                            <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                                            <select
                                                className="pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white w-full"
                                                value={selectedCategory}
                                                onChange={(e) => {
                                                    setSelectedCategory(e.target.value)
                                                    setCurrentPage(1)
                                                }}
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <button
                                            onClick={handleExport}
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            <FaDownload />
                                            <span className="hidden sm:inline">Exporter</span>
                                            <span className="sm:hidden">Export</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Loading state */}
                        {loading ? (
                            <div className="p-8 text-center">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <p className="mt-2 text-gray-600">
                                    Chargement des livres...
                                </p>
                            </div>
                        ) : filteredBooks.length === 0 ? (
                            <div className="p-8 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <FaBook className="text-2xl text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Aucun livre trouvé
                                </h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    {searchTerm || selectedStatus !== "Tous" || selectedCategory !== "Tous"
                                        ? 'Aucun résultat pour les critères sélectionnés.'
                                        : 'La bibliothèque est vide.'}
                                </p>
                                {(searchTerm || selectedStatus !== "Tous" || selectedCategory !== "Tous") && (
                                    <button
                                        onClick={() => {
                                            setSearchTerm("")
                                            setSelectedStatus("Tous")
                                            setSelectedCategory("Tous")
                                        }}
                                        className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        Réinitialiser les filtres
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                {/* Version desktop */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <button 
                                                        onClick={() => handleSort('code')} 
                                                        className="flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        Code {getSortIcon('code')}
                                                    </button>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <button 
                                                        onClick={() => handleSort('titre')} 
                                                        className="flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        Titre {getSortIcon('titre')}
                                                    </button>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <button 
                                                        onClick={() => handleSort('auteur')} 
                                                        className="flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        Auteur {getSortIcon('auteur')}
                                                    </button>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Catégorie
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <button 
                                                        onClick={() => handleSort('dateEdition')} 
                                                        className="flex items-center gap-1 hover:text-gray-900"
                                                    >
                                                        Année {getSortIcon('dateEdition')}
                                                    </button>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Quantité
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Statut
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date d'enregistrement
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentBooks.map((book, index) => (
                                                <tr key={book?.code || index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-2 bg-gray-100 rounded-lg">
                                                                <FaBook className="text-gray-600 text-sm" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900">{book?.code || 'N/A'}</div>
                                                                <div className="text-xs text-gray-500">#{book?.numero || 'N/A'}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <div className="font-medium text-gray-900">{book?.titre || 'N/A'}</div>
                                                            <div className="text-sm text-gray-500">{book?.lieuEdition || ''}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-2">
                                                            <FaRegUser className="text-gray-400 text-sm" />
                                                            <span className="font-medium text-gray-900">{book?.auteur || 'N/A'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                            <FaTag className="text-xs" />
                                                            {book?.categorie || 'Non catégorisé'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <FaRegCalendarAlt className="text-gray-400" />
                                                            {formatYear(book?.dateEdition)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                                                            {book?.quantite || 1}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColors[book?.status] || 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                                                            {book?.status === 'Disponible' ? <FaRegCheckCircle /> : <FaRegClock />}
                                                            {book?.status || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {formatDate(book?.dateEnregistrement)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Version mobile */}
                                <div className="md:hidden">
                                    <div className="divide-y divide-gray-200">
                                        {currentBooks.map((book, index) => (
                                            <div
                                                key={book?.code || index}
                                                className="p-4 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="p-2 bg-gray-100 rounded-lg">
                                                                <FaBook className="text-gray-600 text-sm" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900">{book?.code || 'N/A'}</p>
                                                                <p className="text-xs text-gray-500">#{book?.numero || 'N/A'}</p>
                                                            </div>
                                                        </div>
                                                        <p className="font-semibold text-gray-900">{book?.titre || 'N/A'}</p>
                                                        <p className="text-sm text-gray-500">{book?.lieuEdition || ''}</p>
                                                    </div>
                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[book?.status] || 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                                                        {book?.status === 'Disponible' ? <FaRegCheckCircle /> : <FaRegClock />}
                                                        {book?.status || 'N/A'}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3 mb-3">
                                                    <div>
                                                        <p className="text-xs text-gray-500">Auteur</p>
                                                        <div className="flex items-center gap-1">
                                                            <FaRegUser className="text-gray-400 text-xs" />
                                                            <p className="text-sm font-medium">{book?.auteur || 'N/A'}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Catégorie</p>
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                            <FaTag className="text-xs" />
                                                            {book?.categorie || 'Non catégorisé'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Année</p>
                                                        <div className="flex items-center gap-1">
                                                            <FaRegCalendarAlt className="text-gray-400 text-xs" />
                                                            <p className="text-sm font-medium">{formatYear(book?.dateEdition)}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Quantité</p>
                                                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                                                            {book?.quantite || 1}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="pt-3 border-t">
                                                    <p className="text-xs text-gray-500 mb-1">Date d'enregistrement</p>
                                                    <p className="text-sm font-medium">{formatDate(book?.dateEnregistrement)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                                                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${currentPage === page 
                                                                    ? 'bg-blue-500 text-white' 
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

                    {/* Section Résumé */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6 mb-12 sm:mb-20 p-4 sm:p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Résumé de la Bibliothèque</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-700 mb-2">Distribution par Statut</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Disponible</span>
                                        <span className="font-medium">{stats.available}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Emprunté</span>
                                        <span className="font-medium">{stats.borrowed}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Réservé</span>
                                        <span className="font-medium">{stats.reserved}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-700 mb-2">Dernier Ajout</h4>
                                {allBooks.length > 0 ? (
                                    <div>
                                        <p className="font-medium text-gray-800">{allBooks[0]?.titre || 'N/A'}</p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Ajouté le {formatDate(allBooks[0]?.dateEnregistrement)}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Aucun livre</p>
                                )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-700 mb-2">Informations</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Exemplaires totaux</span>
                                        <span className="font-medium">{stats.totalReaders}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Catégories actives</span>
                                        <span className="font-medium">{stats.categories}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Books