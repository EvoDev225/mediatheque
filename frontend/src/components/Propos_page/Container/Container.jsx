import hero from "../../../assets/img/hero.jpeg"
import goal from "../../../assets/img/goal.png"
import people from "../../../assets/img/tranche-dage.png"
import young from "../../../assets/img/young-1.png"
import fete from "../../../assets/img/fete.jpg"
import { Link } from "react-router-dom"
import { motion } from "framer-motion";

const Container = () => {
    const items = [
        {
            id: "1",
            title: "INAUGURATION ET DESCRIPTION DU BATIMENT",
            description: "La Médiathèque Municipale inaugurée le 21 Décembre 2013 par  Ministre François Albert AMICHIA, Maire de la Commune de  est un bâtiment éducatif et culturel de type R+2.",
            image: hero
        },
        {
            id: "2",
            title: "MISSION ET OBJECTIFS",
            description: "C'est un service de la Mairie qui a pour objectif de fournir l'accès  l'information aux populations, d'encourager la lecture et  littérature, de favoriser l'éducation et l'apprentissage  étudiants, de promouvoir la culture et les arts et de stimuler  créativité et l'innovation.",
            image: goal
        },
        {
            id: "3",
            title: "REZ-DE-CHAUSSEE :  ESPACE JEUNESSE",
            description: "Le rez-de-chaussée est dédié à la Bibliothèque des Livres Pour Tous Marguérite ABOUET qui accueille les tout-petits et les adolescents  la Maternelle à la Classe de 3ème. Il est composé de 3 grandes  aménagées et de 3 bureaux.",
            image: people
        },
        {
            id: "4",
            title: "PREMIER ETAGE : ESPACE ADULTE",
            description: "Le 1er étage qui est désigné comme l'espace adulte abrite bibliothèque municipale et la salle multimédia dénommée MTN  Center qui a été aménagée et équipée par la Fondation MTN d'Ivoire le 30 Septembre 2015. Ce niveau accueille également  bureaux des agents de la Mairie.",
            image: young
        }
    ]
    const vivid = [
        {
            title: "DEUXIEME ETAGE: SALLE CONVIVIALITE",
            description: "Au 2ème étage, nous avons la salle de convivialité qui comprend  espace polyvalent pouvant accueillir jusqu'à 200 personnes pour  réunions, des descérémonies, etc... et une salle pour recevoir les invités de marque.",
            image: fete
        }
    ]
    return (
        <section>
            {
                items.map((item, index) => (
                    <motion.div 
                     initial={{opacity:0,translateY:30}}
                        whileInView={{opacity:1,translateY:0}}
                        viewport={{once:false}}
                        transition={{delay:0.5,duration:0.5}}
                    className={`w-full   rounded-3xl   ${index % 2 !== 0 ? "bg-gray-200" : ""}  p-10 lg:p-15 my-20 mx-auto `}>
                        <div className={`lg:flex items-center max-w-7xl  mx-auto justify-between  ${index % 2 === 0 ? "flex-row-reverse" : ""}  gap-5  `}>
                            <div className="lg:w-1/2">
                                <h1 className="text-3xl font-bold text-orange-500">
                                    {item.title}
                                </h1>
                                <p className=" text-lg lg:text-xl">
                                    {item.description}
                                </p>
                            </div>
                            <div className= " w-full  flex justify-center lg:w-1/2">
                                <img src={item.image} alt="" className="  h-80" />
                            </div>
                        </div>
                    </motion.div>
                ))
            }
            <motion.div 
            initial={{opacity:0,translateY:30}}
                        whileInView={{opacity:1,translateY:0}}
                        viewport={{once:false}}
                        transition={{delay:0.5,duration:0.5}}
            className=" w-full xl:w-300 rounded-3xl    p-10 lg:p-15 my-20 mx-auto ">
                {
                    vivid.map((items, index) => (
                        <div key={index} className={`lg:flex flex-row-reverse   items-center  w-full  mx-auto   gap-5  `}>
                            <div className=" w-full lg:w-1/2 grid">
                                <h1 className="text-3xl font-bold text-orange-500">
                                    {items.title}
                                </h1>
                                <p className=" text-lg lg:text-xl">
                                    {items.description}
                                </p>
                                <Link to="/espace" className="w-40 my-10  ">
                                    <a href="#" className=" font-bold duration-300 transition-all hover:bg-orange-400   px-5 py-3 rounded bg-orange-500 text-white">
                                        Voir les espaces
                                    </a>
                                </Link>
                            </div>
                            <div className=" w-full   lg:w-1/2">
                                <img src={items.image} alt="" className="w-full  h-80" />
                            </div>
                        </div>
                    ))
                }
            </motion.div>
            <motion.div 
            initial={{opacity:0,translateY:30}}
                        whileInView={{opacity:1,translateY:0}}
                        viewport={{once:false}}
                        transition={{delay:0.5,duration:0.5}}
            className="w-full xl:w-300 rounded-3xl    p-10 lg:p-15 my-20 mx-auto">
                    <div className="flex flex-col gap-10 ">
                            <div className=" ">
                                <h1 className="text-3xl font-bold text-orange-500">
                                    REHABILITATION
                                </h1>
                                <p className="text-lg lg:text-xl">
                                    Afin de permettre aux populations d'apprendre dans un encore plus agréable, le bâtiment a été fermé le 15 Septembre pour une réhabilitation entière.
                                </p>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-orange-500">
                                    REOUVERTURE ET DIRECTION
                                </h1>
                                <p className="text-lg lg:text-xl">
                                    Il sera réouvert encore plus beau, aux populations le Mardi Novembre 2023 et dirigé par M. Siriki QUATTARA, Général.
                                </p>
                            </div>
                    </div>
            </motion.div>
        </section>
    )
};

export default Container;
