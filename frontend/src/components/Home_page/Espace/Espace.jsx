import Card from './Card'
import bibliotheque from "../../../assets/img/bibliothèque.jpg";
import enfant from "../../../assets/img/enfant.jpg";
import salle from "../../../assets/img/salle.jpg";
import fete from "../../../assets/img/fete.jpg";
import { motion } from 'framer-motion';
const Espace = () => {
    const Items = [
        {
            id: "1",
            img: bibliotheque,
            title: "Bibliothèque pour adulte",
            description: "Un espace calme et lumineux pour consulter, lire ou emprunter des ouvrages"
        },
        {
            id: "2",
            img: enfant,
            title: "Bibliothèque pour enfants  ",
            description: "Des livres et animations dédiés aux plus jeunes, dans un cadre convivial.",

        },
        {
            id: "3",
            img: salle,
            title: " Salle multimédia",
            description: " Des postes informatiques modernes avec accès Internet et outils de bureautique."
        },
        {
            id: "4",
            img: fete,
            title: "Salle des fêtes",
            description: "un lieu aux ambiances feutrées, où la convivialité et l'émotion se partagent dans un cadre raffiné."
        }
    ]
    return (
        <section className="overflow-hidden pt-24  py-16">
      <div className="container mx-auto px-4 lg:px-8 grid gap-16">
        {/* Title */}
        <motion.div 
          initial={{translateY:50,opacity:0}}
    whileInView={{translateY:0,opacity:1}}
    transition={{delay:1,duration:0.8}}
    viewport={{once:false}}
        className="grid items-center gap-4">
        <span className="text-orange-500 font-medium text-sm">Nos Espaces</span>
        <h2 className="text-4xl lg:text-7xl font-bold ">
            Découvrez nos <span className="text-orange-500">espaces</span>
        </h2>
            <p className="text-lg md:text-xl max-w-2xl text-gray-400">
            Nous vous accueillons du lundi au samedi de 09h à 17h
            </p>
        </motion.div>
        {/* Title */}
        {/* cartes */}
        <div className='grid grid-cols-1  md:grid-cols-2 gap-6 lg:gap-8'>
            {
                Items.map((item)=>(
                    <Card key={item.id} image={item.img} title={item.title} description={item.description}  />
                ))
            }
        </div>
        {/* cartes */}
      </div>
    </section>
    )
}

export default Espace
