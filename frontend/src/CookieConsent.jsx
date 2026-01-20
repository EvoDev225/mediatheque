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
    /**
     * [
    {
        "code": "00539",
        "numero": "444",
        "titre": "FLUX",
        "img": "https://via.placeholder.com/150x200?text=FLUX",
        "auteur": "GARNIED PASCAL",
        "lieuEdition": "France",
        "dateEdition": "2005",
        "origine": "Achat",
        "quantite": "2",
        "dateEnregistrement": "2019-08-13 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "00911",
        "numero": "871",
        "titre": "FOLIE D'UNE NUIT",
        "img": "https://via.placeholder.com/150x200?text=FOLIE+D%27UNE+NUIT",
        "auteur": "KONE FIBLA",
        "lieuEdition": "ABIDJAN",
        "dateEdition": "1999",
        "origine": "Achat",
        "quantite": "3",
        "dateEnregistrement": "2019-08-22 00:00:00",
        "status": "Actif",
        "categorie": "LITTRATURES"
    },
    {
        "code": "00410",
        "numero": "799",
        "titre": "FONT BRUNE",
        "img": "https://via.placeholder.com/150x200?text=FONT+BRUNE",
        "auteur": "LE VALET BRIGITTE",
        "lieuEdition": "PARIS",
        "dateEdition": "1987",
        "origine": "Achat",
        "quantite": "1",
        "dateEnregistrement": "2019-08-20 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "02082",
        "numero": "1500",
        "titre": "FONTANA LA FEMME TRUQUEE",
        "img": "https://via.placeholder.com/150x200?text=FONTANA+LA+FEMME+TRUQUEE",
        "auteur": "JEAN PIERRE",
        "lieuEdition": "PARIS",
        "dateEdition": "1980",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-03 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "02134",
        "numero": "1552",
        "titre": "FONTANA LA FEMME TRUQUEE",
        "img": "https://via.placeholder.com/150x200?text=FONTANA+LA+FEMME+TRUQUEE",
        "auteur": "JEAN PIERRE",
        "lieuEdition": "PARIS",
        "dateEdition": "1980",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-03 00:00:00",
        "status": "Actif",
        "categorie": "SCIENCE FICTION"
    },
    {
        "code": "00614",
        "numero": "516",
        "titre": "FORMATION A L'ANIMATION: AGIR ET SAVOIR",
        "img": "https://via.placeholder.com/150x200?text=FORMATION+A+L%27ANIMATION+AGIR+ET+SAVOIR",
        "auteur": "GILLET JEAN-CLAUDE",
        "lieuEdition": "PARIS",
        "dateEdition": "1998",
        "origine": "Achat",
        "quantite": "1",
        "dateEnregistrement": "2019-08-14 00:00:00",
        "status": "Actif",
        "categorie": "DEVELOPPEMENT PERSONNEL"
    },
    {
        "code": "02827",
        "numero": "2297",
        "titre": "FORMULE 1 EMOTIONS 2000",
        "img": "https://via.placeholder.com/150x200?text=FORMULE+1+EMOTIONS+2000",
        "auteur": "JEAN-FRANCOIS GALERON",
        "lieuEdition": "SUISSE",
        "dateEdition": "2000",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-10 00:00:00",
        "status": "Actif",
        "categorie": "SPORT"
    },
    {
        "code": "02406",
        "numero": "1825",
        "titre": "France",
        "img": "https://via.placeholder.com/150x200?text=FRANCE",
        "auteur": "SUZANNE CHANTAL",
        "lieuEdition": "PARIS",
        "dateEdition": "1983",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-05 00:00:00",
        "status": "Actif",
        "categorie": "GUIDE PRATIQUE"
    },
    {
        "code": "01217",
        "numero": "1171",
        "titre": "France Allemagne DEUX NATIONS UN AVENIR",
        "img": "https://via.placeholder.com/150x200?text=FRANCE+ALLEMAGNE+DEUX+NATIONS+UN+AVENIR",
        "auteur": "ROVAN JOSEPH",
        "lieuEdition": "ALLEMAND",
        "dateEdition": "1986",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-08-28 00:00:00",
        "status": "Actif",
        "categorie": "HISTOIRE"
    },
    {
        "code": "02542",
        "numero": "2055",
        "titre": "FRANCIS CABREL",
        "img": "https://via.placeholder.com/150x200?text=FRANCIS+CABREL",
        "auteur": "HUGUES ROYER",
        "lieuEdition": "France",
        "dateEdition": "1994",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-06 00:00:00",
        "status": "Actif",
        "categorie": "BIOGRAPHIE"
    },
    {
        "code": "00225",
        "numero": "226",
        "titre": "FRANCOPHONIE ET MONDIALISATION",
        "img": "https://via.placeholder.com/150x200?text=FRANCOPHONIE+ET+MONDIALISATION",
        "auteur": "PHAN TRANG",
        "lieuEdition": "PARIS",
        "dateEdition": "2011",
        "origine": "Achat",
        "quantite": "1",
        "dateEnregistrement": "2019-08-09 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "00630",
        "numero": "532",
        "titre": "FRANCOPHONIE MONDIALISATION",
        "img": "https://via.placeholder.com/150x200?text=FRANCOPHONIE+MONDIALISATION",
        "auteur": "PHAN TRUNG",
        "lieuEdition": "PARIS",
        "dateEdition": "2011",
        "origine": "Achat",
        "quantite": "1",
        "dateEnregistrement": "2019-08-16 00:00:00",
        "status": "Actif",
        "categorie": "DOCUMENTS"
    },
    {
        "code": "02196",
        "numero": "1613",
        "titre": "FRERES DE LA TERRE",
        "img": "https://via.placeholder.com/150x200?text=FRERES+DE+LA+TERRE",
        "auteur": "CAROLYN F CHERRYH",
        "lieuEdition": "PARIS",
        "dateEdition": "1980",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-04 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "02562",
        "numero": "2110",
        "titre": "FRERES EN ABRAHAM JUDAISME CHRISTIANISME ISLAM",
        "img": "https://via.placeholder.com/150x200?text=FRERES+EN+ABRAHAM+JUDAISME+CHRISTIANISME+ISLAM",
        "auteur": "MAXIME JOINVILLE",
        "lieuEdition": "PARIS",
        "dateEdition": "1989",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-06 00:00:00",
        "status": "Actif",
        "categorie": "RELIGION ET SPIRITUALITE"
    },
    {
        "code": "00372",
        "numero": "356",
        "titre": "FRESH AND THE COB OF LOVE AN AFRICAN MARRIAGE",
        "img": "https://via.placeholder.com/150x200?text=FRESH+AND+THE+COB+OF+LOVE+AN+AFRICAN+MARRIAGE",
        "auteur": "WILL FREDERIC",
        "lieuEdition": "ABIDJAN",
        "dateEdition": "2003",
        "origine": "Achat",
        "quantite": "2",
        "dateEnregistrement": "2019-08-13 00:00:00",
        "status": "Actif",
        "categorie": "DICTIONNAIRE ET LANGUE"
    },
    {
        "code": "02280",
        "numero": "1698",
        "titre": "FUGITIVE",
        "img": "https://via.placeholder.com/150x200?text=FUGITIVE",
        "auteur": "SOUSAN AZADI",
        "lieuEdition": "PARIS",
        "dateEdition": "1987",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-04 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "00071",
        "numero": "72",
        "titre": "GAGNE GANE PERDU PERDU",
        "img": "https://via.placeholder.com/150x200?text=GAGNE+GANE+PERDU+PERDU",
        "auteur": "LOU GOLEY NIANTIE",
        "lieuEdition": "ABIDJAN",
        "dateEdition": "1999",
        "origine": "Achat",
        "quantite": "3",
        "dateEnregistrement": "2019-08-08 00:00:00",
        "status": "Actif",
        "categorie": "NOUVELLES"
    },
    {
        "code": "02463",
        "numero": "1880",
        "titre": "GALAXIES INTERIEURES",
        "img": "https://via.placeholder.com/150x200?text=GALAXIES+INTERIEURES",
        "auteur": "MAXIM JAKUBOWSKI",
        "lieuEdition": "PARIS",
        "dateEdition": "1976",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-05 00:00:00",
        "status": "Actif",
        "categorie": "SCIENCE FICTION"
    },
    {
        "code": "02504",
        "numero": "2017",
        "titre": "GALAXIES INTERIEURES 2",
        "img": "https://via.placeholder.com/150x200?text=GALAXIES+INTERIEURES+2",
        "auteur": "MAXIM JAKUBOWSKI",
        "lieuEdition": "PARIS",
        "dateEdition": "1979",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-06 00:00:00",
        "status": "Actif",
        "categorie": "SCIENCE FICTION"
    },
    {
        "code": "02493",
        "numero": "1917",
        "titre": "GALAXIES INTERIEURES 3",
        "img": "https://via.placeholder.com/150x200?text=GALAXIES+INTERIEURES+3",
        "auteur": "ROBERT E HOWARD",
        "lieuEdition": "PARIS",
        "dateEdition": "1985",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-06 00:00:00",
        "status": "Actif",
        "categorie": "SCIENCE FICTION"
    },
    {
        "code": "00017",
        "numero": "18",
        "titre": "GALERIE INFERNALE",
        "img": "https://via.placeholder.com/150x200?text=GALERIE+INFERNALE",
        "auteur": "ADJAFFI JEAN MARIE",
        "lieuEdition": "ABIDJAN",
        "dateEdition": "1984",
        "origine": "Achat",
        "quantite": "3",
        "dateEnregistrement": "2019-08-08 00:00:00",
        "status": "Actif",
        "categorie": "POLITIQUE"
    },
    {
        "code": "00493",
        "numero": "819",
        "titre": "GANDAI ET L'INDE UN REVE D'UNITE ET DE FRATEERNITE",
        "img": "https://via.placeholder.com/150x200?text=GANDAI+ET+L%27INDE+UN+REVE+D%27UNITE+ET+DE+FRATEERNITE",
        "auteur": "GODARD PHILIPPE",
        "lieuEdition": "France",
        "dateEdition": "2007",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-08-22 00:00:00",
        "status": "Actif",
        "categorie": "DOCUMENTS"
    },
    {
        "code": "00982",
        "numero": "939",
        "titre": "GANDHI LA LIBERTE EN MARCHE",
        "img": "https://via.placeholder.com/150x200?text=GANDHI+LA+LIBERTE+EN+MARCHE",
        "auteur": "FRAIN IRENE",
        "lieuEdition": "PARIS",
        "dateEdition": "2007",
        "origine": "Achat",
        "quantite": "1",
        "dateEnregistrement": "2019-08-23 00:00:00",
        "status": "Actif",
        "categorie": "BIOGRAPHIE"
    },
    {
        "code": "02652",
        "numero": "2164",
        "titre": "GASTON LUCAS SERRURIER CHRONIQUE",
        "img": "https://via.placeholder.com/150x200?text=GASTON+LUCAS+SERRURIER+CHRONIQUE",
        "auteur": "ADELAIDE BLASQUEZ",
        "lieuEdition": "France",
        "dateEdition": "1976",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-06 00:00:00",
        "status": "Actif",
        "categorie": "CONTE ET RECIT"
    },
    {
        "code": "01417",
        "numero": "1361",
        "titre": "GDES BALLADES 17",
        "img": "https://via.placeholder.com/150x200?text=GDES+BALLADES+17",
        "auteur": "HUGO VICOR",
        "lieuEdition": "PARIS",
        "dateEdition": "1963",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-08-30 00:00:00",
        "status": "Actif",
        "categorie": "LITTRATURES"
    },
    {
        "code": "01321",
        "numero": "1270",
        "titre": "GENEVIEVE",
        "img": "https://via.placeholder.com/150x200?text=GENEVIEVE",
        "auteur": "RENOIR JEAN",
        "lieuEdition": "France",
        "dateEdition": "1979",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-08-29 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "01632",
        "numero": "2460",
        "titre": "GERMINAL",
        "img": "https://via.placeholder.com/150x200?text=GERMINAL",
        "auteur": "EMILE ZOLA",
        "lieuEdition": "PARIS",
        "dateEdition": "1979",
        "origine": "",
        "quantite": "1",
        "dateEnregistrement": "2019-09-11 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "01649",
        "numero": "2478",
        "titre": "GERMINAL",
        "img": "https://via.placeholder.com/150x200?text=GERMINAL",
        "auteur": "EMILE ZOLA",
        "lieuEdition": "France",
        "dateEdition": "1983",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-12 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "01211",
        "numero": "1165",
        "titre": "GERONIMO L'APACHE",
        "img": "https://via.placeholder.com/150x200?text=GERONIMO+L%27APACHE",
        "auteur": "DEBO ANGIE",
        "lieuEdition": "PARIS",
        "dateEdition": "1994",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-08-28 00:00:00",
        "status": "Actif",
        "categorie": "BIOGRAPHIE"
    },
    {
        "code": "00537",
        "numero": "442",
        "titre": "GESTION  JURIDIQUE",
        "img": "https://via.placeholder.com/150x200?text=GESTION+JURIDIQUE",
        "auteur": "AZAIS VELY DENISE",
        "lieuEdition": "PARIS",
        "dateEdition": "1998",
        "origine": "Achat",
        "quantite": "6",
        "dateEnregistrement": "2019-08-13 00:00:00",
        "status": "Actif",
        "categorie": "DROIT"
    },
    {
        "code": "00535",
        "numero": "440",
        "titre": "GESTION ADMINISTRATIVE",
        "img": "https://via.placeholder.com/150x200?text=GESTION+ADMINISTRATIVE",
        "auteur": "BRETON MICHELE",
        "lieuEdition": "PARIS",
        "dateEdition": "1998",
        "origine": "Achat",
        "quantite": "2",
        "dateEnregistrement": "2019-08-13 00:00:00",
        "status": "Actif",
        "categorie": "ECONOMIE ET MANAGEMENT"
    },
    {
        "code": "00882",
        "numero": "2604",
        "titre": "GESTION ADMINISTRATIVE",
        "img": "https://via.placeholder.com/150x200?text=GESTION+ADMINISTRATIVE",
        "auteur": "FOUCHER",
        "lieuEdition": "France",
        "dateEdition": "2005",
        "origine": "Achat",
        "quantite": "3",
        "dateEnregistrement": "2019-10-31 00:00:00",
        "status": "Actif",
        "categorie": "ECONOMIE ET MANAGEMENT"
    },
    {
        "code": "00536",
        "numero": "441",
        "titre": "GESTION COMMERCIALE",
        "img": "https://via.placeholder.com/150x200?text=GESTION+COMMERCIALE",
        "auteur": "DESFOUR",
        "lieuEdition": "PARIS",
        "dateEdition": "1998",
        "origine": "Achat",
        "quantite": "12",
        "dateEnregistrement": "2019-08-13 00:00:00",
        "status": "Actif",
        "categorie": "ECONOMIE ET MANAGEMENT"
    },
    {
        "code": "00880",
        "numero": "844",
        "titre": "GESTION COMPTABLE",
        "img": "https://via.placeholder.com/150x200?text=GESTION+COMPTABLE",
        "auteur": "DIALLO YOUSSOUPHA",
        "lieuEdition": "PARIS",
        "dateEdition": "1997",
        "origine": "Achat",
        "quantite": "2",
        "dateEnregistrement": "2019-08-22 00:00:00",
        "status": "Actif",
        "categorie": "ECONOMIE ET MANAGEMENT"
    },
    {
        "code": "03005",
        "numero": "2741",
        "titre": "GESTION DE L'INFORMATION INDUSTRIELLE",
        "img": "https://via.placeholder.com/150x200?text=GESTION+DE+L%27INFORMATION+INDUSTRIELLE",
        "auteur": "RICHAR VAILLANT",
        "lieuEdition": "PARIS",
        "dateEdition": "1998",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2020-08-18 00:00:00",
        "status": "Actif",
        "categorie": "DEVELOPPEMENT PERSONNEL"
    },
    {
        "code": "00170",
        "numero": "171",
        "titre": "GESTION DES FILIERES CAFE ET CACAO EN COTE D'IVOIRE",
        "img": "https://via.placeholder.com/150x200?text=GESTION+DES+FILIERES+CAFE+ET+CACAO+EN+CO",
        "auteur": "N'GUESSAN EDOUARD",
        "lieuEdition": "ABIDJAN",
        "dateEdition": "2007",
        "origine": "Achat",
        "quantite": "1",
        "dateEnregistrement": "2019-08-09 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "00451",
        "numero": "403",
        "titre": "GESTION DES FILIERES CAFE ET CACAO EN COTE D'IVOIRE",
        "img": "https://via.placeholder.com/150x200?text=GESTION+DES+FILIERES+CAFE+ET+CACAO+EN+CO",
        "auteur": "N'GUESSAN EDOUARD",
        "lieuEdition": "ABIDJAN",
        "dateEdition": "2004",
        "origine": "Achat",
        "quantite": "2",
        "dateEnregistrement": "2019-08-13 00:00:00",
        "status": "Actif",
        "categorie": "ECONOMIE ET MANAGEMENT"
    },
    {
        "code": "00895",
        "numero": "856",
        "titre": "GESTION DES RESSOURCES HUMAINES",
        "img": "https://via.placeholder.com/150x200?text=GESTION+DES+RESSOURCES+HUMAINES",
        "auteur": "AGNERO NOMEL LOUIS",
        "lieuEdition": "ABIDJAN",
        "dateEdition": "2005",
        "origine": "Achat",
        "quantite": "3",
        "dateEnregistrement": "2019-08-22 00:00:00",
        "status": "Actif",
        "categorie": "ECONOMIE ET MANAGEMENT"
    },
    {
        "code": "00881",
        "numero": "845",
        "titre": "GESTION ECONOMIQUE",
        "img": "https://via.placeholder.com/150x200?text=GESTION+ECONOMIQUE",
        "auteur": "MOUILLE SEAUX",
        "lieuEdition": "PARIS",
        "dateEdition": "1997",
        "origine": "Achat",
        "quantite": "3",
        "dateEnregistrement": "2019-08-22 00:00:00",
        "status": "Actif",
        "categorie": "ECONOMIE ET MANAGEMENT"
    },
    {
        "code": "00532",
        "numero": "438",
        "titre": "GESTION JURIDIQUE",
        "img": "https://via.placeholder.com/150x200?text=GESTION+JURIDIQUE",
        "auteur": "AZAIS VELY",
        "lieuEdition": "PARIS",
        "dateEdition": "1998",
        "origine": "Achat",
        "quantite": "1",
        "dateEnregistrement": "2019-08-13 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "00981",
        "numero": "938",
        "titre": "GESTION ORGANISATION BTS ASSISTANT DE DIRECTION",
        "img": "https://via.placeholder.com/150x200?text=GESTION+ORGANISATION+BTS+ASSISTANT+DE+DIRECTION",
        "auteur": "ODILE GIRAULT",
        "lieuEdition": "PARIS",
        "dateEdition": "2005",
        "origine": "Achat",
        "quantite": "1",
        "dateEnregistrement": "2019-08-23 00:00:00",
        "status": "Actif",
        "categorie": "ECONOMIE ET MANAGEMENT"
    },
    {
        "code": "02111",
        "numero": "1529",
        "titre": "GIONO ET LA TERRE",
        "img": "https://via.placeholder.com/150x200?text=GIONO+ET+LA+TERRE",
        "auteur": "JULIE SABIANI",
        "lieuEdition": "PARIS",
        "dateEdition": "1988",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-03 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "00116",
        "numero": "117",
        "titre": "GODO GODO L'ETERNEL COMBAT DES FEMMES",
        "img": "https://via.placeholder.com/150x200?text=GODO+GODO+L%27ETERNEL+COMBAT+DES+FEMMES",
        "auteur": "HOLLY BEDI",
        "lieuEdition": "PUCI",
        "dateEdition": "2003",
        "origine": "Achat",
        "quantite": "2",
        "dateEnregistrement": "2019-08-08 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "00622",
        "numero": "524",
        "titre": "GOVERMENT, MARKET AND THE CIVIC SECTOR: THE SEARCH FOR A PRODUCTIVE",
        "img": "https://via.placeholder.com/150x200?text=GOVERMENT%2C+MARKET+AND+THE+CIVIC+SECTOR",
        "auteur": "WRIGHT GLEN",
        "lieuEdition": "NEW YORK",
        "dateEdition": "2001",
        "origine": "Achat",
        "quantite": "1",
        "dateEnregistrement": "2019-08-14 00:00:00",
        "status": "Actif",
        "categorie": "DICTIONNAIRE ET LANGUE"
    },
    {
        "code": "00624",
        "numero": "526",
        "titre": "GOVINA: LE CHANT DE LA VEINE SACREE",
        "img": "https://via.placeholder.com/150x200?text=GOVINA%3A+LE+CHANT+DE+LA+VEINE+SACREE",
        "auteur": "ELII MATH K",
        "lieuEdition": "ABIDJAN",
        "dateEdition": "2018",
        "origine": "Achat",
        "quantite": "1",
        "dateEnregistrement": "2019-08-14 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "00896",
        "numero": "857",
        "titre": "GRAINES SUSPECTES",
        "img": "https://via.placeholder.com/150x200?text=GRAINES+SUSPECTES",
        "auteur": "SEURET FRANCK",
        "lieuEdition": "TUNIS",
        "dateEdition": "2002",
        "origine": "Achat",
        "quantite": "2",
        "dateEnregistrement": "2019-08-22 00:00:00",
        "status": "Actif",
        "categorie": "ECONOMIE ET MANAGEMENT"
    },
    {
        "code": "02868",
        "numero": "2347",
        "titre": "GRAMAIRE FRANCAISE EXPLIQUEE 4EME ET 3EME",
        "img": "https://via.placeholder.com/150x200?text=GRAMAIRE+FRANCAISE+EXPLIQUEE+4EME+ET+3EME",
        "auteur": "GEORGES GALICHET",
        "lieuEdition": "PARIS",
        "dateEdition": "1967",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-11 00:00:00",
        "status": "Actif",
        "categorie": "SCOLAIRE"
    },
    {
        "code": "02866",
        "numero": "2345",
        "titre": "GRAMMAIRE FRANCAISE EXPLIQUEE",
        "img": "https://via.placeholder.com/150x200?text=GRAMMAIRE+FRANCAISE+EXPLIQUEE",
        "auteur": "GEORGES GALICHET",
        "lieuEdition": "PARIS",
        "dateEdition": "1961",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-11 00:00:00",
        "status": "Actif",
        "categorie": "SCOLAIRE"
    },
    {
        "code": "02007",
        "numero": "1425",
        "titre": "GRAND LAROUSSE UNIVERSAL",
        "img": "https://via.placeholder.com/150x200?text=GRAND+LAROUSSE+UNIVERSAL",
        "auteur": "LAROUSSE",
        "lieuEdition": "France",
        "dateEdition": "1987",
        "origine": "Don",
        "quantite": "15",
        "dateEnregistrement": "2019-09-03 00:00:00",
        "status": "Actif",
        "categorie": "ENCYCLOPEDIE"
    },
    {
        "code": "00851",
        "numero": "748",
        "titre": "GRANS HOMMES ET PETITES ILES",
        "img": "https://via.placeholder.com/150x200?text=GRANS+HOMMES+ET+PETITES+ILES",
        "auteur": "ELISE HUFFER",
        "lieuEdition": "PARIS",
        "dateEdition": "1993",
        "origine": "Don",
        "quantite": "5",
        "dateEnregistrement": "2019-08-19 00:00:00",
        "status": "Actif",
        "categorie": "DOCUMENTS"
    },
    {
        "code": "00750",
        "numero": "647",
        "titre": "GRAVITE A LA MANQUE",
        "img": "https://via.placeholder.com/150x200?text=GRAVITE+A+LA+MANQUE",
        "auteur": "EFFINGER GEORGES ALEC",
        "lieuEdition": "",
        "dateEdition": "1987",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-08-16 00:00:00",
        "status": "Actif",
        "categorie": "ROMAN"
    },
    {
        "code": "02361",
        "numero": "1779",
        "titre": "GRECE CONTINENTALE",
        "img": "https://via.placeholder.com/150x200?text=GRECE+CONTINENTALE",
        "auteur": "",
        "lieuEdition": "PARIS",
        "dateEdition": "2000",
        "origine": "Don",
        "quantite": "1",
        "dateEnregistrement": "2019-09-05 00:00:00",
        "status": "Actif",
        "categorie": "GUIDE PRATIQUE"
    }
]
     */

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

