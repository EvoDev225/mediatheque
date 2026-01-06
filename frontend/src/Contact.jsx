

import { BiPhoneCall } from "react-icons/bi";
import { BiMailSend } from "react-icons/bi";
import { BiMap } from "react-icons/bi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import { toast } from "react-hot-toast";
import { useRef } from "react";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
const Contact = () => {
  const [loading, setLoading] = useState(false)
    
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true)
        emailjs
            .sendForm('YOUR_SERVICE_KEY', 'YOUR_TEMPLATE_ID', form.current, {
                publicKey: 'YOUR_PUBLIC_KEY',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    toast.success("Message envoyé avec succès !")
                    setLoading(false)
                    e.target.reset()
                },
                
                (error) => {
                    console.log('FAILED...', error.text);
                    setLoading(false)
                    toast.error("Une erreur est survenu !")
                },
            );
    };
  const contactInfo = [
    {
      icon: <BiPhoneCall className="w-5 h-5" />,
      title: "Téléphone",
      value: "01 03 79 43 57"
    },
    {
      icon: <BiMailSend className="w-5 h-5" />,
      title: "Email",
      value: "mediatheque@mairie-ville.ci"
    },
    {
      icon: <BiMap className="w-5 h-5" />,
      title: "Adresse",
      value: "Avenue 8 Rue 7, Treichville"
    }
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-orange-50/75">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16 text-center"
        >
          <span className="text-primary font-medium text-orange-500  uppercase tracking-wider text-sm mb-4 block">
            Contact
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Contactez la <span className="text-orange-500">médiathèque</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une question ? N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
              
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 bg-card rounded-xl  border-border/50 bg-white  hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center bg-orange-200 text-orange-500 ">
                  {info.icon}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{info.title}</p>
                  <p className="font-medium text-foreground">{info.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={sendEmail} className="bg-white rounded-2xl p-6 lg:p-8  border-border/50 shadow-lg">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                Envoyez-nous un message
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Votre nom"
                  name="user_name"

                  className="h-12  px-2 border outline-orange-500 border-gray-400  rounded-lg"
                  required
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  name="email"
                  className="h-12  px-2 outline-orange-500 border border-gray-400  rounded-lg"
                  required
                />
              </div>
              <textarea
                placeholder="Votre message"
                name="message"
                className="min-h-[150px] mb-6 resize-none w-full outline-orange-500  px-2 py-4 border border-gray-400 rounded-lg"
                required
              />
              <button type="submit" className="w-full h-12 text-base cursor-pointer duration-500 hover:bg-amber-600 flex justify-center items-center  font-bold text-white bg-orange-500 rounded-xl">
                 {loading ? (
                                   <div className='flex items-center gap-2.5'>
                                        <div className='p-4 border-b border-white animate-spin rounded-full' />
                                        <p className='text-white'>En cours</p>
                                    </div>
                                ) : (
                                  <div className="flex items-center justify-center gap-2">
                                    <IoIosSend  className="w-4 h-4 mr-2" />
                                    Envoyer le message
                                  </div>
                                )}
                
                 
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
