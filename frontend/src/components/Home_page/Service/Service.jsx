import { FaComputer, FaPrint } from "react-icons/fa6";
import { FaBook, FaBrain, FaLandmark, FaPalette } from "react-icons/fa";
import Card from "./Card"
import { motion } from "framer-motion";
const Service = () => {
  
  // service items home page
  const Items = [
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
    <section className="overflow-hidden pt-24  py-16 bg-orange-50/75">
      <div 
    
      className="container mx-auto px-4 lg:px-8 grid gap-16">
        {/* Title */}
        <motion.div 
          initial={{translateY:50,opacity:0}}
          whileInView={{translateY:0,opacity:1}}
          transition={{delay:1,duration:0.8}}
          viewport={{once:false}}
          className="grid items-center gap-4">
          <span className="text-orange-500 font-medium text-sm">Nos Services</span>
          <h2 className="text-4xl lg:text-7xl font-bold max-w-150">
            Nos services a votre <span className="text-orange-500">disposition</span>
          </h2>
            <p className="text-lg md:text-xl max-w-2xl text-gray-400">
              Des services numériques, culturels et administratifs pour simplifier votre quotidien.
            </p>
        </motion.div>
        {/* Title */}
        {/* cartes */}
        <div className=" w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            Items.map((item,index)=>(
            <Card index={index} key={item.id} item={item.item} title={item.title} description={item.description} />
            ))
          }
        </div>
        {/* cartes */}
      </div>
    </section>
  )
}

export default Service
