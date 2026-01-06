import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiBookOpen } from "react-icons/bi";
import { FaBars, FaXmark } from "react-icons/fa6"; // FaXmark est plus standard que FaX

const Navbar = () => {
  const Links = [
    { name: "Accueil", path: "/" },
    { name: "Espaces", path: "/espace" },
    { name: "Services", path: "/service" },
    { name: "A Propos", path: "/propos" },
    { name: "Livres", path: "/livre" },
    { name: "Contact", path: "#contact" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScrolled = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScrolled);
    return () => window.removeEventListener("scroll", handleScrolled);
  }, []); // Ajout du tableau de dépendances vide pour éviter des rendus infinis

  return (
    <>
      {/* Background Overlay pour Mobile (cliquer dehors pour fermer) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          scrolled || isOpen ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="p-3 rounded-xl text-white bg-orange-500 text-2xl shadow-lg  group-hover:scale-110 transition-transform">
              <BiBookOpen />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xl text-orange-500 font-extrabold tracking-tight leading-none">
                Médiathèque
              </span>
              <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${
                scrolled || isOpen ? "text-gray-500" : "text-white/90"
              }`}>
                Culture • Formation • Savoir
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {Links.map((link, index) => (
              <a 
                key={index} 
                href={link.path} 
                className={`text-sm font-bold uppercase tracking-wide transition-colors ${index===0?"primary-link":"secondary-link"} ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
            <Link 
              to="/connexion" 
              className={`px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 transition-all  text-white font-bold `}
            >
              Connexion
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled || isOpen ? "bg-gray-100 text-gray-800" : "bg-white/20 text-white"
            }`}
          >
            {isOpen ? <FaXmark className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu with Slide-down Animation */}
        <div 
          className={`absolute top-full left-0 w-full bg-white lg:hidden overflow-hidden transition-all duration-300 ease-in-out shadow-xl ${
            isOpen ? " opacity-100 border-t border-gray-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-4 p-6">
            {Links.map((link, index) => (
              <Link 
                key={index} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 font-bold text-lg hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-orange-50"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/connexion" 
              onClick={() => setIsOpen(false)}
              className="text-center mt-2 px-6 py-4 rounded-xl bg-orange-500 text-white font-bold text-lg shadow-lg"
            >
              Connexion
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;