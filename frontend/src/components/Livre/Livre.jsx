import NavbarLivre from "./NavbarLivre"
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { LuSwords } from "react-icons/lu";
import { FaBook } from "react-icons/fa";
import Contact from "../../Contact";
import Footer from "../../Footer";
const Livre = () => {
return (
<div>
    <div className="  overflow-hidden  w-full bg-[url(./assets/img/bibliothèque.jpg)] h-[80vh]   hero">
        <div className="h-20"><NavbarLivre/></div>
        <div className="pt-20 text-white hero_content w-full lg:w-7xl mx-auto h-full flex items-center">
            <div className=" px-4 lg:px-0 mb-20 lg:mb-40 flex flex-col justify-centerborder w-full lg:w-4xl gap-4">
                <h1 className=" text-4xl lg:text-6xl font-bold uppercase ">
                    Votre Portail vers la Lecture et <span className="text-orange-500">la Culture</span>
                </h1>
                <p className="text-2xl lg:text-3xl">
                    Parcourez notre collection et laissez-vous guider par des œuvres qui éveillent la curiosité, nourrissent l’esprit et inspirent chaque lecteur.
                </p>
            </div>
        </div>

    </div>
    <div className="max-w-7xl mx-auto mt-20 flex flex-col gap-12 relative">
        {/* Filtre */}
        <div className="w-full px-8 py-2  flex items-center   gap-8 rounded-lg  shadow-lg bg-gray-100 ">
            <h3 className="text-xl font-medium flex items-center gap-2 px-4 py-2 rounded bg-gray-100 duration-150  hover:scale-95 cursor-pointer "><span className="text-orange-500"><MdOutlineDashboardCustomize /></span>Tous</h3>
            <input type="search" placeholder="Rechercher un livre" className=" w-full border-2 border-orange-500 px-4 py-2 rounded-full outline-none bg-gray-100 "/>
        </div>
        {/* Filtre */}
        {/* Tableau des  livres */}
        <div className=" flex flex-col gap-16 w-full  px-4 py-6 ">
            <div className="flex flex-col gap-4 ">
                <h2 className="text-xl font-medium flex items-center gap-2"><span className="text-2xl text-orange-500"><LuSwords /></span>Catégorie 1</h2>
                {/* Contenu des livres par catégorie */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 overflow-x-auto px-12 py-8  my-4">
                    {/* Livre individuel */}
                    <div className="rounded duration-100 trnasition-all hover:shadow-2xl hover:scale-110 py-4 ">
                        <FaBook   className="mx-auto w-50 h-20"/ >
                        <div className="px-2 my-4 flex flex-col gap-4">
                            <h3 className="text-center text-2xl font-medium">Harry potter</h3>
                            <div className="w-full text-center lg:text-end ">
                                <span className="text-sm text-gray-500">J.K Rowling</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Livre individuel */}
                </div>
                {/* Contenu des livres par catégorie */}
            </div>
        </div>
        {/* Tableau des  livres */}
    {/* Formulaire de demande */}
    <div className="my-20 flex flex-col gap-8">
        <div className="">
            <h2 className="text-center text-4xl font-bold">Faire une demande</h2>
            <p className="text-center my-2">
                Si un livre recherché n'est pas disponible dans notre collection, n'hésitez pas à nous en faire part en remplissant le formulaire ci-dessous. Nous nous efforcerons d'acquérir les ouvrages demandés dans les plus brefs délais afin de répondre à vos besoins culturels.
            </p>
        </div>
        <div className="w-full px-4 ">
            <form action="" className=" w-full lg:w-1/2 mx-auto px-8 py-4 flex flex-col gap-4 shadow-2xl rounded-xl border-t-5 border-t-orange-500 bg-white">
                <div className="flex flex-col gap-4 mt-12">
                    <label htmlFor="" className="flex items-center gap-2 text-xl font-medium">Nom <span className="text-orange-500">*</span></label>
                    <input type="text"  className="w-full px-4 py-2 border outline-orange-500 rounded"/>
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="" className="flex items-center gap-2 text-xl font-medium">Email <span className="text-orange-500">*</span></label>
                    <input type="text"  className="w-full px-4 py-2 border outline-orange-500 rounded"/>
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="" className="flex items-center gap-2 text-xl font-medium">Titre du livre <span className="text-orange-500">*</span></label>
                    <input type="text"  className="w-full px-4 py-2 border outline-orange-500 rounded"/>
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="" className="flex items-center gap-2 text-xl font-medium">Message <span className="text-orange-500">*</span></label>
                    <textarea name="" id=""  className="w-full px-4 py-2 border outline-orange-500 rounded resize-none" ></textarea>
                </div>
                <div className="flex gap-4">
                    <input type="submit"  className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium cursor-pointer"/>
                </div>
            </form>
        </div>
    </div>
    {/* Formulaire de demande */}
    <Contact/>

    </div>
    <Footer/>
</div>

)
}

export default Livre
