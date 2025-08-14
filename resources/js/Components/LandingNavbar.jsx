import React, { useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';

export default function LandingNavbar({ user, forceScrolled = false }) {
    const [isScrolled, setIsScrolled] = useState(forceScrolled);

    useEffect(() => {
        // Jika forceScrolled di-set, langsung keluar tanpa event listener
        if (forceScrolled) return;

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [forceScrolled]);

    // Komponen NavLink untuk navigasi customer
    const NavLink = ({ href, children }) => {
        const isActive = route().current(href); // Perbaikan di sini
        const baseClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
        
        let colorClass;
        if (isActive) {
            colorClass = isScrolled ? 'text-amber-600' : 'text-amber-300';
        } else {
            colorClass = isScrolled ? 'text-gray-800 hover:text-amber-600' : 'text-white hover:text-amber-300';
        }
        
        return (
            <Link href={route(href)} className={`${baseClass} ${colorClass}`}>
                {children}
            </Link>
        );
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || forceScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <Link href="/">
                            {/* Logo berbeda berdasarkan scroll state */}
                            {isScrolled ? (
                                <img 
                                    src="/images/logo.png" 
                                    alt="Bromo Trans Travel Logo"
                                    className="h-10 w-auto"
                                />
                            ) : (
                                <img 
                                    src="/images/logo-white.png" 
                                    alt="Bromo Trans Travel Logo"
                                    className="h-10 w-auto"
                                />
                            )}
                        </Link>
                        <span className={`text-lg font-semibold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                            Bromo Trans
                        </span>
                    </div>

                    <div className="flex items-center">
                        {/* Menu navigasi untuk customer yang sudah login */}
                        {user && user.role === 'customer' && (
                            <div className="hidden md:flex space-x-4 mr-6">
                                <NavLink href="dashboard">Beranda</NavLink>
                                <NavLink href="customer.jadwal">Pesan Tiket</NavLink>
                                <NavLink href="customer.pesanan">Pesanan Saya</NavLink>
                            </div>
                        )}

                        {user ? (
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none transition ${isScrolled ? 'text-gray-800 hover:text-amber-600' : 'text-white hover:text-amber-300'}`}
                                            >
                                                {user.name}
                                                <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>
                                        <Dropdown.Link method="post" href={route('logout')} as="button">Log Out</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        ) : (
                            <>
                                <Link href={route('login')} className={`${isScrolled ? 'text-gray-800 hover:text-amber-600' : 'text-white hover:text-amber-300'} px-3 py-2 rounded-md text-sm font-medium`}>Masuk</Link>
                                <Link href={route('register')} className={`ml-4 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium`}>Daftar</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}