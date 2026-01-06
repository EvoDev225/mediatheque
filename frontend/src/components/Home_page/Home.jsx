import Service from "./Service/Service"
import Hero from "../../Hero/Hero"
import Espace from "./Espace/Espace"
import Propos from "./Propos/Propos"
import Contact from "../../Contact"
import Footer from "../../Footer"
import Navbar from "../../Hero/Navbar"
import CookieConsent from "../../CookieConsent"
const Home = () => {
  return (
    <div className=" bg-[#F8F9FA] overflow-x-hidden">
      <Navbar />
      <Hero/>
      <Service/>
      <Espace/>
      <Propos/>
      <Contact/>
      <Footer/>
      <CookieConsent/>
    </div>
  )
}

export default Home
