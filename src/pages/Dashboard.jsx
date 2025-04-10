import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/layout/Sidebar';
import MainContent from '../components/layout/MainContent';
import MobileNav from '../components/layout/MobileNav';

const Dashboard = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const sidebarRef = useRef();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    // Close sidebar on outside click (mobile)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                mobileMenuOpen
            ) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mobileMenuOpen]);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden relative">
            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full w-64 z-40 bg-white shadow-md transition-transform transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:static md:block`}
            >
                <Sidebar isOpen={mobileMenuOpen} />
            </div>

            {/* Mobile Nav */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50">
                <MobileNav toggleMenu={toggleMobileMenu} isMenuOpen={mobileMenuOpen} />


            </div>

            {/* Main Content */}
            <div className="flex-1 ml-0 mt-14 md:mt-0 h-full overflow-y-auto p-4">
                <MainContent />
            </div>
        </div>
    );
};

export default Dashboard;
