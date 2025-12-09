import { motion } from "framer-motion";
import { FaComputer, FaPrint } from "react-icons/fa6";
import { FaBook, FaBrain, FaLandmark, FaPalette } from "react-icons/fa";
import feature from "../../../assets/img/key.png"
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";
const Container = () => {
    const [openFaqs, setOpenFaqs] = useState({});
    const handleFaqClick = (id) => {
        setOpenFaqs(prev => ({ ...prev,[id]: !prev[id]}));
    };
    const espaceItemsHomePage = [
        {
            id: "1",
            item: <FaComputer />,
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
    const propos = [
        {
            title: "Pourquoi nous suivre ?",
            description: "Parce que votre médiathèque est un lieu vivant qui va bien au-delà des simples rayonnages. Nous suivre, c'est avoir une longueur d'avance en étant informé en premier de nos nouvelles acquisitions et des coups de cœur de nos bibliothécaires. C'est aussi ne rien manquer de notre programmation culturelle riche et variée - expositions, concerts, rencontres d'auteurs et ateliers créatifs. Vous y découvrirez des contenus exclusifs et inspirants, et rejoindrez une communauté de passionnés avec laquelle échanger. Restez connectés pour vivre l'aventure culturelle avec nous, même en dehors de nos murs !",
            image: feature
        }
    ]
    const question = [
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
        <section>
            <div className="w-full z-1  rounded-3xl my-25  xl:w-300 lg: mx-auto    items-center     gap-8  px-10 lg:px-0  py-20">
                <div className=" flex flex-wrap items-center justify-center">
                    {espaceItemsHomePage.map((item) => (
                        <motion.div
                        initial={{opacity:0,translateX:30}}
                        whileInView={{opacity:1,translateX:0}}
                        viewport={{once:false}}
                        transition={{delay:0.5,duration:0.5}}
                        className="   p-4 grid items-start gap-4  justify-center w-100">
                            <div className=" text-4xl w-20 h-20 flex items-center justify-center rounded-2xl box_shadow">{item.item}</div>
                            <h1 className="text-3xl font-bold text-orange-500">
                                {item.title}
                            </h1>
                            <p className="text-xl">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="w-full  rounded-2xl bg-gray-200 my-20 mx-auto px-10  py-20">
                {
                    propos.map((item) => (
                        <div className=" w-full lg:flex items-center justify-between lg:max-w-7xl mx-auto ">
                            <motion.div
                            initial={{opacity:0,translateX:-30}}
                        whileInView={{opacity:1,translateX:0}}
                        viewport={{once:false}}
                        transition={{delay:0.5,duration:0.5}}
                            className="lg:w-1/2 grid gap-4 w-full">
                                <h1 className=" text-5xl font-bold text-orange-500">{item.title}</h1>
                                <p className="text-lg">
                                    {item.description}
                                </p>
                            </motion.div>
                            <div className=" flex items-center justify-center w-full lg:w-1/3">
                                <motion.img
                                initial={{opacity:0,translateX:30}}
                        whileInView={{opacity:1,translateX:0}}
                        viewport={{once:false}}
                        transition={{delay:0.5,duration:0.5}}
                                src={feature} alt="" />
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="w-full lg:max-w-7xl rounded-2xl  my-20 mx-auto px-10  py-20" >
                <ul className=" grid gap-10">
                    {question.map((faq) => (
                        <li key={faq.id} onClick={() => handleFaqClick(faq.id)} className="box_shadow rounded-xl px-5 sm:px-10 py-3 cursor-pointer transition-all duration-300 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span>{faq.id}. </span>
                                    <p className="font-medium">
                                        {faq.title}
                                    </p>
                                </div>
                                <div className={`transition-transform duration-300 ${openFaqs[faq.id] ? "rotate-180" : ""}`}>
                                    <FaAngleDown />
                                </div>
                            </div>
                            <div className={`overflow-hidden text-sm md:text-lg transition-all duration-300 ${openFaqs[faq.id] ? "max-h-40 opacity-100 my-4" : "max-h-0 opacity-0"}`}>
                                <p className="text-gray-600">
                                    {faq.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Container
