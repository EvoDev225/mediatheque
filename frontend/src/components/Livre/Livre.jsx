import NavbarLivre from "./NavbarLivre";
import { MdOutlineDashboardCustomize, MdSearch, MdFilterList } from "react-icons/md";
import { LuSwords } from "react-icons/lu";
import { FaBook, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Contact from "../../Contact";
import Footer from "../../Footer";
import Book from "./Book";
import { useEffect, useState, useMemo } from "react";
import { ToutLivre } from "../../Fonctions/Livre/Flivre";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import toast from "react-hot-toast";

const Livre = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); // 'asc' ou 'desc'
    const [sortBy, setSortBy] = useState("titre"); // 'titre', 'auteur', 'date'
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Tous");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await ToutLivre();
                setAllBooks(res);
            } catch (error) {
                toast.error("Erreur lors de la récupération des livres.");
                console.error(error);
            }
        };
        fetchBooks();
    }, []);

    // Extraire toutes les catégories uniques
    const allCategories = useMemo(() => {
        const categories = [...new Set(allBooks.map(book => book.categorie || 'Autres'))];
        return ['Tous', ...categories.sort()];
    }, [allBooks]);

    // Filtrer et trier les livres
    const filteredBooks = useMemo(() => {
        let filtered = allBooks;

        // Filtre par recherche
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(book => {
                const titleMatch = book.titre?.toLowerCase().includes(lowerCaseSearchTerm);
                const authorMatch = book.auteur?.toLowerCase().includes(lowerCaseSearchTerm);
                return titleMatch || authorMatch;
            });
        }

        // Filtre par catégorie
        if (selectedCategory && selectedCategory !== "Tous") {
            filtered = filtered.filter(book => 
                book.categorie === selectedCategory || 
                (!book.categorie && selectedCategory === 'Autres')
            );
        }

        // Trier les livres
        filtered.sort((a, b) => {
            let aValue = a[sortBy] || '';
            let bValue = b[sortBy] || '';

            if (sortBy === 'dateEdition') {
                aValue = new Date(a.dateEdition).getFullYear();
                bValue = new Date(b.dateEdition).getFullYear();
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return filtered;
    }, [allBooks, searchTerm, sortOrder, sortBy, selectedCategory]);

    // Regrouper par catégorie pour l'affichage
    const booksByCategory = useMemo(() => {
        const groups = {};
        
        filteredBooks.forEach(book => {
            const category = book.categorie || 'Autres';
            
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(book);
        });
        
        return groups;
    }, [filteredBooks]);

    const categories = Object.keys(booksByCategory).sort();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("Tous");
        setSortOrder("asc");
        setSortBy("titre");
    };

    const hasActiveFilters = searchTerm || selectedCategory !== "Tous" || sortBy !== "titre" || sortOrder !== "asc";

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            <div className="relative overflow-hidden w-full bg-[url(./assets/img/bibliothèque.jpg)] bg-cover bg-center h-[80vh] hero">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10">
                    <div className="h-20"><NavbarLivre/></div>
                    <div className="pt-60 text-white hero_content w-full lg:w-7xl mx-auto h-full flex items-center   ">
                        <div className="px-4 lg:px-0 mb-20 lg:mb-40 flex flex-col justify-center  w-full lg:w-4xl gap-6 ">
                            <h1 className="text-4xl lg:text-6xl font-bold uppercase tracking-tight">
                                Votre Portail vers la Lecture et <span className="text-orange-500">la Culture</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
                                Parcourez notre collection et laissez-vous guider par des œuvres qui éveillent la curiosité, nourrissent l'esprit et inspirent chaque lecteur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12 lg:mt-20">
                {/* En-tête des filtres */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                            Notre Collection <span className="text-orange-500">({filteredBooks.length} livres)</span>
                        </h2>
                        
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <MdFilterList className="text-gray-600" />
                                <span className="hidden lg:inline">Filtres</span>
                            </button>
                            
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                                >
                                    <IoClose />
                                    Réinitialiser les filtres
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Barre de recherche principale */}
                    <div className="relative mb-6">
                        <div className="relative">
                            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input 
                                type="search" 
                                placeholder="Rechercher un livre par titre, auteur..." 
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <IoClose className="text-xl" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Panneau des filtres */}
                    {showFilters && (
                        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Filtre par catégorie */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Catégorie
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {allCategories.map(category => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                                    selectedCategory === category
                                                        ? 'bg-orange-500 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Tri par */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Trier par
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {['titre', 'auteur', 'dateEdition'].map(option => (
                                            <button
                                                key={option}
                                                onClick={() => setSortBy(option)}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                                    sortBy === option
                                                        ? 'bg-orange-500 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                {option === 'titre' ? 'Titre' : 
                                                option === 'auteur' ? 'Auteur' : 'Date'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Ordre de tri */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ordre
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSortOrder('asc')}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                                sortOrder === 'asc'
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            <FaSortAmountUp />
                                            Croissant
                                        </button>
                                        <button
                                            onClick={() => setSortOrder('desc')}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                                sortOrder === 'desc'
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            <FaSortAmountDown />
                                            Décroissant
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Affichage des résultats */}
                {filteredBooks.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 mb-4">
                            <FaBook className="text-3xl text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                            Aucun livre trouvé
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            {searchTerm || selectedCategory !== "Tous" 
                                ? `Aucun résultat pour "${searchTerm}"${selectedCategory !== "Tous" ? ` dans la catégorie "${selectedCategory}"` : ''}.`
                                : "La bibliothèque est actuellement vide."}
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Réinitialiser les filtres
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-16">
                        {/* Affichage par catégorie */}
                        {categories.map((category) => (
                            <div key={category} className="scroll-mt-8" id={`cat-${category}`}>
                                <div className="sticky top-0 z-10 py-4 bg-linear-to-r from-white to-gray-50 mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                        <div className="p-2 bg-orange-100 rounded-lg">
                                            <FaBook className="text-orange-500 text-xl" />
                                        </div>
                                        {category}
                                        <span className="text-lg font-normal text-gray-500">
                                            ({booksByCategory[category].length} livre{booksByCategory[category].length > 1 ? 's' : ''})
                                        </span>
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-1">
                                    {booksByCategory[category].map((book, index) => (
                                        <Book 
                                            key={book.code || index}
                                            titre={book.titre} 
                                            categorie={book.categorie} 
                                            auteur={book.auteur} 
                                            lieu={book.lieuEdition} 
                                            date={book.dateEdition ? new Date(book.dateEdition).getFullYear() : 'N/D'} 
                                            image={book.img} 
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Section Formulaire de demande */}
                <div className="my-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                            Faire une demande
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Si un livre recherché n'est pas disponible dans notre collection, n'hésitez pas à nous en faire part. 
                            Nous nous efforcerons d'acquérir les ouvrages demandés dans les plus brefs délais.
                        </p>
                    </div>
                    
                    <div className="max-w-2xl mx-auto">
                        <form className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nom <span className="text-orange-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email <span className="text-orange-500">*</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2 mb-6">
                                <label className="block text-sm font-medium text-gray-700">
                                    Titre du livre <span className="text-orange-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                                    required
                                />
                            </div>
                            
                            <div className="space-y-2 mb-8">
                                <label className="block text-sm font-medium text-gray-700">
                                    Message <span className="text-orange-500">*</span>
                                </label>
                                <textarea 
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
                                    required
                                ></textarea>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-linear-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
                            >
                                Envoyer la demande
                            </button>
                        </form>
                    </div>
                </div>

                <div className="fixed bottom-100 flex flex-col items-center gap-4 right-10 p-10 z-50">
                    <a href="#" className="bg-orange-500 text-white p-4 rounded-full font-bold text-xl"><FaAngleUp /></a>
                    <a href="#contact" className="bg-orange-500 text-white p-4 rounded-full font-bold text-xl"><FaAngleDown /></a>
                </div>
                
                <Contact/>
            </div>
            <Footer/>
        </div>
    )
}

export default Livre;