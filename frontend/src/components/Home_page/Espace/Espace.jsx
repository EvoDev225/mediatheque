import Card from './Card'
import bibliotheque from "../../../assets/img/bibliothèque.jpg";
import enfant from "../../../assets/img/enfant.jpg";
import salle from "../../../assets/img/salle.jpg";
import fete from "../../../assets/img/fete.jpg";
import { motion } from 'framer-motion';
const Espace = () => {
    const espaceItemsHomePage = [
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
        <div className='bg-[#E9ECEF] '>
            <motion.div
                initial={{ opacity: 0, translateY: 50 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.5,duration:0.5 }}
                viewport={{ once: false }}
                className="w-full z-1  rounded-3xl my-25  xl:w-300 lg: mx-auto flex flex-col px-10 lg:px-0   py-20">
                <div className=' lg:pl-25'>
                    <h1 className=" text-orange-500 text-[30px] md:text-4xl lg:text-5xl font-bold uppercase">
                        Découvrez <br /> nos Espaces
                    </h1>
                    <p className=" text-2xl  my-2 ">
                        Nous vous accueillons du lundi au samedi de 09h à 17h
                    </p>
                </div>
                <div className="flex flex-wrap items-center my-15   gap-12 justify-center    py-10">
                    {
                        espaceItemsHomePage.map((item) => (
                            <Card key={item.id} image={item.img} title={item.title} description={item.description} />
                        ))
                    }
                </div>
            </motion.div>
        </div>
    )
}

export default Espace
