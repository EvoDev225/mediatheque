import React from 'react'
import { FaBook, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaTag } from "react-icons/fa";
import { motion } from 'framer-motion';

const Book = ({ titre, auteur, lieu, date, image, categorie }) => {
    // Fonction pour générer une couleur aléatoire si pas d'image
    const getRandomColor = () => {
        const colors = [
            'from-blue-500 to-cyan-500',
            'from-purple-500 to-pink-500',
            'from-orange-500 to-red-500',
            'from-green-500 to-emerald-500',
            'from-indigo-500 to-blue-500'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Fonction pour obtenir l'abréviation du titre
    const getInitials = (title) => {
        return title
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 3);
    };

    // Vérifier si l'image est valide
    const hasImage = image && image.trim() !== '';
    
    // Formater la date
    const formattedDate = date ? new Date(date).getFullYear() : 'N/A';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
            {/* Badge de catégorie */}
            <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 shadow-sm">
                    <FaTag className="text-xs" />
                    {categorie || 'Non catégorisé'}
                </span>
            </div>

            {/* Section image/illustration */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br to-gray-100">
                {hasImage ? (
                    <img
                        src={image}
                        alt={titre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.className = `bg-gradient-to-br ${getRandomColor()} h-48 flex items-center justify-center`;
                        }}
                    />
                ) : (
                    <div className={`bg-gradient-to-br ${getRandomColor()} h-full flex flex-col items-center justify-center p-4`}>
                        <FaBook className="text-5xl text-white/80 mb-2" />
                        <span className="text-white text-2xl font-bold tracking-wider">
                            {getInitials(titre)}
                        </span>
                    </div>
                )}
                
                {/* Overlay au survol */}
            
            </div>

            {/* Contenu du livre */}
            <div className="p-5">
                {/* Titre */}
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors duration-200">
                    {titre}
                </h3>

                {/* Métadonnées */}
                <div className="space-y-3">
                    {/* Auteur */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <FaUser className="text-blue-500 text-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 mb-1">Auteur</p>
                            <p className="text-sm font-medium text-gray-700 truncate">
                                {auteur || 'Inconnu'}
                            </p>
                        </div>
                    </div>

                    {/* Lieu et Date - sur la même ligne */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Lieu */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <FaMapMarkerAlt className="text-purple-500 text-sm" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 mb-1">Lieu</p>
                                <p className="text-sm font-medium text-gray-700 truncate">
                                    {lieu || 'Non spécifié'}
                                </p>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <FaCalendarAlt className="text-green-500 text-sm" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 mb-1">Année</p>
                                <p className="text-sm font-medium text-gray-700">
                                    {formattedDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bouton d'action */}
            </div>

            {/* Effet de brillance au survol */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent -translate-x-12 -translate-y-12 rotate-45"></div>
            </div>
        </motion.div>
    );
}

export default Book;