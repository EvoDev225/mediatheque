
import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { BiBookOpen } from 'react-icons/bi';
import { FaMailBulk, FaMap, FaPhone } from "react-icons/fa";

const Footer = () => {
const links = [
    { to: "/", label: "Accueil" },
    { to: "/espace", label: "Espaces" },
    { to: "/service", label: "Services" },
    { to: "/propos", label: "À propos" },
    { to: "/livre", label: "Livres" },
    { to: "/mentions", label: "Mentions Légales & Politique de confidentialité" },
    { to: "#contact", label: "Contact", isAnchor: true }
  ];

  const socialLinks = [
    { icon: <FaFacebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <FaWhatsapp className="w-5 h-5" />, href: "#", label: "WhatsApp" },
    { icon: <FaLinkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-orange-500 text-white text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <BiBookOpen className="w-6 h-6" />
            </div>
            <div>
                <h3 className="font-heading text-lg font-bold">Médiathèque</h3>
                <p className="text-xs opacity-80">Treichville</p>
            </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
            Un espace de savoir, de culture et de service au cœur de Treichville.
            </p>
        </motion.div>

          {/* Quick Links */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
        >
            <h4 className="font-heading font-semibold text-lg mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  {link.isAnchor ? (
                    <a
                      href={link.to}
                      className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-heading font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm opacity-80">
                <FaPhone className="w-4 h-4" />
                01 03 79 43 57
              </li>
              <li className="flex items-center gap-3 text-sm opacity-80">
                <FaMailBulk className="w-4 h-4" />
                mediatheque@mairie-ville.ci
              </li>
              <li className="flex items-start gap-3 text-sm opacity-80">
                <FaMap className="w-4 h-4 shrink-0 mt-0.5" />
                Avenue 8 Rue 7, Treichville
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-heading font-semibold text-lg mb-4">Suivez-nous</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-6">
              <h5 className="text-sm font-medium mb-2">Horaires</h5>
              <p className="text-sm opacity-80">Lun - Sam: 09h - 17h</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} Médiathèque Municipale de Treichville. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer
