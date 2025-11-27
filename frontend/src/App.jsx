import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home_page/Home"
import Espace from "./components/Espace_page/Espace"
import Propos from "./components/Propos_page/Propos"
import Service from "./components/Service_page/Service"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} ></Route>
            <Route path="/espace" element={<Espace/>} ></Route>
            <Route path="/propos" element={<Propos/>} ></Route>
            <Route path="/service" element={<Service/>} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
