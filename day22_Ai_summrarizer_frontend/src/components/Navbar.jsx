import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
        setIsOpen(false);
    };

    return (
        <nav className="flex justify-center flex-row p-4">
            <div className="navbar flex mt-3 justify-between items-center px-6 md:px-8 h-16 bg-white shadow-lg rounded-full w-full max-w-5xl">
               <Link to= "/">
                <div className="logo font-bold text-3xl bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
                    AIsum
                </div>
               </Link>

                <div className="navlinks gap-8 text-base font-medium hidden md:flex md:items-center">
                    <Link to="/" className="hover:text-rose-500 transition-colors duration-200">
                        Home
                    </Link>
                    {isAuthenticated && (
                        <>
                            <Link to="/dashboard" className="hover:text-rose-500 transition-colors duration-200">
                                Dashboard
                            </Link>
                            <Link to="/summarizer" className="hover:text-rose-500 transition-colors duration-200">
                                Summarizer
                            </Link>
                        </>
                    )}
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700">
                                {user?.fullname?.firstname || user?.email}
                            </span>
                            <button 
                                onClick={handleLogout}
                                className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-6 py-2 rounded-full cursor-pointer active:scale-95 hover:shadow-lg transition-all duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/login">
                                <button className="text-rose-500 px-6 py-2 rounded-full border-2 border-rose-500 cursor-pointer active:scale-95 hover:shadow-lg transition-all duration-300">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-6 py-2 rounded-full cursor-pointer active:scale-95 hover:shadow-lg transition-all duration-300">
                                    Signup
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                <div onClick={() => setIsOpen(!isOpen)} className="hamburger md:hidden cursor-pointer z-50">
                    <button className="text-2xl focus:outline-none transition-transform duration-300 hover:scale-110">
                        {isOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

           
            <div
                className={`fixed top-20 right-4 md:hidden transition-all duration-300 ease-in-out z-40 ${
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                }`}
            >
                <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl shadow-2xl p-6 min-w-[200px]">
                    <div className="flex flex-col gap-4 text-white text-lg font-medium">
                        <Link to="/" onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
                            Home
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
                                    Dashboard
                                </Link>
                                <Link to="/summarizer" onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
                                    Summarizer
                                </Link>
                            </>
                        )}
                        {isAuthenticated ? (
                            <>
                                <div className="text-sm px-2 py-1 bg-white/20 rounded-lg">
                                    {user?.fullname?.firstname || user?.email}
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full bg-white text-rose-500 p-2 rounded-lg cursor-pointer active:scale-95 hover:bg-gray-100 transition-all duration-300 font-semibold"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsOpen(false)}>
                                    <button className="w-full bg-white/20 border-2 border-white text-white p-2 rounded-lg cursor-pointer active:scale-95 hover:bg-white/30 transition-all duration-300 font-semibold">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/signup" onClick={() => setIsOpen(false)}>
                                    <button className="w-full bg-white text-rose-500 p-2 rounded-lg cursor-pointer active:scale-95 hover:bg-gray-100 transition-all duration-300 font-semibold">
                                        Signup
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 md:hidden z-30"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </nav>
    );
};

export default Navbar;
