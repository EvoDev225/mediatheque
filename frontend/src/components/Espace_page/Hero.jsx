import Navbar from "../../Hero/Navbar";
import {motion} from "framer-motion"
const Hero = () => {
    return (
        <div className=" border-2  w-full bg-[url(./assets/img/bibliotheque-3.jpg)]   hero  ">
            <div className=" hero_content  ">
                <Navbar />
                <div className=" w-full   lg:w-7xl  lg: mx-auto flex flex-col sm:my-25  md:my-50   pt-25 ">
                    <motion.div
                    initial={{opacity:0, translateX:100}}
                    animate={{opacity:1,translateX:0}}
                    transition={{delay:0.5,duration:0.5}}
                    className=" w-full text-white  md:mt-5 sm:w-[550px]   mb-10 p-10     ">
                        <h1 className=" text-[30px] md:text-4xl lg:text-7xl font-bold uppercase ">
                            Découvrez nos <span className="text-orange-500">Espaces</span>
                        </h1>
                        <p className=" text-xl  my-2 w-full font-secondary ">
                            Nous vous accueillons du lundi au samedi de 09h à 17h
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
