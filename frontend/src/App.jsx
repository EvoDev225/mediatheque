import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home_page/Home"
import Espace from "./components/Espace_page/Espace"
import Propos from "./components/Propos_page/Propos"
import Service from "./components/Service_page/Service"
import Login from "./components/Connexion/Login"
import Dashboard from "./components/Dashboard/Dashboard"
import axios from 'axios'
import VerificationCode from "./Fonctions/Verification/VerificationCode"
import NouveauMotdepasse from "./NouveauMotdepasse"
import NouveauMdp from "./Fonctions/Verification/NouveauMdp"
import { Toaster } from "react-hot-toast"
import Interface from "./components/Dashboard/Interface"
import Place from "./components/Dashboard/Place"
import Multimedia from "./components/Dashboard/components/Multimedia/Multimedia"
import Convivialite from "./components/Dashboard/components/Convivialite/Convivialite"
import Livre from "./components/Livre/Livre"
import Bibliotheque from "./components/Dashboard/Bibliotheque"
function App() {
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true
  return (
    <>
    <Toaster/>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} ></Route>
            <Route path="/espace" element={<Espace/>} ></Route>
            <Route path="/propos" element={<Propos/>} ></Route>
            <Route path="/service" element={<Service/>} ></Route>
            <Route path="/livre" element={<Livre/>} ></Route>
            <Route path="/connexion" element={<Login/>} ></Route>
            <Route path="/verificationOTP/:token" element={<NouveauMotdepasse/>} ></Route>
            <Route path="/dashboard" element={<Dashboard/>} ></Route>
            <Route path="/interface" element={<Interface/>} ></Route>
            <Route path="/place" element={<Place/>} ></Route>
            <Route path="/verificationEmail" element={<VerificationCode/>} ></Route>
            <Route path="/nouveauMotdepasse/:token" element={<NouveauMdp/>} ></Route>
            <Route path="/multimedia" element={<Multimedia/>} ></Route>
            <Route path="/convivialite" element={<Convivialite/>} ></Route>
            <Route path="/bibliotheque" element={<Bibliotheque/>} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
