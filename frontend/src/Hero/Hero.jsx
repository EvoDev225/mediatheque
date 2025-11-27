import Navbar from "./Navbar";
import  { motion}  from "framer-motion";
const Hero = () => {
  return (
    <div className=" border-2 overflow-hidden  w-full bg-[url(./assets/img/hero.jpeg)]   hero  ">
      <div className=" hero_content  ">
        <Navbar />
        <div className=" w-full   lg:w-7xl  lg: mx-auto flex flex-col     pt-25 ">
          <motion.div
          initial={{opacity:0,translateY:10}}
          animate={{opacity:1,translateY:0}}
          transition={
            {
              delay:0.6,
              duration:0.5
            }
          }
          className=" w-full text-white overflow-hidden  md:mt-5 md:w-[850px]  mb-10     ">
            <h1 className=" text-[30px] md:text-4xl lg:text-6xl font-bold uppercase ">
              Bienvenue dans <span className=" text-orange-500"> la médiathèque  municipale</span> - Un espace de savoir et
              de service
            </h1>
            <p className=" text-xl  my-2 w-full ">
              Bienvenue à l’annexe de la mairie dédiée à la culture, à
              l’éducation et au numérique. Profitez d’un accès à une vaste
              bibliothèque, à une salle multimédia connectée et à des services
              administratifs de proximité. Venez lire, apprendre et vous former
              dans un cadre moderne et convivial.
            </p>
            <div className=" my-8  ">
              <a href="#" className=" md:text-xl  mr-5 px-5 py-3 bg-orange-500 rounded-xl duration-300 transition-all hover:bg-orange-400  ">Nous joindre</a>
              <a href="#" className=" md:text-xl  mr-5 px-5 py-3 border-2 rounded-xl duration-300 transition-all hover:bg-white hover:text-black hover:border-none ">En savoir plus</a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
