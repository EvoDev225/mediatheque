// components/IntroScreenOrangeGreen.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookOpen, FaUserTie, FaCity, FaArrowRight, FaTimes } from 'react-icons/fa';
import { GiOakLeaf } from 'react-icons/gi';

const IntroScreenOrangeGreen = () => {
    const [showIntro, setShowIntro] = useState(false);

    useEffect(() => {
        // Vérifier si l'intro a déjà été vue aujourd'hui
        const lastShown = localStorage.getItem('introLastShown');
        const today = new Date().toDateString();

        if (lastShown !== today) {
            setShowIntro(true);
            localStorage.setItem('introLastShown', today);
        }

        // Optionnel : forcer l'affichage pour debug
        // setShowIntro(true);
    }, []);

    const handleClose = () => {
        setShowIntro(false);
    };

    // Gestion de la touche Entrée et Échap
    useEffect(() => {
        const handleKeyPress = (e) => {
            if ((e.key === 'Enter' || e.key === 'Escape') && showIntro) {
                handleClose();
            }
        };

        if (showIntro) {
            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress);
        }
    }, [showIntro]);

    return (
        <AnimatePresence>
            {showIntro && (
                <>
                    {/* Overlay de fond */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    {/* Contenu principal - Centré et responsive */}
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="w-full max-w-5xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-3xl shadow-2xl"
                        >
                            {/* Conteneur principal avec défilement */}
                            <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-green-100/50 overflow-hidden">
                                {/* En-tête avec dégradé orange-vert */}
                                <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-green-500 py-6 px-6 text-center relative">
                                    {/* Bouton de fermeture */}
                                    <button
                                        onClick={handleClose}
                                        className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-200 z-20"
                                    >
                                        <FaTimes className="text-xl" />
                                    </button>
                                    
                                    <div className="relative z-10">
                                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                                            <FaBookOpen className="text-yellow-200 text-2xl" />
                                            Médiathèque Municipale de Treichville
                                            <FaBookOpen className="text-yellow-200 text-2xl" />
                                        </h1>
                                        <p className="text-green-100 text-base font-medium">
                                            Un espace de culture, de savoir et de partage
                                        </p>
                                    </div>
                                </div>

                                {/* Contenu avec padding réduit */}
                                <div className="p-6 md:p-8">
                                    {/* Section principale compacte */}
                                    <div className="flex flex-col items-center">
                                        {/* Photo du maire - Taille réduite */}
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0, y: 10 }}
                                            animate={{ scale: 1, opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="relative mb-8"
                                        >
                                            <div className="relative w-48 h-48 rounded-full overflow-hidden border-6 border-white shadow-lg">
                                                <img
                                                    src="/images/maire.jpg"
                                                    alt="Maire de Treichville"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "https://www.linfodrome.com/media//article/images/src/59361-2ed1321b6cc67810b82f924d4e6b2fc7.webp";
                                                    }}
                                                />
                                            </div>
                                            
                                            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                                                <FaUserTie />
                                                <span>Maire</span>
                                            </div>
                                        </motion.div>

                                        {/* Message d'accueil */}
                                        <motion.div
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-center mb-8"
                                        >
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                                Bienvenue dans notre <span className="text-orange-500">Médiathèque</span>
                                            </h2>
                                            
                                            <div className="bg-gradient-to-br from-orange-50 to-green-50 border border-orange-100/50 rounded-2xl p-6 mb-6 relative">
                                                <p className="text-lg text-gray-700 leading-relaxed italic">
                                                    "Chers habitants, chers visiteurs,<br />
                                                    Notre médiathèque est un lieu vivant où la culture s'épanouit,<br />
                                                    où le savoir se partage, et où chaque citoyen trouve sa place."
                                                </p>
                                            </div>

                                            {/* Signature */}
                                            <div className="inline-block border-l-3 border-green-400 pl-4">
                                                <p className="text-xl font-bold text-gray-800">
                                                    Monsieur François Albert Amichia
                                                </p>
                                                <div className="flex items-center justify-center gap-2 mt-1">
                                                    <div className="w-8 h-0.5 bg-gradient-to-r from-orange-400 to-green-400" />
                                                    <p className="text-green-600 font-medium">
                                                        Maire de Treichville
                                                    </p>
                                                    <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-orange-400" />
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Section des services - Compacte */}
                                        <motion.div
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="mb-8 w-full"
                                        >
                                            <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
                                                Découvrez nos <span className="text-green-600">espaces</span>
                                            </h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {[
                                                    {
                                                        icon: "📚",
                                                        title: "Bibliothèque",
                                                        desc: "Livres pour adultes et enfants",
                                                        color: "from-orange-400 to-orange-500"
                                                    },
                                                    {
                                                        icon: "💻",
                                                        title: "Espace Multimédia",
                                                        desc: "Accès informatique et numérique",
                                                        color: "from-green-400 to-green-500"
                                                    },
                                                    {
                                                        icon: "👥",
                                                        title: "Salle Convivialité",
                                                        desc: "Rencontres et événements",
                                                        color: "from-orange-300 to-green-400"
                                                    }
                                                ].map((service, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.5 + index * 0.1 }}
                                                        whileHover={{ scale: 1.02 }}
                                                        className={`bg-gradient-to-br ${service.color} text-white rounded-2xl p-6 text-center shadow-lg`}
                                                    >
                                                        <div className="text-4xl mb-3">
                                                            {service.icon}
                                                        </div>
                                                        <h4 className="text-lg font-bold mb-2">{service.title}</h4>
                                                        <p className="text-white/90 text-sm">{service.desc}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* Bouton d'entrée */}
                                        <motion.button
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.8 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleClose}
                                            className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                        >
                                            <div className="relative flex items-center justify-center gap-3">
                                                <span>Explorer la médiathèque</span>
                                                <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                                            </div>
                                        </motion.button>

                                        <p className="mt-4 text-gray-500 text-sm">
                                            Appuyez sur <kbd className="px-2 py-1 bg-gray-100 rounded border text-xs">Entrée</kbd> ou <kbd className="px-2 py-1 bg-gray-100 rounded border text-xs">Échap</kbd> pour continuer
                                        </p>
                                    </div>
                                </div>

                                {/* Footer compact */}
                                <div className="bg-gradient-to-r from-green-50/80 to-orange-50/80 border-t border-green-100/50 py-4 px-6">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-green-400" />
                                            <p className="text-gray-700 font-semibold">
                                                Culture • Savoir • Partage
                                            </p>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            © {new Date().getFullYear()} Médiathèque Municipale de Treichville
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default IntroScreenOrangeGreen;