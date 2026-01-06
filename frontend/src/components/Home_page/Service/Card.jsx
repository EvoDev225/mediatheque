import {motion} from "framer-motion"

const Card = ({ key, item, title, description,index }) => {
    return (
        <motion.div 
         initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
        key={key} className=' group duration-500   px-8 py-4 cursor-pointer   hover:shadow-xl transition-colors   rounded-lg bg-white grid gap-4 '>
            <span className="p-4 text-3xl group-hover:bg-orange-500 duration-500 group-hover:text-white text-orange-500 bg-orange-50 rounded-xl w-fit ">
                {item}
            </span>
            <div>
                <h2 className=" text-lg md:text-2xl  font-bold">
                    {title}
                </h2>
                <p className="  text-md ">
                    {description}
                </p>
            </div>
        </motion.div>
    )
}

export default Card
