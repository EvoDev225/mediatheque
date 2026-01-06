import React from 'react'
import {motion} from "framer-motion"
const Card = ({key,image,title,description}) => {
  return (
      <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: key * 0.15, duration: 0.5 }}
      viewport={{ once: false }}
      className="group relative overflow-hidden rounded-2xl  shadow-lg  transition-all duration-500"
    >
      <div className="aspect-4/3 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className=" text-xl md:text-2xl font-semibold mb-2">
          {title}
        </h3>
        <p className="text-white/80 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default Card
