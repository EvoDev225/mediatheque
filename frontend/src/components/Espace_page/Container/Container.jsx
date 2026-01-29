import bb from "../../../assets/img/bibliothèque.jpg"
import bb_2 from "../../../assets/img/bibliotheque-2.jpg"
import bb_3 from '../../../assets/img/bibliotheque-3.jpg'
import bb_4 from "../../../assets/img/bibliotheque-4.jpg"
import enf from "../../../assets/img/enfant.jpg"
import enf2 from "../../../assets/img/enfant_2.jpg"
import enf3 from "../../../assets/img/enfant_3.jpg"
import enf4 from "../../../assets/img/bibliotheque_enfant.jpg"
import salle from "../../../assets/img/salle.jpg"
import salle2 from "../../../assets/img/salle-2.jpg"
import salle3 from "../../../assets/img/multimedia-2.jpg"
import salle4 from "../../../assets/img/propos.jpeg"
import fete from "../../../assets/img/fete.jpg"
import fete2 from "../../../assets/img/fete-2.jpg"
import fete3 from "../../../assets/img/fete-3.jpg"
import fete4 from "../../../assets/img/fete-4.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from "framer-motion"
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { BiBookOpen } from "react-icons/bi"
import { FaClock, FaDesktop } from "react-icons/fa"
import { IoPeopleOutline } from "react-icons/io5"
import { LuPartyPopper } from "react-icons/lu";


const Container = () => {
    const Items=[
        {
            logo: <IoPeopleOutline /> ,
            title:"Bibliothèque pour enfants",
            subtitle:"Un univers magique pour les jeunes lecteurs",
            content:"La bibliothèque enfants est un univers coloré et stimulant, conçu éveiller la curiosité et l'imaginaire des jeunes lecteurs. Elle un vaste choix d'albums illustrés, de romans jeunesse, de contes et documentaires adaptés à chaque âge. Des coins lecture douillets et espaces de jeux invitent à la découverte et au rêve. Des heures conte, des ateliers créatifs et des spectacles y sont proposés pour partager le plaisir des histoires et des savoirs.",
            liste:["Albums et romans jeunesse","Heures du conte hebdomadaires","Ateliers créatifs"],
            hour:<FaClock/>,
            dataHour:"Lundi - Samedi : 09h - 17h",
            image:[enf,enf2,enf3,enf4]
        },
        {
            logo: <BiBookOpen/> ,
            title:"Bibliothèque pour adultes",
            subtitle:"Un havre de paix pour les amateurs de lecture",
            content:"La bibliothèque pour adultes est un lieu calme et accueillant dédié  la lecture, à la culture et à l'échange. Elle propose un large  de livres, magazines et bandes dessinées, ainsi que des  confortables pour la lecture, l'étude ou la recherche. Des  comme des clubs de lecture, des expositions et des  littéraires y sont régulièrement organisées pour favoriser le  entre passionnés.",
            liste:["Plus de 2000 ouvrages","Espaces de lecture confortables"],
            hour:<FaClock/>,
            dataHour:"Lundi - Samedi : 09h - 17h",
            image:[bb,bb_2,bb_3,bb_4]
        },
        
        {
            logo: <FaDesktop /> ,
            title:"Salle multimédia",
            subtitle:"Votre porte d'entrée vers le numérique",
            content:"La salle multimédia est un espace dynamique dédié à l'accès  et à la création. Elle met à disposition des ordinateurs,  tablettes et des ressources en ligne, avec un accès gratuit à  pour la recherche d'information, le travail personnel ou la  Des cours d'initiation à l'outil informatique et des  spécialisées en bureautique, en développement web et en infographie  sont régulièrement proposés. Des ateliers autour du jeu vidéo ou de  photo sont également organisés pour développer ses compétences  façon ludique et créative.",
            liste:["15 postes informatiques","Accès Wi-Fi gratuit","Formations numériques","Impression et photocopie"],
            hour:<FaClock/>,
            dataHour:"Lundi - Samedi : 09h - 17h",
            image:[salle,salle2,salle3,salle4]
        },
        {
            logo: <LuPartyPopper /> ,
            title:"Salle des fêtes",
            subtitle:"L'écrin parfait pour vos événements",
            content:"La salle des fêtes est un espace modulable et convivial, idéal  les mariages, anniversaires, cérémonies et autres  Disponible à la location, elle permet d'organiser des  privées ou culturelles dans un cadre agréable. Les peuvent également personnaliser la décoration selon leurs  faisant de chaque événement un moment unique et mémorable.",
            liste:["Capacité jusqu'à 200 personnes","Équipement audio-visuel"],
            hour:<FaClock/>,
            dataHour:"Sur réservation",
            image:[fete,fete2,fete3,fete4]
        },
    ]
    return (
        <main >
            {
            Items.map((item,index)=>(
            <section key={index} className={`overflow-hidden pt-24 py-8 grid    ${index%2!==0?"bg-orange-50/75":""} `}>
        <div className={`container mx-auto max-w-7xl grid  xl:flex items-center ${index%2!==0?"flex-row-reverse":""} gap-24 my-24   px-4 lg:px-8`}>
                {/* Gauche */}
                <motion.div 
                 initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{once:false}}
                className="flex flex-col gap-4 xl:w-1/2  ">
                    <p className="flex items-center gap-2 font-bold text-orange-500 text-xl"><span className="p-4 bg-orange-50 text-orange-500 rounded-xl "> {item.logo} </span>Espace {index+1} </p>
                    <h2 className=" text-2xl lg:text-4xl font-bold">
                        {item.title}
                    </h2>
                    <span className="text-lg font-medium text-orange-500">
                        {item.subtitle}
                    </span>
                    <p className="text-black/50  ">
                        {item.content}
                    </p>
                    <div className="flex flex-col  gap-2  ">
                        {item.liste.map((list,index)=>(
                            <motion.div 
                             initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center gap-4 ">
                                <div className="p-1 rounded-full bg-orange-500 w-fit"/>
                                <span key={index}> {list} </span>
                            </motion.div>
                        ))}
                    </div>
                    <div className="rounded-full px-4 py-1 bg-orange-100 w-fit text-orange-500 gap-4 flex items-center">
                        {item.hour} {item.dataHour}
                    </div>
                </motion.div>
                {/* Gauche */}
                {/* Droite */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl xl:w-1/2">
                    <Swiper
                    pagination={{
                    type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="aspect-4/3">
                        {
                            item.image.map((img,index)=>(
                                <SwiperSlide key={index}>
                                    <img src={img}
                                    alt={img + index}
                                    className="w-full h-full object-cover"
                                    />
                                </SwiperSlide>
                            ))
                        }

                </Swiper>
                </div>
                {/* Droite */}
                
            </div>

        </section>
                ))
            }
            <div className="w-full bg-orange-500 mt-50">
                <motion.div 
                 initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
                className="container mx-auto max-7xl flex flex-col items-center justify-center py-25">
                        <h2 className="text-5xl font-bold text-white text-center">
                            Prêt à nous rendre visite ?
                        </h2>
                        <p className="text-white/75 text-center">
                            Nos équipes sont à votre disposition pour vous accueillir et vous guider dans nos différents espaces.
                        </p>
                        <a href="/" className=" px-6 py-4 font-bold bg-white text-orange-500 rounded-2xl my-8">
                            Nous contactez

                        </a>
                </motion.div>

            </div>
    
        </main>
        
    )
};

export default Container;
