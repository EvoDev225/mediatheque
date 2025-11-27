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


const Container = () => {
    const Item = [
        {
            id: "1",
            title: "Bibliothèque pour adultes",
            image: [bb, bb_2, bb_3, bb_4],
            description: "La bibliothèque pour adultes est un lieu calme et accueillant dédié  la lecture, à la culture et à l'échange. Elle propose un large  de livres, magazines et bandes dessinées, ainsi que des  confortables pour la lecture, l'étude ou la recherche. Des  comme des clubs de lecture, des expositions et des  littéraires y sont régulièrement organisées pour favoriser le  entre passionnés.",
        },
        {
            id: "2",
            title: "Bibliothèque pour enfants",
            description: "La bibliothèque enfants est un univers coloré et stimulant, conçu éveiller la curiosité et l'imaginaire des jeunes lecteurs. Elle un vaste choix d'albums illustrés, de romans jeunesse, de contes et documentaires adaptés à chaque âge. Des coins lecture douillets et espaces de jeux invitent à la découverte et au rêve. Des heures conte, des ateliers créatifs et des spectacles y sont proposés pour partager le plaisir des histoires et des savoirs.",
            image: [enf, enf2, enf3, enf4]
        },
        {
            id: "3",
            title: "Salle multimédia",
            description: "La salle multimédia est un espace dynamique dédié à l'accès  et à la création. Elle met à disposition des ordinateurs,  tablettes et des ressources en ligne, avec un accès gratuit à  pour la recherche d'information, le travail personnel ou la  Des cours d'initiation à l'outil informatique et des  spécialisées en bureautique, en développement web et en infographie  sont régulièrement proposés. Des ateliers autour du jeu vidéo ou de  photo sont également organisés pour développer ses compétences  façon ludique et créative.",
            image: [salle, salle2, salle3, salle4]
        },
        {
            id: '4',
            title: "Salle des fêtes",
            description: "La salle des fêtes est un espace modulable et convivial, idéal  les mariages, anniversaires, cérémonies et autres  Disponible à la location, elle permet d'organiser des  privées ou culturelles dans un cadre agréable. Les peuvent également personnaliser la décoration selon leurs  faisant de chaque événement un moment unique et mémorable.",
            image: [fete, fete2, fete3, fete4]
        }
    ];
    return (
        < >
            {
                Item.map((box, index) => (
                    <div>
                        <motion.section 
                        initial={{opacity:0,translateY:50}}
                        whileInView={{opacity:1,translateY:0}}
                        viewport={{once:false}}
                        transition={{delay:0.5,duration:1}}
                        key={box.id} className={`w-full     rounded-3xl ${index % 2 !== 0 ? "bg-gray-200" : ""}  p-10 lg:p-15 my-20 mx-auto `}>
                      <div className="flex justify-center ">
                          <div className="w-full  lg:w-300  ">
                            <div>
                                <h1 className="text-4xl uppercase text-orange-500"> {box.title} </h1>
                                <p className=" text-sm  md:text-xl">
                                    {box.description}
                                </p>
                            </div>
                            <Swiper
                                pagination={{
                                    type: 'fraction',
                                }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                className="flex">
                                {
                                    box.image.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={image}
                                                className=" cursor-grab w-full  h-70 md:h-100 lg:h-150 rounded-2xl my-10"
                                            />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                      </div>
                    </motion.section>
                    </div>
                ))
            }
        </>
    )
};

export default Container;
