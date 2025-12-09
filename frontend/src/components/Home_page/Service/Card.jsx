

const Card = ({ key, item, title, description }) => {
    return (
        <div key={key} className=' duration-150 transition-all hover:scale-90 bg-white mt-5 border-l-orange-500 box_shadow rounded-xl border-l-4 p-4 flex flex-col items-center w-90 '>
            <span className="text-5xl ">
                {item}
                </span>
           <h2 className=" text-lg md:text-2xl text-orange-500 font-bold"> 
            {title}
            </h2>
            <p className=" text-center text-md ">
                {description}
                </p>
        </div>
    )
}

export default Card
