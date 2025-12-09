
import operator from "./assets/operator.png";
import { BiPhoneCall } from "react-icons/bi";
import { BiMailSend } from "react-icons/bi";
import { BiMap } from "react-icons/bi";
import { motion } from "framer-motion";
const Contact = () => {
  return (
    <motion.div 
    initial={{opacity:0}}
    whileInView={{opacity:1}}
    viewport={{once:false}}
    transition={{delay:0.5,duration:0.5}}
    
    id="contact" className="w-full max-w-7xl mx-auto p-8 my-12 rounded-2xl grid items-center justify-center xl:flex">
      <img
        src={operator}
        alt="operator"
        className="w-32 h-32 lg:w-64 lg:h-64 mx-auto object-contain"
      />
      <div className="grid gap-2 items-center md:justify-center p-5 ">
        <div className=" flex items-center gap-4 ">
          <BiPhoneCall className=" text-3xl lg:text-6xl  text-orange-500 font-bold" />
          <p className=" lg:text-2xl">01 03 79 43 57</p>
        </div>
        <div className=" flex items-center gap-4">
          <BiMailSend className=" text-3xl lg:text-6xl  text-orange-500 font-bold" />
          <p className=" lg:text-2xl">mediatheque@mairie-ville.ci</p>
        </div>
        <div className=" flex items-center gap-4">
          <BiMap className=" text-3xl lg:text-6xl  text-orange-500 font-bold" />
          <p className=" lg:text-2xl">Avenue 8 Rue 7, Treichville</p>
        </div>
      </div>
      <div className="p-4 ">
        <form action="" className=" grid gap-10 ">
          <h1 className="font-bold text-5xl text-center lg:text-start">
            Contacter la médiathèque
          </h1>
          <div className=" grid  xl:flex items-center gap-3">
            <input
              type=" text"
              placeholder="Entrez votre nom"
              className=" bg-gray-100 border-b outline-none text-black p-4 w-full "
            />
            <input
              type=" email"
              placeholder="Entrez votre email"
              className=" bg-gray-100 border-b outline-none text-black p-4 w-full "
            />
          </div>
          <textarea
            name=""
            className=" resize-none w-full h-20 outline-none p-2 xl:text-[18px] border-b bg-gray-100"
            id=""
          ></textarea>
          <button className="duration-300 rounded transition-all hover:-translate-y-1 p-5 bg-orange-500 text-white font-bold text-xl cursor-pointer">
            Envoyer
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
