import hero from "../../../assets/img/hero.jpeg"
import goal from "../../../assets/img/goal.png"
import people from "../../../assets/img/tranche-dage.png"
import young from "../../../assets/img/young-1.png"
import  heros from "../../../assets/img/hero.jpeg"
import fete from "../../../assets/img/fete.jpg"
import { FiTarget, FiTool } from "react-icons/fi";
import mission from "../../../assets/mission.jpg"
import library2 from "../../../assets/library2.jpg"
import party from "../../../assets/party.jpg"
import { IoIosArrowRoundForward } from "react-icons/io";
import jeune from "../../../assets/jeune.jpg"
import { Link } from "react-router-dom"
import { motion } from "framer-motion";
import { FaBuilding, FaCalendar, FaCalendarCheck, FaUser, FaWrench } from "react-icons/fa"
import { LuGraduationCap, LuPartyPopper } from "react-icons/lu"

const Container = () => {
     const timelineEvents = [
    {
      icon: <FaWrench/>,
      title: "Réhabilitation",
      description: "Afin de permettre aux populations d'apprendre dans un cadre encore plus agréable, le bâtiment a été fermé le 15 Septembre pour une réhabilitation entière.",
      date: "Septembre 2023"
    },
    {
      icon: <FaCalendar/>,
      title: "Réouverture et Direction",
      description: "Il sera réouvert encore plus beau aux populations le Mardi Novembre 2023 et dirigé par M. Siriki QUATTARA, Directeur Général.",
      date: "Novembre 2023"
    }
  ]
   const group = [
    {
      id: "1",
      icon: <FaBuilding/>,
      title: "Inauguration et Description du Bâtiment",
      description: "La Médiathèque Municipale inaugurée le 21 Décembre 2013 par le Ministre François Albert AMICHIA, Maire de la Commune de Treichville, est un bâtiment éducatif et culturel de type R+2. Ce lieu emblématique représente l'engagement de la commune envers l'éducation et la culture pour tous ses habitants.",
      image: heros,
      stats: [
        { label: "Année d'inauguration", value: "2013" },
        { label: "Type de bâtiment", value: "R+2" }
      ]
    },
    {
      id: "2",
      icon: <FiTarget/>,
      title: "Mission et Objectifs",
      description: "C'est un service de la Mairie qui a pour objectif de fournir l'accès à l'information aux populations, d'encourager la lecture et la littérature, de favoriser l'éducation et l'apprentissage des étudiants, de promouvoir la culture et les arts et de stimuler la créativité et l'innovation.",
      image: mission,
      objectives: [
        "Fournir l'accès à l'information",
        "Encourager la lecture et la littérature",
        "Favoriser l'éducation et l'apprentissage",
        "Promouvoir la culture et les arts"
      ]
    },
    {
      id: "3",
      icon: <FaUser/>,
      title: "Rez-de-Chaussée : Espace Jeunesse",
      description: "Le rez-de-chaussée est dédié à la Bibliothèque des Livres Pour Tous Marguerite ABOUET qui accueille les tout-petits et les adolescents de la Maternelle à la Classe de 3ème. Il est composé de 3 grandes salles aménagées et de 3 bureaux.",
      image: jeune,
      features: [
        "Bibliothèque Marguerite ABOUET",
        "Accueil maternelle à 3ème",
        "3 grandes salles aménagées"
      ]
    },
    {
      id: "4",
      icon: <LuGraduationCap />,
      title: "Premier Étage : Espace Adulte",
      description: "Le 1er étage qui est désigné comme l'espace adulte abrite la bibliothèque municipale et la salle multimédia dénommée MTN Digital Center qui a été aménagée et équipée par la Fondation MTN Côte d'Ivoire le 30 Septembre 2015. Ce niveau accueille également les bureaux des agents de la Mairie.",
      image: library2,
      features: [
        "Bibliothèque municipale",
        "MTN Digital Center",
        "Bureaux administratifs"
      ]
      
    },
    // {
    //   id: "5",
    //   icon: <LuPartyPopper />,
    //   title: "Deuxième Étage : Salle de Convivialité",
    //   description: "Au 2ème étage, nous avons la salle de convivialité qui comprend un espace polyvalent pouvant accueillir jusqu'à 200 personnes pour des réunions, des cérémonies, etc... et une salle pour recevoir les invités de marque.",
    //   image: library2,
    //   stats: [
    //     { label: "personnes max", value: "200" },
    //     { label: "salle disponible", value: "1" }
    //   ]
    // }
  ]
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
        // <section>
        //     {
        //         items.map((item, index) => (
        //             <motion.div 
        //             initial={{opacity:0,translateY:30}}
        //                 whileInView={{opacity:1,translateY:0}}
        //                 viewport={{once:false}}
        //                 transition={{delay:0.5,duration:0.5}}
        //             className={`w-full   rounded-3xl   ${index % 2 !== 0 ? "bg-gray-200" : ""}  p-10 lg:p-15 my-20 mx-auto `}>
        //                 <div className={`lg:flex items-center max-w-7xl  mx-auto justify-between  ${index % 2 === 0 ? "flex-row-reverse" : ""}  gap-5  `}>
        //                     <div className="lg:w-1/2">
        //                         <h1 className="text-3xl font-bold text-orange-500">
        //                             {item.title}
        //                         </h1>
        //                         <p className=" text-lg lg:text-xl">
        //                             {item.description}
        //                         </p>
        //                     </div>
        //                     <div className= " w-full  flex justify-center lg:w-1/2">
        //                         <img src={item.image} alt="" className="  h-80" />
        //                     </div>
        //                 </div>
        //             </motion.div>
        //         ))
        //     }
        //     <motion.div 
        //     initial={{opacity:0,translateY:30}}
        //                 whileInView={{opacity:1,translateY:0}}
        //                 viewport={{once:false}}
        //                 transition={{delay:0.5,duration:0.5}}
        //     className=" w-full xl:w-300 rounded-3xl    p-10 lg:p-15 my-20 mx-auto ">
        //         {
        //             vivid.map((items, index) => (
        //                 <div key={index} className={`lg:flex flex-row-reverse   items-center  w-full  mx-auto   gap-5  `}>
        //                     <div className=" w-full lg:w-1/2 grid">
        //                         <h1 className="text-3xl font-bold text-orange-500">
        //                             {items.title}
        //                         </h1>
        //                         <p className=" text-lg lg:text-xl">
        //                             {items.description}
        //                         </p>
        //                         <Link to="/espace" className="w-40 my-10  ">
        //                             <a href="#" className=" font-bold duration-300 transition-all hover:bg-orange-400   px-5 py-3 rounded bg-orange-500 text-white">
        //                                 Voir les espaces
        //                             </a>
        //                         </Link>
        //                     </div>
        //                     <div className=" w-full   lg:w-1/2">
        //                         <img src={items.image} alt="" className="w-full  h-80" />
        //                     </div>
        //                 </div>
        //             ))
        //         }
        //     </motion.div>
        //     <motion.div 
        //     initial={{opacity:0,translateY:30}}
        //                 whileInView={{opacity:1,translateY:0}}
        //                 viewport={{once:false}}
        //                 transition={{delay:0.5,duration:0.5}}
        //     className="w-full xl:w-300 rounded-3xl    p-10 lg:p-15 my-20 mx-auto">
        //             <div className="flex flex-col gap-10 ">
        //                     <div className=" ">
        //                         <h1 className="text-3xl font-bold text-orange-500">
        //                             REHABILITATION
        //                         </h1>
        //                         <p className="text-lg lg:text-xl">
        //                             Afin de permettre aux populations d'apprendre dans un encore plus agréable, le bâtiment a été fermé le 15 Septembre pour une réhabilitation entière.
        //                         </p>
        //                     </div>
        //                     <div>
        //                         <h1 className="text-3xl font-bold text-orange-500">
        //                             REOUVERTURE ET DIRECTION
        //                         </h1>
        //                         <p className="text-lg lg:text-xl">
        //                             Il sera réouvert encore plus beau, aux populations le Mardi Novembre 2023 et dirigé par M. Siriki QUATTARA, Général.
        //                         </p>
        //                     </div>
        //             </div>
        //     </motion.div>
        // </section>
        <>
        {
            group.map((group,index)=>(
                <section key={index} className={`overflow-hidden px-4 lg:px-8  w-full ${index%2===0?" bg-orange-50/75 border-b-gray-300 border-b":""}`}>
                    <div className={`container mx-auto grid grid-cols-1 md:grid-cols-2 lg:flex items-center gap-24 my-24 ${index%2!==0?"flex-row-reverse":""}`}>
                        {/* gauche */}
                        <motion.div 
                        nitial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                            <span className="p-4 rounded-xl bg-orange-100 text-orange-500 text-lg"> {group.icon} </span>
                            <p className="font-bold text-black/50">
                                Etape {index+1}
                            </p>
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold">
                                {group.title}
                            </h2>
                            <p className="lg:w-150 text-black/50">
                                {group.description}
                            </p>
                            {/* stat */}
                            <div  className="flex  items-center gap-6">
                            {group.stats &&(
                                group.stats.map((stat,i)=>(
                                    <div key={i} className="flex flex-col  items-start gap-2">
                                        <span className="text-orange-500 font-bold text-2xl"> {stat.value} </span>
                                        <span className="text-black/50"> {stat.label} </span>
                                    </div>
                                ))
                            )}
                            </div>
                            {/* objectif */}
                            <div  className="grid  items-center gap-2">
                            {group.objectives &&(
                                group.objectives.map((objective,i)=>(
                                    <motion.div 
                                     initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
                                    key={i} className="flex items-center  gap-4">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"/>
                                        <p className="text-black/50">
                                            {objective}
                                        </p>
                                    </motion.div>
                                ))
                            )}
                            </div>
                            {/* feature */}
                            <div  className="flex flex-wrap   items-center gap-2">
                            {group.features &&(
                                group.features.map((feature,i)=>(
                                    <div key={i} className="flex items-center rounded-2xl px-4 bg-slate-300/20 font-medium  gap-4">
                                            {feature}
                                    </div>
                                ))
                            )}
                            </div>

                        </motion.div>
                        {/* gauche */}

                        {/* droite */}
                        <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                        className="aspect-4/2 overflow-hidden">
                            <img src={group.image} alt={group.image} className="w-full h-full object-cover rounded-2xl" />
                        </motion.div>
                        {/* droite */}
                    </div>
                </section>
            ))
        }
        <section className={`overflow-hidden px-4 lg:px-8  w-full bg-orange-50/75 `}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:flex items-center gap-24 my-24 ">
             {/* gauche */}
                        <motion.div 
                         initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
                        className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                            <span className="p-4 rounded-xl bg-orange-100 text-orange-500 text-lg"> <LuPartyPopper /> </span>
                            <p className="font-bold text-black/50">
                                Etape 5
                            </p>
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold">
                                Deuxième Étage : Salle de Convivialité
                            </h2>
                            <p className="lg:w-150 text-black/50">
                                Au 2ème étage, nous avons la salle de convivialité qui comprend un espace polyvalent pouvant accueillir jusqu'à 200 personnes pour des réunions, des cérémonies, etc... et une salle pour recevoir les invités de marque.
                            </p>
                            {/* stat */}
                            <div  className="flex  items-center gap-6">
                             <div  className="flex flex-col  items-start gap-2 bg-white border px-4 py-2 rounded-2xl border-gray-400">
                                        <span className="text-orange-500 font-bold text-2xl"> 200  </span>
                                        <span className="text-black/50"> personnes max  </span>
                                    </div>
                                     <div  className="flex flex-col  items-start gap-2 bg-white border px-4 py-2 rounded-2xl border-gray-400">
                                        <span className="text-orange-500 font-bold text-2xl"> 1  </span>
                                        <span className="text-black/50"> salle disponible  </span>
                                    </div>

                                    
                            </div>
                            <a href="/espace" className="flex items-center duration-500 transition-colors hover:bg-orange-600 gap-2 px-6 py-2 w-fit bg-orange-500 text-white font-bold rounded-2xl">
                                        <span>Découvrir nos espaces</span>
                                        <span className="text-2xl"> <IoIosArrowRoundForward /> </span>
                            </a>

                        </motion.div>
                        {/* gauche */}

                        {/* droite */}
                        <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                        className="aspect-4/2 overflow-hidden">
                            <img src={party} alt={party} className="w-full h-full object-cover rounded-2xl" />
                        </motion.div>
                        {/* droite */}
        </div>
        </section>

        {/* PARCOUS */}
        <section className="overflow-hidden px-4 lg:px-8 my-24 py-12">
            <div className="container mx-auto flex flex-col gap-4">
                <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-2">
                    <span className="text-orange-500 uppercase text-sm font-bold">évolution</span>
                    <h2 className="text-4xl lg:text-7xl font-bold">
                        Notre <span className="text-orange-500">Parcours</span>
                    </h2>
                </motion.div>
                <div className="flex items-start gap-24 justify-center ">
                    {/* gauche */}
                    <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2 * 0.2 }}
                    className="relative lg:grid grid-cols-1 gap-32   hidden">
                        <div className="absolute w-[3px] h-100 left-1/2 bg-gray-200 -z-10"/>
                        <span className="p-4 bg-orange-500 text-2xl text-white rounded-2xl"> <FiTool/> </span>
                        <span className="p-4 bg-orange-500 text-2xl text-white rounded-2xl"> <FaCalendarCheck/> </span>
                    </motion.div>
                    {/* droite */}
                    <div className="grid grid-cols-1 gap-8">
                        <motion.div  
                        initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2 * 0.2 }}
                        className="grid grid-cols-1 gap-2 bg-white px-8 py-2 rounded-2xl border border-slate-300">
                            <span className="text-sm font-bold text-orange-500">Septembre 2023</span>
                            <h2 className="text-2xl font-bold">
                                Réhabilitation
                            </h2>
                            <p className="text-black/50 lg:w-200">
                                Afin de permettre aux populations d'apprendre dans un cadre encore plus agréable, le bâtiment a été fermé le 15 Septembre pour une réhabilitation entière
                            </p>

                        </motion.div>
                        <motion.div  
                        initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 3 * 0.2 }}
                        className="grid grid-cols-1 gap-2 bg-white px-8 py-2 rounded-2xl border border-slate-300">
                            <span className="text-sm font-bold text-orange-500">Novembre 2023</span>
                            <h2 className="text-2xl font-bold">
                                Réouverture et Direction
                            </h2>
                            <p className="text-black/50 lg:w-200">
                                Il sera réouvert encore plus beau aux populations le Mardi Novembre 2023 et dirigé par M. Siriki QUATTARA, Directeur Général.
                            </p>

                        </motion.div>

                    </div>
                </div>
            </div>

        </section>
        <section className="overflow-hidden px-4 lg:px-8 bg-orange-500 py-24 flex justify-center ">
            <motion.div 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{delay:0.3,duration:0.5}}
            className="max-w-7xl mx-auto flex flex-col    items-center text-white gap-4">
                <h2 className="font-bold text-6xl text-center">
                    Venez nous rendre visite
                </h2>
                <p className="text-white/75 lg:w-150 text-center">
                    Découvrez par vous-même tout ce que la Médiathèque de Treichville a à offrir. Nous vous accueillons du lundi au samedi de 09h à 17h.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 lg:gap-12 ">
                    <a href="/espace" className="px-4 py-4 duration-500 hover:bg-white/75 text-black flex gap-2 justify-center rounded-2xl items-center bg-white font-bold text-center ">
                    <span>Explorer nos espaces</span>
                    <span className="text-2xl"> <IoIosArrowRoundForward className="" /> </span>
                    </a>
                    <a href="/service" className="p-4 border rounded-2xl text-center duration-500 hover:bg-white hover:border-none font-bold hover:text-black">
                    Nos services
                    </a>
                </div>
            </motion.div>

        </section>
        </>
    );
};

export default Container;
