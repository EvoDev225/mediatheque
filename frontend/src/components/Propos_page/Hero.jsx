import Navbar from "../../Hero/Navbar";
import { motion } from "framer-motion";

const Hero = () => {
    return (
    <section className=" overflow-hidden relative min-h-[60vh] flex items-center  bg-[url('./assets/hero-space.jpg')] bg-cover bg-center   ">
            <div className="absolute inset-0 bg-linear-to-r from-white  to-white/5"/>
            <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 lg:px-8 pt-24 z-40">
                <div className="flex flex-col gap-2">
                    <span className="uppercase px-4 py-2 bg-orange-100 text-orange-500 w-fit rounded-xl font-bold text-sm">Notre histoire</span>
                    <h1 className="text-4xl lg:text-7xl font-bold lg:w-150">
                        A propos de la <span className="text-orange-500">médiathèque</span> 
                    </h1>
                    <p className="text-gray-600 lg:w-150">
                        Un espace culturel et éducatif au cœur de Treichville, dédié à l'apprentissage, la découverte et le partage depuis 2013.
                    </p>
                </div>
            </motion.div>
            </section>
    );
};

export default Hero;
