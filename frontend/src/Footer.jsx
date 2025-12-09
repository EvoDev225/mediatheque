import logo from './assets/img/logo.png'
import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const Footer = () => {
return (
    <div className='w-full md:flex  items center text-white justify-center md:justify-around p-10 bg-orange-500'>
        <motion.div 
        initial={{opacity:0,translateX:-50}}
            whileInView={{opacity:1,translateX:0}}
            transition={{delay:0.4,duration:0.5}}
            viewport={{once:false}}
        className=' bg-white rounded-full flex mx-auto md:mx-0 justify-center items-center w-30 h-30 p-3'>
            <img 
            
            src={logo}  className='w-full' alt="logo" />
        </motion.div>
            <motion.div 
            initial={{opacity:0,translateY:10}}
            whileInView={{opacity:1,translateY:0}}
            transition={{delay:0.4,duration:0.5}}
            viewport={{once:false}}
            className='flex flex-col items-start'>
                <h2 className='font-medium text-2xl text-center w-full '>Liens</h2>
                <ul className=' flex flex-wrap gap-2 text-center w-full justify-center md:grid'>
                <Link to="/"> <li>Accueil</li></Link>
                    <Link to="/espace"><li className=' duration-300 transition-all hover:text-gray-300'>Espace</li></Link>
                <Link to="/service"> <li className=' duration-300 transition-all hover:text-gray-300'>Services</li></Link>
                <Link to="/propos"> <li className=' duration-300 transition-all hover:text-gray-300'>À propos</li></Link>
                    <li className=' duration-300 transition-all hover:text-gray-300'><a href="#contact">Contact</a></li>
                    <li className=' duration-300 transition-all hover:text-gray-300'><a href="/livre">Livres</a></li>
                </ul>
            </motion.div>
            <motion.div 
            initial={{opacity:0,translateX:50}}
            whileInView={{opacity:1,translateX:0}}
            transition={{delay:0.4,duration:0.5}}
            viewport={{once:false}}
            className='flex flex-col items-start'>
                <h2 className='text-2xl w-full text-center '>Nos réseaux</h2>
                <ul className=' flex justify-center my-2 w-full '>
                    <li className=' text-3xl mr-5 duration-300 transition-all hover:text-gray-300'> <a href=""><FaFacebook/></a> </li>
                    <li className=' text-3xl mr-5 duration-300 transition-all hover:text-gray-300'> <a href=""><FaWhatsapp/> </a></li>
                    <li className=' text-3xl mr-5 duration-300 transition-all hover:text-gray-300'> <a href=""><FaLinkedin/></a> </li>
                </ul>
            </motion.div>
        </div>
  )
}

export default Footer
