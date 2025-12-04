import { FaComputer, FaPrint } from "react-icons/fa6";
import { FaBook, FaBrain, FaLandmark, FaPalette } from "react-icons/fa";
import Card from "./Card"
import { motion } from "framer-motion";
const Service = () => {
  
  // service items home page
  const serviceItemsHomePage = [
      {
          id: "1",
          item: <FaComputer/> ,
          title: "Wi-Fi & Ordinateurs",
          description: "Utilisez nos ordinateurs connectés et profitez d’un accès Wi-Fi gratuit."
      },
      {
          id: "2",
          item: <FaBook />,
          title: "Emprunt de livres",
          description: "Consultez ou empruntez des ouvrages gratuitement."
      },
      {
          id: "3",
          item: <FaPrint />,
          title: "Impression & photocopie",
          description: "Imprimez ou photocopiez vos documents directement sur place."
      },
      {
          id: "4",
          item: <FaBrain />,
          title: "Formations numériques",
          description: "Initiez-vous à l’informatique, la bureautique ou la recherche en ligne."
      },
      {
          id: "5",
          item: <FaLandmark />,
          title: "Aide aux démarches",
          description: " Accompagnement pour remplir vos formulaires ou effectuer des démarches."
      },
      {
          id: "6",
          item: <FaPalette />,
          title: "Ateliers culturels",
          description: "Participez à des ateliers créatifs et des animations tous publics.."
      }
  ]
  return (
    <motion.div 
    initial={{translateY:50,opacity:0}}
    whileInView={{translateY:0,opacity:1}}
    transition={{delay:1,duration:0.8}}
    viewport={{once:false}}
    
    className="w-full z-1 rounded-3xl my-25  xl:w-300 lg: mx-auto flex flex-col px-10 lg:px-0  py-20">
      <div className="  lg:pl-25">
        <h1 className=" text-orange-500 text-[30px] md:text-4xl lg:text-6xl font-bold uppercase">
          Nos services  à <br /> votre dispostion
        </h1>
        <p className=" text-xl md:text-2xl  my-2 ">
          Des services numériques, culturels et administratifs <br /> à votre disposition pour simplifier votre quotidien.
        </p>
      </div>
      <div className="flex flex-wrap items-center     gap-8 justify-center ">
        {serviceItemsHomePage.map((service)=>(
          <Card key={service.id} item={service.item} title={service.title}  description={service.description} />
        ))}
        
      </div>
    </motion.div>
  )
}

export default Service
