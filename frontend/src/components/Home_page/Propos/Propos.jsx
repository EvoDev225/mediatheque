import Card from "./Card"
import  propos from "../../../assets/img/propos.jpeg"
import { motion } from "framer-motion"
const Propos = () => {

    // sproposItemHomePage
    const proposItemHomePage = [
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
        <div
        className="w-full z-1   my-25  xl:w-300 lg: mx-auto flex flex-col px-10 lg:px-0  py-20">
            <div className="  lg:pl-25 ">
                <motion.h1 
                initial={{opacity:0}}
                whileInView={{opacity:1}}
                className=" text-orange-500 text-[30px] md:text-4xl lg:text-6xl font-bold uppercase">
                    A propos  de <br /> la médiathèque
                </motion.h1>
            </div>
            <div className="lg:flex items-center w-full lg:px-25 mt-5 lg:mt-10 gap-4">
                <motion.div
                 initial={{opacity:0,translateX:-50}}
                 whileInView={{opacity:1,translateX:0}}
                 transition={{delay:0.5,duration:0.5}}
                 viewport={{once:false}}
                className=" w-full lg:w-2/5 ">
                    {
                        proposItemHomePage.map((propos)=>(
                            <Card key={propos.id} title={propos.title} description={propos.description}  />
                        ))
                    }
                </motion.div>
                <motion.img 
                initial={{opacity:0,translateX:50}}
                 whileInView={{opacity:1,translateX:0}}
                 transition={{delay:0.8,duration:0.5}}
                 viewport={{once:false}}
                src={propos} alt="propos" className="w-full  object-cover lg:w-3/5 lg:h-130 mt-5 lg:mt-0" />

            </div>
        </div>
    )
}

export default Propos
