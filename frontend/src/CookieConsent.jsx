import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, BarChart3, Megaphone, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { FaCheck, FaCookieBite, FaGear, FaX } from "react-icons/fa6";

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false,
    });

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setShowBanner(true), 1000);
            return () => clearTimeout(timer);
        } else {
            // Charger les préférences existantes
            try {
                const savedPrefs = JSON.parse(consent);
                setPreferences(savedPrefs);
            } catch (error) {
                console.error("Erreur lors du chargement des cookies:", error);
            }
        }
    }, []);

    const savePreferences = (prefs) => {
        localStorage.setItem("cookie-consent", JSON.stringify(prefs));
        localStorage.setItem("cookie-consent-date", new Date().toISOString());
        setShowBanner(false);
        setShowSettings(false);
        // Émettre un événement personnalisé pour informer d'autres composants
        window.dispatchEvent(new CustomEvent('cookie-consent-updated', { 
            detail: prefs 
        }));
    };

    const acceptAll = () => {
        const allAccepted = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
        };
        savePreferences(allAccepted);
    };

    const rejectAll = () => {
        const onlyNecessary = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
        };
        savePreferences(onlyNecessary);
    };

    const saveCustomPreferences = () => {
        savePreferences(preferences);
    };

    const handleToggle = (cookieId) => {
        if (cookieId === "necessary") return; // Ne pas modifier les cookies nécessaires
        
        setPreferences(prev => ({
            ...prev,
            [cookieId]: !prev[cookieId]
        }));
    };

    const cookieTypes = [
        {
            id: "necessary",
            name: "Cookies essentiels",
            description: "Nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés.",
            icon: Shield,
            required: true,
        },
        {
            id: "analytics",
            name: "Cookies analytiques",
            description: "Nous aident à comprendre comment les visiteurs utilisent le site.",
            icon: BarChart3,
            required: false,
        },
        {
            id: "marketing",
            name: "Cookies marketing",
            description: "Utilisés pour afficher des publicités pertinentes.",
            icon: Megaphone,
            required: false,
        },
        {
            id: "preferences",
            name: "Cookies de préférences",
            description: "Permettent de mémoriser vos choix et personnalisations.",
            icon: Settings,
            required: false,
        },
    ];

    // Fonction pour obtenir l'état des cookies
     const getCookiePreferences = () => {
        try {
            const consent = localStorage.getItem("cookie-consent");
            return consent ? JSON.parse(consent) : null;
        } catch {
            return null;
        }
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto">
                        <motion.div 
                            className="bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            {/* Header */}
                            <div className="bg-linear-to-r from-orange-500/10 via-orange-500/5 to-orange-500/10 p-4 md:p-6 border-b border-black/10">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <motion.div 
                                            className="w-12 h-12 rounded-xl text-orange-500 bg-orange-500/20 flex items-center justify-center"
                                            animate={{ rotate: [0, 10, 0] }}
                                            transition={{ repeat: Infinity, repeatDelay: 5 }}
                                        >
                                            <FaCookieBite className="w-6 h-6 text-orange-500" />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                Gestion des cookies
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Nous respectons votre vie privée
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowBanner(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                        aria-label="Fermer"
                                    >
                                        <FaX className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 md:p-6">
                                {!showSettings ? (
                                    <>
                                        <p className="text-gray-700 mb-6">
                                            Nous utilisons des cookies pour améliorer votre expérience sur notre site.
                                            Vous pouvez choisir les types de cookies que vous souhaitez autoriser.
                                            Pour en savoir plus, consultez notre{" "}
                                            <Link
                                                to="/mentions"
                                                className="text-orange-500 hover:text-orange-600 hover:underline font-medium"
                                            >
                                                politique de confidentialité
                                            </Link>.
                                        </p>

                                        {/* Quick Actions */}
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <motion.button
                                                onClick={acceptAll}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex-1 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-3 font-medium transition-colors"
                                            >
                                                <FaCheck className="w-4 h-4 mr-2" />
                                                Tout accepter
                                            </motion.button>
                                            <motion.button
                                                onClick={rejectAll}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg px-4 py-3 font-medium transition-colors"
                                            >
                                                Refuser tout
                                            </motion.button>
                                            <motion.button
                                                onClick={() => setShowSettings(true)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg px-4 py-3 font-medium transition-colors"
                                            >
                                                <FaGear className="w-4 h-4" />
                                                Personnaliser
                                            </motion.button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-4 mb-6"
                                        >
                                            {cookieTypes.map((cookie) => {
                                                const Icon = cookie.icon;
                                                const isEnabled = preferences[cookie.id];

                                                return (
                                                    <motion.div
                                                        key={cookie.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: cookieTypes.indexOf(cookie) * 0.1 }}
                                                        className={`flex items-start gap-4 p-4 rounded-xl border ${isEnabled ? 'border-orange-200 bg-orange-50' : 'border-gray-200 bg-gray-50'}`}
                                                    >
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isEnabled ? "bg-orange-500/20 text-orange-500" : "bg-gray-100 text-gray-400"}`}>
                                                            <Icon className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <h4 className="font-semibold text-gray-900">
                                                                    {cookie.name}
                                                                </h4>
                                                                <div className="relative">
                                                                    {cookie.required ? (
                                                                        <div className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                                                                            Toujours actif
                                                                        </div>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() => handleToggle(cookie.id)}
                                                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isEnabled ? 'bg-orange-500' : 'bg-gray-300'}`}
                                                                            aria-label={`${isEnabled ? 'Désactiver' : 'Activer'} ${cookie.name}`}
                                                                        >
                                                                            <motion.span
                                                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                                                                                layout
                                                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                                            />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-gray-600">
                                                                {cookie.description}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </motion.div>

                                        {/* Save Actions */}
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <motion.button
                                                onClick={saveCustomPreferences}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex-1 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-3 font-medium transition-colors"
                                            >
                                                <FaCheck className="w-4 h-4 mr-2" />
                                                Enregistrer mes choix
                                            </motion.button>
                                            <motion.button
                                                onClick={() => setShowSettings(false)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg px-4 py-3 font-medium transition-colors"
                                            >
                                                Retour
                                            </motion.button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;