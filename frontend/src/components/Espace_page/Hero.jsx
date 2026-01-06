import { FaClock, FaMap, FaMapMarkerAlt, FaMarker } from "react-icons/fa";

import {motion} from "framer-motion"
const Hero = () => {
    return (
    <section className=" min-h-screen overflow-hidden relative bg-cover pt-24 flex flex-col    bg-center bg-no-repeat bg-[url('./assets/hero-space.jpg')]">
        <div className="absolute inset-0 w-full min-h-screen z-10 bg-black/60"/>
        <div className="container max-w-7xl mx-auto text-white  flex flex-col justify-between     items-center mt-15 lg:mt-40 pt-24 px-4 lg:px-8 ">
            <div className="flex flex-col gap-2 z-40  items-center ">
                <motion.span 
                 initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
                className="text-orange-500 font-bold text-sm uppercase">Bienvenue à la médiathèque</motion.span>
                <motion.h1 
                initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-7xl text-center">
                    Découvrez nos <span className="text-orange-500"> Espaces</span>
                </motion.h1>
                <motion.p 
                 initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white text-center text-md w-fit">
                    Des lieux pensés pour la lecture, l'apprentissage, la créativité et les célébrations. Nous vous accueillons du lundi au samedi de 09h à 17h.
                </motion.p>
                <p className="flex items-center gap-2 text-sm text-white/75">
                    <span className="text-orange-500"><FaClock/></span>
                    <span>Lun-Sam :  09h-17h</span>
                    <span className="text-orange-500"><FaMapMarkerAlt /></span>
                    <span >Avenue 8 Rue 7, Treichville</span>
                </p>
            </div>
        </div>
    </section>
    );
};

export default Hero;
