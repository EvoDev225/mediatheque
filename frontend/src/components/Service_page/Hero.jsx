import Navbar from "../../Hero/Navbar";
import { motion } from "framer-motion";
const Hero = () => {
    return (
        <div className="   w-full bg-[url(./assets/img/service_hero.jpg)]   hero  ">
            <div className=" hero_content  ">
                <Navbar />
                <div className=" w-full   lg:w-7xl  lg: mx-auto flex xl:justify-end items-start  my-25    pt-25 lg:pt-0 ">
                    <motion.div 
                    initial={{opacity:0,translateY:10}}
                    animate={{opacity:1,translateY:0}}
                    transition={{delay:0.5,duration:0.5}}

                    className=" w-full text-white  md:mt-5 md:w-[600px]  mb-10     ">
                        <h1 className=" text-[30px] md:text-4xl lg:text-6xl font-bold uppercase ">
                            Nos <span className="text-orange-500">services</span> à votre disposition
                        </h1>
                        <p className=" text-xl  my-2 w-full ">
                            Bienvenue à l’annexe de la mairie dédiée à la culture, à
                            l’éducation et au numérique. Profitez d’un accès à une vaste
                            bibliothèque, à une salle multimédia connectée et à des services
                            administratifs de proximité. Venez lire, apprendre et vous former
                            dans un cadre moderne et convivial.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
