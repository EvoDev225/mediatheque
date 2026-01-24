import React, { useEffect, useRef } from 'react'
import NavBarDash from './NavBarDash'
import { FaBook, FaCalendar, FaChild, FaClosedCaptioning, FaEdit, FaFilter, FaPercent, FaPlus, FaSearch, FaTrash, FaXing, FaXRay } from 'react-icons/fa'
import { useState } from 'react'
import { IoIosTrendingUp, IoMdClose, IoMdCloseCircleOutline } from 'react-icons/io'
import { deleteChildren, editChildren, getAllChildrens, newChildren } from '../../Fonctions/Children/Children'
import toast from 'react-hot-toast'
import {ClipLoader} from "react-spinners"
import { IoReload } from 'react-icons/io5'
import { preview } from 'vite'

const Enfant = () => {
    const [allChildren,setAllChildren]=useState([])
    const [filteredChildren,setFilteredChildren]=useState([])
    const [allBooks,setAllBoooks]= useState([])
    const [insertBook,setInsertBook]=useState({
        code: "",
        numero: "",
        titre: "",
        img: "",
        auteur: "",
        lieuEdition: "",
        dateEdition: "",
        origine: "",
        quantite: "",
        dateEnregistrement: new Date().toISOString().split('T')[0],
        status: "Disponible",
        categorie: "",
        type:'Enfant'
    })
    const [search,setSearch]=useState("")
    const [dataToUpdate,setDataToUpdate]=useState([])
    const [idToDelete,setIdToDelete]=useState('')
    const [loading,setLoading]=useState(false)
    const [openAddBoxToInsert,setOpenAddBoxToInsert] = useState(false) // affichage de la boîte de dialogue pour insérer
    const [selectDate,setSelectDate]=useState('')
    const [openToUpdate,setOpenToUpdate]=useState(false)
    const [openBoxDeleteChildren,setOpenBoxDeleteChildren]=useState(false)
    const [categorieSelect,setCategorieSelect]=useState("Tous")
    const [searchBook,setSearchBook]=useState("")
    const [childrenData,setChildrenData]=useState({
        nom:"",
        prenom:"",
        date:"",
        numeroParent:"",
        classe:""
    })
    const [idChild,setIdChild]=useState("") // pour la modification
        useEffect(()=>{
            let result = [...allChildren]
            if(search){
                const term = search.toLowerCase()
                result = result.filter((child)=>
                child.nom.toLowerCase().includes(term) ||
                child.prenom.toLowerCase().includes(term)
                )
            }
            if(selectDate){
                const dateFormat = formatDate(selectDate)
                result = result.filter((child)=>child.date===dateFormat)
            }
            setFilteredChildren(result)
        // Barre de recherche
        
    },[search,selectDate,allChildren])
        // Barre de recherche

        // filtre par date
            const filterDate = (date)=>{
                setSelectDate(date)
            }
            const resetFilter = ()=>{
                setSelectDate("")
                setSearch("")
                
            }

        // filtre par date

        // Formater la date
        const formatDate=(date)=>{
            const [year,month,day] = date.split("-")
            return `${day}/${month}/${year}`
        }
        // Formater la date
        // Statistique des enfants inscrits par mois
        const getStatToSuscribre=()=>{
            if(!allChildren.length) return 0
            const now = new Date()
            const currentYear = now.getFullYear()
            const currentMonth = now.getMonth()+1
            return allChildren.filter((child)=>{
                if(!child.createdAt) return false
                const dateChildren = new Date(child.createdAt)
                const InscriptionYear = dateChildren.getFullYear()
                const InscriptionMonth = dateChildren.getMonth()+1
                return InscriptionYear === currentYear && InscriptionMonth === currentMonth
            }).length
        }

    const stats = [
        {
            id:1,
            title:"Total des livres",
            value:578,
            icon:<FaBook/>,
            content:"Livres disponibles dans la bibliothèque enfant",
            style:"bg-linear-to-r from-orange-400 to-orange-600"
        },
        {
            id:2,
            title:"Enfants inscrits",
            value:allChildren.length,
            icon:<FaChild />,
            content:"Nombre total des enfants inscrits",
            style:" border border-gray-400"

        },
        {
            id:3,
            title:"Inscriptions de ce mois",
            value:getStatToSuscribre(),
            icon:<IoIosTrendingUp />,
            content:"Enfants inscrits ce mois",
            style:" border border-gray-400 "

        }
    ]
    // Récupération des enfants
        useEffect(()=>{
            const Getchildren = async ()=>{
            try {
                const children = await getAllChildrens()
                setAllChildren(children || [])
            } catch (error) {
                console.log(error)
            }
            }
            Getchildren()

        },[])
    // Récupération des enfants

    // Ajouter un nouvel enfant
        const handleInputChange = (e)=>{
            const {name,value}=e.target
            setChildrenData({...childrenData,[name]:value})
        }
        const handleSubmitChildren = async (e)=>{
            e.preventDefault()
            if(!childrenData.nom || !childrenData.prenom || !childrenData.date || !childrenData.numeroParent || !childrenData.classe){
                toast.error("Veuillez renseigner le(s) champ(s) manquants")
                return
            }
            setLoading(true)
            try {
                const Childrens = {
                    nom: childrenData.nom.trim(),
                    prenom: childrenData.prenom.trim(),
                    date: formatDate(childrenData.date),
                    numeroParent: childrenData.numeroParent.trim(),
                    classe: childrenData.classe.trim()
                }
                const response = await newChildren(Childrens)
                toast.success(response)
                setLoading(false)
                setOpenAddBoxToInsert(false)
                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        }
    // Ajouter un nouvel enfant

    // Suppresion des enfants
        const handleOpenToDelete = (id)=>{
            setOpenBoxDeleteChildren(true)
            setIdToDelete(id)
        }

        const handleDelete =async ()=>{
            try {
                const response = await deleteChildren(idToDelete)
                toast.success(response)
                setOpenBoxDeleteChildren(false)
                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        }
        
    // Suppresion des enfants

        // Modification des informations sur l'enfant
            const handleModalToUpdate=(id)=>{
                const checkInfo= allChildren.filter((child)=>child._id===id)
                setDataToUpdate(checkInfo)
                setOpenToUpdate(true)
                setIdChild(id)

            }
            const handleUpdateInfo=(e)=>{
                const {name,value}=e.target
                setDataToUpdate(
                    {
                        ...dataToUpdate,[name]:value
                    }
                )
            }
            const HandleToUpdateChildren = async(e) =>{
                e.preventDefault()
                try {
                    const updatedData = {
            ...dataToUpdate,
            date: formatDate(dataToUpdate.date) // Formater la date
        };
                const response = await editChildren(idChild,updatedData)
                toast.success(response)
                setLoading(false)
                setOpenToUpdate(false)
                window.location.reload()
                } catch (error) {
                console.log(error)
                }
            }
            
        // Modification des informations sur l'enfant


        // Sélection des catégorie des livres
            const categorie = ["Tous",...new Set(allBooks.map(book=>book.categorie))]
            const LivreFiltrer = allBooks.filter((book)=>{
                // filtre sur les categories
            const  correspondCategorie = categorieSelect === "Tous" || book.categorie === categorieSelect 

            // Filtre de recherche
            const term = searchBook.toLowerCase()
            const correspondRecherche = searchBook ==="" ||
            book.titre.toLowerCase().includes(term) || book.auteur.toLowerCase().includes(term) 

            return correspondCategorie && correspondRecherche
            })
            
        // Sélection des catégorie des livres

        // Affichage de l'image
        
        // Affichage de l'image
    
    return (
    <>
    <div className='  min-h-screen'>
        <NavBarDash/>
        <section className='pt-24 w-full lg:max-w-6xl  mx-auto px-4 lg:px-8 overflow-x-hidden  '>
            <div className='flex flex-col gap-2 my-4'>
                <h1 className='text-5xl text-orange-500 font-bold '>
                    Tableau de bord
                </h1>
                <p className='text-[14px] text-gray-500 '>
                    Bienvenue ! Voici vos statistiques du jour
                </p>
                
            </div>
        {/* Statistique */}
        {/* Nombre total des livres + nombres total d'enfant inscrit + stat mensuel d'inscrit par mois */}
        <div className='grid grid-cols-1 md:grid-cols-2 mb-12 lg:grid-cols-3 gap-12 items-center justify-between '>
            {
                stats.map((stat)=>(
                    <div key={stat.id} className={`px-8 py-4 flex flex-col  ${stat.id==1?"text-white":"text-gray-500"} duration-500 ease-in-out hover:-translate-y-1 transition-all   shadow-2xl rounded-xl ${stat.style}`}>
                        <div className='flex items-center  justify-between'>
                            <h2 className={`font-bold text-2xl `}>
                                {stat.title}
                            </h2>
                            <span className={` text-orange-500  rounded-2xl bg-orange-100 p-4`}>
                                {stat.icon}
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <p className={`text-3xl font-bold ${stat.id!=1?"text-orange-500":""} `}>
                                {stat.value}
                            </p>
                        </div>
                        <div className='flex items-center my-4'>
                            <p className='text-xs  '>
                                {stat.content}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
        {/* Tableau d'affichage des enfants, recherche et ajout */}
        <div className='w-full overflow-x-auto bg-linear-to-br from-orange-400 via-orange-500 to-orange-600    rounded-2xl px-8 py-4 border border-gray-200 grid  gap-4  md:flex items-center justify-between'>
            <div className='flex items-center relative gap-2 '>
                <div className='flex items-center gap-4'>
                    <input 
                type="search" 
                name="" 
                id="" 
                onChange={e=>setSearch(e.target.value)}
                placeholder='Rechercher...' 
                className='px-12 py-2 rounded-full  bg-white  outline-orange-500 '
                />
                <span className='absolute left-2.5  text-gray-500 text-2xl '>
                <FaSearch/>
                </span>
                </div>
                <div className='flex items-center gap-4'>
                    <input 
                        type="date" 
                        value={selectDate}
                        onChange={(e)=>filterDate(e.target.value)}
                        className='px-8 py-2 rounded-full bg-white outline-orange-500'
                    />
                    <button onClick={resetFilter}  className='text-2xl text-white cursor-pointer'>
                        <IoReload/>
                    </button>
                </div>
                </div>
                <div className='flex items-center w-fit px-4 py-2 rounded-lg bg-linear-to-br from-orange-500 via-orange-600  to-orange-700 duration-200 cursor-pointer transition-all hover:scale-95'>
                    <button
                        type='button'
                        onClick={()=>setOpenAddBoxToInsert(true)}
                        className='flex items-center gap-3 text-white font-bold cursor-pointer'
                    >
                        <span className=' '>
                            <FaPlus />
                        </span>
                        <span>
                            Ajouter un nouvel enfant
                        </span>
                    </button>
            </div>
            
        </div>
        {/* Tableau des différents enfants */}

        <div className='my-4 w-full rounded-t-2xl  o   '>
            <div className='w-full overflow-x-auto'>
                <table className='w-full'>
                <thead className='bg-gray-100   '>
                    <tr className='' >
                        <th className='py-4 px-3 sm:px-4 lg:px-6  '>#</th>
                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Nom & Prénom</th>
                        
                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Date de naissance</th>
                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Numéro parent</th>
                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Classe</th>
                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Action</th>
                    </tr>
                </thead>
                {
                allChildren.length>0 && filteredChildren && (
                    filteredChildren.map((child,index)=>(
                    <tbody className=' '>
                    <tr className='border-b-2 border-gray-200'>
                        <td className='py-4 px-3  sm:px-4 lg:px-6 text-start flex justify-center  '>
                            <div className='flex items-center justify-center w-8 h-8 text-xs rounded-xl bg-orange-100 '>
                                {index+1}
                            </div>
                        </td>
                        <td className='py-4 px-3 sm:px-4 lg:px-6 text-left  '>
                            <div className='flex flex-col'>
                                <span>{child.nom}</span>
                            <span>{child.prenom}</span>
                            </div>
                        </td>
                    
                        <td className='py-4 px-3 sm:px-4 lg:px-6 text-left '> {child.date} </td>
                        <td className='py-4 px-3 sm:px-4 lg:px-6 text-left '>{child.numeroParent}</td>
                        <td className='py-4 px-3 sm:px-4 lg:px-6 text-left  '>
                            <span className=' px-4 py-1 rounded-full bg-orange-500 text-white font-bold'>
                                {child.classe}
                            </span>
                        </td>
                        <td className='py-4 px-3 sm:px-4 lg:px-6 text-left '>
                            <div className='flex items-center gap-2 text-xl'>
                                <button 
                                onClick={()=>handleModalToUpdate(child._id)}
                                className='text-gray-500 duration-200 ease transition-colors hover:text-gray-600'>
                                    <FaEdit/>
                                </button>
                                <button
                                onClick={()=>handleOpenToDelete(child._id)}
                                 className='text-red-500 duration-200 ease transition-colors hover:text-red-600'>
                                    <FaTrash/>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                    ))
                 )
            }
            </table>
            {
                allChildren.length===0 && (
                    <div className='w-full flex gap-4 items-center justify-center my-2 '>
                    <div className='flex flex-col items-center justify-center '>
                        <span className='w-18 h-18 border flex items-center justify-center text-gray-300 border-gray-200 rounded-full'>
                        <FaChild/>
                    </span>
                    <p> 
                        Aucune donnée existante
                    </p>
                    </div>
                    
            </div>
                )
            }
             </div>
            {/* ----------------------------------------------------------------------------------------- */}
            
            {/* Boite de dialogue pour insérer les enfants */}
            {
                openAddBoxToInsert && (
                    <div className='fixed z-50 inset-0 flex items-center justify-center px-4 lg:px-8 w-full h-screen bg-black/50'>
                <form action="" onSubmit={handleSubmitChildren} className='bg-white w-full md:w-[700px] shadow-2xl rounded-2xl overflow-hidden'>
                    <div className=''>

                    </div>
                    <div className='bg-linear-to-tr bg-orange-500 via-orange-600 to-orange-700 px-12 py-4 text-white  '>
                        
                        <div className='flex  justify-between items-center  gap-2.5'>
                        <p className='text-[18px] font-medium text-center'>
                            Ajouter un nouvel enfant à la bibliothèque
                        </p>
                        <div className='flex text-3xl font-bold items-center justify-end'>
                            <button onClick={()=>setOpenAddBoxToInsert(false)}>
                                <IoMdCloseCircleOutline /> 
                            </button>
                        </div>
                        </div>
                    </div>
                    <div className='px-12 py-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-bold'>Nom <span className='text-orange-500'>*</span></label>
                            <input 
                            type="text" 
                            name="nom" 
                            placeholder='Entrez le nom...'
                            value={childrenData.nom}
                            onChange={handleInputChange}
                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-bold'>Prénom <span className='text-orange-500'>*</span></label>
                            <input 
                            type="text" 
                            name="prenom" 
                            value={childrenData.prenom}
                            onChange={handleInputChange}
                            placeholder='Entrez le prenom...'
                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-bold'>Date de naissance <span className='text-orange-500'>*</span></label>
                            <input 
                            type="date" 
                            name="date" 
                            value={childrenData.date}
                            onChange={handleInputChange}
                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-bold'>Numéro du parent <span className='text-orange-500'>*</span></label>
                            <input 
                            type="number" 
                            name="numeroParent"
                            value={childrenData.numeroParent}
                            onChange={handleInputChange} 
                            placeholder='Entrez le numéro du parent...'
                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-bold'>Classe <span className='text-orange-500'>*</span></label>
                            <input 
                            type="text" 
                            name="classe" 
                            value={childrenData.classe}
                            onChange={handleInputChange}
                            placeholder='Entrez la classe...'
                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                            />
                        </div>
                    </div>
                    <div className='px-8 py-4 flex items-center justify-center'>
                        <button type='submit' className='text-center w-full rounded-xl  px-6 py-2 bg-linear-to-tr bg-orange-500 via-orange-600 to-orange-700 duration-300 transition-all ease-in-out hover:scale-95 cursor-pointer '>
                            {
                                loading?(
                                    <div className='flex font-bold text-white items-center justify-center gap-2'>
                                        <ClipLoader
                                            size={30}
                                            color='white'
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                        <span>
                                            En cours
                                        </span>
                                    </div>

                                ):(
                                    <div>
                                <span className='font-bold text-white '>
                                Ajouter
                            </span>
                            </div>
                            )
                            }
                        </button>
                    </div>
                </form>
            </div>
                )
            }
            {/* Boite de dialogue pour insérer les enfants */}



            {/* ---------------------------------------------------------------------------------------- */}
            {/* Boite de dialogue de suppression */}

            {
                openBoxDeleteChildren && (
                    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center h-screen '>
                <div className='bg-white px-12 py-4 rounded-xl'>
                    <div className='flex items-center justify-center'>
                        <span className='p-4   text-3xl text-red-500'>
                            <FaTrash/>
                        </span>

                    </div>
                    <div className='flex justify-center my-2'>
                        <p>
                            Supprimer les données
                        </p>
                    </div>
                    <div className='flex items-center  justify-center gap-4'>
                        <button
                        type='button' 
                        onClick={()=>setOpenBoxDeleteChildren(false)}
                        className='px-4 py-1 bg-gray-200 hover:bg-gray-500 duration-300 ease rounded-lg text-xl'>
                            Annuler
                        </button>
                        <button 
                        type='button'
                        onClick={handleDelete}
                        className='px-4 py-2 bg-red-500 text-white hover:bg-red-500 duration-300 ease rounded-lg text-xl'>
                            Supprimer
                        </button>
                    </div>

                </div>
            </div>

                )
            }
            {/* Boite de dialogue de suppression */}

            {/* Boîte de dialogue de mise à jour */}
            {
                
                openToUpdate && (
                    <div className='fixed z-50 inset-0 flex items-center justify-center px-4 lg:px-8 w-full h-screen bg-black/50'>
                <form action="" onSubmit={HandleToUpdateChildren} className='bg-white w-full md:w-[700px] shadow-2xl rounded-2xl overflow-hidden'>
                    <div className=''>

                    </div>
                    <div className='bg-linear-to-tr bg-orange-500 via-orange-600 to-orange-700 px-12 py-4 text-white  '>
                        
                        <div className='flex  justify-between items-center  gap-2.5'>
                        <p className='text-[18px] font-medium text-center'>
                            Mise à jour des informations personnelles
                        </p>
                        <div className='flex text-3xl font-bold items-center justify-end'>
                            <button onClick={()=>setOpenToUpdate(false)}>
                                <IoMdCloseCircleOutline /> 
                            </button>
                        </div>
                        </div>
                    </div>
                    <div className='px-12 py-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-bold'>Nom <span className='text-orange-500'>*</span></label>
                            <input 
                            type="text" 
                            name="nom" 
                            value={dataToUpdate[0].nom}
                            onChange={handleUpdateInfo}
                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-bold'>Prénom <span className='text-orange-500'>*</span></label>
                            <input 
                            type="text" 
                            name="prenom" 
                            value={dataToUpdate[0].prenom}
                            onChange={handleUpdateInfo}
                            placeholder='Entrez le prenom...'
                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-bold'>Date de naissance <span className='text-orange-500'>*</span></label>
                            <input 
                            type="date" 
                            name="date" 
                            value={dataToUpdate.date}
                            onChange={handleUpdateInfo}
                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-bold'>Numéro du parent <span className='text-orange-500'>*</span></label>
                            <input 
                            type="number" 
                            name="numeroParent"
                            value={dataToUpdate[0].numeroParent}
                            onChange={handleUpdateInfo} 
                            placeholder='Entrez le numéro du parent...'
                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-bold'>Classe <span className='text-orange-500'>*</span></label>
                            <input 
                            type="text" 
                            name="classe" 
                            value={dataToUpdate[0].classe}
                            onChange={handleUpdateInfo}
                            placeholder='Entrez la classe...'
                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                            />
                        </div>
                    </div>
                    <div className='px-8 py-4 flex items-center justify-center'>
                        <button
                        type='submit'
                        className='text-center w-full rounded-xl  px-6 py-2 bg-linear-to-tr bg-orange-500 via-orange-600 to-orange-700 duration-300 transition-all ease-in-out hover:scale-95 cursor-pointer '>
                            {
                                loading?(
                                    <div className='flex font-bold text-white items-center justify-center gap-2'>
                                        <ClipLoader
                                            size={30}
                                            color='white'
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                        <span>
                                            En cours
                                        </span>
                                    </div>

                                ):(
                                <div>
                                    <span className='font-bold text-white '>
                                        Mettre à jour
                                    </span>
                                </div>
                            )
                            }
                        </button>
                    </div>
                </form>
            </div>
                )
            }
            

            {/* Boîte de dialogue de mise à jour */}
            



            {/*------------------------------------------------------------------------------------------------  */}




            {/* tableau des livres */}
            <div className='w-full mt-16 overflow-x-auto bg-linear-to-br from-orange-400 via-orange-500 to-orange-600    rounded-2xl px-8 py-4 border border-gray-200 grid  gap-4  md:flex items-center justify-between'>
            <div className='flex items-center relative gap-2 '>
                <div className='flex items-center gap-4'>
                    <input 
                type="search" 
                name="" 
                id="" 
                placeholder='Rechercher...' 
                className='px-12 py-2 rounded-full  bg-white  outline-orange-500 '
                />
                <span className='absolute left-2.5  text-gray-500 text-2xl '>
                <FaSearch/>
                </span>
                </div>
                <div className='flex items-center'>
                    <input 
                        type="date" 
                        className='px-8 py-2 rounded-full bg-white outline-orange-500'
                    />
                </div>
                <div className='flex mx-8 text-white gap-2 items-center'>
                    <button type='button ' className='p-4 rounded-xl bg-orange-500 shadow-2xl cursor-pointer duration-100 ease hover:scale-110 '>
                        <FaFilter/>
                    </button>
                    
                </div>
                </div>
                <div className='flex items-center w-fit  px-4 py-2 rounded-lg bg-linear-to-br from-orange-500 via-orange-600  to-orange-700 duration-200 cursor-pointer transition-all hover:scale-95'>
                    <button
                        type='button'
                        className='flex items-center gap-3 text-white font-bold cursor-pointer'
                    >
                        <span className=' '>
                            <FaPlus />
                        </span>
                        <span>
                            Ajouter un nouveau livre
                        </span>
                    </button>
            </div>
            
        </div>
            <div className='my-4 w-full  rounded-t-2xl  overflow-x-auto   '>

                            <table className='w-full  '>
                    <thead className='bg-gray-100   '>
                    <tr className=' ' >
                        <th className='py-4 px-3 sm:px-4 lg:px-6  '>#</th>
                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Code</th>
                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left '>titre</th>
                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Auteur</th>
                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Catégorie</th>
                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Quantité</th>
                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Année</th>
                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Status</th>
                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Action</th>
                    </tr>
                </thead>
                    {
                    allBooks.length>0 && (
                        <tbody className=''>
                    <tr className='border-b-2 border-gray-200'>
                        <td className='py-4 px-3  sm:px-4 lg:px-6 text-start flex justify-center  '>
                            <div className='flex items-center justify-center w-8 h-8 text-xs rounded-xl bg-orange-100 '>
                                1
                            </div>
                        </td>
                        <td className='py-4 px-3 sm:px-4 lg:px-6 text-left '>601</td>
                        <td className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Le Seigneur des anneaux</td>
                        <td className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Jean de Lafontaine </td>
                        <td className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Roman</td>
                        <td className='py-4 px-3 sm:px-4 lg:px-6 text-left '>3</td>
                        <td className='py-4 px-3 sm:px-4 lg:px-6 text-left '>2001</td>
                        <td className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Disponible</td>
                        <td className='py-4 px-3 sm:px-4 lg:px-6 text-left '>Action</td>
                    </tr>
                </tbody>
                    )
                    
                }
                
            </table>
            {
                    allBooks.length===0 && (
                        <div className='w-full my-2 flex flex-col gap-4 items-center justify-center'>
                    <span className='w-18 h-18 border flex items-center justify-center text-gray-300 border-gray-200 rounded-full'>
                        <FaBook/>
                    </span>
                    <p>
                        Aucune donnée sur les livres
                    </p>
            </div>
                    )
                }
                
            </div>
            
        </div>

        {/* Formulaire de création des livres */}
        <div className='fixed inset-0 bg-black/50 z-50 min-h-screen px-4 lg:px-8 flex items-center justify-center overflow-hidden '>
                <form action="" className='rounded-xl overflow-y-auto h-200  bg-white'>
                    <div className='px-12 py-4 bg-linear-to-r from-orange-500 to-orange-700'>
                        <div className='flex items-center text-4xl text-white/50 mb-4 justify-center'>
                            <FaBook/>
                        </div>
                        <h2 className='text-white text-3xl font-bold w-full text-center'>
                            Ajouter un nouveau livre à la collection
                        </h2>
                    </div>
                    <div className=' px-8  md:px-12 py-4'>
                        <div className=' grid gap-4 items-center'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" className='font-bold text-xl'>
                                    Code <span className='text-orange-500'>*</span>
                                </label>
                                <input type="text" 
                                className='border border-gray-400 px-4 py-1 rounded-lg  outline-orange-500'
                                placeholder='Entrez le code...' />

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" className='font-bold text-xl'>
                                    Numero <span className='text-orange-500'>*</span>
                                </label>
                                <input type="text" 
                                className='border border-gray-400 px-4 py-1 rounded-lg  outline-orange-500'
                                placeholder='Entrez le numero...' />

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" className='font-bold text-xl'>
                                    Titre <span className='text-orange-500'>*</span>
                                </label>
                                <input type="text" 
                                className='border border-gray-400 px-4 py-1 rounded-lg  outline-orange-500'
                                placeholder='Entrez le titre...' />

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" className='font-bold text-xl'>
                                    Auteur <span className='text-orange-500'>*</span>
                                </label>
                                <input type="text" 
                                className='border border-gray-400 px-4 py-1 rounded-lg  outline-orange-500'
                                placeholder='Entrez le nom de l"auteur...' />

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" className='font-bold text-xl'>
                                    Image <span className='text-orange-500'>*</span>
                                </label>
                                <div className='flex flex-col items-start justify-between gap-2'>
                                <button onClick={""} className='px-4 py-1 cursor-pointer duration-500 ease hover:bg-orange-200 bg-orange-100 rounded-full font-bold'>
                                    Choisir 
                                </button>
                                <input
                                accept='image/*'
                                ref={""}
                                onChange={""}
                                type="file" hidden name="" />
                                <input type="text" 
                                className='border w-full border-gray-400 px-4 py-1 rounded-lg  outline-orange-500'
                                placeholder='Insérer le lien de l"image'
                                 />
                                 <div className=' w-full p-8 flex items-center justify-center border-2 rounded border-gray-500'>
                                    {
                                        preview && ( <img src={""} alt="aperçu" width={200} /> )
                                    }
                                 </div>     
                                </div>
                                

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" className='font-bold text-xl'>
                                    Lieu d'Edition <span className='text-orange-500'>*</span>
                                </label>
                                <input type="date" 
                                className='border border-gray-400 px-4 py-1 rounded-lg  outline-orange-500'
                                placeholder='Entrez le nom de l"auteur...' />

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" className='font-bold text-xl'>
                                    Date d'Edtion <span className='text-orange-500'>*</span>
                                </label>
                                <input type="date" 
                                className='border border-gray-400 px-4 py-1 rounded-lg  outline-orange-500'
                                placeholder='Entrez le nom de l"auteur...' />

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" className='font-bold text-xl'>
                                    Lieu d'Edition <span className='text-orange-500'>*</span>
                                </label>
                                <input type="date" 
                                className='border border-gray-400 px-4 py-1 rounded-lg  outline-orange-500'
                                placeholder='Entrez le nom de l"auteur...' />

                            </div>
                            
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" className='font-bold text-xl'>
                                    Origine <span className='text-orange-500'>*</span>
                                </label>
                                <input type="text" 
                                className='border border-gray-400 px-4 py-1 rounded-lg  outline-orange-500'
                                placeholder='Entrez l"ohirine...' />

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" className='font-bold text-xl'>
                                    Quantité <span className='text-orange-500'>*</span>
                                </label>
                                <input type="number" 
                                className='border border-gray-400 px-4 py-1 rounded-lg  outline-orange-500'
                                 />

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" className='font-bold text-xl'>
                                    Status <span className='text-orange-500'>*</span>
                                </label>
                                <select name="" id="" className='border border-gray-400 px-4 py-1 rounded-lg  outline-orange-500'>
                                    <option value="">Disponible</option>
                                </select>

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" className='font-bold text-xl'>
                                    Catégorie <span className='text-orange-500'>*</span>
                                </label>
                                 <select name="categorie" id="categorie" className='border border-gray-400 px-4 py-2 rounded-lg outline-orange-500 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all'>
    <option value="">Sélectionnez une catégorie</option>
    
    <optgroup label="Romans et histoires">
        <option value="Premières lectures">Premières lectures</option>
        <option value="Roman d'aventure">Roman d'aventure</option>
        <option value="Roman fantastique">Roman fantastique</option>
        <option value="Science-fiction jeunesse">Science-fiction jeunesse</option>
        <option value="Roman policier enfant">Roman policier enfant</option>
    </optgroup>
    
    <optgroup label="Albums et illustrations">
        <option value="Album illustré">Album illustré</option>
        <option value="Livre pop-up">Livre pop-up</option>
        <option value="Livre à rabats">Livre à rabats</option>
        <option value="Cherche et trouve">Cherche et trouve</option>
    </optgroup>
    
    <optgroup label="Contes et traditions">
        <option value="Contes de fées">Contes de fées</option>
        <option value="Fables et légendes">Fables et légendes</option>
        <option value="Mythologie enfant">Mythologie enfant</option>
        <option value="Histoires du quotidien">Histoires du quotidien</option>
    </optgroup>
    
    <optgroup label="Éducatif et interactif">
        <option value="Documentaire jeunesse">Documentaire jeunesse</option>
        <option value="Livre d'activités">Livre d'activités</option>
        <option value="Livre éducatif">Livre éducatif</option>
        <option value="Livre d'énigmes">Livre d'énigmes</option>
        <option value="Poésie jeunesse">Poésie jeunesse</option>
    </optgroup>
    
    <optgroup label="Divers">
        <option value="BD jeunesse">BD jeunesse</option>
        <option value="Histoires d'animaux">Histoires d'animaux</option>
    </optgroup>
                                </select>
                            </div>
                        </div>
                        <div className=' w-full my-8 flex items-center  gap-8 justify-center '>
                            <button className='w-1/2 py-1 text-xl border border-gray-500 text-black/50 cursor-pointer duration-300 ease transition-all hover:scale-95 font-bold  flex items-center justify-center rounded-lg '>
                                    Annuler
                            </button>
                            <button className='w-1/2 py-1 text-xl text-white cursor-pointer duration-300 ease transition-all hover:scale-95 font-bold  flex items-center justify-center rounded-lg bg-linear-to-br from-orange-500 via-orange-600 to-orange-700'>
                                    Ajouter
                            </button>
                            
                        </div>
                    </div>


                </form>

        </div>
        {/* Formulaire de création des livres */}

        </section>
    </div>
   </>
)
}
export default Enfant
