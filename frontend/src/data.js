import { FaComputer, FaPrint } from "react-icons/fa6";
import { FaBook, FaBrain, FaLandmark, FaPalette } from "react-icons/fa";
import bibliotheque from "./assets/img/bibliothèque.jpg";
import enfant from "./assets/img/enfant.jpg";
import salle from "./assets/img/salle.jpg";
import fete from "./assets/img/fete.jpg";
// hero home page

// service home page
const serviceHomePage = [
    {
        id: "service",
        title: "Nos services  à votre disposition",
        description: "Des services numériques, culturels et administratifs à votre disposition pour simplifier votre quotidien."
    }
]
// service items home page
const serviceItemsHomePage = [
    {
        id: "1",
        item: <FaComputer/> ,
        title: "Wi-Fi & Ordinateurs",
        description: "Utilisez nos ordinateurs connectés et profitez d’un accès Wi-Fi gratuit."
    },
    {
        id: "2",
        item: <FaBook />,
        title: "Emprunt de livres",
        description: "Consultez ou empruntez des ouvrages gratuitement."
    },
    {
        id: "3",
        item: <FaPrint />,
        title: "Impression & photocopie",
        description: "Imprimez ou photocopiez vos documents directement sur place."
    },
    {
        id: "4",
        item: <FaBrain />,
        title: "Formations numériques",
        description: "Initiez-vous à l’informatique, la bureautique ou la recherche en ligne."
    },
    {
        id: "5",
        item: <FaLandmark />,
        title: "Aide aux démarches",
        description: " Accompagnement pour remplir vos formulaires ou effectuer des démarches."
    },
    {
        id: "6",
        item: <FaPalette />,
        title: "Ateliers culturels",
        description: "Participez à des ateliers créatifs et des animations tous publics.."
    }
]
// Espace home page
const espaceHomePage = [
    {
        title: "Découvrez nos Espaces",
        description: "Nous vous accueillons du lundi au samedi de 09h à 17h"
    }
]
const espaceItemsHomePage = [
    {
        id: "1",
        img: bibliotheque,
        title: "Bibliothèque pour adulte",
        description: "Un espace calme et lumineux pour consulter, lire ou emprunter des ouvrages"
    },
    {
        id: "2",
        img: enfant,
        title: "Bibliothèque pour enfants  ",
        description: "Des livres et animations dédiés aux plus jeunes, dans un cadre convivial.",

    },
    {
        id: "3",
        img: salle,
        title: " Salle multimédia",
        description: " Des postes informatiques modernes avec accès Internet et outils de bureautique."
    },
    {
        id: "4",
        img: fete,
        title: "Salle des fêtes",
        description: "n lieu aux ambiances feutrées, où la convivialité et l'émotion se partagent dans un cadre raffiné."
    }
]
// propos item page
const proposItemHomePage = [
    {
        id: "1",
        title: "Un Espace Culturel au Cœur de Treichville",
        description: "Annexe culturelle de la Mairie de Treichville, notre médiathèque est un espace public dédié à la culture, à l'éducation et au numérique."
    },
    {
        id: "2",
        title: "Votre Lieu d'Apprentissage et de Partage    ",
        description: " Elle met à disposition des habitants un lieu d'apprentissage, de découverte et de partage à travers une bibliothèque riche, une salle multimédia connectée et des services administratifs de proximité"
    },
    {
        id: "3",
        title: " Notre Mission : Faciliter l'Accès au Savoir",
        description: " Notre mission est de faciliter l'accès au savoir et aux outils numériques pour tous, dans un environnement convivial et moderne, au service du développement local."
    }
]


export default {
    serviceHomePage,
    serviceItemsHomePage,
    espaceHomePage,
    espaceItemsHomePage,
    proposItemHomePage
};