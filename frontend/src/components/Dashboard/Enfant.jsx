import React, { useEffect, useRef } from 'react'
import NavBarDash from './NavBarDash'
import { FaBook, FaCalendar, FaChild, FaClosedCaptioning, FaEdit, FaFilter, FaPercent, FaPlus, FaSearch, FaTrash, FaXing, FaXRay } from 'react-icons/fa'
import { useState } from 'react'
import { IoIosTrendingUp, IoMdClose, IoMdCloseCircleOutline } from 'react-icons/io'
import { deleteChildren, editChildren, getAllChildrens, newChildren } from '../../Fonctions/Children/Children'
import toast from 'react-hot-toast'
import {ClipLoader} from "react-spinners"
import { IoReload } from 'react-icons/io5'
import { InsererLivre, SupprimerLivre, ToutLivre, ModifierLivre } from '../../Fonctions/Livre/Flivre'
import { VerifierAuthentification } from '../../Fonctions/Utilisateur/Utilisateur'
import { DeconnexionAdmin, DeconnexionEmploye } from '../../Fonctions/Connexion/Authentification'
import { useNavigate } from 'react-router-dom'


const Enfant = () => {
    const [allChildren,setAllChildren]=useState([])
    const [allCat,setAllCat]=useState("Tous")
    const [filteredChildren,setFilteredChildren]=useState([])
    const [allBooks,setAllBooks]= useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [deleteBook,setDeleteBook]=useState("")
    const [openToDeleteBook,setOpenToDeleteBook]=useState(false)
    const [openBookDialog,setOpenBookDialog]=useState(false)
    const [openEditBookDialog, setOpenEditBookDialog] = useState(false)
    const [editingBook, setEditingBook] = useState(null)
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
    const [dataToUpdate,setDataToUpdate]=useState({
        nom:"",
        prenom:"",
        date:"",
        sexe:"",
        numeroParent:"",
        classe:""
    })
    const [filtreEnfant,setFiltreEnfant]=useState([])
    const [idToDelete,setIdToDelete]=useState('')
    const [loading,setLoading]=useState(false)
    const [openAddBoxToInsert,setOpenAddBoxToInsert] = useState(false)
    const [selectDate,setSelectDate]=useState('')
    const [openToUpdate,setOpenToUpdate]=useState(false)
    const [openBoxDeleteChildren,setOpenBoxDeleteChildren]=useState(false)
    const [categorieSelect,setCategorieSelect]=useState("Tous")
    const [searchBook,setSearchBook]=useState("")
    const [searchYear, setSearchYear] = useState("")
    const [childrenData,setChildrenData]=useState({
        nom:"",
        prenom:"",
        date:"",
        sexe:"",
        numeroParent:"",
        classe:""
    })
    const [idChild,setIdChild]=useState("")
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [booksPerPage, setBooksPerPage] = useState(12)
    
    // File input ref for image upload
    const fileInputRef = useRef(null)

    // Filter children
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
    },[search,selectDate,allChildren])

    // Filter books for children
    useEffect(()=>{
        const result = allBooks.filter((books)=>books.type==="Enfant")
        setFiltreEnfant(result)
        setFilteredBooks(result)
    },[allBooks])
    const navigate = useNavigate()
    useEffect(()=>{
                        const fetchUserData = async ()=>{
                            try {
                                const res = await VerifierAuthentification()
                                if(!res){
                                    await DeconnexionEmploye()
                                    navigate("/connexion")
                                }
                                if(res.service !== 'Bibliothèque Enfant'){
                                    await DeconnexionEmploye()
                                    navigate("/connexion")
                                }
                                
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        fetchUserData()
                    })

    // Apply filters to books
    useEffect(() => {
        let result = [...filtreEnfant]
        
        // Filter by category
        if (categorieSelect !== "Tous") {
            result = result.filter(book => book.categorie === categorieSelect)
        }
        
        // Filter by search text
        if (searchBook) {
            const term = searchBook.toLowerCase()
            result = result.filter(book => 
                book.titre.toLowerCase().includes(term) || 
                book.auteur.toLowerCase().includes(term) ||
                book.code.toString().includes(term)
            )
        }
        
        // Filter by year
        if (searchYear) {
            result = result.filter(book => {
                const bookYear = new Date(book.dateEdition.split('/').reverse().join('-')).getFullYear()
                return bookYear.toString() === searchYear
            })
        }
        
        setFilteredBooks(result)
        setCurrentPage(1) // Reset to first page when filters change
    }, [categorieSelect, searchBook, searchYear, filtreEnfant])

    const categorie = allCat==="Tous" ? filteredBooks : filteredBooks.filter((filter)=>filter.categorie===allCat)

    // Filter by date
    const filterDate = (date)=>{
        setSelectDate(date)
    }
    
    const resetFilter = ()=>{
        setSelectDate("")
        setSearch("")
    }

    // Format date
    const formatDate = (date) => {
        if (!date) return "";
        try {
            const [year, month, day] = date.split("-");
            if (!year || !month || !day) return date;
            return `${day}/${month}/${year}`;
        } catch (error) {
            console.error("Erreur de format de date:", error);
            return date;
        }
    }

    // Get month statistics
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
            value:filtreEnfant.length,
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

    // Get children
    useEffect(()=>{
        const Getchildren = async ()=>{
            try {
                const children = await getAllChildrens()
                setAllChildren(children || [])
            } catch (error) {
                return
            }
        }
        Getchildren()
        
        // Get books
        const getBooks = async ()=>{
            try {
                const response = await ToutLivre()
                setAllBooks(response)
            } catch (error) {
                return error
            }
        }
        getBooks()
    },[])

    // Add new child
    const handleInputChange = (e)=>{
        const {name,value}=e.target
        setChildrenData({...childrenData,[name]:value})
    }
    
    const handleSubmitChildren = async (e)=>{
        e.preventDefault()
        if(!childrenData.nom || !childrenData.prenom || !childrenData.date || !childrenData.sexe || !childrenData.numeroParent || !childrenData.classe){
            toast.error("Veuillez renseigner le(s) champ(s) manquants")
            return
        }
        setLoading(true)
        try {
            const Childrens = {
                nom: childrenData.nom.trim(),
                prenom: childrenData.prenom.trim(),
                date: formatDate(childrenData.date),
                sexe: childrenData.sexe.trim(),
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

    // Delete children
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

    // Update child
    const handleModalToUpdate=(id)=>{
        const checkInfo= allChildren.find((child)=>child._id===id)
        setDataToUpdate({
            nom:checkInfo.nom || '',
            prenom:checkInfo.prenom || '',
            date:checkInfo.date || '',
            sexe:checkInfo.sexe || '',
            numeroParent:checkInfo.numeroParent || '',
            classe:checkInfo.classe || '',
        })
        setOpenToUpdate(true)
        setIdChild(id)
    }
    
    const handleUpdateInfo=(e)=>{
        const { name, value } = e.target;
    
    // Mettre à jour l'état correctement
    setDataToUpdate(prevState => ({
        ...prevState,
        [name]: value
    }));
        console.log(dataToUpdate)
    }
    
    
    const HandleToUpdateChildren = async(e) =>{
        e.preventDefault()
        try {
            const updatedData = {
                nom: dataToUpdate.nom.trim(),
                prenom: dataToUpdate.prenom.trim(),
                date: formatDate(dataToUpdate.date),
                sexe: dataToUpdate.sexe.trim(),
                numeroParent: dataToUpdate.numeroParent.trim(),
                classe: dataToUpdate.classe.trim()
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

    // Handle book input
    const handleInputBook=(e)=>{
        const {name,value}=e.target
        setInsertBook({
            ...insertBook,[name]:value
        })
    }

    // Handle image file selection
    const handleImageSelect = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Create a local URL for preview (you might want to upload this to a server)
            const imageUrl = URL.createObjectURL(file)
            setInsertBook({
                ...insertBook,
                img: imageUrl
            })
        }
    }

    // Submit book
    const handleSumbitBook = async (e)=>{
        e.preventDefault()
        setLoading(true)

        try {
            if (!insertBook.code || !insertBook.numero || !insertBook.titre || !insertBook.img || 
                !insertBook.auteur || !insertBook.lieuEdition || !insertBook.dateEdition || 
                !insertBook.origine || !insertBook.quantite || !insertBook.categorie) {
                toast.error("Veuillez remplir tous les champs obligatoires");
                setLoading(false)
                return;
            }

            const books = {
                code:parseInt(insertBook.code),
                numero: parseInt(insertBook.numero),
                titre: insertBook.titre.trim(),
                img: insertBook.img.trim(),
                auteur: insertBook.auteur.trim(),
                lieuEdition: insertBook.lieuEdition.trim(),
                dateEdition: formatDate(insertBook.dateEdition),
                origine: insertBook.origine,
                quantite: parseInt(insertBook.quantite),
                dateEnregistrement:formatDate(insertBook.dateEnregistrement),
                status: "Disponible",
                categorie: insertBook.categorie,
                type:'Enfant'
            }
            const response = await InsererLivre(books)
            toast.success(response) 
            
            setLoading(false)
            setOpenBookDialog(false)
            window.location.reload()
            setInsertBook({
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

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    // Open edit book modal
    const handleEditBook = (book) => {
        setEditingBook(book)
        setOpenEditBookDialog(true)
    }

    // Handle edit book input
    const handleEditBookInput = (e) => {
        const { name, value } = e.target
        setEditingBook({
            ...editingBook,
            [name]: value
        })
    }

    // Submit edited book
    const handleSubmitEditBook = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            // Format dates before sending
            const bookToUpdate = {
                ...editingBook,
                dateEdition: formatDate(editingBook.dateEdition),
                dateEnregistrement: formatDate(editingBook.dateEnregistrement)
            }
            
            const response = await ModifierLivre(editingBook._id, bookToUpdate)
            toast.success(response)
            setLoading(false)
            setOpenEditBookDialog(false)
            window.location.reload()
        } catch (error) {
            console.log(error)
            toast.error("Erreur lors de la modification du livre")
            setLoading(false)
        }
    }

    // Delete book
    const handleDeleteBook=(id)=>{
        setOpenToDeleteBook(true)
        setDeleteBook(id)
    }

    const DeleteBook= async(e)=>{
        e.preventDefault()
        try {
            const response = await SupprimerLivre(deleteBook)
            toast.success(response)
            setOpenToDeleteBook(false)
            window.location.reload()
        } catch (error) {
            toast.error(error)
            setOpenToDeleteBook(false)
            return
        }
    }

    // Pagination logic
    const indexOfLastBook = currentPage * booksPerPage
    const indexOfFirstBook = indexOfLastBook - booksPerPage
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage)

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // Get unique categories for filter
    const uniqueCategories = ["Tous", ...new Set(filtreEnfant.map(book => book.categorie))]

    return (
        <>
            <div className='min-h-screen'>
                <NavBarDash/>
                <section className='pt-24 w-full lg:max-w-6xl mx-auto px-4 lg:px-8 overflow-x-hidden'>
                    <div className='flex flex-col gap-2 my-4'>
                        <h1 className='text-5xl text-orange-500 font-bold'>
                            Tableau de bord
                        </h1>
                        <p className='text-[14px] text-gray-500'>
                            Bienvenue ! Voici vos statistiques du jour
                        </p>
                    </div>
                    
                    {/* Statistics */}
                    <div className='grid grid-cols-1 md:grid-cols-2 mb-12 lg:grid-cols-3 gap-12 items-center justify-between'>
                        {stats.map((stat)=>(
                            <div key={stat.id} className={`px-8 py-4 flex flex-col ${stat.id==1?"text-white":"text-gray-500"} duration-500 ease-in-out hover:-translate-y-1 transition-all shadow-2xl rounded-xl ${stat.style}`}>
                                <div className='flex items-center justify-between'>
                                    <h2 className={`font-bold text-2xl`}>
                                        {stat.title}
                                    </h2>
                                    <span className={`text-orange-500 rounded-2xl bg-orange-100 p-4`}>
                                        {stat.icon}
                                    </span>
                                </div>
                                <div className='flex items-center'>
                                    <p className={`text-3xl font-bold ${stat.id!=1?"text-orange-500":""}`}>
                                        {stat.value}
                                    </p>
                                </div>
                                <div className='flex items-center my-4'>
                                    <p className='text-xs'>
                                        {stat.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Children table search and add */}
                    <div className='w-full overflow-x-auto bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl px-8 py-4 border border-gray-200 grid gap-4 md:flex items-center justify-between'>
                        <div className='flex items-center relative gap-2'>
                            <div className='flex items-center gap-4'>
                                <input 
                                    type="search" 
                                    name="" 
                                    id="" 
                                    onChange={e=>setSearch(e.target.value)}
                                    placeholder='Rechercher...' 
                                    className='px-12 py-2 rounded-full bg-white outline-orange-500'
                                />
                                <span className='absolute left-2.5 text-gray-500 text-2xl'>
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
                                <button onClick={resetFilter} className='text-2xl text-white cursor-pointer'>
                                    <IoReload/>
                                </button>
                            </div>
                        </div>
                        <div className='flex items-center w-fit px-4 py-2 rounded-lg bg-linear-to-br from-orange-500 via-orange-600 to-orange-700 duration-200 cursor-pointer transition-all hover:scale-95'>
                            <button
                                type='button'
                                onClick={()=>setOpenAddBoxToInsert(true)}
                                className='flex items-center gap-3 text-white font-bold cursor-pointer'
                            >
                                <span className=''>
                                    <FaPlus />
                                </span>
                                <span>
                                    Ajouter un nouvel enfant
                                </span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Children table */}
                    <div className='my-4 w-full rounded-t-2xl'>
                        <div className='w-full overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-100'>
                                    <tr>
                                        <th className='py-4 px-3 sm:px-4 lg:px-6'>#</th>
                                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Nom & Prénom</th>
                                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Date de naissance</th>
                                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Sexe</th>
                                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Numéro parent</th>
                                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Classe</th>
                                        <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Action</th>
                                    </tr>
                                </thead>
                                {allChildren.length>0 && filteredChildren && (
                                    filteredChildren.map((child,index)=>(
                                        <tbody key={child._id}>
                                            <tr className='border-b-2 border-gray-200'>
                                                <td className='py-4 px-3 sm:px-4 lg:px-6 text-start flex justify-center'>
                                                    <div className='flex items-center justify-center w-8 h-8 text-xs rounded-xl bg-orange-100'>
                                                        {index+1}
                                                    </div>
                                                </td>
                                                <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>
                                                    <div className='flex flex-col'>
                                                        <span>{child.nom}</span>
                                                        <span>{child.prenom}</span>
                                                    </div>
                                                </td>
                                                <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>{child.date}</td>
                                                <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>{child.sexe}</td>
                                                <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>{child.numeroParent}</td>
                                                <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>
                                                    <span className='px-4 py-1 rounded-full bg-orange-500 text-white font-bold'>
                                                        {child.classe}
                                                    </span>
                                                </td>
                                                <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>
                                                    <div className='flex items-center gap-2 text-xl'>
                                                        <button 
                                                            onClick={()=>handleModalToUpdate(child._id)}
                                                            className='text-gray-500 duration-200 ease transition-colors hover:text-gray-600'
                                                        >
                                                            <FaEdit/>
                                                        </button>
                                                        <button
                                                            onClick={()=>handleOpenToDelete(child._id)}
                                                            className='text-red-500 duration-200 ease transition-colors hover:text-red-600'
                                                        >
                                                            <FaTrash/>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))
                                )}
                            </table>
                            {allChildren.length===0 && (
                                <div className='w-full flex gap-4 items-center justify-center my-2'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <span className='w-18 h-18 border flex items-center justify-center text-gray-300 border-gray-200 rounded-full'>
                                            <FaChild/>
                                        </span>
                                        <p>Aucune donnée pour le moment</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Books section */}
                    <div className='w-full relative mt-16 overflow-x-auto bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl px-8 py-4 border border-gray-200 grid gap-4 md:flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <div className='flex items-center relative'>
                                <input 
                                    type="search" 
                                    name="searchBook"
                                    value={searchBook}
                                    onChange={(e) => setSearchBook(e.target.value)}
                                    placeholder='Rechercher un livre...' 
                                    className='px-12 py-2 rounded-full bg-white outline-orange-500'
                                />
                                <span className='absolute left-2.5 text-gray-500 text-2xl'>
                                    <FaSearch/>
                                </span>
                            </div>
                            <div className='flex items-center'>
                                <input 
                                    type="number"
                                    name="searchYear"
                                    value={searchYear}
                                    onChange={(e) => setSearchYear(e.target.value)}
                                    placeholder='Année'
                                    className='px-8 py-2 rounded-full bg-white outline-orange-500 w-32'
                                />
                            </div>
                            <div className='flex items-center'>
                                <select 
                                    value={categorieSelect}
                                    onChange={(e) => setCategorieSelect(e.target.value)}
                                    className='px-8 py-2 rounded-full bg-white outline-orange-500'
                                >
                                    {uniqueCategories.map((cat, index) => (
                                        <option key={index} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex items-center w-fit px-4 py-2 rounded-lg bg-linear-to-br from-orange-500 via-orange-600 to-orange-700 duration-200 cursor-pointer transition-all hover:scale-95'>
                            <button
                                onClick={()=>setOpenBookDialog(true)}
                                className='flex items-center gap-3 text-white font-bold cursor-pointer'
                            >
                                <span className=''>
                                    <FaPlus />
                                </span>
                                <span>Ajouter un nouveau livre</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Books table with pagination */}
                    <div className='my-4 w-full rounded-t-2xl overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='bg-gray-100'>
                                <tr>
                                    <th className='py-4 px-3 sm:px-4 lg:px-6'>#</th>
                                    <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Code</th>
                                    <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Titre</th>
                                    <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Auteur</th>
                                    <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Catégorie</th>
                                    <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Quantité</th>
                                    <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Année</th>
                                    <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Status</th>
                                    <th className='py-4 px-3 sm:px-4 lg:px-6 text-left'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentBooks.length > 0 ? (
                                    currentBooks.map((book, index) => (
                                        <tr key={book._id} className='border-b-2 border-gray-200'>
                                            <td className='py-4 px-3 sm:px-4 lg:px-6 text-start flex justify-center'>
                                                <div className='flex items-center justify-center w-8 h-8 text-xs rounded-xl bg-orange-100'>
                                                    {indexOfFirstBook + index + 1}
                                                </div>
                                            </td>
                                            <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>{book.code}</td>
                                            <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>{book.titre}</td>
                                            <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>{book.auteur}</td>
                                            <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>{book.categorie}</td>
                                            <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>{book.quantite}</td>
                                            <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>
                                                {new Date(book.dateEdition.split('/').reverse().join('-')).getFullYear()}
                                            </td>
                                            <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>{book.status}</td>
                                            <td className='py-4 px-3 sm:px-4 lg:px-6 text-left'>
                                                <div className='flex items-center gap-2 text-xl'>
                                                    <button 
                                                        onClick={() => handleEditBook(book)}
                                                        className='text-gray-500 duration-200 ease transition-colors hover:text-gray-600'
                                                    >
                                                        <FaEdit/>
                                                    </button>
                                                    <button
                                                        type='button'
                                                        onClick={()=>handleDeleteBook(book._id)}
                                                        className='text-red-500 duration-200 ease transition-colors hover:text-red-600'
                                                    >
                                                        <FaTrash/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className='py-8 text-center'>
                                            <div className='flex flex-col items-center justify-center'>
                                                <span className='w-18 h-18 border flex items-center justify-center text-gray-300 border-gray-200 rounded-full'>
                                                    <FaBook/>
                                                </span>
                                                <p className='mt-2'>Aucun livre trouvé</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        
                        {/* Pagination controls */}
                        {filteredBooks.length > booksPerPage && (
                            <div className='flex justify-center items-center gap-4 mt-6 py-4'>
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                                >
                                    Précédent
                                </button>
                                <span className='text-gray-700'>
                                    Page {currentPage} sur {totalPages}
                                </span>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                                >
                                    Suivant
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Add child dialog */}
                    {openAddBoxToInsert && (
                        <div className='fixed z-50 inset-0 flex items-center justify-center px-4 lg:px-8 w-full h-screen bg-black/50'>
                            <form onSubmit={handleSubmitChildren} className='bg-white w-full md:w-350 shadow-2xl rounded-2xl overflow-hidden'>
                                <div className='bg-linear-to-tr bg-orange-500 via-orange-600 to-orange-700 px-12 py-4 text-white'>
                                    <div className='flex justify-between items-center gap-2.5'>
                                        <p className='text-[18px] font-medium text-center'>
                                            Ajouter un nouvel enfant à la bibliothèque
                                        </p>
                                        <button onClick={()=>setOpenAddBoxToInsert(false)}>
                                            <IoMdCloseCircleOutline /> 
                                        </button>
                                    </div>
                                </div>
                                <div className='px-12 py-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <label className='font-bold'>Nom <span className='text-orange-500'>*</span></label>
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
                                        <label className='font-bold'>Prénom <span className='text-orange-500'>*</span></label>
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
                                        <label className='font-bold'>Date de naissance <span className='text-orange-500'>*</span></label>
                                        <input 
                                            type="date" 
                                            name="date" 
                                            value={childrenData.date}
                                            onChange={handleInputChange}
                                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='font-bold'>Sexe <span className='text-orange-500'>*</span></label>
                                        <select name="sexe" id="sexe" onChange={handleInputChange} className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'>
                                            <option value="">Sélectionner le sexe</option>
                                            <option value="garçon">Garçon</option>
                                            <option value="fille">Fille</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='font-bold'>Numéro du parent <span className='text-orange-500'>*</span></label>
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
                                        <label className='font-bold'>Classe <span className='text-orange-500'>*</span></label>
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
                                    <button type='submit' className='text-center w-full rounded-xl px-6 py-2 bg-linear-to-tr bg-orange-500 via-orange-600 to-orange-700 duration-300 transition-all ease-in-out hover:scale-95 cursor-pointer'>
                                        {loading ? (
                                            <div className='flex font-bold text-white items-center justify-center gap-2'>
                                                <ClipLoader size={30} color='white' aria-label="Loading Spinner"/>
                                                <span>En cours</span>
                                            </div>
                                        ) : (
                                            <span className='font-bold text-white'>Ajouter</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Delete child dialog */}
                    {openBoxDeleteChildren && (
                        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center h-screen'>
                            <div className='bg-white px-12 py-4 rounded-xl'>
                                <div className='flex items-center justify-center'>
                                    <span className='p-4 text-3xl text-red-500'>
                                        <FaTrash/>
                                    </span>
                                </div>
                                <div className='flex justify-center my-2'>
                                    <p>Supprimer les données</p>
                                </div>
                                <div className='flex items-center justify-center gap-4'>
                                    <button
                                        type='button' 
                                        onClick={()=>setOpenBoxDeleteChildren(false)}
                                        className='px-4 py-1 bg-gray-200 hover:bg-gray-500 duration-300 ease rounded-lg text-xl'
                                    >
                                        Annuler
                                    </button>
                                    <button 
                                        type='button'
                                        onClick={handleDelete}
                                        className='px-4 py-2 bg-red-500 text-white hover:bg-red-500 duration-300 ease rounded-lg text-xl'
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Update child dialog */}
                    {openToUpdate && (
                        <div className='fixed z-50 inset-0 flex items-center justify-center px-4 lg:px-8 w-full h-screen bg-black/50'>
                            <form onSubmit={HandleToUpdateChildren} className='bg-white w-full md:w-[700px] shadow-2xl rounded-2xl overflow-hidden'>
                                <div className='bg-linear-to-tr bg-orange-500 via-orange-600 to-orange-700 px-12 py-4 text-white'>
                                    <div className='flex justify-between items-center gap-2.5'>
                                        <p className='text-[18px] font-medium text-center'>
                                            Mise à jour des informations personnelles
                                        </p>
                                        <button onClick={()=>setOpenToUpdate(false)}>
                                            <IoMdCloseCircleOutline /> 
                                        </button>
                                    </div>
                                </div>
                                <div className='px-12 py-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <label className='font-bold'>Nom <span className='text-orange-500'>*</span></label>
                                        <input 
                                            type="text" 
                                            name="nom" 
                                            value={dataToUpdate.nom}
                                            onChange={handleUpdateInfo}
                                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='font-bold'>Prénom <span className='text-orange-500'>*</span></label>
                                        <input 
                                            type="text" 
                                            name="prenom" 
                                            value={dataToUpdate.prenom }
                                            onChange={handleUpdateInfo}
                                            placeholder='Entrez le prenom...'
                                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='font-bold'>Date de naissance <span className='text-orange-500'>*</span></label>
                                        <input 
                                            type="date" 
                                            name="date" 
                                            value={dataToUpdate.date }
                                            onChange={handleUpdateInfo}
                                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='font-bold'>Sexe <span className='text-orange-500'>*</span></label>
                                        <select name="sexe" id="sexe" value={dataToUpdate.sexe} onChange={handleUpdateInfo} className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'>
                                            <option value="">Sélectionner le sexe</option>
                                            <option value="garçon">Garçon</option>
                                            <option value="fille">Fille</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='font-bold'>Numéro du parent <span className='text-orange-500'>*</span></label>
                                        <input 
                                            type="number" 
                                            name="numeroParent"
                                            value={dataToUpdate.numeroParent}
                                            onChange={handleUpdateInfo} 
                                            placeholder='Entrez le numéro du parent...'
                                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='font-bold'>Classe <span className='text-orange-500'>*</span></label>
                                        <input 
                                            type="text" 
                                            name="classe" 
                                            value={dataToUpdate.classe }
                                            onChange={handleUpdateInfo}
                                            placeholder='Entrez la classe...'
                                            className='border border-gray-600 rounded-lg px-4 py-2 outline-orange-600'
                                        />
                                    </div>
                                </div>
                                <div className='px-8 py-4 flex items-center justify-center'>
                                    <button
                                        type='submit'
                                        className='text-center w-full rounded-xl px-6 py-2 bg-linear-to-tr bg-orange-500 via-orange-600 to-orange-700 duration-300 transition-all ease-in-out hover:scale-95 cursor-pointer'
                                    >
                                        {loading ? (
                                            <div className='flex font-bold text-white items-center justify-center gap-2'>
                                                <ClipLoader size={30} color='white' aria-label="Loading Spinner"/>
                                                <span>En cours</span>
                                            </div>
                                        ) : (
                                            <span className='font-bold text-white'>Mettre à jour</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Add book dialog */}
                    {openBookDialog && (
                        <div className='fixed inset-0 bg-black/50 z-50 min-h-screen px-4 lg:px-8 flex items-center justify-center overflow-hidden'>
                            <form onSubmit={handleSumbitBook} className='rounded-xl overflow-y-auto max-h-[90vh] bg-white'>
                                <div className='px-12 py-4 bg-linear-to-r from-orange-500 to-orange-700'>
                                    <div className='flex items-center text-4xl text-white/50 mb-4 justify-center'>
                                        <FaBook/>
                                    </div>
                                    <h2 className='text-white text-3xl font-bold w-full text-center'>
                                        Ajouter un nouveau livre à la collection
                                    </h2>
                                </div>
                                <div className='px-8 md:px-12 py-4'>
                                    <div className='grid gap-4 items-center'>
                                        {/* Hidden file input */}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Code <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                type="number" 
                                                min={0}
                                                value={insertBook.code}
                                                name='code'
                                                required
                                                onChange={handleInputBook}
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                                placeholder='Entrez le code...'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Numero <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                name='numero'
                                                value={insertBook.numero}
                                                required
                                                onChange={handleInputBook}
                                                type="number" 
                                                min={0}
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                                placeholder='Entrez le numero...'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Titre <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                required
                                                name='titre'
                                                value={insertBook.titre}
                                                onChange={handleInputBook}
                                                type="text" 
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                                placeholder='Entrez le titre...'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Auteur <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                name='auteur'
                                                value={insertBook.auteur}
                                                required
                                                onChange={handleInputBook}
                                                type="text" 
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                                placeholder="Entrez le nom de l'auteur..."
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Image <span className='text-orange-500'>*</span>
                                            </label>
                                            <div className='flex flex-col gap-2'>
                                                <button 
                                                    type="button"
                                                    onClick={handleImageSelect}
                                                    className='px-4 py-1 cursor-pointer duration-500 ease hover:bg-orange-200 bg-orange-100 rounded-full font-bold w-fit'
                                                >
                                                    Choisir une image
                                                </button>
                                                <input 
                                                    name='img'
                                                    required
                                                    value={insertBook.img}
                                                    onChange={handleInputBook}
                                                    type="text" 
                                                    className='border w-full border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                                    placeholder="Insérer le lien de l'image"
                                                />
                                                {insertBook.img && (
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-600 mb-1">Prévisualisation:</p>
                                                        <img 
                                                            src={insertBook.img} 
                                                            alt="Preview" 
                                                            className="h-32 w-auto object-cover rounded-lg"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none'
                                                                e.target.parentElement.innerHTML += '<p class="text-red-500 text-sm">Image non disponible</p>'
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Lieu d'Edition <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                name='lieuEdition'
                                                value={insertBook.lieuEdition}
                                                required
                                                onChange={handleInputBook}
                                                type="text" 
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                                placeholder="Entrez le nom de le lieu d'edition..."
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Date d'Edition <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                name='dateEdition'
                                                value={insertBook.dateEdition}
                                                required
                                                onChange={handleInputBook}
                                                type="date" 
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Date d'Enregistrement <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                name='dateEnregistrement'
                                                required
                                                onChange={handleInputBook}
                                                type="date" 
                                                value={insertBook.dateEnregistrement}
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Origine <span className='text-orange-500'>*</span>
                                            </label>
                                            <select 
                                                name='origine' 
                                                required
                                                value={insertBook.origine}
                                                onChange={handleInputBook}
                                                className='border border-gray-400 px-4 py-2 rounded-lg outline-orange-500 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all'
                                            >
                                                <option value="">Sélectionnez une origine</option>
                                                <option value="Don">Don</option>
                                                <option value="Achat">Achat</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Quantité <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                min={1}
                                                required
                                                value={insertBook.quantite}
                                                name='quantite'
                                                onChange={handleInputBook}
                                                type="number" 
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Status <span className='text-orange-500'>*</span>
                                            </label>
                                            <select 
                                                name='status'
                                                required
                                                onChange={handleInputBook}
                                                value={insertBook.status}
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                            >
                                                <option value="Disponible">Disponible</option>
                                                <option value="Indisponible">Indisponible</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Catégorie <span className='text-orange-500'>*</span>
                                            </label>
                                            <select 
                                                required
                                                value={insertBook.categorie}
                                                onChange={handleInputBook}
                                                name="categorie"
                                                className='border border-gray-400 px-4 py-2 rounded-lg outline-orange-500 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all'
                                            >
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
                                    <div className='w-full my-8 flex items-center gap-8 justify-center'>
                                        <button 
                                            type="button"
                                            onClick={()=>setOpenBookDialog(false)}
                                            className='w-1/2 py-1 text-xl border border-gray-500 text-black/50 cursor-pointer duration-300 ease transition-all hover:scale-95 font-bold flex items-center justify-center rounded-lg'
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type='submit'
                                            className='w-1/2 py-1 text-xl text-white cursor-pointer duration-300 ease transition-all hover:scale-95 font-bold flex items-center justify-center rounded-lg bg-linear-to-br from-orange-500 via-orange-600 to-orange-700'
                                        >
                                            {loading ? (
                                                <div className='flex font-bold text-white items-center justify-center gap-2'>
                                                    <ClipLoader size={30} color='white' aria-label="Loading Spinner"/>
                                                    <span>En cours</span>
                                                </div>
                                            ) : (
                                                <span className='font-bold text-white'>Ajouter</span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Edit book dialog */}
                    {openEditBookDialog && editingBook && (
                        <div className='fixed inset-0 bg-black/50 z-50 min-h-screen px-4 lg:px-8 flex items-center justify-center overflow-hidden'>
                            <form onSubmit={handleSubmitEditBook} className='rounded-xl overflow-y-auto max-h-[90vh] bg-white'>
                                <div className='px-12 py-4 bg-linear-to-r from-orange-500 to-orange-700'>
                                    <div className='flex items-center text-4xl text-white/50 mb-4 justify-center'>
                                        <FaBook/>
                                    </div>
                                    <h2 className='text-white text-3xl font-bold w-full text-center'>
                                        Modifier le livre
                                    </h2>
                                </div>
                                <div className='px-8 md:px-12 py-4'>
                                    <div className='grid gap-4 items-center'>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Code <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                type="number" 
                                                min={0}
                                                value={editingBook.code}
                                                name='code'
                                                required
                                                onChange={handleEditBookInput}
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Numero <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                name='numero'
                                                value={editingBook.numero}
                                                required
                                                onChange={handleEditBookInput}
                                                type="number" 
                                                min={0}
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Titre <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                required
                                                name='titre'
                                                value={editingBook.titre}
                                                onChange={handleEditBookInput}
                                                type="text" 
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Auteur <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                name='auteur'
                                                value={editingBook.auteur}
                                                required
                                                onChange={handleEditBookInput}
                                                type="text" 
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Image <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                name='img'
                                                required
                                                value={editingBook.img}
                                                onChange={handleEditBookInput}
                                                type="text" 
                                                className='border w-full border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                                placeholder="Insérer le lien de l'image"
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Lieu d'Edition <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                name='lieuEdition'
                                                value={editingBook.lieuEdition}
                                                required
                                                onChange={handleEditBookInput}
                                                type="text" 
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Date d'Edition <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                name='dateEdition'
                                                value={editingBook.dateEdition}
                                                required
                                                onChange={handleEditBookInput}
                                                type="date" 
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Date d'Enregistrement <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                name='dateEnregistrement'
                                                required
                                                onChange={handleEditBookInput}
                                                type="date" 
                                                value={editingBook.dateEnregistrement}
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Origine <span className='text-orange-500'>*</span>
                                            </label>
                                            <select 
                                                name='origine' 
                                                required
                                                value={editingBook.origine}
                                                onChange={handleEditBookInput}
                                                className='border border-gray-400 px-4 py-2 rounded-lg outline-orange-500 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all'
                                            >
                                                <option value="">Sélectionnez une origine</option>
                                                <option value="Don">Don</option>
                                                <option value="Achat">Achat</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Quantité <span className='text-orange-500'>*</span>
                                            </label>
                                            <input 
                                                min={1}
                                                required
                                                value={editingBook.quantite}
                                                name='quantite'
                                                onChange={handleEditBookInput}
                                                type="number" 
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Status <span className='text-orange-500'>*</span>
                                            </label>
                                            <select 
                                                name='status'
                                                required
                                                onChange={handleEditBookInput}
                                                value={editingBook.status}
                                                className='border border-gray-400 px-4 py-1 rounded-lg outline-orange-500'
                                            >
                                                <option value="Disponible">Disponible</option>
                                                <option value="Indisponible">Indisponible</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-bold text-xl'>
                                                Catégorie <span className='text-orange-500'>*</span>
                                            </label>
                                            <select 
                                                required
                                                value={editingBook.categorie}
                                                onChange={handleEditBookInput}
                                                name="categorie"
                                                className='border border-gray-400 px-4 py-2 rounded-lg outline-orange-500 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all'
                                            >
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
                                    <div className='w-full my-8 flex items-center gap-8 justify-center'>
                                        <button 
                                            type="button"
                                            onClick={() => setOpenEditBookDialog(false)}
                                            className='w-1/2 py-1 text-xl border border-gray-500 text-black/50 cursor-pointer duration-300 ease transition-all hover:scale-95 font-bold flex items-center justify-center rounded-lg'
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type='submit'
                                            className='w-1/2 py-1 text-xl text-white cursor-pointer duration-300 ease transition-all hover:scale-95 font-bold flex items-center justify-center rounded-lg bg-linear-to-br from-orange-500 via-orange-600 to-orange-700'
                                        >
                                            {loading ? (
                                                <div className='flex font-bold text-white items-center justify-center gap-2'>
                                                    <ClipLoader size={30} color='white' aria-label="Loading Spinner"/>
                                                    <span>En cours</span>
                                                </div>
                                            ) : (
                                                <span className='font-bold text-white'>Modifier</span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Delete book dialog */}
                    {openToDeleteBook && (
                        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center h-screen'>
                            <div className='bg-white px-12 py-4 rounded-xl'>
                                <div className='flex items-center justify-center'>
                                    <span className='p-4 text-3xl text-red-500'>
                                        <FaTrash/>
                                    </span>
                                </div>
                                <div className='flex justify-center my-2'>
                                    <p>Supprimer ce livre ?</p>
                                </div>
                                <div className='flex items-center justify-center gap-4'>
                                    <button
                                        type='button' 
                                        onClick={()=>setOpenToDeleteBook(false)}
                                        className='px-4 py-1 bg-gray-200 hover:bg-gray-500 duration-300 ease rounded-lg text-xl'
                                    >
                                        Annuler
                                    </button>
                                    <button 
                                        type='button'
                                        onClick={DeleteBook}
                                        className='px-4 py-2 bg-red-500 text-white hover:bg-red-500 duration-300 ease rounded-lg text-xl'
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </>
    )
}

export default Enfant