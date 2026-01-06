import library from "../../assets/hero-library.jpg"
import { motion } from "framer-motion";
const Hero = () => {
    return (
        <section className=" overflow-hidden relative min-h-[60vh] flex items-center  bg-[url('./assets/hero-library.jpg')] bg-cover bg-center   ">
            <div className="absolute inset-0 bg-linear-to-r from-white  to-white/5"/>
            <div className="container mx-auto px-4 lg:px-8 pt-24 z-40">
                <motion.div 
                initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
                className="flex flex-col gap-2">
                    <span className="uppercase px-4 py-2 bg-orange-100 text-orange-500 w-fit rounded-xl font-bold text-sm">à votre service</span>
                    <h1 className="text-4xl lg:text-7xl font-bold lg:w-150">
                        Nos <span className="text-orange-500">Services</span> à votre disposition
                    </h1>
                    <p className="text-gray-600 lg:w-150">
                        Des services numériques, culturels et administratifs pour simplifier votre quotidien et enrichir vos connaissances dans un cadre moderne et convivial.
                    </p>
                </motion.div>
            </div>
            </section>
    );
};

export default Hero;
