import { Link } from "react-router-dom";
import { useState } from 'react';
import logo from "../../assets/img/logo.png";
import menu from "../../assets/menu.png";
import close from "../../assets/x.png";

const NavbarLivre = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="absolute top-0 w-full flex items-center justify-center z-50">
            <nav className="flex bg-white z-50 relative  w-full max-w-5xl xl:max-w-6xl  mx-auto lg:my-10 shadow-2xl py-3 px-4 sm:px-6 lg:rounded-full">
                <div className="flex items-center justify-between w-full">
                    {/* Logo et titre */}
                    <div className="flex items-center gap-3 sm:gap-5 lg:ml-5">
                        <img src={logo} width={40} height={40} className="sm:w-[50px] sm:h-[50px]" alt="Logo" />
                        <div className="flex flex-col">
                            <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-orange-500">Médiathèque</h1>
                            <p className="text-gray-400 text-[9px] sm:text-[10px] lg:text-[13px]">Culture|Formation|Divertissement</p>
                        </div>
                    </div>

                    {/* Menu desktop */}
                    <div className="hidden lg:block">
                        <ul className="flex items-center">
                            <Link to="/">
                                <li className="mr-4 font-medium text-orange-500 hover:text-orange-600 cursor-pointer">Accueil</li>
                            </Link>
                            <Link to="/espace">
                                <li className="mr-4 font-medium duration-300 transition-all hover:text-orange-500 cursor-pointer">Espaces</li>
                            </Link>
                            <Link to="/service">
                                <li className="mr-4 font-medium duration-300 transition-all hover:text-orange-500 cursor-pointer">Service</li>
                            </Link>
                            <Link to="/propos">
                                <li className="mr-4 font-medium duration-300 transition-all hover:text-orange-500 cursor-pointer">À propos</li>
                            </Link>
                            <Link to="/livres">
                                <li className="mr-4 font-medium duration-300 transition-all hover:text-orange-500 cursor-pointer">Livres</li>
                            </Link>
                            <li className="mr-4 font-medium duration-300 transition-all hover:text-orange-500 cursor-pointer">
                                <a href="#contact">Contact</a>
                            </li>
                        
                            <Link to="/connexion">
                                <button className="px-6 py-2 border rounded-xl font-medium bg-orange-500 text-white cursor-pointer hover:bg-orange-400 duration-200 whitespace-nowrap">
                                    Connexion
                                </button>
                            </Link>
                        </ul>
                    </div>

                    {/* Bouton menu mobile */}
                    <button 
                        onClick={handleOpen} 
                        className="lg:hidden p-2"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <img src={close} width={30} height={30} alt="Fermer le menu" />
                        ) : (
                            <img src={menu} width={30} height={30} alt="Ouvrir le menu" />
                        )}
                    </button>
                </div>

                {/* Menu mobile */}
                <div className={`lg:hidden absolute top-full left-0 bg-white z-50 w-full shadow-lg transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <ul className="w-full bg-white px-6 py-5 space-y-4">
                        <Link to="/" onClick={handleOpen}>
                            <li className="font-medium text-lg text-orange-500 py-2 hover:bg-gray-50 px-2 rounded">Accueil</li>
                        </Link>
                        <Link to="/espace" onClick={handleOpen}>
                            <li className="font-medium text-lg py-2 hover:bg-gray-50 px-2 rounded hover:text-orange-500 cursor-pointer">Espaces</li>
                        </Link>
                        <Link to="/service" onClick={handleOpen}>
                            <li className="font-medium text-lg py-2 hover:bg-gray-50 px-2 rounded hover:text-orange-500 cursor-pointer">Service</li>
                        </Link>
                        <Link to="/propos" onClick={handleOpen}>
                            <li className="font-medium text-lg py-2 hover:bg-gray-50 px-2 rounded hover:text-orange-500 cursor-pointer">À propos</li>
                        </Link>
                        <Link to="/livres" onClick={handleOpen}>
                            <li className="font-medium text-lg py-2 hover:bg-gray-50 px-2 rounded hover:text-orange-500 cursor-pointer">Livres</li>
                        </Link>
                        <li className="font-medium text-lg py-2 hover:bg-gray-50 px-2 rounded hover:text-orange-500 cursor-pointer">
                            <a href="#contact" onClick={handleOpen}>Contact</a>
                        </li>
                        <Link to="/connexion" onClick={handleOpen}>
                            <button className="w-full py-3 rounded-xl font-medium bg-orange-500 text-white hover:bg-orange-400 duration-200">
                                Connexion
                            </button>
                        </Link>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavbarLivre;