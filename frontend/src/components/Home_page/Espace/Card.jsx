import React from 'react'

const Card = ({key,image,title,description}) => {
  return (
    <div key={key} className=' w-120 box_shadow duration-300 transition-all hover:scale-105  rounded-2xl overflow-hidden  '>
        <div className='overflow-hidden w-full'>
            <img src={image}  className=' object-cover w-full h-80'  alt="" />
        </div>
      <div className=' my-5 px-5'>
        <h1 className=' text-center text-3xl font-bold text-orange-500'>
            {title}
        </h1>
        <p className=' text-center text-xl'>
            {description}
        </p>
      </div>
      <div className='flex items-center justify-center p-8'>
        <a href="/espace" className=' duration-300 transition-all hover:bg-orange-400 text-xl mx-auto text-center px-8 py-3 text-white rounded  bg-orange-500'>
        Voir plus
      </a>
      </div>
    </div>
  )
}

export default Card
