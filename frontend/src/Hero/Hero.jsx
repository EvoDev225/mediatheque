import { BiBookOpen } from "react-icons/bi";
import Navbar from "./Navbar";
// eslint-disable-next-line no-unused-vars
import  { motion}  from "framer-motion";
import { FaWifi } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
const Hero = () => {
  const Items = [
    {
      icon : <BiBookOpen/>,
      title:"Bibliothèque",
      content:"Plus de 2500 ouvrages à votre disposition"
    },
    {
      icon : <FaWifi/>,
      title:"Espace numérique",
      content:"Salle multimédia avec accès internet haut débit"
    },
    {
      icon : <IoPeopleSharp />,
      title:"Ateliers & Formations",
      content:"Événements culturels et formations régulière"
    }
  ]
  return (
    // <div className="  overflow-hidden  w-full bg-[url(./assets/img/hero.jpeg)]   hero  ">
    //   <div className=" hero_content  ">
        
    //     <div className=" w-full   lg:w-7xl  lg: mx-auto flex flex-col     pt-25 ">
    //       <motion.div
    //       initial={{opacity:0,translateY:10}}
    //       animate={{opacity:1,translateY:0}}
    //       transition={
    //         {
    //           delay:0.6,
    //           duration:0.5
    //         }
    //       }
    //       className=" w-full text-white overflow-hidden  md:mt-5 md:w-[850px]  mb-10 px-4    ">
    //         <h1 className=" text-[30px] md:text-4xl lg:text-6xl font-bold uppercase ">
    //           Bienvenue dans <span className=" text-orange-500"> la médiathèque  municipale</span> - Un espace de savoir et
    //           de service
    //         </h1>
    //         <p className=" text-xl  my-2 w-full ">
    //           Bienvenue à l’annexe de la mairie dédiée à la culture, à
    //           l’éducation et au numérique. Profitez d’un accès à une vaste
    //           bibliothèque, à une salle multimédia connectée et à des services
    //           administratifs de proximité. Venez lire, apprendre et vous former
    //           dans un cadre moderne et convivial.
    //         </p>
    //         <div className=" my-8  ">
    //           <a href="#" className=" md:text-xl  mr-5 px-5 py-3 bg-orange-500 rounded-xl duration-300 transition-all hover:bg-orange-400  ">Nous joindre</a>
    //           <a href="#" className=" md:text-xl  mr-5 px-5 py-3 border-2 rounded-xl duration-300 transition-all hover:bg-white hover:text-black hover:border-none ">En savoir plus</a>
    //         </div>
    //       </motion.div>
    //     </div>
    //   </div>
    // </div>
    <section className="  min-h-screen overflow-hidden relative bg-cover pt-24    bg-center bg-no-repeat bg-[url('./assets/hero-library.jpg')]">
      <div className="absolute inset-0 w-full bg-black/50 z-10"/>
      <div 
      
      className="container mx-auto px-4 lg:px-8  min-h-screen flex items-center pt-24 py-4 lg:py-8  ">
          <motion.div 
          initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            
          className="grid lg:grid-cols-2 gap-12 items-center lg:gap-16 z-40">
            {/* Section gauche */}
            <div className="text-white grid gap-4">
              <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2 px-4 py-2 w-fit font-medium  bg-orange-500 text-white text-sm rounded-full"><BiBookOpen className="w-4 h-4"/> Bienvenue à la médiathèque municipale</motion.span>
            <motion.h1 
            initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            className=" text-4xl  lg:text-7xl  text-white  font-bold ">
              Un espace de <span className="text-orange-500">savoir</span> et de <span className="text-orange-500">culture</span>
            </motion.h1>
            <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg lg:text-xl text-white/75">
              Découvrez notre bibliothèque, salle multimédia connectée et services administratifs. Un cadre moderne et convivial pour lire, apprendre et vous former.
            </motion.p>

            <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-8">
            <a href="#contact" className="px-4 py-2 bg-orange-500 font-medium rounded-full duration-200 transition-colors  hover:bg-orange-600">Nous joindre</a>
            <a href="#propos" className="px-4 py-2 bg-none font-medium rounded-full duration-200 border hover:border-none transition-colors  hover:bg-white hover:text-black">En savoir plus </a>
            </motion.div>
             <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 grid grid-cols-1  md:grid-cols-3 gap-6 border-t border-white/10 pt-8"
            >
              {[
                { number: "15K+", label: "Ouvrages" },
                { number: "500+", label: "Membres" },
                { number: "20+", label: "Événements/mois" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <p className="font-serif text-2xl font-bold text-orange-500 md:text-3xl">
                    {stat.number}
                  </p>
                  <p className="text-sm text-white/50">{stat.label}</p>
                </div>
              ))}
            </motion.div>
            </div>
            {/* stat */}
            
            {/* Section gauche */}
        {/* Section droite */}
        <div className="grid gap-8">
          {
            Items.map((item,index)=>(
              <div key={index} className="flex items-center group duration-500 lg:w-110 transition-all hover:border hover:border-orange-500  text-white gap-4 px-8 py-4 bg-transparent backdrop-blur-2xl rounded-lg">
                <span className="p-4 rounded-xl bg-orange-500/50 group-hover:bg-orange-500 duration-600 text-white"> {item.icon} </span>
                <div className="grid ">
                    <p className="font-medium">{item.title}</p>
                    <span className="text-white/50">{item.content}</span>
                </div>
              </div>
            ))
          }
        </div>
        {/* Section droite */}
          </motion.div>
        
        
        
      </div>
    </section>
  );
};

export default Hero;
