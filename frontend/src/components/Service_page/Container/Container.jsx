import { motion } from "framer-motion";
import { FaClock, FaComputer, FaHeart, FaPrint } from "react-icons/fa6";
import { FaBook, FaBrain, FaLandmark, FaPalette } from "react-icons/fa";
import feature from "../../../assets/img/key.png"
import logo from "../../../assets/hero-library.jpg"
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
const Container = () => {
    // const [openFaqs, setOpenFaqs] = useState({});
    // const handleFaqClick = (id) => {
    //     setOpenFaqs(prev => ({ ...prev,[id]: !prev[id]}));
    // };
    const [openFaq, setOpenFaq] = useState(null);
    const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id);
    }
    const Items = [
        {
            id: "1",
            item: <FaComputer />,
            title: "Wi-Fi & Ordinateurs",
            description: "Utilisez nos ordinateurs connectés et profitez d’un accès Wi-Fi gratuit.",
            liste: ('Connexion haut débit', 'Postes informatiques', 'Assistance technique')
        },
        {
            id: "2",
            item: <FaBook />,
            title: "Emprunt de livres",
            description: "Consultez ou empruntez des ouvrages gratuitement.",
            liste: ("Catalogue varié", "Nouveautés régulières", "Conseils personnalisés")
        },
        {
            id: "3",
            item: <FaPrint />,
            title: "Impression & photocopie",
            description: "Imprimez ou photocopiez vos documents directement sur place.",
            liste: ("Impression couleur/N&B", "Numérisation", "Reliure disponible")
        },
        {
            id: "4",
            item: <FaBrain />,
            title: "Formations numériques",
            description: "Initiez-vous à l’informatique, la bureautique ou la recherche en ligne."
            ,
            liste: ("Cours débutants", "Ateliers pratiques", "Certificats délivrés")
        },
        {
            id: "5",
            item: <FaLandmark />,
            title: "Aide aux démarches",
            description: " Accompagnement pour remplir vos formulaires ou effectuer des démarches.",
            liste: ("Formulaires en ligne", "Aide personnalisée", "Suivi des dossiers")
        },
        {
            id: "6",
            item: <FaPalette />,
            title: "Ateliers culturels",
            description: "Participez à des ateliers créatifs et des animations tous publics..",
            liste: ("Arts plastiques", "Écriture créative", "Animations enfant")
        }
    ]
    const propos = [
        {
            title: "Pourquoi nous suivre ?",
            description: "Parce que votre médiathèque est un lieu vivant qui va bien au-delà des simples rayonnages. Nous suivre, c'est avoir une longueur d'avance en étant informé en premier de nos nouvelles acquisitions et des coups de cœur de nos bibliothécaires. C'est aussi ne rien manquer de notre programmation culturelle riche et variée - expositions, concerts, rencontres d'auteurs et ateliers créatifs. Vous y découvrirez des contenus exclusifs et inspirants, et rejoindrez une communauté de passionnés avec laquelle échanger. Restez connectés pour vivre l'aventure culturelle avec nous, même en dehors de nos murs !",
        }
    ]
    const Element = [
        {
            icon: <FaClock />,
            title: "Actualités en temps réel",
            content: "Nouvelles acquisitions et événements"
        },
        {
            icon: <IoPeopleOutline />,
            title: "Communauté active",
            content: "Échangez avec d'autres passionnés"
        },
        {
            icon: <FaHeart />,
            title: "Coups de cœur",
            content: "Recommandations personnalisées"
        },
        {
            icon: <FaPalette />,
            title: "Contenus exclusifs",
            content: "Expositions et rencontres d'auteurs"
        },
    ]
    const faqs = [
        {
            id: "1",
            title: " Quels sont les horaires d'ouverture de la bibliothèque ?",
            description: "La bibliothèque est ouverte du mardi au samedi de 9h à 18h, avec une pause entre 12h et 14h. Le mercredi, nous ouvrons à 8h30 pour accueillir les scolaires. La consultation sur place est possible aux mêmes horaires."
        },
        {
            id: "2",
            title: "Comment obtenir une carte de lecteur ?",
            description: "Présentez-vous à l'accueil avec une pièce d'identité et un justificatif de domicile. La carte est gratuite et valable un an. Elle vous permet d'accéder à toutes nos salles de lecture et de consulter l'ensemble des documents sur place."
        },
        {
            id: "3",
            title: "Puis-je emprunter des livres pour les rapporter à domicile ?",
            description: "Non, notre bibliothèque fonctionne exclusivement sur le principe de la consultation sur place. Tous les documents doivent être consultés dans nos espaces de lecture. Nous mettons à disposition des salles calmes et confortables pour votre étude."
        },
        {
            id: "4",
            title: "Quels types de documents puis-je consulter ?",
            description: "Vous avez accès à tous nos ouvrages : livres, revues, journaux, dictionnaires et encyclopédies. Notre catalogue compte plus de 20 000 références couvrant tous les domaines de la connaissance. Les documents sont en libre accès dans les rayonnages."
        },
        {
            id: "5",
            title: "Proposez-vous un service d'aide à la recherche ?",
            description: "Oui, notre personnel est à votre disposition pour vous aider dans vos recherches documentaires. Nous pouvons vous orienter vers les ouvrages adaptés et vous accompagner dans l'utilisation de nos bases de données. N'hésitez pas à nous solliciter."
        }
    ]
    return (
        <section className="overflow-hidden bg-orange-50/75  ">
            <div className="container mx-auto flex flex-col gap-12 px-4 lg:px-8 py-25 ">
                <motion.div 
                initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
                className="w-full flex items-center justify-center flex-col my-25 ">
                    <h2 className="text-center text-4xl font-bold">
                        Ce que nous vous offrons
                    </h2>
                    <p className="text-center text-gray-500">
                        Une gamme complète de services pour répondre à tous vos besoins culturels et administrat
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {
                        Items.map((item, index) => (
                            <motion.div 
                            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
                            key={index + item.id} className="px-6 py-4 flex flex-col gap-4 rounded-xl duration-500 hover:shadow-2xl bg-white">
                                <span className="p-4 bg-orange-100 text-orange-500 rounded-xl w-fit text-2xl">
                                    {item.item}
                                </span>
                                <h2 className="text-2xl font-bold">
                                    {item.title}
                                </h2>
                                <p className="text-sm text-black/75">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))
                    }
                </div>

            </div>
            <div className="container mx-auto flex flex-col gap-12 px-4 lg:px-8 py-25 ">
                {/* Description */}
                <div className="grid grid-cols1 lg:grid-cols-2 gap-24">
                    <motion.div 
                     initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
                    className="flex flex-col gap-4">
                        <span className="px-4 py-2 bg-orange-100 text-orange-500 font-bold text-sm w-fit rounded-2xl">Restez connectés</span>
                        {
                            propos.map((propos, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <h2 className="text-4xl lg:text-5xl font-bold">
                                        Pourquoi nous <span className="text-orange-500">suivre?</span>
                                    </h2>
                                    <p className="text-sm text-black/50">
                                        {propos.description}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {
                                            Element.map((element, index) => (
                                                <div key={index} className="  py-4  flex items-start gap-4">
                                                    <span className=" p-4 text-2xl bg-orange-100 text-orange-500 rounded-xl  "> {element.icon} </span>
                                                    <div>
                                                        <h2 className="font-bold text-xl">
                                                            {element.title}
                                                        </h2>
                                                        <p className="text-sm text-black/75">
                                                            {element.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            ))
                        }
                    </motion.div>
                    <div className="w-full rounded-2xl  relative aspect-4/3">
                        <img src={logo} alt={logo} className="object-cover w-full h-full rounded-2xl" />
                        <div className="absolute bottom-5 -left-10 p-8 flex flex-col text-white items-start justify-center bg-orange-500 rounded-xl">
                            <span className="text-3xl font-bold">2000+</span>
                            <span className="text-sm font-bold">Ouvrages disponibles</span>
                        </div>
                    </div>
                </div>
                {/* Description */}


            </div>
            {/* faq */}
            <section className="py-20 bg-orange-50/75   w-full">
                <div className="container mx-auto max-w-5xl px-4 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-2 bg-orange-100  text-orange-500 rounded-full text-sm font-medium mb-6">
                            FAQ
                        </span>
                        <h2 className=" text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Questions fréquentes
                        </h2>
                        <p className="text-black/75">
                            Trouvez rapidement les réponses à vos questions
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={faq.id + index}

                                className=" border rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFaq(faq.id)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50  transition-colors"
                                >
                                    <span className="font-medium text-foreground pr-4">{faq.title}</span>
                                    <IoIosArrowDown
                                        className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${openFaq === faq.id ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openFaq === faq.id ? "max-h-48" : "max-h-0"
                                        }`}
                                >
                                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                                        {faq.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* faq */}
            {/* Others */}
            <section className="my-20 px-4 lg:px-8">
                <div className=" container  max-w-7xl mx-auto flex flex-col gap-4 items-center justify-center bg-orange-500 rounded-2xl py-8 text-white">
                        <h2 className="text-center text-5xl font-bold">
                            Besoin d'un service particulier ?
                        </h2>
                        <p className=" text-center text-white/75">
                            Notre équipe est à votre disposition pour vous accompagner dans toutes vos démarches. N'hésitez pas à nous contacter.
                        </p>
                        <a href="/" className="px-8 py-4 bg-white text-center text-black rounded-xl">
                            Nous contacter
                        </a>
                </div>
            </section>
            {/* Others */}


        </section>
    )
}

export default Container
