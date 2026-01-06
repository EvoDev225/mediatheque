import React, { useState } from 'react'
import { FaUsersCog, FaBook } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("dashboard");

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const menuItem = `
        flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer 
        transition-all duration-200 font-medium
        hover:bg-orange-100 hover:shadow
        active:scale-95
    `;

    const activeItem = `
        bg-orange-500 text-white shadow-lg
        hover:bg-orange-500 hover:shadow-xl
    `;

    return (
        <div>

            {/* ───── Desktop Sidebar ───── */}
            <div className='fixed left-0 top-20 hidden md:flex flex-col py-10 px-6 
                h-[calc(100vh-5rem)] w-72 bg-white shadow-xl border-r border-gray-200'>

                {/* Profil */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center shadow-md text-white text-xl font-bold">
                        E
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Utilisateur</h2>
                        <p className="text-sm text-gray-500">Administrateur</p>
                    </div>
                </div>

                <hr className="border-gray-200 mb-6" />

                {/* Menu */}
                <ul className='flex flex-col gap-3'>

                    <li
                        className={`${menuItem} ${active === "dashboard" && activeItem}`}
                        onClick={() => setActive("dashboard")}
                    >
                        <RiDashboardFill className='text-2xl' />
                        <span>Dashboard</span>
                    </li>

                    <li
                        className={`${menuItem} ${active === "employees" && activeItem}`}
                        onClick={() => setActive("employees")}
                    >
                        <FaUsersCog className='text-2xl text-green-600' />
                        <a href="/dashboard">Employés</a>
                    </li>

                    <li
                        className={`${menuItem} ${active === "books" && activeItem}`}
                        onClick={() => setActive("books")}
                    >
                        <FaBook className='text-2xl text-amber-700' />
                        <a href="/book"><span>Livres</span></a>
                    </li>

                    <li
                        className={`${menuItem} ${active === "places" && activeItem}`}
                        onClick={() => setActive("places")}
                    >
                        <MdOutlineSpaceDashboard className='text-2xl text-blue-500' />
                        <a href="/place">Espaces</a>
                    </li>

                </ul>

                <hr className="border-gray-200 my-6" />

                {/* Info en bas */}
                <div className="mt-auto text-sm text-gray-500">
                    <p>Version 1.0.0</p>
                    
                </div>

            </div>

            {/* ───── Mobile Button ───── */}
            <button
                onClick={toggleSidebar}
                className='fixed bottom-10 md:hidden z-50 right-5 rounded-full shadow-xl 
                bg-orange-500 text-white p-4 cursor-pointer hover:bg-orange-600 
                transition-all active:scale-90'
            >
                <HiMenuAlt2 className='text-3xl' />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className='fixed inset-0 bg-black/50 md:hidden z-40'
                />
            )}

            {/* ───── Mobile Sidebar ───── */}
            <div
                className={`fixed top-0 left-0 py-20 px-10 z-50 h-screen md:hidden 
                w-4/5 max-w-sm bg-white shadow-xl border-r border-gray-200
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>

                {/* Close */}
                <button
                    onClick={toggleSidebar}
                    className='absolute top-5 right-5 text-3xl text-gray-600 
                    hover:text-orange-500 transition-colors'
                >
                    <IoClose />
                </button>

                <h1 className='text-3xl font-bold mb-10 text-gray-700 tracking-tight'>
                    Menu
                </h1>

                <ul className='flex flex-col gap-6'>
                    <li onClick={() => { setActive("dashboard"); toggleSidebar(); }}
                        className={`${menuItem} ${active === "dashboard" && activeItem}`}>
                        <RiDashboardFill className='text-2xl' />
                        <a href="/dashboard"><span>Dashboard</span></a>
                    </li>

                    <li onClick={() => { setActive("employees"); toggleSidebar(); }}
                        className={`${menuItem} ${active === "employees" && activeItem}`}>
                        <FaUsersCog className='text-2xl text-green-600' />
                        <a href="/dashboard"><span>Employés</span></a>
                    </li>

                    <li onClick={() => { setActive("books"); toggleSidebar(); }}
                        className={`${menuItem} ${active === "books" && activeItem}`}>
                        <FaBook className='text-2xl text-amber-700' />
                        <a href="/book"><span>Livres</span>+</a>
                    </li>

                    <li onClick={() => { setActive("places"); toggleSidebar(); }}
                        className={`${menuItem} ${active === "places" && activeItem}`}>
                        <MdOutlineSpaceDashboard className='text-2xl text-blue-500' />
                        <a href="/place"><span>Espaces</span></a>
                    </li>
                </ul>
                
            </div>
            <div>
            </div>
        </div>
    );
};

export default SideBar;
