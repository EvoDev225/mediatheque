import Card from "./Card"
import  propos from "../../../assets/img/propos.jpeg"
import { motion } from "framer-motion"
import { FaCheck } from "react-icons/fa";
const proposImage = "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop";

const Propos = () => {

    // sproposItemHomePage
    const Items = [
        {
            id: "1",
            title: "Un Espace Culturel au Cœur de Treichville",
            description: "Annexe culturelle de la Mairie de Treichville, notre médiathèque est un espace public dédié à la culture, à l'éducation et au numérique."
        },
        {
            id: "2",
            title: "Votre Lieu d'Apprentissage et de Partage    ",
            description: " Elle met à disposition des habitants un lieu d'apprentissage, de découverte et de partage à travers une bibliothèque riche, une salle multimédia connectée et des services administratifs de proximité"
        },
        {
            id: "3",
            title: " Notre Mission : Faciliter l'Accès au Savoir",
            description: " Notre mission est de faciliter l'accès au savoir et aux outils numériques pour tous, dans un environnement convivial et moderne, au service du développement local."
        }
    ]
    return (
        // <div
        // className="w-full z-1   my-25  xl:w-300 lg: mx-auto flex flex-col px-10 lg:px-0  py-20">
        //     <div className="  lg:pl-25 ">
        //         <motion.h1 
        //         initial={{opacity:0}}
        //         whileInView={{opacity:1}}
        //         className=" text-orange-500 text-[30px] md:text-4xl lg:text-6xl font-bold uppercase">
        //             A propos  de <br /> la médiathèque
        //         </motion.h1>
        //     </div>
        //     <div className="lg:flex items-center w-full lg:px-25 mt-5 lg:mt-10 gap-4">
        //         <motion.div
        //          initial={{opacity:0,translateX:-50}}
        //          whileInView={{opacity:1,translateX:0}}
        //          transition={{delay:0.5,duration:0.5}}
        //          viewport={{once:false}}
        //         className=" w-full lg:w-2/5 ">
        //             {
        //                 proposItemHomePage.map((propos)=>(
        //                     <Card key={propos.id} title={propos.title} description={propos.description}  />
        //                 ))
        //             }
        //         </motion.div>
        //         <motion.img 
        //         initial={{opacity:0,translateX:50}}
        //          whileInView={{opacity:1,translateX:0}}
        //          transition={{delay:0.8,duration:0.5}}
        //          viewport={{once:false}}
        //         src={propos} alt="propos" className="w-full  object-cover lg:w-3/5 lg:h-130 mt-5 lg:mt-0" />

        //     </div>
        // </div>
        <section id="propos" className="overflow-hidden pt-24  py-16">
      <motion.div 
      initial={{translateY:50,opacity:0}}
    whileInView={{translateY:0,opacity:1}}
    transition={{delay:1,duration:0.8}}
    viewport={{once:false}}
      className="container mx-auto px-4 lg:px-8 grid gap-16 max-w-7xl">
        {/* Title */}
        <div className="grid items-center gap-4">
        <span className="text-orange-500 font-medium text-sm">A Propos</span>
        <h2 className="text-4xl lg:text-7xl font-bold ">
            A propos de la <span className="text-orange-500">médiathèque</span>
        </h2>
        </div>
        {/* Title */}
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* items */}
        <div className="grid  items-center ">
            {
                Items.map((item,index)=>(
                    <div key={index} className="flex items-start gap-4 " >
                        <span className="p-4 text-orange-500 bg-orange-50 rounded-full"><FaCheck /></span>
                        <div className="grid  items-center">
                            <h2 className="text-xl md:text-2xl font-bold"> {item.title} </h2>
                            <p className="text-sm text-black/50">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
        {/* items */}
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
            <img
              src={proposImage}
              alt="Médiathèque de Treichville"
              className="relative rounded-2xl shadow-elegant w-full h-[400px] lg:h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-orange-500 text-white rounded-2xl p-6 shadow-lg">
              <p className="font-heading text-3xl font-bold">10+</p>
              <p className="text-sm opacity-90">Années d'expérience</p>
            </div>
          </motion.div>

        </div>
        {/* Content */}
    </motion.div>
    </section>
    )
}

export default Propos
