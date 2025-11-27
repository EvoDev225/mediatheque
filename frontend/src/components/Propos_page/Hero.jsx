import Navbar from "../../Hero/Navbar";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <div className=" border-2  w-full bg-[url(./assets/img/bibliothèque.jpg)]   hero  ">
            <div className=" hero_content  ">
                <Navbar />
                <motion.div 
                initial={{opacity:0,translateY:50}}
                    animate={{opacity:1,translateY:0}}
                    transition={{delay:0.5,duration:0.5}}
                className=" w-full   lg:w-7xl  lg: mx-auto flex flex-col sm:my-25  md:my-50   pt-25 ">
                    <div className=" w-full text-white  md:mt-5 sm:w-[600px]   mb-10 p-10     ">
                        <h1 className=" text-[30px] md:text-4xl lg:text-6xl font-bold uppercase ">
                            A propos de <span className="text-orange-500">la médiathèque</span>
                        </h1>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
