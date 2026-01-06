import { motion } from "framer-motion";

import Footer from "../../Footer";
import { Scale, Shield, FileText, Mail, MapPin, Phone, Building, User } from "lucide-react";
import Navbar from "../../Hero/Navbar";
import { FaBalanceScale, FaMailBulk } from "react-icons/fa";
import { FaMailchimp, FaShield } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

const MentionsLegales = () => {
  return (
    <>
    <Navbar/>
     <section className="relative min-h-[40vh]  flex items-center justify-center overflow-hidden bg-linear-to-br from-orange-500 via-orange-500/90 to-orange-500/80">
    
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/50 to-primary" />
        
        <div className="container relative z-10 px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaBalanceScale className="w-5 h-5  text-white" />
              <span className="text-white/90 text-sm font-medium">Informations légales</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Mentions <span className="text-orange-100">Légales</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Politique de confidentialité et informations réglementaires
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="container px-4 max-w-4xl mx-auto">
          
          {/* Éditeur du site */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-100/10 flex items-center justify-center">
                <Building className="w-6 h-6 text-orange-100" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Éditeur du site</h2>
            </div>
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-white/75">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-orange-100 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Raison sociale</p>
                    <p className="text-muted-foreground">"Médiathèque Municipale de Treichville"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-100 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Adresse</p>
                    <p className="text-muted-foreground">Avenue 8 Rue 7, Treichville, Abidjan, Côte d'Ivoire</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-orange-100 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Téléphone</p>
                    <p className="text-muted-foreground">"Numéro de téléphone"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-100 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">"Adresse email"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-orange-100 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Directeur de la publication</p>
                    <p className="text-muted-foreground">"Nom du directeur"</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hébergement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-100/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-100" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Hébergement</h2>
            </div>
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-white/75">
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-foreground">Hébergeur</p>
                  <p className="text-muted-foreground">"Nom de l'hébergeur"</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Adresse de l'hébergeur</p>
                  <p className="text-muted-foreground">"Adresse complète de l'hébergeur"</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Propriété intellectuelle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-100/10 flex items-center justify-center">
                <FaBalanceScale className="w-6 h-6 text-orange-100" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Propriété intellectuelle</h2>
            </div>
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-white/75">
              <p className="text-muted-foreground leading-relaxed">
                L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes) est la propriété exclusive 
                de la Médiathèque Municipale de Treichville ou de ses partenaires. Toute reproduction, représentation, 
                modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen 
                ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de la Médiathèque Municipale 
                de Treichville, conformément aux dispositions du Code de la Propriété Intellectuelle de la République 
                de Côte d'Ivoire.
              </p>
            </div>
          </motion.div>

          {/* Politique de confidentialité */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-100/10 flex items-center justify-center">
                <FaShield className="w-6 h-6 text-orange-100" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Politique de confidentialité</h2>
            </div>
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-white/75 space-y-6">
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">1. Collecte des données personnelles</h3>
                <p className="text-muted-foreground leading-relaxed">
                  La Médiathèque Municipale de Treichville collecte des informations personnelles uniquement lorsque 
                  vous nous les fournissez volontairement, notamment via le formulaire de contact. Les données collectées 
                  peuvent inclure : nom, prénom, adresse email, numéro de téléphone et tout autre information que vous 
                  choisissez de nous communiquer.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">2. Utilisation des données</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Les données personnelles collectées sont utilisées pour :
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Répondre à vos demandes d'information</li>
                  <li>Vous informer sur nos services et activités</li>
                  <li>Améliorer notre site et nos services</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">3. Protection des données</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Conformément à la loi n°2013-450 du 19 juin 2013 relative à la protection des données à caractère 
                  personnel en Côte d'Ivoire, nous nous engageons à protéger vos données personnelles. Nous mettons 
                  en œuvre des mesures techniques et organisationnelles appropriées pour garantir la sécurité de vos 
                  informations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">4. Conservation des données</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Vos données personnelles sont conservées pendant une durée n'excédant pas celle nécessaire aux 
                  finalités pour lesquelles elles sont collectées, conformément à la réglementation ivoirienne en vigueur.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">5. Vos droits</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Conformément à la loi ivoirienne sur la protection des données personnelles, vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Droit d'accès à vos données personnelles</li>
                  <li>Droit de rectification de vos données</li>
                  <li>Droit d'opposition au traitement de vos données</li>
                  <li>Droit à l'effacement de vos données</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  Pour exercer ces droits, vous pouvez nous contacter à l'adresse : "Adresse email de contact"
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">6. Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ce site peut utiliser des cookies pour améliorer l'expérience utilisateur. Les cookies sont de 
                  petits fichiers stockés sur votre appareil. Vous pouvez configurer votre navigateur pour refuser 
                  les cookies, mais cela pourrait affecter certaines fonctionnalités du site.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">7. Autorité de contrôle</h3>
                <p className="text-muted-foreground leading-relaxed">
                  L'Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire (ARTCI) est l'autorité 
                  compétente en matière de protection des données personnelles. Pour toute réclamation, vous 
                  pouvez la contacter à : "Coordonnées de l'ARTCI"
                </p>
              </div>

            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-linear-to-r from-orange-100/10 to-orange-500/10 rounded-2xl p-6 md:p-8 text-center">
              <CiMail className="w-12 h-12 text-orange-100 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Des questions ?</h3>
              <p className="text-muted-foreground mb-4">
                Pour toute question concernant ces mentions légales ou notre politique de confidentialité, 
                n'hésitez pas à nous contacter.
              </p>
              <a 
                href="mailto:contact@mediatheque-treichville.ci" 
                className="inline-flex items-center gap-2 bg-orange-500/50 text-white text-orange-100-foreground px-6 py-3 rounded-full font-medium hover:bg-orange-100/90 transition-colors"
              >
                <CiMail className="w-4 h-4" />
                Nous contacter
              </a>
            </div>
          </motion.div>

        </div>
      </section>
      <Footer/>
    </>
  )
}

export default MentionsLegales
