import { useState } from "react";
import logo from "../assets/img/logo.png"
import menu from "../assets/menu.png"
import close from "../assets/x.png"
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  }
  console.log(isOpen)
  return (
    <nav className=' lg:relative fixed top-0 left-0 grid bg-white z-50 w-full lg:w-5xl xl:w-6xl mx-auto lg:my-10 py-3 px-6 lg:rounded-full '>
      <div>
        <div className=" flex items-center justify-between">
          <div className=" flex items-center gap-5 lg:ml-5 ">
            <img src={logo} width={50} height={50} alt="" />
            <div className="flex flex-col border-black">
              <h1 className=" font-bold text-xl md:text-2xl text-orange-500">Médiathèque</h1>
              <p className=" text-gray-400 text-[10px] lg:text-[13px]">Culture|Formation|Divertissement</p>
            </div>
          </div>
          <div className=" hidden md:block">
            <ul className=" flex items-center ">
              <Link to="/"><li className=" mr-4 font-medium text-orange-500">Accueil</li></Link>
              <Link to="/espace"><li className=" mr-4 font-medium duration-300 transition-all hover:text-orange-500 cursor-pointer">Espaces</li></Link>
            <Link to="/service" > <li className=" mr-4 font-medium duration-300 transition-all hover:text-orange-500 cursor-pointer">Service</li></Link>
              <Link to="/propos"><li className=" mr-4 font-medium duration-300 transition-all hover:text-orange-500 cursor-pointer">A propos</li></Link>
              <Link to="/"><li className=" mr-4 font-medium duration-300 transition-all hover:text-orange-500 cursor-pointer">Livres</li></Link>
              <li className=" mr-4 font-medium duration-300 transition-all hover:text-orange-500 cursor-pointer">
                <a href="#contact">Contact</a>
              </li>
            <Link to="/connexion"> <button className="px-8 py-2 border rounded-xl font-medium  bg-orange-500 text-white cursor-pointer hover:bg-orange-400 duration-200">Connexion</button></Link>
            </ul>
          </div>
          {
            isOpen ? (
              <img src={close} width={30} height={30} alt="" onClick={handleOpen} className=" md:hidden mr-5 fixes  top-0 left-0" />
            ) : (
              <img src={menu} width={30} height={30} alt="" onClick={handleOpen} className=" md:hidden mr-5  top-0 left-0" />
            )
          }
        </div>
        <div className={`  mt-1 md:hidden  z-50 w-full duration-300 transition-all ${isOpen ? 'block' : 'hidden'}  `}>
          <ul className="   w-full bg-white px-5 py-5  grid items-center ">
            <Link to="/"><li className=" mr-4 font-medium  text-xl">Accueil</li></Link>
            <Link to="/espace"><li className=" mr-4 font-medium duration-300 transition-all  cursor-pointer text-xl">Espaces</li></Link>
          <Link to="/service"> <li className=" mr-4 font-medium duration-300 transition-all  cursor-pointer text-xl">Service</li></Link>
            <Link to="/propos"><li className=" mr-4 font-medium duration-300 transition-all  cursor-pointer text-xl">A propos</li></Link>
              <Link to="/"><li className=" mr-4 font-medium duration-300 transition-all text-xl hover:text-orange-500 cursor-pointer">Livres</li></Link>

            <li className=" mr-4 font-medium duration-300 transition-all  cursor-pointer text-xl">Contact</li>
             <Link to="/connexion"> <button className=" text-xl   rounded-xl font-medium  text-orange-500 cursor-pointer hover:bg-orange-400 duration-200">Connexion</button></Link>

          </ul>
        </div>



      </div>
    </nav>
  )
}

export default Navbar
