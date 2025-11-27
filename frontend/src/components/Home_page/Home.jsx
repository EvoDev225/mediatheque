import Service from "./Service/Service"
import Hero from "../../Hero/Hero"
import Espace from "./Espace/Espace"
import Propos from "./Propos/Propos"
import Contact from "../../Contact"
import Footer from "../../Footer"
const Home = () => {
  return (
    <div className=" bg-[#F8F9FA] overflow-x-hidden">
      <Hero/>
      <Service/>
      <Espace/>
      <Propos/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home
