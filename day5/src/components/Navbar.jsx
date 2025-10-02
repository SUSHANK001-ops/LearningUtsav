import {
    BoxIcon,
    HomeIcon,
    Mail,
    Menu,
    PanelsTopLeft,
    ShoppingCartIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Button from "./ui/Button";
import { useCart } from "../context/CartContext";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { totalItems } = useCart();
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className="relative flex justify-around items-center px-1 py-4">
                <div className="logo flex items-center gap-2 text-2xl">
                    <img height={20} width={50} src="/logo.svg" alt="" />
                    <span>SenCart</span>
                </div>

                <div className="navigations gap-4 flex items-center">
                    <div className="hidden md:flex gap-2">
                        <Link className="flex gap-1 items-center" to="/"><HomeIcon /> Home</Link>
                        <Link className="flex gap-1 items-center" to="/#products"><BoxIcon /> Product</Link>
                        <Link className="flex gap-1 items-center" to="/about"><PanelsTopLeft /> About</Link>
                        <Link className="flex gap-1 items-center" to="/contact"><Mail /> Contact</Link>
                        <Link className="flex gap-1 items-center relative" to="/cart">
                            <ShoppingCartIcon /> Cart
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-3 text-xs bg-rose-600 text-white rounded-full px-2 py-[1px]">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>

                    <Button/>

                    <div className="md:hidden">
                        <button
                            ref={buttonRef}
                            aria-label="Menu"
                            onClick={() => setIsOpen(o => !o)}
                            className={`p-2 rounded-full transition-all duration-300
                                ${isOpen ? " bg-rose-500 text-white" : "bg-rose-100 hover:bg-rose-200"}
                            `}
                        >
                            <Menu className="shrink-0" />
                        </button>
                    </div>
                </div>

                <div
                    ref={menuRef}
                    className={`
                        md:hidden hamburger-menu absolute top-full right-2 mt-3 
                        bg-rose-400/95 border border-rose-500/40 shadow-lg rounded-xl
                        flex flex-col gap-3 p-3 w-48 backdrop-blur-sm
                        transition-all duration-300 origin-top
                        ${isOpen
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 -translate-y-2 pointer-events-none select-none"}
                        animate-in
                    `}
                >
                    <Link className="flex gap-1 items-center hover:translate-x-1 transition" to="/"><HomeIcon /> Home</Link>
                    <Link className="flex gap-1 items-center hover:translate-x-1 transition" to="/#products"><BoxIcon /> Product</Link>
                    <Link className="flex gap-1 items-center hover:translate-x-1 transition" to="/about"><PanelsTopLeft /> About</Link>
                    <Link className="flex gap-1 items-center hover:translate-x-1 transition" to="/contact"><Mail /> Contact</Link>
                    <Link className="flex gap-1 items-center hover:translate-x-1 transition relative" to="/cart">
                        <ShoppingCartIcon /> Cart
                        {totalItems > 0 && (
                            <span className="ml-auto text-xs bg-rose-700 text-white rounded-full px-2 py-[1px]">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
