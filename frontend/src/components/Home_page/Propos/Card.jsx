

const Card = ({key,title,description}) => {
  return (
    <div key={key} className="">
      <h1 className="text-2xl text-orange-500 font-medium my-5 lg:my-1">
        {title}
      </h1>
      <p className=" text-lg">
        {description}
      </p>
    </div>
  )
}

export default Card
